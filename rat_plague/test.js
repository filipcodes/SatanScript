"use strict";
const grid = document.querySelector(".simulation__grid"),
  dayEl = document.querySelector(".day-count"),
  deathEl = document.querySelector(".death-count"),
  infectedEl = document.querySelector(".inf-count"),
  curedEl = document.querySelector(".cured-count"),
  startEl = document.querySelector(".start-btn"),
  stopEl = document.querySelector(".stop-btn"),
  restartEl = document.querySelector(".restart-btn");

let deaths = 0;
let infected = 0;
let cured = 0;
let people = [];
let day = 1;

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Leafer {
  constructor(num) {
    this.num = num;
    this.contagious = 0;
    this.cured = 0;
    this.dead = false;
    this.metVirus = 0;
  }
  die() {
    this.metVirus = 0;
    this.dead = true;
    deaths += 1;
    infected -= 1;
    this.contagious = 0;
    document
      .querySelector(`.simulation__grid :nth-child(${this.num}`)
      .classList.add("dead");
    document
      .querySelector(`.simulation__grid :nth-child(${this.num}`)
      .classList.remove("contagious");
    document
      .querySelector(`.simulation__grid :nth-child(${this.num}`)
      .classList.remove("metVirus");
  }
  getInfected() {
    if (this.contagious > 0) return;
    // console.log(`Number ${this.num} got infected`);
    this.contagious = 1;
    infected += 1;

    document
      .querySelector(`.simulation__grid :nth-child(${this.num}`)
      .classList.add("contagious");
    document
      .querySelector(`.simulation__grid :nth-child(${this.num}`)
      .classList.remove("metVirus");
  }
  meetVirus() {
    if (this.contagious || this.metVirus) return;
    this.metVirus = 1;
    // console.log(`number ${this.num} met the virus`);
    document
      .querySelector(`.simulation__grid :nth-child(${this.num}`)
      .classList.add("metVirus");
  }

  infect() {
    // people[(1, randomNum(1, people.length - 1))];
    for (let i = 1; i <= randomNum(1, 3); i++) {
      let target = people[randomNum(1, people.length - 1)];
      if (target.metVirus == 0) {
        people[randomNum(1, people.length - 1)].meetVirus();
      }
    }
  }
  getCured() {
    cured += 1;
    infected -= 1;
    this.contagious = 0;
    this.cured = 1;
    document
      .querySelector(`.simulation__grid :nth-child(${this.num}`)
      .classList.remove("contagious");
  }
  getHealthy() {
    // console.log(`NUmber ${this.num} got healthy`);
    document
      .querySelector(`.simulation__grid :nth-child(${this.num}`)
      .classList.remove("metVirus");
  }
}

function addLeafers() {
  //generate 10 leafers
  for (let i = 0; i < 101; i++) {
    people.push(new Leafer(i));
  }
}
addLeafers();

function updateDay() {
  day += 1;
  // console.log(`Day: ${day}`);
  let target = randomNum(1, people.length - 1);
  //EVERY INFECTED PERSON CALLS THE INFECT METHOD AND THUS GIVES THE MET VIRUS 1 to 2 people
  people
    .filter((person) => person.contagious > 0)
    .forEach((person) => {
      //INFECT 1 OR TWO PEOPLE
      person.infect();
      person.contagious += 1;
      // console.log(
      //   `Number ${person.num}'s contagious got to ${person.contagious}`
      // );
      if (person.contagious == 10) {
        person.contagious = 0;
        if (randomNum(0, 1)) {
          // console.log(`Number ${person.num} got killed`);
          person.die();
          people = people.filter((person) => person.dead == false);
        } else {
          person.getCured();
        }
      }
    });

  //every metVirus person gets + metvirus
  people
    .filter((person) => person.metVirus > 0)
    .forEach((person) => {
      person.metVirus += 1;
      // console.log(`${person.num}'s metvirus is now ${person.metVirus}`);
      if (person.metVirus == 4) {
        person.metVirus = 0;
        if (randomNum(0, 1)) {
          person.getInfected();
        } else {
          person.getHealthy();
        }
      }
    });
  // console.log(people);
  dayEl.innerHTML = day;
  deathEl.innerHTML = deaths;
  infectedEl.innerHTML = infected;
  curedEl.innerHTML = cured;
}
// infect a random person at the start
people[randomNum(1, 100)].getInfected();

let dayInterval;
startEl.addEventListener("click", () => {
  if (dayInterval) return;
  dayInterval = setInterval(updateDay, 1000);
});

stopEl.addEventListener("click", () => {
  clearInterval(dayInterval);
  dayInterval = false;
});

restartEl.addEventListener("click", () => {
  //stops the callback
  clearInterval(dayInterval);
  dayInterval = false;
  // reset all values
  deaths = 0;
  infected = 0;
  cured = 0;
  people = [];
  day = 1;
  dayEl.innerHTML = day;
  deathEl.innerHTML = deaths;
  infectedEl.innerHTML = infected;
  curedEl.innerHTML = cured;

  addLeafers();

  people.forEach((person) => {
    if (!person.num == 0) {
      document
        .querySelector(`.simulation__grid :nth-child(${person.num})`)
        .classList.remove("dead");
      document
        .querySelector(`.simulation__grid :nth-child(${person.num})`)
        .classList.remove("contagious");
      document
        .querySelector(`.simulation__grid :nth-child(${person.num})`)
        .classList.remove("metVirus");
    }
  });
  people[randomNum(1, 100)].getInfected();
});
//TODO Integrate immunity after getting sick
//TODO MAKE A CURED COUNTER
