# Full-Stack Web GIS Application – Final Project (GMT458)

This repository contains a Full-Stack Web GIS application developed as the final project for the GMT458 – Web GIS course. The project extends the previously developed GeoGame into a full-stack architecture by integrating backend services, authentication, logging, and persistent data storage.

The application is deployed on Amazon Web Services (AWS) using an EC2 instance and is publicly accessible via an Apache HTTP Server.

Live Application URL:
http://3.121.201.89

If the page does not load immediately due to browser caching, please try:
http://3.121.201.89/?v=1

---

Project Description

This project demonstrates how a Web GIS application can be transformed into a full-stack system by combining a static frontend, a backend REST API, and basic user management. The application follows a game-based GIS concept where users interact with spatial data and submit scores.

The frontend is served as a static website, while the backend provides authentication and score management services.

---

Implemented Features (Final Project)

Managing Different User Types
- Scout (Player): Can log in, play the game, and submit scores.
- Commander: Planned / Optional.
- Sultan (Admin): Planned / Optional.

User roles are assigned during registration and stored in the backend.

Authentication and Authorization
- User registration and login are implemented.
- Token-based session handling is used.
- Only authenticated users can access the game and submit scores.

CRUD Operations
- Create: Users are created during registration; scores are created when a game session ends.
- Read: Users and scores can be retrieved via API endpoints.
- Update and Delete operations are limited due to project scope.

Backend API Development
A RESTful API is implemented using Node.js and Express.

Available endpoints:
- POST /auth/register
- POST /auth/login
- POST /api/score
- GET /api/scores

Logging
- HTTP request logging is implemented using Morgan.
- All incoming requests are recorded in an access log file located at:
  backend/logs/access.log

NoSQL / File-Based Database
- A lightweight JSON-based storage approach is used.
- users.json stores registered users.
- scores.json stores submitted game scores.
- These files act as a simple NoSQL-style database for the project.

---

Project Structure

full-stack-web-gis-enesdicle0/
├── backend/
│   ├── routes/
│   ├── logs/
│   │   └── access.log
│   ├── users.json
│   ├── scores.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── game.js
│   ├── style.css
│   ├── images/
│   ├── sounds/
│   ├── coordinates.csv
│   └── teams.geojson
└── README.md

---

Deployment Environment

Cloud Provider: Amazon Web Services (AWS)  
Service: EC2  
Operating System: Amazon Linux 2023  
Web Server: Apache HTTP Server (httpd)  
Protocol: HTTP (Port 80)

---

Deployment Summary

An EC2 instance was created on AWS and configured with Apache HTTP Server. The frontend files were deployed under Apache’s DocumentRoot directory. The default Apache welcome page was disabled to ensure that the custom application content is served correctly. EC2 Security Group rules were configured to allow inbound HTTP traffic on port 80 and SSH access for server management.

---

Local Development

For local development and testing, the frontend can be opened using Visual Studio Code with the Live Server extension by opening the frontend/index.html file. The backend can be run locally using Node.js if required.

---

Notes

- Browser cache may require a hard refresh after deployment.
- HTTPS is not enabled; the application is served over HTTP.
- The backend architecture is designed for educational purposes and can be extended with a real database system.

---

Author

Enes Dicle  
GMT458 – Web GIS  
Hacettepe University
