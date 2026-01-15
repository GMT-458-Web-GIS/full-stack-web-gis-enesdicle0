const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");

const app = express();

/* ========= LOGS ========= */
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

const accessLogStream = fs.createWriteStream(path.join(logsDir, "access.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev"));

/* ========= MIDDLEWARE ========= */
app.use(cors());
app.use(express.json());

/* ========= FILE DB ========= */
const dbDir = path.join(__dirname, "db");
const usersFile = path.join(dbDir, "users.json");
const scoresFile = path.join(dbDir, "scores.json");

function ensureDb() {
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir);
  if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
  if (!fs.existsSync(scoresFile)) fs.writeFileSync(scoresFile, JSON.stringify([], null, 2));
}
ensureDb();

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return [];
  }
}
function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/* ========= SIMPLE AUTH (BONUS için yeterli) =========
   Token = "demo-" + username
   Authorization: Bearer demo-enes  gibi
*/
function auth(req, res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token || !token.startsWith("demo-")) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }
  const username = token.replace("demo-", "");
  req.user = { username, token };
  next();
}

/* ========= ROUTES ========= */

// Health
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Backend is running" });
});

// TEMP spatial endpoint (GeoJSON) — senin game.js bunu kullanıyor
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

// REGISTER
app.post("/auth/register", (req, res) => {
  const { username, password, role } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ ok: false, message: "username/password required" });
  }

  const users = readJson(usersFile);
  const exists = users.find(u => u.username === username);
  if (exists) return res.status(409).json({ ok: false, message: "User already exists" });

  const safeRole = role || "scout";
  users.push({ username, password, role: safeRole, createdAt: new Date().toISOString() });
  writeJson(usersFile, users);

  // register sonrası auto-login gibi dönelim
  const token = "demo-" + username;
  res.json({ ok: true, token, username, role: safeRole });
});

// LOGIN
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ ok: false, message: "username/password required" });
  }

  const users = readJson(usersFile);
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ ok: false, message: "Invalid credentials" });

  const token = "demo-" + username;
  res.json({ ok: true, token, username, role: user.role });
});

// SCORE SAVE
app.post("/api/score", auth, (req, res) => {
  const { score } = req.body || {};
  const numScore = Number(score);
  if (Number.isNaN(numScore)) return res.status(400).json({ ok: false, message: "score must be number" });

  const scores = readJson(scoresFile);
  scores.push({
    username: req.user.username,
    score: numScore,
    createdAt: new Date().toISOString()
  });
  writeJson(scoresFile, scores);

  res.json({ ok: true, message: "score saved" });
});

// SCORE LIST (opsiyonel)
app.get("/api/scores", (req, res) => {
  const scores = readJson(scoresFile);
  const top = scores.sort((a, b) => b.score - a.score).slice(0, 10);
  res.json({ ok: true, top });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
