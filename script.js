const screens = {
  welcome: document.querySelector("#welcomeScreen"),
  question: document.querySelector("#questionScreen"),
  success: document.querySelector("#successScreen"),
  time: document.querySelector("#timeScreen"),
  outfit: document.querySelector("#outfitScreen"),
  preferences: document.querySelector("#preferencesScreen"),
  summary: document.querySelector("#summaryScreen"),
  final: document.querySelector("#finalScreen"),
}

const invitationData = {
  departureTime: "",
  outfitStyle: "",
  outfitInstructions: "",
  preferences: [],
}

const openInvitationButton =
  document.querySelector("#openInvitation")

const yesButton = document.querySelector("#yesButton")
const noButton = document.querySelector("#noButton")
const continueButton = document.querySelector("#continueButton")
const confirmDateButton =
  document.querySelector("#confirmDateButton")
const restartButton = document.querySelector("#restartButton")

const answerArea = document.querySelector("#answerArea")
const noButtonHint = document.querySelector("#noButtonHint")

const progressBar = document.querySelector("#progressBar")
const progressLabel = document.querySelector("#progressLabel")
const progressPercent =
  document.querySelector("#progressPercent")
const progressTrack = document.querySelector(".progress-track")

const confettiContainer =
  document.querySelector("#confettiContainer")

const timeForm = document.querySelector("#timeForm")
const customTimeRadio =
  document.querySelector("#customTimeRadio")
const customTimeField =
  document.querySelector("#customTimeField")
const customTimeInput = document.querySelector("#customTime")
const timeError = document.querySelector("#timeError")

const outfitForm = document.querySelector("#outfitForm")
const outfitInstructionsField =
  document.querySelector("#outfitInstructionsField")
const outfitInstructionsInput =
  document.querySelector("#outfitInstructions")
const outfitCharacters =
  document.querySelector("#outfitCharacters")
const outfitError = document.querySelector("#outfitError")

const preferencesForm =
  document.querySelector("#preferencesForm")
const preferencesError =
  document.querySelector("#preferencesError")

const summaryReadyTime =
  document.querySelector("#summaryReadyTime")
const summaryDepartureTime =
  document.querySelector("#summaryDepartureTime")
const summaryOutfit =
  document.querySelector("#summaryOutfit")
const summaryInstructionsRow =
  document.querySelector("#summaryInstructionsRow")
const summaryInstructions =
  document.querySelector("#summaryInstructions")
const summaryPreferences =
  document.querySelector("#summaryPreferences")
const summaryMessage =
  document.querySelector("#summaryMessage")

const countdownElements = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
}

const steps = {
  welcome: {
    current: 1,
    total: 8,
  },
  question: {
    current: 2,
    total: 8,
  },
  success: {
    current: 3,
    total: 8,
  },
  time: {
    current: 4,
    total: 8,
  },
  outfit: {
    current: 5,
    total: 8,
  },
  preferences: {
    current: 6,
    total: 8,
  },
  summary: {
    current: 7,
    total: 8,
  },
  final: {
    current: 8,
    total: 8,
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
  const progress = Math.round(
    (step.current / step.total) * 100,
  )

  progressBar.style.width = `${progress}%`
  progressLabel.textContent =
    `Krok ${step.current} z ${step.total}`

  progressPercent.textContent = `${progress}%`

  progressTrack.setAttribute(
    "aria-valuenow",
    String(progress),
  )
}

function formatNumber(value) {
  return String(value).padStart(2, "0")
}

function updateCountdown() {
  const dateTarget =
    new Date("2026-07-19T12:00:00+02:00")

  const currentDate = new Date()

  const difference =
    dateTarget.getTime() - currentDate.getTime()

  if (difference <= 0) {
    countdownElements.days.textContent = "00"
    countdownElements.hours.textContent = "00"
    countdownElements.minutes.textContent = "00"
    countdownElements.seconds.textContent = "00"

    return
  }

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24),
  )

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24,
  )

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60,
  )

  const seconds = Math.floor(
    (difference / 1000) % 60,
  )

  countdownElements.days.textContent =
    formatNumber(days)

  countdownElements.hours.textContent =
    formatNumber(hours)

  countdownElements.minutes.textContent =
    formatNumber(minutes)

  countdownElements.seconds.textContent =
    formatNumber(seconds)
}

