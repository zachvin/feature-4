const k8s = require("@kubernetes/client-node");

async function deployApp(kubeconfigPath, deploymentManifest) {
  // deploymentManifest is a JavaScript object
  const kc = new k8s.KubeConfig();
  kc.loadFromFile(kubeconfigPath); // Or use loadFromCluster()
  const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);

  try {
    // Attempt to create a deployment.  If it exists, you would typically
    // update it instead, but for simplicity, this example creates.
    const response = await appsV1Api.createNamespacedDeployment({
      namespace: "default",
      body: deploymentManifest,
    });
    console.log("Deployment created:", response.body);
  } catch (error) {
    if (error.response?.statusCode === 409) {
      console.log("Deployment already exists.");
      //Here you would implement logic to update the deployment.
    } else {
      console.error("Error creating deployment", error);
      throw error;
    }
  }
}

// Example usage:
const deploymentManifest = {
  apiVersion: "apps/v1",
  kind: "Deployment",
  metadata: {
    name: "orange-deployment",
  },
  spec: {
    replicas: 2,
    selector: {
      matchLabels: {
        app: "new-deployment",
      },
    },
    template: {
      metadata: {
        labels: {
          app: "new-deployment",
        },
      },
      spec: {
        containers: [
          {
            name: "test-image",
            image:
              "us-central1-docker.pkg.dev/sent-deployment/quickstart-docker-repo/test-image:v1.0", // Your Docker image
            ports: [{ containerPort: 8080 }],
          },
        ],
      },
    },
  },
};

async function main() {
  const kubeconfigPath = "config";
  await deployApp(kubeconfigPath, deploymentManifest);
}

main();
