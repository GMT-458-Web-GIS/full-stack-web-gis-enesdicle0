const express = require("express");
const cors = require("cors");

const app = express();
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
