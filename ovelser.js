import { db } from "./firebase-refleksjon.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const weekSelect = document.getElementById("weekSelect");
const exerciseList = document.getElementById("exerciseList");
const focusDiv = document.getElementById("focusText");

function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function weekAtOffset(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset * 7);
  return getISOWeek(date);
}

function buildWeekSelect() {
  if (!weekSelect) return;
  weekSelect.innerHTML = "";

  for (let i = 0; i < 8; i++) {
    const weekNumber = weekAtOffset(i);
    const option = document.createElement("option");
    option.value = `week${weekNumber}`;
    option.textContent = i === 0 ? `Denne uken · uke ${weekNumber}` : i === 1 ? `Neste uke · uke ${weekNumber}` : `Uke ${weekNumber}`;
    weekSelect.appendChild(option);
  }
}

function showMessage(title, text = "") {
  if (!exerciseList) return;
  exerciseList.innerHTML = "";
  const box = document.createElement("div");
  box.className = "no-exercises";
  const strong = document.createElement("strong");
  strong.textContent = title;
  box.appendChild(strong);
  if (text) {
    const p = document.createElement("p");
    p.textContent = text;
    p.style.margin = "7px 0 0";
    p.style.lineHeight = "1.45";
    box.appendChild(p);
  }
  exerciseList.appendChild(box);
}

function renderExercises(exercises) {
  exerciseList.innerHTML = "";

  exercises.forEach(ex => {
    const card = document.createElement("article");
    card.className = "exercise-card";

    const title = document.createElement("div");
    title.className = "exercise-title";
    title.textContent = `⚽ ${ex.title || "Øvelse"}`;
    card.appendChild(title);

    if (ex.video) {
      const video = document.createElement("video");
      video.controls = true;
      video.preload = "metadata";
      video.playsInline = true;
      video.src = ex.video;
      card.appendChild(video);
    }

    exerciseList.appendChild(card);
  });
}

async function loadExercises() {
  if (!exerciseList || !weekSelect) return;
  const weekChoice = weekSelect.value;
  if (!weekChoice) return;

  showMessage("Laster ukens fokus …");
  if (focusDiv) focusDiv.textContent = "";

  try {
    const snap = await getDoc(doc(db, "weeklyExercises", weekChoice));

    if (!snap.exists()) {
      showMessage("Ingen øvelser lagt ut ennå", "Sjekk igjen senere, eller velg en annen uke.");
      return;
    }

    const data = snap.data();
    if (focusDiv && data.focus) focusDiv.textContent = `Fokus: ${data.focus}`;

    if (!Array.isArray(data.exercises) || data.exercises.length === 0) {
      showMessage("Ingen øvelser lagt ut ennå", "Det er ikke publisert ekstraarbeid for denne uka.");
      return;
    }

    renderExercises(data.exercises);
  } catch (error) {
    console.error("Kunne ikke laste ukens fokus:", error);
    showMessage("Kunne ikke laste øvelsene", "Prøv igjen når du har nettforbindelse.");
  }
}

buildWeekSelect();
weekSelect?.addEventListener("change", loadExercises);
loadExercises();
