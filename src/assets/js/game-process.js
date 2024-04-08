import levelProgressionArray from './level-progression.json'
import { gameScreen, gameOverScreen, closeActiveScreen } from '../../index.js'

export const field = document.querySelector('.field')
const recordTextItem = document.querySelector('.record-text')
const scoreItem = document.querySelector('.score-item')
const bestScoreItem = document.querySelector('.best-score-item')
const scoreGameOver = document.querySelector('.game-over-score')
const bestScoreGameOver = document.querySelector('.game-over-best-score')
const bestScoreTextGameOver = document.querySelector('.game-over-best-score-text')
const lastBestScoreGameOver = document.querySelector('.game-over-last-best-score')
const lastBestScoreTextGameOver = document.querySelector('.game-over-last-best-score-text')
const heartsPanel = document.querySelector('.hearts-panel')
const timerItem = document.querySelector('.timer')
const levelProgression = levelProgressionArray.levelProgression
const heartsCount = levelProgressionArray.heartsCount

let hearts = document.querySelectorAll('.heart-icon')
let score
let bestScore
let lastBestScore
let time
let currentTime
let targetElement
let colorDifference
let levelDelay
export let levelTimer

export function createFirstLevel() {
    score = 0
    setScore(scoreItem, bestScoreItem)
    createHearts()
    createLevel()
}

// Принимает HTML элементы и значение false (в этот элемент ничего не будет записано)
function setScore(scoreVar, bestScoreVar, lastBestScoreVar) {
    if (scoreVar) {
        scoreVar.textContent = score
    }
    if (bestScoreVar) {
        bestScore = localStorage.getItem('bestScore')
        bestScoreVar.textContent = bestScore
    }
    if (lastBestScoreVar) {
        lastBestScore = localStorage.getItem('lastBestScore')
        lastBestScoreVar.textContent = lastBestScore
    }
}

function createLevel() {
    // Определяет уровень сложности (после каждых 5 успешно пройденных игровых уровня поднимается сложность), количество элементов и числовое значение разницы цветов
    // Если уровень сложности выше, чем прописанно в levelProgression, берёт максимальный
    let difficultyLevel = (Math.ceil(score/5) || 1)
    difficultyLevel = difficultyLevel > levelProgression.length ? levelProgression.length : difficultyLevel
    const elementCount =  levelProgression[difficultyLevel - 1].elementsCount
    colorDifference = levelProgression[difficultyLevel - 1].colorDifference
    // Создаёт игровое поле. Задаёт время и создаёт таймер
    const gridValue = Math.sqrt(elementCount)
    field.style.gridTemplateColumns = `repeat(${gridValue}, 1fr)`
    field.style.gridTemplateRows = `repeat(${gridValue}, 1fr)`
    createGameElement(elementCount)
    time = levelProgression[difficultyLevel - 1].time
    setTime(time)
    levelTimer = new Timer()
}

function createGameElement(elementCount) {
    // Получает массив из 2 цветов
    let colorsArray = getRandomColors(colorDifference)
    let color = colorsArray[0]
    let targetColor = colorsArray[1]
    // Создаёт игровые элементы цели и заполняет ими игровое поле
    for (let i = 0; i < elementCount; i++) {
        let gameElement = document.createElement('div')
        gameElement.classList.add('game-element', 'rounded-full', 'cursor-pointer')
        gameElement.style.background = color
        field.append(gameElement)
    }
    let gameElements = document.querySelectorAll('.game-element')
    // Задаёт цвет для "правильной" цели
    gameElements[getRandomNum(0, elementCount - 1)].classList.add('target-element')
    targetElement = document.querySelector('.target-element')
    targetElement.style.backgroundColor = targetColor
}

function createHearts() {
    if (hearts.length == 0) {
        for (let i = 0; i < heartsCount; i++) {
            let heartElement = document.createElement('img')
            let srcHeart = require('../icons/heart-icon.svg')
            heartElement.classList.add('heart-icon')
            heartElement.setAttribute('src', srcHeart)
            heartElement.setAttribute('alt', 'heart icon')
            heartsPanel.append(heartElement)
        }
    }
    hearts = document.querySelectorAll('.heart-icon')
}

// Принимает true (клик по цели, счётчик уровней растёт) и false (клик мимо цели, потеря жизни) значения
export function endLevel(isTarget) {
    levelTimer.clear()
    // Создаёт обводку для выделения "правильной" цели
    targetElement.classList.add('border-4', 'sm:border-8', 'border-black', 'dark:border-white', 'z-10')
    isTarget ? score++ : lossHeart()
    score > bestScore ? localStorage.setItem('bestScore', score) : 0
    setScore(scoreItem)
    // Создаёт задержку. Блокирует клик по игровому полю на время, пока будет отображаться обводка "правильной" цели
    field.classList.add('pointer-events-none')
    levelDelay = setTimeout(() => {
        field.innerHTML = ''
        field.classList.remove('pointer-events-none')
        heartsCheck()
    }, 500)
}

function lossHeart() {
    if (hearts.length > 0 ) {
        hearts[hearts.length - 1].remove()
        hearts = document.querySelectorAll('.heart-icon')
    }
}

function heartsCheck() {
    // Удаляет задержку, которая была создана в конце уровня
    clearTimeout(levelDelay)
    if (hearts.length < 1) {
        finishGame()
    } else {
        createLevel()
    }
}

function finishGame() {
    levelTimer.clear()
    closeActiveScreen(gameOverScreen, gameScreen)
    // Показывает объявление о новом рекорде
    if (score > bestScore) {
        recordTextItem.classList.remove('hidden')
        bestScoreTextGameOver.classList.add('hidden')
        lastBestScoreTextGameOver.classList.remove('hidden')
        localStorage.setItem('lastBestScore', bestScore)
        setScore(scoreGameOver, false, lastBestScoreGameOver)
    // Если счёт меньше рекорда, но больше предыдущего рекорда, обновляет последний рекорд
    } else if (score > localStorage.getItem('lastBestScore') && score != bestScore) {
        recordTextItem.classList.add('hidden')
        bestScoreTextGameOver.classList.remove('hidden')
        lastBestScoreTextGameOver.classList.add('hidden')
        localStorage.setItem('lastBestScore', score)
        setScore(scoreGameOver, bestScoreGameOver)
    } else {
        recordTextItem.classList.add('hidden')
        bestScoreTextGameOver.classList.remove('hidden')
        lastBestScoreTextGameOver.classList.add('hidden')
        setScore(scoreGameOver, bestScoreGameOver)
    }
}

class Timer {
    constructor() {
        let delay = time * 1000,
            timer,
            start
        this.clear = function () {
            clearInterval(timer)
        }
        this.pause = function () {
            this.clear()
            delay -= new Date() - start
        }
        this.resume = function () {
            start = new Date()
            timer = setInterval(decreaseTime, 1000)
        }
        this.resume()
    }
}

// Таймер обратного отсчёта
function decreaseTime() {
    if (time === 0) {
        endLevel(false)
    } else {
        currentTime = --time
        setTime(currentTime)
    }
}

function setTime(value) {
    timerItem.innerHTML = `${value}`
}

function getRandomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColors(colorDifferenceNum) {
    let hue = getRandomNum(0, 360 - colorDifferenceNum)
    let saturation = getRandomNum(30, 100)
    let lightness = getRandomNum(20, 85)
    let colorFirst = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)'
    let colorSecond = 'hsl(' + (hue + colorDifferenceNum) + ', ' + saturation + '%, ' + lightness + '%)'
    return [colorFirst, colorSecond]
}
