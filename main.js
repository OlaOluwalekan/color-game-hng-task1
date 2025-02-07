const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple']
let targetColor,
  lives = 3,
  score = 0,
  loading = true

const splashScreen = document.querySelector('.splash-screen')
const splashScreenSection = document.querySelector('.splash-screen >section')
const mainScreen = document.querySelector('main')
const colorBox = document.getElementById('colorBox')
const optionsContainer = document.getElementById('optionsContainer')
const gameStatus = document.getElementById('gameStatus')
const livesDisplay = document.getElementById('lives')
const scoreDisplay = document.getElementById('score')
const newGameButton = document.getElementById('newGameButton')

const splashScreenText = splashScreenSection.textContent
const splashScreenWords = splashScreenText.split(' ')
splashScreenSection.innerHTML = ''
const correctSound = new Audio('./correct.mp3')
const incorrectSound = new Audio('./incorrect.mp3')
const gameOverSound = new Audio('./game-over.mp3')

splashScreenWords.forEach((word) => {
  const article = document.createElement('article')
  word.split('').map((letter, index) => {
    const span = document.createElement('span')
    span.textContent = letter
    span.style.color = colors[index % colors.length] // Assign a color cyclically
    span.style.transition = 'color 0.5s ease-in-out'
    article.appendChild(span)
  })
  splashScreenSection.appendChild(article)
})

setTimeout(() => {
  splashScreen.style.display = 'none'
  mainScreen.style.display = 'flex'
}, 3000)

function startGame() {
  if (lives <= 0) {
    gameStatus.innerHTML = `Game Over! <article style="background-color: ${targetColor}`
    newGameButton.textContent = 'Try Again'
    newGameButton.style.display = 'block'
    return
  }
  newGameButton.style.display = 'none'
  gameStatus.textContent = ''
  targetColor = colors[Math.floor(Math.random() * colors.length)]
  colorBox.style.backgroundColor = targetColor
  colorBox.style.display = 'block'
  optionsContainer.innerHTML = ''
  setTimeout(() => {
    colorBox.style.display = 'none'
    showOptions()
  }, 3000)
}

function showOptions() {
  const shuffledColors = [...colors].sort(() => 0.5 - Math.random())
  shuffledColors.forEach((color) => {
    const btn = document.createElement('div')
    btn.classList.add('colorOption')
    btn.style.backgroundColor = color
    btn.setAttribute('data-testid', 'colorOption')
    btn.addEventListener('click', () => checkGuess(color))
    optionsContainer.appendChild(btn)
  })
}

function checkGuess(selectedColor) {
  if (selectedColor === targetColor) {
    score++
    scoreDisplay.textContent = score
    gameStatus.textContent = 'Correct! 🎉'
    gameStatus.style.color = 'green'
    correctSound.play()
    setTimeout(startGame, 1000)
  } else {
    lives--
    livesDisplay.textContent = lives
    gameStatus.innerHTML =
      lives > 0
        ? `Wrong! Try again. <article style="background-color: ${targetColor}"></article>`
        : `Game Over! <article style="background-color: ${targetColor}`
    gameStatus.style.color = 'red'
    if (lives > 0) {
      incorrectSound.play()
      setTimeout(startGame, 1000)
    } else {
      gameOverSound.play()
      newGameButton.style.display = 'block'
      newGameButton.textContent = 'Try Again'
    }
  }
}

newGameButton.addEventListener('click', () => {
  lives = 3
  score = 0
  livesDisplay.textContent = lives
  scoreDisplay.textContent = score
  gameStatus.textContent = ''
  startGame()
})
