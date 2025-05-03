const services = require("./services.js");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const util = require("util");

const { exec } = require("child_process");
const execAsync = util.promisify(exec);

const app = express();
const port = 8000; // || process.env.PORT

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.use(express.json()); // To parse JSON bodies
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    // Generate a unique filename to avoid conflicts
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  // check if a file was uploaded and text was provided
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a file." });
  }
  if (!req.body.endpoint) {
    return res.status(400).json({ error: "Please provide an endpoint." });
  }

  // access the uploaded file and text data
  console.log("Uploaded File:", req.file.filename);
  console.log(`Image name: ${req.body.imageName}:${req.body.imageTag}`);
  console.log("Endpoint:", req.body.endpoint);
  //   console.log("Port:", req.body.port);

  // load docker image from tar
  console.log("Loading docker image...");
  const loadCommand = `docker load --input ${req.file.path}`;
  var { stdout, stderr } = await execAsync(loadCommand);

  console.log(stderr);

  // get image name and tag from docker output
  const parts = stdout.split(": ");
  const imageNameWithTag = parts[1];
  const imageNameParts = imageNameWithTag.split(":");

  const imageName = imageNameParts[0];
  const imageTag = imageNameParts[1].trim();

  console.log(`Pushing docker image ${imageName}:${imageTag}...`);

  // send file to GCR
  const pushResult = await services.pushDockerImageToGCR(imageName, imageTag);
  console.log(pushResult);

  // deploy to cluster
  const ip = await services.deployApp(
    imageName,
    // req.body.port,
    pushResult.time
  );

  res.status(200).json({
    message: "File uploaded, pushed, and deployed successfully!",
    ip: ip,
    imageName: `${imageName}${pushResult.time}`,
  });
});

app.post("/delete", async (req, res) => {
  const deleteResponse = await services.deleteDeployment(req.body.imageName);
  res.status(200).json({
    deleteResponse,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
