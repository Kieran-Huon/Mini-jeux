let hasKey = false;
let clueFound = false;

document.getElementById("plant").addEventListener("click", () => {
  hasKey = true;
  showMessage("🌱 Tu as trouvé une petite clé dans la plante !");
});

document.getElementById("frame").addEventListener("click", () => {
  clueFound = true;
  showMessage("🖼️ Un mot est écrit derrière le cadre : 'L'année de la Révolution...'");
});

document.getElementById("drawer").addEventListener("click", () => {
  if (!hasKey) {
    showMessage("🔒 Le tiroir est verrouillé.");
  } else {
    showMessage("📜 Tu ouvres le tiroir et trouves le code : 1789");
    document.getElementById("codePanel").classList.remove("hidden");
  }
});

function checkCode() {
  const code = document.getElementById("codeInput").value;
  if (code === "1789") {
    document.getElementById("door").innerText = "🚪✅";
    showMessage("🎉 Bravo ! Tu as ouvert la porte !");
  } else {
    showMessage("❌ Mauvais code !");
  }
}

function showMessage(text) {
  document.getElementById("message").textContent = text;
}
