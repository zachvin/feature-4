/**
 * WARNING: This script is intended for a Node.js backend environment and requires
 * the Google Cloud CLI (gcloud) to be installed and configured with the necessary
 * credentials to push Docker images to Google Container Registry (GCR) or
 * Artifact Registry.
 *
 * This script programmatically executes the 'docker push' command using Node.js's
 * 'child_process' module. It does NOT use the GKE API directly for image uploads,
 * as GKE pulls images from registries.
 */

const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec);

async function pushDockerImageToGCR(imageName, imageNameWithTag) {
  try {
    // tag image
    console.log("Attempting to tag image...");
    const tagCommand = `docker tag ${imageName}:v1.0 ${imageNameWithTag}`;
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

// TODO
// get image name and tag from user
// standardize tags prior to deployment
const imageName = "test-image";

const fullImageName = `us-central1-docker.pkg.dev/sent-deployment/quickstart-docker-repo/${imageName}:v1.0`;

async function main() {
  const result = await pushDockerImageToGCR(imageName, fullImageName);
  console.log(result);
}

// Only run if executed directly
if (require.main === module) {
  main();
}
