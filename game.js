let name, baseAttack, critAttack, mana, health, shield;
let level = 1;
var enemys, hero;
var isDone = false;
let enemyName = [
  "bigshow",
  "brave chicken",
  "chickemon",
  "chicken rumbo",
  "chicken rub",
  "chicken thug",
  "underwater chicken",
  "yujin",
];

//initializing the characteristics of the characters
var ALLCHARACTERS = [enemyName.length];
let ctr = 0;
enemyName.forEach((element) => {
  ALLCHARACTERS[ctr] = {
    name: element,
  };
  ctr++;
});

var playerName;

var heroDefaultHealth = 0;
var heroDefaultMana = 0;
var heroDefaultShield = 0;

var enemyDefaultHealth = 0;
var enemyDefaultMana = 0;
var enemyDefaultShield = 0;

var heroDMG = 0;
var heroBlockCounter = 0;
var enemyDMG = 0;
var bunosDmg = 0;

const MENU = document.getElementById("menu");
const GAME = document.getElementById("game");
const controlBot = document.getElementsByClassName("controls");
const BAbot = document.getElementById("BAbot");
const CAbot = document.getElementById("CAbot");
const Dbot = document.getElementById("Dbot");
const Cbot = document.getElementById("Cbot");

const fightnotif = document.getElementById("fightnotif");
const instruction = document.getElementById("instruction");
const getReadyModal = document.getElementById("getReadyModal");
const vidfile = document.getElementById("vidfile");

const profile = document.getElementById("profile");
const profileName = document.getElementById("profileName");
const charactersMenu = document.getElementById("charactersMenu");
var heroCharacter = document.getElementById("heroCharacter");
var enemyCharacter = document.getElementById("enemyCharacter");
var spark = document.getElementById("spark");
var enemynotif = document.getElementById("enemynotif");
var heronotif = document.getElementById("heronotif");
const levelDisplay = document.getElementById("levelDisplay");

const winModal = document.getElementById("winModal");
const winmodalName = document.getElementById("winmodalName");
const lossmodalName = document.getElementById("lossmodalName");
const bonus = document.getElementById("bonus");
const nextPlay = document.getElementById("nextPlay");
const wincharacter = document.getElementById("player-character");
const lossModal = document.getElementById("lossModal");
const restart = document.getElementById("restart");

const heroStatusText = document.getElementById("heroStatusText");
const enemyStatusText = document.getElementById("enemyStatusText");

document.getElementById("startBot").onclick = function () {
  enemyName = enemyName.filter((item) => item !== playerName);
  wincharacter.src = "characters/hero/" + playerName + ".png";
  winmodalName.innerHTML = playerName.toUpperCase();
  lossmodalName.innerHTML = playerName.toUpperCase();
  level = 1;
  enemyName = shuffleArray(enemyName);
  MENU.style.display = "none";
  GAME.style.display = "flex";
  Start();
  console.log(enemyName);
};
//AssignCharacterSkill();

