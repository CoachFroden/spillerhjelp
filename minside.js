"use strict";

import { auth, db } from "./firebase-refleksjon.js";
import { collection, query, where, getDocs, doc, setDoc, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

async function updateLastActive(user) {
  if (!user) return;

  await setDoc(
    doc(db, "users", user.uid),
    {
      lastActiveAt: serverTimestamp()
    },
    { merge: true }
  );
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  // 🔥 LEGG INN DENNE
  updateLastActive(user);

  const q = query(
    collection(db, "spillere"),
    where("uid", "==", user.uid)
  );

  const snap = await getDocs(q);

  if (snap.empty) return;

  const player = snap.docs[0].data();

const nameEl = document.getElementById("player-name");
const roleEl = document.getElementById("player-role");

if (nameEl && roleEl) {
  nameEl.textContent = player.navn;
  roleEl.textContent = player.rolle || "";
}
});

/* NAV */
window.goTo = function(page){
  window.location.href = page;
};

/* LOGOUT */
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.onclick = () => {
    auth.signOut().then(() => {
      window.location.href = "index.html";
    });
  };
}

window.goTo = function(page){
  window.location.href = page;
};

window.goBack = function() {
  window.location.href = "minside.html";
};