# GMT 458 - Assignment 2: GeoGame Design
## Project Title: "Geo-Dash" 🌍

### Project Objective
This document outlines the detailed design, features, and technical stack for the "Geo-Dash" game. This game is developed as the primary project for the **GMT 458 - Web GIS** course, designed to demonstrate proficiency in web mapping libraries (Leaflet.js) and asynchronous JavaScript to create a fully interactive web application.

---

### 1. Game Concept & Core Requirements

"Geo-Dash" is a fast-paced, "beat-the-clock" geography game. Players are challenged to correctly identify as many countries as possible on an interactive world map within a 60-second time limit.

**Core Requirements:**
* **Time-Based Challenge:** The game must be built around a 60-second countdown timer, which serves as the primary game mechanic.
* **Interactive Map:** The core UI component must be a full-screen interactive map (powered by Leaflet.js).
* **Core Game Loop:** The game will provide a country name (the "Target"), and the user must click on that country's polygon on the map.
* **Scoring System:** Each correct guess awards +1 point. The objective is to maximize the score before the time expires.
* **Data Source:** A `countries.geojson` file will be used to provide the geographic boundaries and country name data.
* **Hosting:** The final, completed application will be deployed and hosted live using GitHub Pages.

**Target Audience:**
* Casual players, students, or anyone interested in a quick and fun test of their world geography knowledge.

---

### 2. Frontend Layout & UI/UX Flow

The interface will be minimalist and clean ("minimal-distraction design"). The focus must remain entirely on the map and the core game elements (Target, Time, Score).

**UI Component Breakdown:**
1.  **Header Bar:** A static bar at the top of the screen displaying the three key pieces of game state information.
    * `Target: [COUNTRY NAME]`
    * `Time: 60`
    * `Score: 0`
2.  **Map Container:** A full-page container (`<div>`) holding the Leaflet map instance. This will occupy the majority of the viewport.
3.  **Modals (Pop-ups):**
    * **Start Modal:** A welcome screen with the game title and a "Start Game!" button.
    * **End Modal:** A game-over screen that appears when the timer hits 0, displaying the "Final Score" and a "Play Again?" button.

**User Flow (UX):**
1.  **On Load (Start Screen):** The user is greeted with the "Start Modal." In the background, the Leaflet map and the `countries.geojson` data are pre-loaded to ensure the game starts instantly when the button is clicked.
2.  **Game Start (Active Screen):** The user clicks "Start Game!":
    * The Start Modal fades out.
    * The Header Bar (Score, Time, Target) becomes visible.
    * The 60-second timer begins its countdown.
    * The first random target country is fetched and displayed.
3.  **Game Over (End Screen):** When the timer reaches 0:00:
    * All map click interactions are immediately disabled to prevent further guesses.
    * The "End Modal" fades in, displaying the Final Score.
    * Clicking "Play Again?" resets the timer, score, and re-starts the game loop.

**Layout Sketch (Wireframe):**
*A simple text-based wireframe for the main "Game Screen" is included below.*

```text
+-----------------------------------------------------------------+
| [Target: COUNTRY NAME]  |  [Time: 60]  |  [Score: 0]           |
+-----------------------------------------------------------------+
|                                                                 |
|                                                                 |
|                                                                 |
|                  [ M A P   C O N T A I N E R ]                  |
|                       (Leaflet.js Map)                          |
|                                                                 |
|                                                                 |
|                                                                 |
+-----------------------------------------------------------------+