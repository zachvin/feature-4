const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec);
const k8s = require("@kubernetes/client-node");

// pushes Docker image to Google Container Registry
async function pushDockerImageToGCR(imageName, tag) {
  const now = Date.now().toString();
  const imageNameWithTag = `us-central1-docker.pkg.dev/sent-deployment/quickstart-docker-repo/${imageName}${now}:latest`;

  try {
    // tag image
    console.log("Attempting to tag image...");
    const tagCommand = `docker tag ${imageName}:${tag} ${imageNameWithTag}`;
    console.log(tagCommand);

    var { stdout, stderr } = await execAsync(tagCommand);

    console.log(stdout);

    // push image
    console.log(`Attempting to push image: ${imageNameWithTag} to GCR...`);

    const pushCommand = `docker push ${imageNameWithTag}`;
    console.log(pushCommand);
    var { stdout, stderr } = await execAsync(pushCommand);

    if (stderr) {
      console.error("Error pushing Docker image:", stderr);
      return { success: false, error: stderr };
    }

    console.log("Docker image pushed successfully:");
    console.log(stdout);
    return {
      success: true,
      message: `Image '${imageNameWithTag}' pushed to GCR.`,
      time: now,
    };
  } catch (error) {
    console.error("Error executing docker push:", error);
    return { success: false, error: error.message };
  }
}

// deploys app to Kubernetes cluster
async function deployApp(imageName, now) {
  const deploymentManifest = {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: `${imageName}${now}-deployment`,
    },
    spec: {
      replicas: 1,
      selector: {
        matchLabels: {
          app: `${imageName}${now}-deployment`,
        },
      },
      template: {
        metadata: {
          labels: {
            app: `${imageName}${now}-deployment`,
          },
        },
        spec: {
          containers: [
            {
              name: imageName,
              image: `us-central1-docker.pkg.dev/sent-deployment/quickstart-docker-repo/${imageName}${now}:latest`,
              ports: [{ containerPort: 80 }],
            },
          ],
        },
      },
    },
  };

  const serviceManifest = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: `${imageName}${now}-service`,
    },
    spec: {
      selector: {
        app: `${imageName}${now}-deployment`,
      },
      ports: [
        {
          protocol: "TCP",
          port: 80, // parseInt(port, 10), // exposed externally
          targetPort: 80, // containerPort application listens on
        },
      ],
      type: "LoadBalancer",
      loadBalancerIP: "",
    },
  };

  const kc = new k8s.KubeConfig();
  kc.loadFromFile("./config");
  const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
  const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);

  // creates deployment
  try {
    const deploymentResponse = await appsV1Api.createNamespacedDeployment({
      namespace: "default",
      body: deploymentManifest,
    });
    console.log("Deployment created:", deploymentResponse.metadata);
  } catch (error) {
    if (error.code === 409) {
      console.log("Deployment already exists.");
    } else {
      console.error("Error creating deployment", error);
      throw error;
    }
  }

  // creates service (exposes container to traffic)
  try {
    const serviceResponse = await coreV1Api.createNamespacedService({
      namespace: "default",
      body: serviceManifest,
    });
  } catch (error) {
    console.log("Error creating service", error);
    throw error;
  }

  // waits until IP address is returned
  let service;
  while (
    !service ||
    !service.status ||
    !service.status.loadBalancer ||
    !service.status.loadBalancer.ingress
  ) {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
    service = await coreV1Api.readNamespacedService({
      name: `${imageName}${now}-service`,
      namespace: "default",
    });
  }
  return service.status.loadBalancer.ingress[0].ip;
}

async function deleteDeployment(imageName) {
  // delete deployment
  // GKE limits number of pods, not sure if limited by usage or pod quantity or both
  const kc = new k8s.KubeConfig();
  kc.loadFromFile("./config");

  const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
  try {
    console.log(`Deleting deployment ${imageName}-deployment`);
    const serviceResponse = await appsV1Api.deleteNamespacedDeployment({
      name: `${imageName}-deployment`,
      namespace: "default",
    });
  } catch (error) {
    if (error.code == 404) {
      console.log("Deployment doesn't exist in GKE");
    } else {
      console.error("Error deleting deployment", error);
    }
  }

  // delete service (services expose endpoint, must be deleted separately)
  // GKE free tier limits to 8 total services
  const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);
  try {
    console.log(`Deleting service ${imageName}-service`);
    const serviceResponse = await coreV1Api.deleteNamespacedService({
      name: `${imageName}-service`,
      namespace: "default",
    });
  } catch (error) {
    if (error.code === 404) {
      console.log("Service doesn't exist in GKE");
      // don't throw error because this doesn't have any impact; there is nothing to delete
    } else {
      console.error("Error deleting service", error);
    }
  }
}

module.exports = {
  pushDockerImageToGCR: pushDockerImageToGCR,
  deployApp: deployApp,
  deleteDeployment: deleteDeployment,
};
