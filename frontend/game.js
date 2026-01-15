/* ===========================
   LOGIN + SCORE BACKEND HOOKS
   =========================== */
const API_BASE = "http://localhost:3000";
const LOGIN_PAGE = "./login.html"; // login.html başka yerdeyse burayı düzelt

function requireLoginOrRedirect() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) {
    alert("Please login first!");
    window.location.href = LOGIN_PAGE;
    return false;
  }
  return true;
}

async function saveScoreToBackend(finalScore) {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return;

  try {
    await fetch(`${API_BASE}/api/score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ username, score: finalScore })
    });
  } catch (e) {
    console.error("Score save error:", e);
  }
}

/* ===========================
   YOUR ORIGINAL GAME CODE
   (UNTOUCHED except 2 inserts:
    - DOMContentLoaded login guard
    - endGame() saveScoreToBackend)
   =========================== */

// 1. TOKEN
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MDhlNDg5OS05MDkzLTQ2MmUtOTdhOS0wMWQ1NDRkZmVjZjgiLCJpZCI6MzYxNzU1LCJpYXQiOjE3NjM1NDIwOTN9.eBH9VcHpLS2eLavSYyexd-NdI2d_HIgtaJ7tZ5fJCOA";

// 2. SESLER
const backgroundMusic = new Audio("sounds/music.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;

// 3. VERİ
const rawGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      properties: { name: "Galatasaray", logo: "galatasaray.png", country_logo: "turkey.png" },
      geometry: { coordinates: [28.9918, 41.1038] }
    },
    {
      properties: { name: "Fenerbahçe", logo: "fenerbahce.png", country_logo: "turkey.png" },
      geometry: { coordinates: [29.0364, 40.9875] }
    },
    {
      properties: { name: "Beşiktaş", logo: "besiktas.png", country_logo: "turkey.png" },
      geometry: { coordinates: [28.9942, 41.0392] }
    },
    {
      properties: { name: "Trabzonspor", logo: "trabzonspor.png", country_logo: "turkey.png" },
      geometry: { coordinates: [39.6736, 41.0069] }
    },
    {
      properties: { name: "Başakşehir", logo: "basaksehir.png", country_logo: "turkey.png" },
      geometry: { coordinates: [28.8094, 41.0717] }
    },
    {
      properties: { name: "Real Madrid", logo: "real_madrid.png", country_logo: "spain.png" },
      geometry: { coordinates: [-3.6883, 40.4531] }
    },
    {
      properties: { name: "Bayern Munich", logo: "bayern_munich.png", country_logo: "germany.png" },
      geometry: { coordinates: [11.6248, 48.2188] }
    },
    {
      properties: { name: "B. Dortmund", logo: "borussia_dortmund.png", country_logo: "germany.png" },
      geometry: { coordinates: [7.4519, 51.4926] }
    },
    {
      properties: { name: "Liverpool", logo: "liverpool.png", country_logo: "england.png" },
      geometry: { coordinates: [-2.9608, 53.4308] }
    },
    {
      properties: { name: "AC Milan", logo: "ac_milan.png", country_logo: "italy.png" },
      geometry: { coordinates: [9.1238, 45.4781] }
    },
    {
      properties: { name: "Inter Milan", logo: "inter_milan.png", country_logo: "italy.png" },
      geometry: { coordinates: [9.1238, 45.4781] }
    },
    {
      properties: { name: "PSG", logo: "paris_saint-germain.png", country_logo: "france.png" },
      geometry: { coordinates: [2.253, 48.8414] }
    },
    {
      properties: { name: "Man. City", logo: "manchester_city.png", country_logo: "england.png" },
      geometry: { coordinates: [-2.2004, 53.4831] }
    },
    {
      properties: { name: "Chelsea", logo: "chelsea.png", country_logo: "england.png" },
      geometry: { coordinates: [-0.191, 51.4817] }
    },
    {
      properties: { name: "Barcelona", logo: "barcelona.png", country_logo: "spain.png" },
      geometry: { coordinates: [2.1228, 41.3809] }
    },
    {
      properties: { name: "Juventus", logo: "juventus.png", country_logo: "italy.png" },
      geometry: { coordinates: [7.6413, 45.1097] }
    },
    {
      properties: { name: "Atl. Madrid", logo: "atletico_madrid.png", country_logo: "spain.png" },
      geometry: { coordinates: [-3.599, 40.4363] }
    },
    {
      properties: { name: "Benfica", logo: "benfica.png", country_logo: "portugal.png" },
      geometry: { coordinates: [-9.1849, 38.7526] }
    },
    {
      properties: { name: "Ajax", logo: "ajax.png", country_logo: "netherlands.png" },
      geometry: { coordinates: [4.9416, 52.3144] }
    },
    {
      properties: { name: "Leverkusen", logo: "bayer_leverkusen.png", country_logo: "germany.png" },
      geometry: { coordinates: [7.0021, 51.0382] }
    },
    {
      properties: { name: "Sporting CP", logo: "sporting_cp.png", country_logo: "portugal.png" },
      geometry: { coordinates: [-9.1608, 38.7611] }
    },
    {
      properties: { name: "Copenhagen", logo: "fc_copenhagen.png", country_logo: "denmark.png" },
      geometry: { coordinates: [12.5719, 55.7028] }
    },
    {
      properties: { name: "PSV", logo: "psv_eindhoven.png", country_logo: "netherlands.png" },
      geometry: { coordinates: [5.4678, 51.4417] }
    },
    {
      properties: { name: "Celtic", logo: "celtic.png", country_logo: "scotland.png" },
      geometry: { coordinates: [-4.2055, 55.8497] }
    },
    {
      properties: { name: "Marseille", logo: "marseille.png", country_logo: "france.png" },
      geometry: { coordinates: [5.3958, 43.2699] }
    }
  ]
};

let teams = [];
let viewer;
let score = 0,
  radarCount = 2,
  flagCount = 2;
let questionTimer,
  globalTimer;
let questionTimeLeft = 20,
  totalGameTimeLeft = 120;
let currentTeamIndex = 0;
let isGameActive = false;
let radarEntity = null;

const ui = {
  preIntro: document.getElementById("pre-intro-screen"),
  videoIntro: document.getElementById("video-intro-screen"),
  introVideo: document.getElementById("intro-video"),
  mainMenu: document.getElementById("main-menu"),
  gameUI: document.getElementById("main-game-wrapper"),
  header: document.querySelector(".header-bar"),
  bottomBar: document.getElementById("bottom-controls-bar"),
  gameOver: document.getElementById("game-over-screen"),

  enterBtn: document.getElementById("start-experience-btn"),
  startBtn: document.getElementById("menu-start-btn"),
  kickOffBtn: document.getElementById("start-button"),
  radarBtn: document.getElementById("radar-btn"),
  flagBtn: document.getElementById("flag-btn"),
  restartBtn: document.getElementById("restart-button"),

  teamName: document.getElementById("team-name"),
  teamLogo: document.getElementById("team-logo"),
  score: document.getElementById("score"),
  timer: document.getElementById("timer"),
  globalTimer: document.getElementById("global-timer"),
  result: document.getElementById("result-text"),
  radarCount: document.getElementById("radar-count"),
  flagCount: document.getElementById("flag-count"),
  hintImg: document.getElementById("country-hint-logo"),
  flagContainer: document.getElementById("flag-container"),
  finalScore: document.getElementById("final-score"),
  flash: document.getElementById("feedback-flash")
};

// BAŞLATMA AKIŞI
document.addEventListener("DOMContentLoaded", () => {
  // ✅ INSERT 1: login guard
  if (!requireLoginOrRedirect()) return;

  initCesium();

  // 1. "ENTER THE ARENA" BUTONU
  ui.enterBtn.addEventListener("click", () => {
    ui.preIntro.style.display = "none";
    ui.videoIntro.style.display = "block";

    // Video Başlat
    ui.introVideo.play();

    // Video Bitince
    ui.introVideo.onended = () => {
      ui.videoIntro.style.display = "none";
      ui.mainMenu.style.display = "flex";
    };
  });

  ui.startBtn.addEventListener("click", prepareGame);
  ui.kickOffBtn.addEventListener("click", startGameLoop);
  ui.restartBtn.addEventListener("click", () => location.reload());
  ui.radarBtn.addEventListener("click", useRadarHint);
  ui.flagBtn.addEventListener("click", useFlagHint);
});

async function initCesium() {
  viewer = new Cesium.Viewer("cesiumContainer", {
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    vrButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false
  });

  // ✅ load POIs from backend (optional, but you already added this)
  Cesium.GeoJsonDataSource.load(`${API_BASE}/api/pois`, { clampToGround: true })
    .then((dataSource) => {
      viewer.dataSources.add(dataSource);
      // viewer.zoomTo(dataSource); // istersen açık kalsın
    })
    .catch((error) => {
      console.error("GeoJSON load error:", error);
    });

  viewer._cesiumWidget._creditContainer.style.display = "none";
  try {
    const imagery = new Cesium.IonImageryProvider({ assetId: 2 });
    viewer.imageryLayers.addImageryProvider(imagery);
  } catch (e) {}

  viewer.scene.screenSpaceCameraController.minimumZoomDistance = 50000;
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(15, 48, 20000000)
  });

  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(
    function (click) {
      if (isGameActive && questionTimeLeft > 0) {
        const position = viewer.scene.camera.pickEllipsoid(click.position);
        if (position) checkAnswer(position);
      }
    },
    Cesium.ScreenSpaceEventType.LEFT_CLICK
  );
}

function prepareGame() {
  ui.mainMenu.style.display = "none";
  ui.gameUI.style.display = "flex";
  ui.header.style.display = "flex";
  ui.bottomBar.style.display = "flex";

  teams = [
    ...rawGeoJSON.features.map((f) => ({
      name: f.properties.name,
      logo: f.properties.logo,
      country_logo: f.properties.country_logo,
      lat: f.geometry.coordinates[1],
      lon: f.geometry.coordinates[0]
    }))
  ];
  teams.sort(() => Math.random() - 0.5);

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(15, 48, 15000000),
    duration: 2
  });

  ui.teamName.innerText = "CLICK KICK OFF";
  ui.teamLogo.style.display = "none";
  ui.kickOffBtn.style.display = "inline-block";
  ui.radarBtn.disabled = true;
  ui.flagBtn.disabled = true;
}

function startGameLoop() {
  currentTeamIndex = 0;
  score = 0;
  radarCount = 2;
  flagCount = 2;
  totalGameTimeLeft = 120;
  isGameActive = true;

  ui.score.innerText = score;
  ui.radarCount.innerText = radarCount;
  ui.flagCount.innerText = flagCount;
  ui.globalTimer.innerText = totalGameTimeLeft;

  ui.kickOffBtn.style.display = "none";
  ui.radarBtn.disabled = false;
  ui.flagBtn.disabled = false;

  try {
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
  } catch (e) {}

  startGlobalTimer();
  nextQuestion();
}

function startGlobalTimer() {
  clearInterval(globalTimer);
  globalTimer = setInterval(() => {
    totalGameTimeLeft--;
    ui.globalTimer.innerText = totalGameTimeLeft;
    if (totalGameTimeLeft <= 0) endGame();
  }, 1000);
}

function nextQuestion() {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(15, 48, 12000000),
    duration: 1.5
  });
  viewer.entities.removeAll();
  radarEntity = null;

  if (currentTeamIndex >= teams.length) {
    endGame();
    return;
  }

  const team = teams[currentTeamIndex];
  ui.teamName.innerText = team.name;
  ui.teamLogo.src = "images/" + team.logo;
  ui.teamName.style.display = "block";
  ui.teamLogo.style.display = "block";
  ui.result.style.display = "none";
  ui.flagContainer.style.display = "none";

  startQuestionTimer();
}

function startQuestionTimer() {
  questionTimeLeft = 20;
  ui.timer.innerText = questionTimeLeft;
  clearInterval(questionTimer);
  questionTimer = setInterval(() => {
    questionTimeLeft--;
    ui.timer.innerText = questionTimeLeft;
    if (questionTimeLeft <= 0) {
      clearInterval(questionTimer);
      checkAnswer(null);
    }
  }, 1000);
}

function checkAnswer(clickPosition) {
  clearInterval(questionTimer);
  const team = teams[currentTeamIndex];
  const correctPos = Cesium.Cartesian3.fromDegrees(team.lon, team.lat);
  let points = 0;

  viewer.entities.add({
    position: correctPos,
    point: {
      pixelSize: 15,
      color: Cesium.Color.GREEN,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2
    }
  });

  if (clickPosition) {
    const start = Cesium.Cartographic.fromCartesian(clickPosition);
    const end = Cesium.Cartographic.fromDegrees(team.lon, team.lat);
    const geodesic = new Cesium.EllipsoidGeodesic(start, end);
    const distanceKm = geodesic.surfaceDistance / 1000;

    if (distanceKm < 25) points = 300;
    else if (distanceKm < 100) points = 200;
    else if (distanceKm < 600) points = 100;

    viewer.entities.add({
      position: clickPosition,
      point: {
        pixelSize: 10,
        color: Cesium.Color.YELLOW,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2
      }
    });
    viewer.entities.add({
      polyline: {
        positions: [clickPosition, correctPos],
        width: 2,
        material: new Cesium.PolylineDashMaterialProperty({
          color: Cesium.Color.CYAN
        })
      }
    });

    ui.result.innerText = `DIST: ${Math.round(distanceKm)}km (+${points} PTS)`;
    ui.result.style.color = points > 0 ? "#00ff00" : "#ff0000";

    ui.flash.className = points > 0 ? "flash-green" : "flash-red";
    setTimeout(() => (ui.flash.className = ""), 500);
  } else {
    ui.result.innerText = "TIME'S UP!";
    ui.result.style.color = "#ff0000";
    ui.flash.className = "flash-red";
    setTimeout(() => (ui.flash.className = ""), 500);
  }

  score += points;
  ui.score.innerText = score;
  ui.result.style.display = "block";

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(team.lon, team.lat, 3000000),
    duration: 2
  });
  currentTeamIndex++;
  setTimeout(nextQuestion, 4000);
}

function useRadarHint() {
  if (radarCount > 0 && questionTimeLeft > 0 && !radarEntity) {
    radarCount--;
    ui.radarCount.innerText = radarCount;
    const team = teams[currentTeamIndex];
    radarEntity = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(team.lon, team.lat),
      ellipse: {
        semiMinorAxis: 500000.0,
        semiMajorAxis: 500000.0,
        material: Cesium.Color.GREEN.withAlpha(0.3),
        outline: true,
        outlineColor: Cesium.Color.GREEN
      }
    });
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(team.lon, team.lat, 8000000),
      duration: 2
    });
    score = Math.max(0, score - 10);
    ui.score.innerText = score;
    if (radarCount === 0) ui.radarBtn.disabled = true;
  }
}

function useFlagHint() {
  if (flagCount > 0 && questionTimeLeft > 0) {
    flagCount--;
    ui.flagCount.innerText = flagCount;
    const team = teams[currentTeamIndex];
    ui.hintImg.src = "images/" + team.country_logo;
    ui.flagContainer.style.display = "block";
    ui.hintImg.style.display = "block";
    score = Math.max(0, score - 5);
    ui.score.innerText = score;
    if (flagCount === 0) ui.flagBtn.disabled = true;
  }
}

function endGame() {
  isGameActive = false;
  clearInterval(globalTimer);
  clearInterval(questionTimer);
  backgroundMusic.pause();
  ui.gameOver.style.display = "flex";
  ui.finalScore.innerText = score;

  // ✅ INSERT 2: save score to backend
  saveScoreToBackend(score);

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(15, 48, 20000000)
  });
}
