const screens = {
  welcome: document.querySelector("#welcomeScreen"),
  question: document.querySelector("#questionScreen"),
  success: document.querySelector("#successScreen"),
  placeholder: document.querySelector("#placeholderScreen"),
}

const openInvitationButton = document.querySelector("#openInvitation")
const yesButton = document.querySelector("#yesButton")
const noButton = document.querySelector("#noButton")
const continueButton = document.querySelector("#continueButton")

const answerArea = document.querySelector("#answerArea")
const noButtonHint = document.querySelector("#noButtonHint")

const progressBar = document.querySelector("#progressBar")
const progressLabel = document.querySelector("#progressLabel")
const progressPercent = document.querySelector("#progressPercent")
const progressTrack = document.querySelector(".progress-track")

const confettiContainer = document.querySelector("#confettiContainer")

const countdownElements = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
}

const steps = {
  welcome: {
    current: 1,
    total: 5,
  },
  question: {
    current: 2,
    total: 5,
  },
  success: {
    current: 3,
    total: 5,
  },
  placeholder: {
    current: 4,
    total: 5,
  },
}

const noButtonTexts = [
  "Nie",
  "Na pewno?",
  "Źle kliknęłaś 😇",
  "Spróbuj jeszcze raz",
  "Ten przycisk nie działa",
  "Może jednak tak?",
  "Nie poddam się 💕",
]

let noButtonAttempts = 0

function showScreen(screenName) {
  Object.values(screens).forEach((screen) => {
    screen.classList.remove("active")
  })

  screens[screenName].classList.add("active")
  updateProgress(screenName)

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

function updateProgress(screenName) {
  const step = steps[screenName]
  const progress = Math.round((step.current / step.total) * 100)

  progressBar.style.width = `${progress}%`
  progressLabel.textContent = `Krok ${step.current} z ${step.total}`
  progressPercent.textContent = `${progress}%`

  progressTrack.setAttribute("aria-valuenow", String(progress))
}

function formatNumber(value) {
  return String(value).padStart(2, "0")
}

function updateCountdown() {
  const dateTarget = new Date("2026-07-19T12:00:00+02:00")
  const currentDate = new Date()

  const difference = dateTarget.getTime() - currentDate.getTime()

  if (difference <= 0) {
    countdownElements.days.textContent = "00"
    countdownElements.hours.textContent = "00"
    countdownElements.minutes.textContent = "00"
    countdownElements.seconds.textContent = "00"

    return
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24,
  )

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60,
  )

  const seconds = Math.floor(
    (difference / 1000) % 60,
  )

  countdownElements.days.textContent = formatNumber(days)
  countdownElements.hours.textContent = formatNumber(hours)
  countdownElements.minutes.textContent = formatNumber(minutes)
  countdownElements.seconds.textContent = formatNumber(seconds)
}

function getRandomPosition() {
  const areaRect = answerArea.getBoundingClientRect()
  const buttonRect = noButton.getBoundingClientRect()

  const horizontalPadding = 12
  const verticalPadding = 12

  const maxX = Math.max(
    horizontalPadding,
    areaRect.width - buttonRect.width - horizontalPadding,
  )

  const maxY = Math.max(
    verticalPadding,
    areaRect.height - buttonRect.height - verticalPadding,
  )

  const x =
    horizontalPadding +
    Math.random() * (maxX - horizontalPadding)

  const y =
    verticalPadding +
    Math.random() * (maxY - verticalPadding)

  return {
    x,
    y,
  }
}

function moveNoButton() {
  noButtonAttempts += 1

  const nextTextIndex = Math.min(
    noButtonAttempts,
    noButtonTexts.length - 1,
  )

  noButton.textContent = noButtonTexts[nextTextIndex]

  noButton.classList.add("moving")

  const position = getRandomPosition()

  noButton.style.left = `${position.x}px`
  noButton.style.top = `${position.y}px`

  if (noButtonAttempts === 1) {
    noButtonHint.textContent =
      "Ten przycisk chyba ma własne zdanie…"
  } else if (noButtonAttempts === 3) {
    noButtonHint.textContent =
      "Może warto wybrać ten drugi? 😇"
  } else if (noButtonAttempts >= 5) {
    noButtonHint.textContent =
      "Naprawdę nie pozwolę Ci odmówić 💕"
  }
}

function createConfetti() {
  const symbols = ["♥", "💕", "💖", "🌸"]

  for (let index = 0; index < 42; index += 1) {
    const confetti = document.createElement("span")

    confetti.classList.add("confetti-heart")

    confetti.textContent =
      symbols[Math.floor(Math.random() * symbols.length)]

    confetti.style.left = `${Math.random() * 100}%`
    confetti.style.fontSize = `${14 + Math.random() * 18}px`
    confetti.style.animationDuration = `${2.8 + Math.random() * 2.5}s`
    confetti.style.animationDelay = `${Math.random() * 0.7}s`

    confettiContainer.appendChild(confetti)

    window.setTimeout(() => {
      confetti.remove()
    }, 6000)
  }
}

openInvitationButton.addEventListener("click", () => {
  showScreen("question")
})

yesButton.addEventListener("click", () => {
  createConfetti()
  showScreen("success")
})

continueButton.addEventListener("click", () => {
  showScreen("placeholder")
})

noButton.addEventListener("mouseenter", moveNoButton)

noButton.addEventListener("touchstart", (event) => {
  event.preventDefault()
  moveNoButton()
})

noButton.addEventListener("click", (event) => {
  event.preventDefault()
  moveNoButton()
})

updateCountdown()

window.setInterval(updateCountdown, 1000)