const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;

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

// Define the /predict endpoint, handling file and text data
app.post("/predict", upload.single("file"), (req, res) => {
  // Check if a file was uploaded and text was provided
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a file." });
  }
  if (!req.body.text) {
    return res.status(400).json({ error: "Please provide text input." });
  }

  // Access the uploaded file and text data
  const uploadedFile = req.file;
  const textInput = req.body.text;

  // Process the file and text data (replace with your actual prediction logic)
  console.log("Uploaded File:", uploadedFile);
  console.log("Text Input:", textInput);

  // Simulate a prediction result
  const predictionResult = {
    result: `Prediction: Successfully processed file ${uploadedFile.originalname} and text: ${textInput}`,
    fileName: uploadedFile.filename,
    fileSize: uploadedFile.size,
    textLength: textInput.length,
    // Add more result data as needed
  };

  // Send the prediction result as JSON
  res.status(200).json(predictionResult);
});

// Serve static files from the 'uploads' directory (optional, for accessing uploaded files)
app.use("/uploads", express.static("uploads"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
