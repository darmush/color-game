import "./index.css"
import "./assets/js/game-process.js"
import { field, levelTimer, endLevel, createFirstLevel } from "./assets/js/game-process.js"

const rootElement = document.documentElement
const app = document.querySelector('.app')
const startBtn = document.querySelector('.start-btn')
const ruleseBtn = document.querySelector('.rules-btn')
const rulesIcon = document.querySelector('.rules-icon')
const scoreBtn = document.querySelector('.score-btn')
const bestScoreText = document.querySelector('.best-score')
const previousBestScoreText = document.querySelector('.previous-best-score')
const themeBtn = document.querySelector('.theme-btn')
const themeIcon = document.querySelector('.theme-icon')
const rulesCloseBtn = document.querySelector('.rules-close-btn')
const scoreCloseBtn = document.querySelector('.score-close-btn')
const scoreIcon = document.querySelector('.score-icon')
const gameOverCloseBtn = document.querySelector('.game-over-close-btn')
const pauseBtn = document.querySelector('.pause-btn')
const pauseCloseBtn = document.querySelector('.close-pause-btn')
export const gameScreen = document.querySelector('.game-screen')
export const gameOverScreen = document.querySelector('.game-over-screen')
const mainScreen = document.querySelector('.main-screen')
const pauseScreen = document.querySelector('.pause-screen')
const rulesScreen = document.querySelector('.rules-screen')
const scoreScreen = document.querySelector('.score-screen')

let activeScreen = document.querySelector('.active-screen')

window.onload = function() {
    app.removeAttribute('style')
}

app.addEventListener('click', element => {
    switch (element.target) {
        case startBtn:
            closeActiveScreen(gameScreen, mainScreen)
            createFirstLevel()
            break
        case ruleseBtn:
        case rulesIcon:
            closeActiveScreen(rulesScreen, mainScreen)
            break
        case scoreBtn:
        case scoreIcon:
            openScoreWindow()
            closeActiveScreen(scoreScreen, mainScreen)
            break
        case themeBtn:
        case themeIcon:
            themeToggle()
            break
        case rulesCloseBtn:
            closeActiveScreen(mainScreen, rulesScreen)
            break
        case scoreCloseBtn:
            closeActiveScreen(mainScreen, scoreScreen)
            break
        case pauseBtn:
            pauseGame()
            break
        case pauseCloseBtn:
            closePause()
            break
        case gameOverCloseBtn:
            closeActiveScreen(mainScreen, gameOverScreen)
            break
        default:
            break
    }

    if (element.target.classList.contains('game-element')) {
        element.target.classList.contains('target-element') ? endLevel(true) : endLevel(false)
    }
})

document.addEventListener('keydown', event => {
    if (event.code == 'Escape') {
        switch (activeScreen) {
            case gameScreen:
                pauseGame()
                break
            case pauseScreen:
                closePause()
                break
            case rulesScreen:
                closeActiveScreen(mainScreen, rulesScreen)
                break
            case scoreScreen:
                closeActiveScreen(mainScreen, scoreScreen)
                break
            case gameOverScreen:
                closeActiveScreen(mainScreen, gameOverScreen)
                break
        }
    }
})

function setLocalStorage() {
    !localStorage.getItem('bestScore') ? localStorage.setItem('bestScore', 0) : 0
    !localStorage.getItem('lastBestScore') ? localStorage.setItem('lastBestScore', 0) : 0
}
setLocalStorage()

function openScoreWindow() {
    setLocalStorage()
    bestScoreText.textContent = localStorage.getItem('bestScore')
    previousBestScoreText.textContent = localStorage.getItem('lastBestScore')
}

function themeToggle() {
    rootElement.classList.toggle('dark')
    rootElement.classList.contains('dark') ? localStorage.theme = 'dark' : localStorage.theme = 'light'
}

if (localStorage.theme === 'dark') {
    rootElement.classList.add('dark')
}

function pauseGame() {
    pauseBtn.classList.add('hidden')
    pauseCloseBtn.classList.remove('hidden')
    gameScreen.classList.remove('active-screen')
    pauseScreen.classList.replace('hidden', 'active-screen')
    activeScreen = document.querySelector('.active-screen')
    field.classList.add('blur-[100px]', 'opacity-0', 'pointer-events-none')
    levelTimer.pause()
}

function closePause() {
    pauseCloseBtn.classList.add('hidden')
    pauseBtn.classList.remove('hidden')
    gameScreen.classList.add('active-screen')
    pauseScreen.classList.replace('active-screen', 'hidden')
    activeScreen = document.querySelector('.active-screen')
    field.classList.remove('blur-[100px]', 'opacity-0', 'pointer-events-none')
    levelTimer.resume()
}

export function closeActiveScreen(doVisible, doHidden) {
    doVisible.classList.replace('hidden', 'active-screen')
    doHidden.classList.replace('active-screen', 'hidden')
    activeScreen = document.querySelector('.active-screen')
}