function AssignCharacterBuff(character) {
  // console.log(character, ALLCHARACTERS[0]);
  switch (character) {
    //bigshow
    case ALLCHARACTERS[0].name:
      ALLCHARACTERS[0].basic = 0;
      ALLCHARACTERS[0].ult = 0;
      ALLCHARACTERS[0].charge = 0;
      ALLCHARACTERS[0].hp = 50;
      ALLCHARACTERS[0].armor = 50;

      return ALLCHARACTERS[0];
    //brave chicken
    case ALLCHARACTERS[1].name:
      ALLCHARACTERS[1].basic = 10;
      ALLCHARACTERS[1].ult = 10;
      ALLCHARACTERS[1].charge = 0;
      ALLCHARACTERS[1].hp = 0;
      ALLCHARACTERS[1].armor = 30;
      return ALLCHARACTERS[1];

    //chickemon
    case ALLCHARACTERS[2].name:
      ALLCHARACTERS[2].basic = 10;
      ALLCHARACTERS[2].ult = 15;
      ALLCHARACTERS[2].charge = 30;
      ALLCHARACTERS[2].hp = 0;
      ALLCHARACTERS[2].armor = 0;
      return ALLCHARACTERS[2];

    //chicken rumbo
    case ALLCHARACTERS[3].name:
      ALLCHARACTERS[3].basic = 10;
      ALLCHARACTERS[3].ult = 0;
      ALLCHARACTERS[3].charge = 0;
      ALLCHARACTERS[3].hp = 0;
      ALLCHARACTERS[3].armor = 20;
      return ALLCHARACTERS[3];

    //chicken rub
    case ALLCHARACTERS[4].name:
      ALLCHARACTERS[4].basic = 0;
      ALLCHARACTERS[4].ult = 0;
      ALLCHARACTERS[4].charge = 20;
      ALLCHARACTERS[4].hp = 40;
      ALLCHARACTERS[4].armor = 20;
      return ALLCHARACTERS[4];

    //chicken thug
    case ALLCHARACTERS[5].name:
      ALLCHARACTERS[5].basic = 10;
      ALLCHARACTERS[5].ult = 20;
      ALLCHARACTERS[5].charge = 0;
      ALLCHARACTERS[5].hp = 0;
      ALLCHARACTERS[5].armor = 0;
      return ALLCHARACTERS[5];

    //underwater chicken
    case ALLCHARACTERS[6].name:
      ALLCHARACTERS[6].basic = 5;
      ALLCHARACTERS[6].ult = 0;
      ALLCHARACTERS[6].charge = 10;
      ALLCHARACTERS[6].hp = 30;
      ALLCHARACTERS[6].armor = 0;
      return ALLCHARACTERS[6];

    //yujin
    case ALLCHARACTERS[7].name:
      ALLCHARACTERS[7].basic = 10;
      ALLCHARACTERS[7].ult = 20;
      ALLCHARACTERS[7].charge = 30;
      ALLCHARACTERS[7].hp = 0;
      ALLCHARACTERS[7].armor = 0;
      return ALLCHARACTERS[7];
  }
}

