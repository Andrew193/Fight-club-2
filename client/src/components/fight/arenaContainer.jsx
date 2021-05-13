import React, { useEffect } from 'react';
import { createFight } from '../../services/domainRequest/fightRequest';
import { controls } from './controls';
import s from "./fight.css"
const firstFSA = 'KeyQKeyWKeyE', secondFSA = 'KeyUKeyIKeyO';
let codeLine = [], isfirstFSA = true, issecondFSA = true, PlayerOneBlock = false, PlayerTwoBlock = false;
const fightHistory = [];
function ArenaContainer(props) {
  useEffect(() => {
    Start()
  }, [])
  let firstFighter = props.firstFighter;
  let secondFighter = props.secondFighter
  let firstFighterHealth = firstFighter.health, secondFighterHealth = secondFighter.health;
  function comdoAttackCover(flag, dem, health, position, fighter, resolve) {
    lockComdo(flag)
    health === "second" ? secondFighterHealth -= dem : firstFighterHealth -= dem
    control(position, health, fighter, resolve)
  }
  function comdoAttack(resolve) {
    if (codeLine.join("") === firstFSA && isfirstFSA) {
      fightHistory.push({ FighterName: firstFighter.name, damage: 2 * +firstFighter.power.toFixed(0) })
      comdoAttackCover("FSA", 2 * +firstFighter.power.toFixed(0), "second", "right", secondFighter, resolve)
    } else if (codeLine.join("") === secondFSA && issecondFSA) {
      fightHistory.push({ FighterName: secondFighter.name, damage: 2 * +secondFighter.power.toFixed(0) })
      comdoAttackCover("CSA", 2 * +secondFighter.power.toFixed(0), "first", "left", firstFighter, resolve)
    }
    codeLine = []
  }
  function control(position, health, fighter, resolve) {
    makeAttackPosition(position)
    complex(position === "left" ?
      document.querySelector("#fi1") : document.querySelector("#fi2"), health === "second" ? secondFighterHealth : firstFighterHealth, fighter)
    isAlive(resolve, health === "second" ? secondFighterHealth : firstFighterHealth, health === "second" ? "Second Fighter looser" : "First Fighter looser",
      health === "second" ? firstFighter.source : secondFighter.source)
    setTimeout(() => makeAttackPosition(position), 100)
  }
  function normalAttack(dem, health, position, fighter, resolve) {
    fightHistory.push({ FighterName: fighter.name, damage: dem })
    health === "second" ? secondFighterHealth -= dem : firstFighterHealth -= dem
    control(position, health, fighter, resolve)
  }
  function Shield(Pblock) {
    Pblock === "Two" ? PlayerTwoBlock = !PlayerTwoBlock : PlayerOneBlock = !PlayerOneBlock
    setTimeout(() => Pblock === "Two" ? PlayerTwoBlock = !PlayerTwoBlock : PlayerOneBlock = !PlayerOneBlock, 1000)
  }
  function Start() {
    // resolve the promise with the winner when fight is over
    const listener = (event) => {
      codeLine.push(event.code)
      //block
      if (event.code === controls.PlayerOneBlock) {
        fightHistory.push({ FighterName: firstFighter.name, damage: "0/block" })
        Shield("One")
      }
      if (event.code === controls.PlayerTwoBlock) {
        fightHistory.push({ SecondName: secondFighter.name, damage: "0/block" })
        Shield("Two")
      }
      //attack common
      if (event.code === controls.PlayerOneAttack && !PlayerOneBlock)
        !PlayerTwoBlock ? normalAttack(getDamage(firstFighter, secondFighter), "second", "right", secondFighter, alert) : PlayerTwoBlock = !PlayerTwoBlock
      if (event.code === controls.PlayerTwoAttack && !PlayerTwoBlock)
        !PlayerOneBlock ? normalAttack(getDamage(secondFighter, firstFighter), "first", "left", firstFighter, alert) : PlayerOneBlock = !PlayerOneBlock
      //attack special
      if (codeLine.length === 3) comdoAttack(alert)
    }
    document.addEventListener("keydown", listener)

    showFighterIndicator(document.body.querySelector("#fi1"), firstFighterHealth)
    showFighterIndicator(document.body.querySelector("#fi2"), secondFighterHealth)
  }
  return (
    <div className={"contFight"}>
      <div className={"arena___left-fighter"}>
        <div id="fi1" className={"left-fighter-indicator"} />
        <h2>{firstFighter.name}</h2>
      </div>
      <div className={"arena___right-fighter"} >
        <div id="fi2" className={"right-fighter-indicator"} />
        <h2>{secondFighter.name}</h2>
      </div>
    </div>
  )
}
export default ArenaContainer;

function makeAttackPosition(position) {
  document.querySelector(`.arena___${position}-fighter`).classList.toggle("arena___attack")
}

function complex(type, firstFighterHealth, firstFighter) {
  showFighterIndicator(type, firstFighterHealth)
  showProg(type, firstFighterHealth, firstFighter)
}

function lockComdo(flag) {
  flag === "FSA" ? isfirstFSA = false : issecondFSA = false
  setTimeout(() => { flag === "FSA" ? isfirstFSA = true : issecondFSA = true }, 10000)
}

function winInfo(params) {
  return `The fight is over. ${params}`
}

function showFighterIndicator(ind, health) {
  ind.innerText = health.toFixed(0) + "HP"
}
function showProg(path, health, fighter) {
  const
    pr = (health * 100) / fighter.health;
  path.style.width = pr + '%'
  if (pr <= 70)
    path.style.backgroundColor = "#6db100";
  if (pr <= 40)
    path.style.backgroundColor = "#b15000";
  if (pr <= 10)
    path.style.backgroundColor = "#eb0505";
}
function isAlive(resolve, health, message) {
  if (health <= 0) {
    if (window.confirm("Do you want to save this fight")) {
      createFight({ fightHistory: fightHistory })
    }
    resolve(winInfo(message));
    window.location.href="/"
  }
}
function getDamage(attacker, defender) {
  // return damage
  let dem = getHitPower(attacker) - getBlockPower(defender);
  dem < 0 && (dem = 0)
  return dem
}

function getHitPower(fighter) {
  // return hit power
  return fighter.power * (Math.random() + 1)
}

function getBlockPower(fighter) {
  // return block power
  return fighter.defense * (Math.random() + 1)
}