function getRandomPosition() {
  const areaRect = answerArea.getBoundingClientRect()
  const buttonRect = noButton.getBoundingClientRect()

  const horizontalPadding = 12
  const verticalPadding = 12

  const maxX = Math.max(
    horizontalPadding,
    areaRect.width -
      buttonRect.width -
      horizontalPadding,
  )

  const maxY = Math.max(
    verticalPadding,
    areaRect.height -
      buttonRect.height -
      verticalPadding,
  )

  const x =
    horizontalPadding +
    Math.random() *
      Math.max(0, maxX - horizontalPadding)

  const y =
    verticalPadding +
    Math.random() *
      Math.max(0, maxY - verticalPadding)

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

  noButton.textContent =
    noButtonTexts[nextTextIndex]

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

function createConfetti(amount = 42) {
  const symbols = ["♥", "💕", "💖", "🌸"]

  for (let index = 0; index < amount; index += 1) {
    const confetti = document.createElement("span")

    confetti.classList.add("confetti-heart")

    confetti.textContent =
      symbols[
        Math.floor(Math.random() * symbols.length)
      ]

    confetti.style.left =
      `${Math.random() * 100}%`

    confetti.style.fontSize =
      `${14 + Math.random() * 18}px`

    confetti.style.animationDuration =
      `${2.8 + Math.random() * 2.5}s`

    confetti.style.animationDelay =
      `${Math.random() * 0.7}s`

    confettiContainer.appendChild(confetti)

    window.setTimeout(() => {
      confetti.remove()
    }, 6000)
  }
}

function getSelectedRadioValue(form, fieldName) {
  const selected = form.querySelector(
    `input[name="${fieldName}"]:checked`,
  )

  return selected ? selected.value : ""
}

function subtractThirtyMinutes(time) {
  const [hours, minutes] =
    time.split(":").map(Number)

  const date = new Date()

  date.setHours(hours)
  date.setMinutes(minutes - 30)
  date.setSeconds(0)

  return `${formatNumber(date.getHours())}:${formatNumber(
    date.getMinutes(),
  )}`
}

function getOutfitLabel(value) {
  if (value === "elegant") {
    return "Trochę bardziej elegancko"
  }

  if (value === "casual") {
    return "Na luzie"
  }

  return "Nie wybrano"
}

function prepareSummary() {
  const readyTime = subtractThirtyMinutes(
    invitationData.departureTime,
  )

  summaryReadyTime.textContent = readyTime
  summaryDepartureTime.textContent =
    invitationData.departureTime

  summaryOutfit.textContent =
    getOutfitLabel(invitationData.outfitStyle)

  if (invitationData.outfitInstructions) {
    summaryInstructionsRow.classList.remove("hidden")
    summaryInstructions.textContent =
      invitationData.outfitInstructions
  } else {
    summaryInstructionsRow.classList.add("hidden")
    summaryInstructions.textContent = ""
  }

  summaryPreferences.textContent =
    invitationData.preferences.join(", ")

  summaryMessage.textContent =
    `W niedzielę o ${readyTime} zaczynamy przygotowania, ` +
    `a o ${invitationData.departureTime} ruszamy. ` +
    "Reszta pozostaje tajemnicą 🤫"
}

function resetInvitation() {
  invitationData.departureTime = ""
  invitationData.outfitStyle = ""
  invitationData.outfitInstructions = ""
  invitationData.preferences = []

  timeForm.reset()
  outfitForm.reset()
  preferencesForm.reset()

  customTimeField.classList.add("hidden")
  outfitInstructionsField.classList.add("hidden")
  summaryInstructionsRow.classList.add("hidden")

  timeError.textContent = ""
  outfitError.textContent = ""
  preferencesError.textContent = ""

  outfitCharacters.textContent = "0"

  noButtonAttempts = 0
  noButton.textContent = noButtonTexts[0]
  noButton.classList.remove("moving")
  noButton.removeAttribute("style")
  noButtonHint.textContent = ""

  showScreen("welcome")
}

openInvitationButton.addEventListener("click", () => {
  showScreen("question")
})

yesButton.addEventListener("click", () => {
  createConfetti()
  showScreen("success")
})

continueButton.addEventListener("click", () => {
  showScreen("time")
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

timeForm.addEventListener("change", (event) => {
  if (event.target.name !== "departureTime") {
    return
  }

  timeError.textContent = ""

  if (event.target.value === "custom") {
    customTimeField.classList.remove("hidden")
    customTimeInput.focus()
  } else {
    customTimeField.classList.add("hidden")
    customTimeInput.value = ""
  }
})

timeForm.addEventListener("submit", (event) => {
  event.preventDefault()

  const selectedTime =
    getSelectedRadioValue(
      timeForm,
      "departureTime",
    )

  if (!selectedTime) {
    timeError.textContent =
      "Wybierz godzinę wyjazdu."
    return
  }

  if (
    selectedTime === "custom" &&
    !customTimeInput.value
  ) {
    timeError.textContent =
      "Wpisz własną godzinę wyjazdu."
    return
  }

  invitationData.departureTime =
    selectedTime === "custom"
      ? customTimeInput.value
      : selectedTime

  timeError.textContent = ""
  showScreen("outfit")
})

outfitForm.addEventListener("change", (event) => {
  if (event.target.name !== "outfitStyle") {
    return
  }

  outfitError.textContent = ""

  if (event.target.value === "elegant") {
    outfitInstructionsField.classList.remove("hidden")
    outfitInstructionsInput.focus()
  } else {
    outfitInstructionsField.classList.add("hidden")
    outfitInstructionsInput.value = ""
    outfitCharacters.textContent = "0"
  }
})

outfitInstructionsInput.addEventListener(
  "input",
  () => {
    outfitCharacters.textContent =
      String(outfitInstructionsInput.value.length)
  },
)

outfitForm.addEventListener("submit", (event) => {
  event.preventDefault()

  const selectedOutfit =
    getSelectedRadioValue(
      outfitForm,
      "outfitStyle",
    )

  if (!selectedOutfit) {
    outfitError.textContent =
      "Wybierz klimat stroju."
    return
  }

  if (
    selectedOutfit === "elegant" &&
    !outfitInstructionsInput.value.trim()
  ) {
    outfitError.textContent =
      "Napisz mi, w co powinienem się ubrać."
    return
  }

  invitationData.outfitStyle = selectedOutfit

  invitationData.outfitInstructions =
    selectedOutfit === "elegant"
      ? outfitInstructionsInput.value.trim()
      : ""

  outfitError.textContent = ""
  showScreen("preferences")
})

preferencesForm.addEventListener(
  "change",
  () => {
    preferencesError.textContent = ""
  },
)

preferencesForm.addEventListener(
  "submit",
  (event) => {
    event.preventDefault()

    const selectedPreferences = [
      ...preferencesForm.querySelectorAll(
        'input[name="preferences"]:checked',
      ),
    ].map((input) => input.value)

    if (selectedPreferences.length === 0) {
      preferencesError.textContent =
        "Wybierz przynajmniej jedną odpowiedź."
      return
    }

    invitationData.preferences =
      selectedPreferences

    preferencesError.textContent = ""

    prepareSummary()
    showScreen("summary")
  },
)

document
  .querySelectorAll("[data-back]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      showScreen(button.dataset.back)
    })
  })

confirmDateButton.addEventListener("click", () => {
  createConfetti(70)
  showScreen("final")
})

restartButton.addEventListener("click", () => {
  resetInvitation()
})

updateCountdown()

window.setInterval(updateCountdown, 1000)