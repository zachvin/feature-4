const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec);
const k8s = require("@kubernetes/client-node");

// pushes Docker image to Google Container Registry
// reads image from local storage (./uploads/ folder)
async function pushDockerImageToGCR(imageName, tag) {
  const imageNameWithTag = `us-central1-docker.pkg.dev/sent-deployment/quickstart-docker-repo/${imageName}:v1.0`;

  try {
    // tag image
    console.log("Attempting to tag image...");
    const tagCommand = `docker tag ${imageName}:${tag} ${imageNameWithTag}`;
    console.log(tagCommand);

    var { stdout, stderr } = await execAsync(tagCommand);

    // push image
    console.log(`Attempting to push image: ${imageNameWithTag} to GCR...`);

    const pushCommand = `docker push ${imageNameWithTag}`;
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
    };
  } catch (error) {
    console.error("Error executing docker push:", error);
    return { success: false, error: error.message };
  }
}

// deploys app to Kubernetes cluster
async function deployApp(imageName, port) {
  const deploymentManifest = {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: `${imageName}-deployment`,
    },
    spec: {
      replicas: 2,
      selector: {
        matchLabels: {
          app: `${imageName}-deployment`,
        },
      },
      template: {
        metadata: {
          labels: {
            app: `${imageName}-deployment`,
          },
        },
        spec: {
          containers: [
            {
              name: imageName,
              image: `us-central1-docker.pkg.dev/sent-deployment/quickstart-docker-repo/${imageName}:v1.0`,
              ports: [{ containerPort: parseInt(port, 10) }],
            },
          ],
        },
      },
    },
  };

  const kc = new k8s.KubeConfig();
  kc.loadFromFile("./config");
  const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);

  try {
    // creates deployment
    const response = await appsV1Api.createNamespacedDeployment({
      namespace: "default",
      body: deploymentManifest,
    });
    console.log("Deployment created:", response.body);
  } catch (error) {
    if (error.response?.code === 409) {
      console.log("Deployment already exists.");
    } else {
      console.error("Error creating deployment", error);
      throw error;
    }
  }
}

module.exports = {
  pushDockerImageToGCR: pushDockerImageToGCR,
  deployApp: deployApp,
};
