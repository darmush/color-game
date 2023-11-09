import"./index.css";import"./assets/js/game-process.js";import{field,levelTimer,endLevel,createFirstLevel}from"./assets/js/game-process.js";const rootElement=document.documentElement,app=document.querySelector(".app"),startBtn=document.querySelector(".start-btn"),ruleseBtn=document.querySelector(".rules-btn"),rulesIcon=document.querySelector(".rules-icon"),scoreBtn=document.querySelector(".score-btn"),bestScoreText=document.querySelector(".best-score"),previousBestScoreText=document.querySelector(".previous-best-score"),themeBtn=document.querySelector(".theme-btn"),themeIcon=document.querySelector(".theme-icon"),rulesCloseBtn=document.querySelector(".rules-close-btn"),scoreCloseBtn=document.querySelector(".score-close-btn"),scoreIcon=document.querySelector(".score-icon"),gameOverCloseBtn=document.querySelector(".game-over-close-btn"),pauseBtn=document.querySelector(".pause-btn"),pauseCloseBtn=document.querySelector(".close-pause-btn");export const gameScreen=document.querySelector(".game-screen");export const gameOverScreen=document.querySelector(".game-over-screen");const mainScreen=document.querySelector(".main-screen"),pauseScreen=document.querySelector(".pause-screen"),rulesScreen=document.querySelector(".rules-screen"),scoreScreen=document.querySelector(".score-screen");let activeScreen=document.querySelector(".active-screen");function setLocalStorage(){!localStorage.getItem("bestScore")&&localStorage.setItem("bestScore",0),!localStorage.getItem("lastBestScore")&&localStorage.setItem("lastBestScore",0)}function openScoreWindow(){setLocalStorage(),bestScoreText.textContent=localStorage.getItem("bestScore"),previousBestScoreText.textContent=localStorage.getItem("lastBestScore")}function themeToggle(){rootElement.classList.toggle("dark"),rootElement.classList.contains("dark")?localStorage.theme="dark":localStorage.theme="light"}function pauseGame(){pauseBtn.classList.add("hidden"),pauseCloseBtn.classList.remove("hidden"),gameScreen.classList.remove("active-screen"),pauseScreen.classList.replace("hidden","active-screen"),activeScreen=document.querySelector(".active-screen"),field.classList.add("blur-[100px]","opacity-0","pointer-events-none"),levelTimer.pause()}function closePause(){pauseCloseBtn.classList.add("hidden"),pauseBtn.classList.remove("hidden"),gameScreen.classList.add("active-screen"),pauseScreen.classList.replace("active-screen","hidden"),activeScreen=document.querySelector(".active-screen"),field.classList.remove("blur-[100px]","opacity-0","pointer-events-none"),levelTimer.resume()}app.addEventListener("click",(e=>{switch(e.target){case startBtn:closeActiveScreen(gameScreen,mainScreen),createFirstLevel();break;case ruleseBtn:case rulesIcon:closeActiveScreen(rulesScreen,mainScreen);break;case scoreBtn:case scoreIcon:openScoreWindow(),closeActiveScreen(scoreScreen,mainScreen);break;case themeBtn:case themeIcon:themeToggle();break;case rulesCloseBtn:closeActiveScreen(mainScreen,rulesScreen);break;case scoreCloseBtn:closeActiveScreen(mainScreen,scoreScreen);break;case pauseBtn:pauseGame();break;case pauseCloseBtn:closePause();break;case gameOverCloseBtn:closeActiveScreen(mainScreen,gameOverScreen)}e.target.classList.contains("game-element")&&(e.target.classList.contains("target-element")?endLevel(!0):endLevel(!1))})),document.addEventListener("keydown",(e=>{if("Escape"==e.code)switch(activeScreen){case gameScreen:pauseGame();break;case pauseScreen:closePause();break;case rulesScreen:closeActiveScreen(mainScreen,rulesScreen);break;case scoreScreen:closeActiveScreen(mainScreen,scoreScreen);break;case gameOverScreen:closeActiveScreen(mainScreen,gameOverScreen)}})),setLocalStorage(),"dark"===localStorage.theme&&rootElement.classList.add("dark");export function closeActiveScreen(e,c){e.classList.replace("hidden","active-screen"),c.classList.replace("active-screen","hidden"),activeScreen=document.querySelector(".active-screen")}