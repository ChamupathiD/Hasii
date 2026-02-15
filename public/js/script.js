const answers_no = {
  english: [
    "No",
    "Are you sure?",
    "Are you really sure??",
    "Are you really realy sure???",
    "Think again?",
    "Don't believe in second chances?",
    "Why are you being so cold?",
    "Maybe we can talk about it?",
    "I am not going to ask again!",
    "Ok now this is hurting my feelings!",
    "You are now just being mean!",
    "Why are you doing this to me?",
    "Please give me a chance!",
    "I am begging you to stop!",
    "Ok, Let's just start over.."
  ],
  french: [
    "Non",
    "Tu es sûr ?",
    "Tu es vraiment sûr ??",
    "Tu es vraiment vraiment sûr ???",
    "Réfléchis encore?",
    "Tu ne crois pas aux deuxièmes chances ?",
    "Pourquoi tu es si froid?",
    "Peut-être, on peut en parler ?",
    "Je ne vais pas demander encore une fois!",
    "D'accord, maintenant ca me fait mal!",
    "Tu es juste méchant!",
    "Pourquoi tu me fais ça?",
    "Donnez-moi une chance plz!",
    "Je te supplie d'arrêter!",
    "D'accord, recommençons.."
  ],
  thai: [
    "ไม่อ่ะ",
    "แน่ใจจริงๆหรอคะ?",
    "แน่ใจจริงๆ จริงๆนะคะ?",
    "อย่าบอกนะว่านี่แน่ใจสุดๆแล้วจริงๆ ?",
    "ลองคิดดูอีกทีหน่อยสิคะ..",
    "ขอโอกาศที่สองทีค่ะ..",
    "อย่าเย็นชาสิคะ กระซิกๆ",
    "ขอร้องนะคะ",
    "น้าาาๆๆๆๆๆ",
    "เราจะร้องไห้เอานะ กระซิกๆ",
    "จะเอางี้ๆจริงหรอคะ",
    "ฮือออออ",
    "ขอโอกาศครั้งที่สองที่ค่ะ!",
    "ขอร้องละค่าาา",
    "โอเคค่ะ.. งั้นเริ่มใหม่ !"
  ]
};

const answers_yes = {
  english: "Yes",
  french: "Oui",
  Thailand: "เย่ คืนดีกันแล้วน้า"
};

let language = "english"; // Default language is English
const no_button = document.getElementById("no-button");
const yes_button = document.getElementById("yes-button");
let i = 1;
let clicks = 0;

// Grow the YES button using scale (matches the updated button CSS theme)
let yesScale = 1;
function growYes() {
  yesScale = Math.min(2.2, yesScale + 0.12);
  yes_button.style.transform = `scale(${yesScale})`;
}

function setBtnText(btn, text) {
  btn.innerHTML = `<p>${text}</p>`;
}

no_button.addEventListener("click", () => {
  // Change banner source
  const banner = document.getElementById("banner");
  if (clicks === 0) {
    banner.src = "public/images/no.gif";
    refreshBanner();
  }

  clicks++;
  growYes();

  const total = answers_no[language].length;

  // Change button text
  if (i < total - 1) {
    setBtnText(no_button, answers_no[language][i]);
    i++;
  } else if (i === total - 1) {
    alert(answers_no[language][i]);
    i = 1;

    setBtnText(no_button, answers_no[language][0]);
    setBtnText(yes_button, answers_yes[language] || "Yes");

    yesScale = 1;
    yes_button.style.transform = "scale(1)";
  }
});

yes_button.addEventListener("click", () => {
  // Change banner gif path
  const banner = document.getElementById("banner");
  banner.src = "public/images/yes.gif";
  refreshBanner();

  // Hide buttons div
  const buttons = document.getElementsByClassName("buttons")[0];
  buttons.style.display = "none";

  // Show message div
  const message = document.getElementsByClassName("message")[0];
  message.style.display = "block";
});

function refreshBanner() {
  // Reload banner gif to force load
  const banner = document.getElementById("banner");
  const src = banner.src;
  banner.src = "";
  banner.src = src;
}

function changeLanguage() {
  const selectElement = document.getElementById("language-select");
  const selectedLanguage = selectElement.value;
  language = selectedLanguage;

  // Update question heading
  const questionHeading = document.getElementById("question-heading");
  if (language === "french") {
    questionHeading.textContent = "Tu veux être mon valentin?";
  } else if (language === "thai") {
    questionHeading.textContent = "คืนดีกับเราได้อ่ะป่าว?";
  } else {
    questionHeading.textContent = "Will you be my valentine?";
  }

  // Reset yes button text
  setBtnText(yes_button, answers_yes[language] || "Yes");

  // Reset no button text
  if (clicks === 0) {
    setBtnText(no_button, answers_no[language][0]);
  } else {
    setBtnText(
      no_button,
      answers_no[language][Math.min(clicks, answers_no[language].length - 1)]
    );
  }

  // Update success message
  const successMessage = document.getElementById("success-message");
  if (language === "french") {
    successMessage.textContent = "Yepppie, à bientôt :3";
  } else if (language === "thai") {
    successMessage.textContent = "ฮูเร่ คืนดีกันแล้วน้า :3";
  } else {
    successMessage.textContent = "Yepppie, see you sooonnn :3";
  }
}

// Ensure initial button markup is consistent
setBtnText(yes_button, answers_yes[language] || "Yes");
setBtnText(no_button, answers_no[language][0]);
