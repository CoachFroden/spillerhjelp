function goTo(page){
  window.location.href = page;
}

function goBack(){
  window.location.href = "index.html";
}

const search = document.getElementById("rehabSearch");
const cards = [...document.querySelectorAll(".category-card")];
const count = document.getElementById("rehabCount");
const empty = document.getElementById("rehabEmpty");

function normalize(value){
  return (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function filterRehab(){
  if (!search) return;
  const term = normalize(search.value.trim());
  let visible = 0;

  cards.forEach(card => {
    const haystack = normalize(`${card.dataset.search || ""} ${card.innerText}`);
    const match = !term || haystack.includes(term);
    card.classList.toggle("hide", !match);
    if (match) visible++;
  });

  if (count) count.textContent = visible === 1 ? "1 valg" : `${visible} valg`;
  if (empty) empty.classList.toggle("hide", visible !== 0);
}

if (search) {
  search.addEventListener("input", filterRehab);
}
