CharactersShow();
function CharactersShow() {
  var isFirst = true;
  var menu = document.getElementById("charactersMenu");
  enemyName.forEach((element) => {
    var label = document.createElement("label");
    label.className = "menu-item";
    var input = document.createElement("input");
    input.type = "radio";
    input.name = "menu";
    input.checked = isFirst;
    input.value = element;

    input.onclick = function () {
      AssignPlayer(element);
    };
    var img = document.createElement("img");
    img.src = "characters/hero/" + element + ".png";
    label.appendChild(input);
    label.appendChild(img);
    menu.appendChild(label);
    isFirst = false;
  });

  //find the selected when first load
  var radioButtons = document.getElementsByName("menu");
  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      playerName = radioButtons[i].value;
      AssignPlayer(playerName);
      break;
    }
  }
}

function AnimateThis(variable, type, time, duration) {
  variable.style.animation = "none";
  setTimeout(() => {
    variable.style.animation = type + " " + time + "s";
  }, duration);
}

function DisplayNameInfo() {
  document.getElementById("disHeroName").innerHTML = hero.name;
  document.getElementById("disEnemyName").innerHTML = enemys.name;
}

function UpdateBar() {
  let herohp = (hero.health / heroDefaultHealth) * 100;
  let heromana = (hero.mana / heroDefaultMana) * 100;
  let heroshield = (hero.shield / heroDefaultShield) * 100;

  let enemyhp = (enemys.health / enemyDefaultHealth) * 100;
  let enemymana = (enemys.mana / enemyDefaultMana) * 100;
  let enemyshield = (enemys.shield / enemyDefaultShield) * 100;

  let heroHealthBar = document.getElementById("heroHealthBar");
  let heroManaBar = document.getElementById("heroManaBar");
  let heroShieldBar = document.getElementById("heroShieldBar");

  let enemyHealthBar = document.getElementById("enemyHealthBar");
  let enemyManaBar = document.getElementById("enemyManaBar");
  let enemyShieldBar = document.getElementById("enemyShieldBar");

  heroStatusText.innerHTML =
    "HP:   " +
    Math.round(hero.health + hero.shield) +
    " MANA:   " +
    Math.round(hero.mana) +
    "  DAMAGE:  " +
    hero.baseAttack +
    "/" +
    hero.critAttack;

  enemyStatusText.innerHTML =
    "HP:   " +
    Math.round(enemys.health + enemys.shield) +
    " MANA:   " +
    Math.round(enemys.mana) +
    "  DAMAGE:  " +
    enemys.baseAttack +
    "/" +
    enemys.critAttack;

  heroHealthBar.style.width = herohp + "%";
  heroManaBar.style.width = heromana + "%";
  heroShieldBar.style.width = heroshield + "%";

  enemyHealthBar.style.width = enemyhp + "%";
  enemyManaBar.style.width = enemymana + "%";
  enemyShieldBar.style.width = enemyshield + "%";

  let heroHealthBarColor =
    hero.health < heroDefaultHealth * 0.2
      ? "var(--RiskyColor)"
      : "var(--HeroHealthColor)";
  let heroManaBarColor =
    hero.mana < hero.critAttack ? "var(--RiskyColor)" : "var(--ManaColor)";
  let enemyHealthBarColor =
    enemys.health < enemyDefaultHealth * 0.2
      ? "var(--RiskyColor)"
      : "var(--EnemyHealthColor)";
  let enemyManaBarColor =
    enemys.mana < enemys.critAttack ? "var(--RiskyColor)" : "var(--ManaColor)";

  heroHealthBar.style.background = heroHealthBarColor;
  heroManaBar.style.background = heroManaBarColor;
  enemyHealthBar.style.background = enemyHealthBarColor;
  enemyManaBar.style.background = enemyManaBarColor;
}

function FightAnimation() {
  heroCharacter.src = "characters/hero/" + playerName + "-fight.png";
  setTimeout(() => {
    heroCharacter.src = "characters/hero/" + playerName + ".gif";
  }, 1000);

  enemyCharacter.src = "characters/enemy/" + enemys.name + "-fight.png";
  setTimeout(() => {
    enemyCharacter.src = "characters/enemy/" + enemys.name + ".gif";
  }, 1000);

  AnimateThis(heroCharacter, "herofight", 1, 10);
  AnimateThis(enemyCharacter, "enemyfight", 1, 10);

  setTimeout(() => {
    spark.style.display = "block";
  }, 300);

  setTimeout(() => {
    spark.style.display = "none";
  }, 500);
}

function ChangeBG() {
  let bg = "stage" + Randomizer(1, 4);
  document.getElementById("stage").style.backgroundImage =
    "url('assets/" + bg + ".jpg')";
}

function HeroAttackNotifAnimation(herotext) {
  heronotif.innerHTML = herotext;
  AnimateThis(heronotif, "fightnotif", 1, 10);
  setTimeout(() => {
    heronotif.style.display = "block";
  }, 10);
  setTimeout(() => {
    heronotif.style.display = "none";
  }, 900);
}

function EnemyAttackNotifAnimation(text) {
  enemynotif.innerHTML = text;
  AnimateThis(enemynotif, "fightnotif", 1, 10);
  setTimeout(() => {
    enemynotif.style.display = "block";
  }, 10);
  setTimeout(() => {
    enemynotif.style.display = "none";
  }, 900);
}

nextPlay.onclick = function () {
  winModal.style.display = "none";
  NextLevel();
};

restart.onclick = function () {
  Reset();
  lossModal.style.display = "none";
};

function Menu() {
  document.getElementById("finishModal").style.display = "none";
  Reset();
}

function Reset() {
  MENU.style.display = "flex";
  GAME.style.display = "none";
  level = 1;
  bunosDmg = 0;
  // Start();
  IsClickDisable(false);
}

function ShielUI() {
  var container = document.getElementById("shieldContainer");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  for (let i = 1; i <= heroBlockCounter; i++) {
    var shieldIcon = document.createElement("img");
    shieldIcon.src = "assets/shield icon2.png";
    container.appendChild(shieldIcon);
  }
}

// async function listPngFiles() {
//   try {
//     const response = await fetch("/characters/hero");
//     if (response.ok) {
//       const text = await response.text();
//       const filenames = text
//         .split("\n")
//         .filter((filename) => filename.endsWith(".png"));
//       console.log("PNG Files:", filenames);
//     } else {
//       console.error("Failed to fetch the list of files:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// // Call the function to list PNG files
// listPngFiles();

function fillEnemyContainerModal() {
  var folder = "hero";
  var container = document.getElementById("enemyContainerModal");

  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }

  enemyName.forEach((element) => {
    let img = document.createElement("img");
    if (element == enemyName[Math.round(enemyName.length / 2)])
      folder = "enemy";

    img.src = "characters/" + folder + "/" + element + ".gif";
    img.style.width = "200px";
    img.style.height = "auto";
    // img.style.animation = "characterWinAnim 0.5s infinite";
    // img.right = "40%";
    container.appendChild(img);
  });
}

function Info() {
  if (instruction.style.display == "block") instruction.style.display = "none";
  else instruction.style.display = "block";
}
