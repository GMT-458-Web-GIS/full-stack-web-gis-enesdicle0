const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const express = require("express");
const cors = require("cors");

const app = express();

const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

const accessLogStream = fs.createWriteStream(
  path.join(logsDir, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev")); // terminale de yazsın

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Backend is running" });
});

// TEMP spatial endpoint (GeoJSON)
app.get("/api/pois", (req, res) => {
  res.json({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [32.733, 39.871] },
        properties: { id: 1, name: "Sample POI", category: "demo" }
      }
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`API running on http://localhost:${PORT}`)
);
