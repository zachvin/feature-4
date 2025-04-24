// import { deployApp, pushDockerImageToGCR } from "./services.js";

const services = require("./services.js");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
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
  const uploadedFile = req.file;
  const endpoint = req.body.endpoint;

  console.log("Uploaded File:", uploadedFile.filename);
  console.log(`Image name: ${req.body.imageName}:${req.body.imageTag}`);
  console.log("Endpoint:", endpoint);
  console.log("Port:", req.body.port);

  // save file to local storage
  //   const destinationPath = `uploads/${uploadedFile.originalname}`;
  //   await fs.rename(uploadedFile.path, destinationPath);

  // load docker image from tar
  // docker load --input fedora.tar
  const loadCommand = `docker load --input ${uploadedFile.path}`;
  var { stdout, stderr } = await execAsync(loadCommand);

  console.log(stdout);
  console.log(stderr);

  // send file to GCR
  const pushResult = await services.pushDockerImageToGCR(
    req.body.imageName,
    "latest"
    // req.body.imageTag
  );
  console.log(pushResult);

  // deploy to cluster
  const deployResult = await services.deployApp(
    req.body.imageName,
    req.body.port
  );
  console.log(deployResult);

  res.status(200).json({
    message: "File uploaded, pushed, and deployed successfully!",
    pushResult,
    deployResult,
    // savedFilePath: destinationPath,
  });
});

// Serve static files from the 'uploads' directory (optional, for accessing uploaded files)
// app.use("/uploads", express.static("uploads"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