function Start() {
  getReadyModal.style.display = "block";
  vidfile.play();
  setTimeout(() => {
    getReadyModal.style.display = "none";
    vidfile.pause();
    vidfile.currentTime = 0;
    fightnotif.style.display = "block";
    isKeyOpen = true;
  }, 5325);

  setTimeout(() => {
    fightnotif.style.display = "none";
  }, 7300);

  isDone = false;
  ChangeBG();
  SpawnPlayer();
  SpawnEnemy();
  bunosDmg = 0;
  console.log(hero);
  console.log(enemys);
  GameUpdate();
  DisplayNameInfo();
  levelDisplay.innerHTML = "LEVEL " + level;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function Randomizer(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Player(name, baseAttack, critAttack, mana, health, shield) {
  this.name = name;
  this.baseAttack = baseAttack;
  this.critAttack = critAttack;
  this.mana = mana;
  this.health = health;
  this.shield = shield;
}

function AssignPlayer(name) {
  playerName = name;
  AnimateThis(profile, "profileAnim", 1.5, 10);
  profile.src = "characters/hero/" + playerName + ".gif";
  profileName.innerHTML = playerName.toUpperCase();

  let assHealth = "HEALTH: 100";
  let assArmor = "ARMOR: 50";
  let assMana = "MANA: 100";
  let assBA = "BASIC ATTACK: 5";
  let assCA = "CRITICAL ATTACK: 30";

  if (AssignCharacterBuff(name).hp != 0)
    assHealth = assHealth + " + " + AssignCharacterBuff(name).hp;
  if (AssignCharacterBuff(name).armor != 0)
    assArmor = assArmor + " + " + AssignCharacterBuff(name).armor;
  if (AssignCharacterBuff(name).charge != 0)
    assMana = assMana + " + " + AssignCharacterBuff(name).charge;
  if (AssignCharacterBuff(name).basic != 0)
    assBA = assBA + " + " + AssignCharacterBuff(name).basic;
  if (AssignCharacterBuff(name).ult != 0)
    assCA = assCA + " + " + AssignCharacterBuff(name).ult;

  document.getElementById("buffHP").innerHTML = assHealth;
  document.getElementById("buffArmor").innerHTML = assArmor;
  document.getElementById("buffCharge").innerHTML = assMana;
  document.getElementById("buffBasic").innerHTML = assBA;
  document.getElementById("buffUlt").innerHTML = assCA;
  // console.log(name);
}

function SpawnPlayer() {
  let N = playerName;
  let BA = 5 + AssignCharacterBuff(playerName).basic;
  let CA = 30 + AssignCharacterBuff(playerName).ult;
  let M = 100 + bunosDmg / 3 + AssignCharacterBuff(playerName).charge;
  let H = 100 + bunosDmg / 3 + AssignCharacterBuff(playerName).hp;
  let S = 50 + bunosDmg / 3 + AssignCharacterBuff(playerName).armor;
  heroCharacter.src = "characters/hero/" + playerName + ".gif";

  hero = new Player(N, BA, CA, M, H, S);
  heroBlockCounter = 5;
  heroDefaultHealth = H;
  heroDefaultMana = M;
  heroDefaultShield = S;
}

function SpawnEnemy() {
  let theEnemy = enemyName[level - 1];
  let N = theEnemy;
  let BA = 5 + AssignCharacterBuff(theEnemy).basic;
  let CA = 30 + AssignCharacterBuff(theEnemy).ult;
  let M = 100 + 20 * (level - 1) + AssignCharacterBuff(theEnemy).charge;
  let H = 100 + 20 * (level - 1) + AssignCharacterBuff(theEnemy).hp;
  let S = 50 + 20 * (level - 1) + AssignCharacterBuff(theEnemy).armor;
  enemyCharacter.src = "characters/enemy/" + enemyName[level - 1] + ".png";

  enemys = new Player(N, BA, CA, M, H, S);
  enemyDefaultHealth = H;
  enemyDefaultMana = M;
  enemyDefaultShield = S;
}

function IsClickDisable(click) {
  //console.log(click);
  for (let i = 0; i < controlBot.length; i++) {
    controlBot[i].disabled = click;
  }
}
function IsClickDisableSingle(objectid, click) {
  //console.log(click);
  document.getElementById(objectid).disabled = click;
}

// KEEYYYDOWNNNN
var isKeyOpen = false;
document.addEventListener('keyup', (event) => {
  var name = event.key;
  // var code = event.code;
  if (isKeyOpen) {
    // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
    if(name === "1" && BAbot.disabled == false){
      PlayerMove("1");
    }
    else if(name === "2" && CAbot.disabled == false){
      PlayerMove("2");
    }
    else if(name === "3" && Dbot.disabled == false){
      PlayerMove("3");
    }
    else if(name === "4" && Cbot.disabled == false){
      PlayerMove("4");
    }
  }
}, false);

//tira kang player
function PlayerMove(move) {
  IsClickDisable(true);
  if (move == 3) {
    if (heroBlockCounter > 0) {
      heroBlockCounter--;
      if (heroBlockCounter == 1) {
        IsClickDisableSingle("Dbot", true);
      }
    } else {
      //move = "1";
      IsClickDisableSingle("Dbot", true);
      heroBlockCounter = 0;
    }
  } else {
    IsClickDisableSingle("Dbot", false);
    heroBlockCounter++;
  }

  if (heroBlockCounter > 5) heroBlockCounter = 5;

  // console.log("Block Counter: " + heroBlockCounter + " move: " + move);
  let amIDef = move == 3 ? true : false;
  let isEnemysDef = EnemyMove(amIDef);
  let manaReduct = 0;
  var herotext;

  switch (move) {
    case "1":
      manaReduct = hero.baseAttack;
      if (isEnemysDef) {
        heroDMG = 0;
        herotext = "Basic Block!";
      } else {
        heroDMG = Attack(1, hero.baseAttack, hero.mana);
        herotext = "Basic Attack!";
      }
      break;

    case "2":
      manaReduct = hero.critAttack;
      if (hero.mana >= hero.critAttack) {
        if (isEnemysDef) {
          heroDMG =
            Attack(hero.critAttack / 2, hero.critAttack, hero.mana) *
            (Randomizer(1, 8) / 10);
          herotext = "Critical Attack Fail!";
          // console.log("HERO CRIT FAIL: " + heroDMG);
        } else {
          heroDMG = Attack(hero.critAttack / 2, hero.critAttack, hero.mana);
          herotext = "Critical Attack!";
        }
      } else {
        if (isEnemysDef) {
          heroDMG = 0;
          herotext = "Can't Damage!";
        } else {
          heroDMG = Attack(1, hero.baseAttack, hero.mana);
          herotext = "Insuficient Mana!";
        }
      }
      break;

    case "3":
      herotext = "Block!";
      manaReduct = 0;
      hero.mana = GenerateMana(hero.mana, false);
      heroDMG = 0;
      break;

    case "4":
      herotext = "Charge!";
      manaReduct = 0;
      hero.mana = GenerateMana(hero.mana, false);
      heroDMG = 0;
      break;
  }

  enemys.shield -= heroDMG;
  if (enemys.shield <= 0) {
    enemys.health += enemys.shield;
  }
  hero.mana -= manaReduct * (Randomizer(5, 9) / 10);
  if (hero.mana < 0) hero.mana = 0;
  if (enemys.health < 0) enemys.health = 0;
  if (enemys.shield < 0) enemys.shield = 0;
  console.log(hero.name + " take " + move + ", " + herotext);
  console.log("\n");
  GameUpdate();
  HeroAttackNotifAnimation(herotext);
}

//enemys move;
function EnemyMove(playerDef) {
  let isdef = false;
  let move = Randomizer(1, 3);
  let enemyText;
  //may isip man sya
  if (enemys.mana <= enemys.baseAttack) move = 3;
  if (enemys.mana >= 90 && level < 3) move = Randomizer(1, 2);
  if (enemys.mana < enemys.critAttack && level > 3) move = 3;
  else if (enemys.mana < enemys.critAttack) move = Randomizer(1, 3);

  switch (move) {
    case 1:
      if (playerDef) {
        enemyDMG = 0;
        enemyText = "Enemy block!";
      } else {
        enemyDMG = Attack(1, enemys.baseAttack, enemys.mana);
        enemys.mana -= enemys.baseAttack * (Randomizer(5, 9) / 10);
        enemyText = "Basic Attack!";
      }
      isdef = false;
      break;
    case 2:
      if (enemys.mana >= enemys.critAttack) {
        if (playerDef) {
          enemyDMG =
            Attack(enemys.critAttack / 2, enemys.critAttack, enemys.mana) *
            (Randomizer(1, 8) / 10);
          enemyText = "Critical Attack Fail!";
        } else {
          enemyDMG = Attack(
            enemys.critAttack / 2,
            enemys.critAttack,
            enemys.mana
          );
          enemyText = "Critical Attack!";
        }
      } else {
        if (playerDef) {
          enemyDMG = 0;
          enemyText = "Enemy Block!";
        } else {
          enemyDMG = Attack(1, enemys.baseAttack, enemys.mana);
          enemyText = "Insufficient Mana!";
        }
      }
      enemys.mana -= enemys.critAttack * (Randomizer(1, 9) / 10);
      isdef = false;
      break;

    case 3:
      enemyText = "Block!";
      enemys.mana = GenerateMana(enemys.mana, true);
      enemyDMG = 0;
      isdef = true;
      break;
  }
  //apply damage
  hero.shield -= enemyDMG;
  if (hero.shield <= 0) {
    hero.health += hero.shield;
  }
  //reset to zero
  if (enemys.mana < 0) enemys.mana = 0;
  if (hero.health < 0) hero.health = 0;
  if (hero.shield < 0) hero.shield = 0;

  setTimeout(() => {
    EnemyAttackNotifAnimation(enemyText);
  }, 300);
  console.log(enemys.name + " take " + move + ", " + enemyText);
  return isdef;
}

//calculating damage
function Attack(minDmg, maxDmg, mana) {
  if (mana > 0) {
    let damage = Randomizer(minDmg, maxDmg);
    return damage;
  } else return 0;
}

function GenerateMana(playerMana, isEnemy) {
  if (playerMana <= 5) playerMana = 20;
  let addMana;
  if (isEnemy) {
    addMana = playerMana + (Randomizer(5, 9) / 10) * playerMana;
    if (addMana > enemyDefaultMana) {
      addMana = enemyDefaultMana;
    }
  } else {
    if (level >= 4) playerMana = playerMana * 0.8;
    addMana = playerMana + (Randomizer(3, 9) / 10) * playerMana;
    if (addMana > heroDefaultMana) {
      addMana = heroDefaultMana;
    }
  }
  return addMana;
}

//updates
function GameUpdate() {
  // bunosDmg = bunosDmg + (heroDMG - enemyDMG);
  FightAnimation();
  Status();
  setTimeout(UpdateBar, 300);
  ShielUI();
  if (enemys.health <= 0) {
    console.log("You Won");
    bunosDmg = hero.health;
    // console.log("Bunos points: " + bunosDmg);

    IsClickDisable(true);
    bonus.innerHTML = "Bonus points: " + Math.round(bunosDmg);
    setTimeout(() => {
      winModal.style.display = "flex";
      isKeyOpen = false;
    }, 1000);
    isDone = false;
  } else if (hero.health <= 0) {
    console.log("You Loss");
    IsClickDisable(true);
    isKeyOpen = false;
    isDone = true;
    setTimeout(() => {
      lossModal.style.display = "flex";
    }, 500);
  }
  if (!isDone) IsClickDisable(false);
  if (heroBlockCounter == 0) IsClickDisableSingle("Dbot", true);
  if (hero.mana <= 0) IsClickDisableSingle("BAbot", true);
  if (hero.mana <= 0) IsClickDisableSingle("CAbot", true);

  CheckIfDissable();
}
//level up
function NextLevel() {
  IsClickDisable(true);
  console.log("Level" + level + " is DONE!");
  level++;
  //gawan mo nang modal to
  if (level > enemyName.length) {
    // alert("Game Finish");
    isKeyOpen = false;
    document.getElementById("finishMCimg").src =
      "characters/hero/" + hero.name + ".gif";
    fillEnemyContainerModal();
    document.getElementById("finishModal").style.display = "block";
    // Reset();
    return;
  }
  Start();
  IsClickDisable(false);
}

function CheckIfDissable() {
  for (let i = 0; i < controlBot.length; i++) {
    if (controlBot[i].disabled == true) {
      controlBot[i].style.background = "#1f0303";
    } else {
      controlBot[i].style.background = "#1d1d1d";
    }
  }
}

//console display
function Status() {
  console.log(hero.name + ": ");
  console.log("Damage taken: " + enemyDMG);
  console.log("Shield: " + hero.shield);
  console.log("Health: " + hero.health);
  console.log("Mana: " + hero.mana);
  console.log("\n");

  console.log(enemys.name + ": ");
  console.log("Damage taken: " + heroDMG);
  console.log("Shield: " + enemys.shield);
  console.log("Health: " + enemys.health);
  console.log("Mana: " + enemys.mana);
  console.log("\n\n");
}
