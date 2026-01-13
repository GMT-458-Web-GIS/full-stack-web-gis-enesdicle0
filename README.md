# Cesium GeoGame – Full Stack Web GIS Project

This project is a Cesium-based interactive GeoGame that has been extended into a **full-stack Web GIS application**.

Originally developed as a standalone frontend game, the project was enhanced by introducing a **Node.js + Express backend** that serves spatial data dynamically using **GeoJSON** via a RESTful API.

## 🚀 Project Features

- 🌍 **3D Web GIS Frontend**
  - Built with CesiumJS
  - Interactive globe and spatial visualization
  - Game mechanics based on geographical knowledge

- 🧠 **Backend API**
  - Developed using Node.js and Express
  - Provides GeoJSON data through REST endpoints
  - Example endpoint: `/api/pois`

- 🔗 **Frontend–Backend Integration**
  - Frontend dynamically fetches spatial data from the backend
  - GeoJSON data is rendered directly in Cesium using `GeoJsonDataSource`

- 🗂️ **Version Control**
  - Project managed with Git and GitHub
  - Development process tracked through multiple meaningful commits

## 🛠️ Technologies Used

- **Frontend:** CesiumJS, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Data Format:** GeoJSON
- **Tools:** Git, GitHub, VS Code

## ▶️ How to Run the Project

### Backend
```bash
cd backend
npm install
npm run dev
