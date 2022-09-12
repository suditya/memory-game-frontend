<template>
  <div>
    <NavBar />

    <div v-show="gameStarter == true" class="game-starter">
      <!-- <h1>Let's Play 🤩</h1> -->
      <h1 class="blink">{{ msg1 }} {{ msg2 }} {{ msg3 }} {{ msg4 }}</h1>
      <h1 class="game-heading">{{ heading1 }} {{ heading2 }}</h1>
      <h1 class="game-heading">{{ heading3 }}</h1>
      <h1 class="game-icon blink">{{ heading4 }}</h1>
      <button @click="startGame()" class="start-button">play</button>
    </div>
    <div v-show="gameStarter == false" class="game-container">
      <div class="turns-class">
        <div class="turns">
          <button class="turn-button" style="cursor:default ; outline: none;"
            :class="finish? 'game-start' : 'game-end'">Turns :
            <span :class="finish? 'game-end' : 'game-start'" class="turn-show">{{ turns }}</span>
          </button>
        </div>
        <div class="totalTime">
          <button class="totalTime-button" style="cursor:default ; outline: none;"
            :class="finish||true ? 'game-start' : 'game-end'">Total Time :
            <span :class="finish? 'game-end' : 'game-start'" class="time">{{ min }} : {{ sec
            }}</span>
          </button>
        </div>
      </div>
      <div v-show="gameStarter == false" class="restart">
        <button class="restart-button" id="button-restart" @click="reset" :disabled="!start">
          Restart
        </button>
      </div>
    </div>
    <div v-show="isLoggedIn == false && !closePopup && !gameStarter" class="popup-msg">
      <button class="close" @click="closePopup = true">X</button>
      <p>Please login yourself to save your scores</p>
    </div>

    <div v-show="gameStarter == false" class="row boxing">
      <div v-for="(card, index) in memoryCards" :key="index" id="card-box"
        class="col-md-3 col-sm-4 col-xs-4 mb-2 flip-container" :class="{
          flipped: card.isFlipped,
          matched: card.isMatched,
          shake: animated,
        }" @click="flipCard(card)" @click.prevent="
          playSound(
            'http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3'
          )
        ">
        <div class="memorycard">
          <div class="front"></div>
          <div class="back">
            <span class="mood-emoji">{{ card.emoji }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-show="showWindow == true" id="win-screen" class="">
      <h3>🎯 Nailed It! 🎯</h3>
      <button @click.prevent="closeWindow()" class="close-button">X</button>
      <div class="score click-count">Turns: {{ this.turns }}</div>
      <div class="score low-score">
        Time: {{ this.totalTime.minutes }} : {{ this.totalTime.seconds }}
      </div>
      <div @click="reset()" id="replay-button">Play Again?</div>
      <div v-if="isLoggedIn==true" class="leaderboard-link">See yourself on the <router-link to="/leaderboard">
          Leaderboard🏆</router-link>
      </div>
      <div v-else class="leaderboard-link">Login to see yourself on the <router-link to="/leaderboard">
          Leaderboard🏆</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/style.css";

import MemoryCardGameHeader from "./MemoryCardGameHeader.vue";

import axios from "axios";

import NavBar from "./NavBar.vue";

export default {
  name: "CardComponent",
  data() {
    return {
      msg1: "",
      msg2: "",
      msg3: "",
      msg4: "",
      heading1: "",
      heading2: "",
      heading3: "",
      heading4: "",
      memoryCards: [],
      flippedCards: [],
      finish: false,
      start: false,
      turns: 0,
      totalTime: {
        minutes: 0,
        seconds: 0,
      },
      closePopup: false,
      animated: false,
      i: 0,
      showWindow: false,
      gameStarter: true,
      isLoggedIn: true,
      /* eslint-disable */
      cards: [
        { name: "gorilla", emoji: "🦍" },
        { name: "cat", emoji: "🐈" },
        { name: "turtle", emoji: "🐢" },
        { name: "giraffe", emoji: "🦒" },
        { name: "monkey", emoji: "🐒" },
        { name: "horse", emoji: "🐎" },
      ],
    };
  },
  created() {
    this.reset();
    setTimeout(() => {
      this.msg1 = "Let's";
    }, 400);
    setTimeout(() => {
      this.msg2 = "play";
    }, 800);
    setTimeout(() => {
      this.msg3 = "🤩";
    }, 1200);

    setTimeout(() => {
      this.heading1 = "Memory";
    }, 1500);
    setTimeout(() => {
      this.heading2 = "Card";
    }, 1800);
    setTimeout(() => {
      this.heading3 = "Game";
    }, 2100);
    setTimeout(() => {
      this.heading4 = "🎮";
    }, 2400);

    let user = localStorage.getItem("userName");
    console.log(user, "username");
    if (user) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  },
  methods: {
    startGame() {
      setTimeout(() => {
        this.gameStarter = false;
      }, 300);
    },
    closeWindow() {
      this.showWindow = false;
    },
    playSound(sound) {
      if (sound) {
        let audio = new Audio(sound);
        audio.play();
      }
    },
    flipCard(card) {
      if (!this.start) {
        this._startGame();
      }
      if (card.isMatched || card.isFlipped || this.flippedCards.length === 2)
        return;

      card.isFlipped = true;
      if (this.flippedCards.length < 2) this.flippedCards.push(card);
      if (this.flippedCards.length === 2) {
        this.match(card);
      }
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    match(card) {
      this.turns++;
      if (this.memoryCards.every((card) => card.isMatched === true)) {
        clearInterval(this.interval);
        this.finish = true;
        this.showWindow = true;
      }
      if (this.flippedCards[0].name === this.flippedCards[1].name) {
        setTimeout(() => {
          this.flippedCards.forEach((card) => (card.isMatched = true));
          this.flippedCards = [];
          //All cards matched ?
          if (this.memoryCards.every((card) => card.isMatched === true)) {
            this.finish = true;
            this.showWindow = true;
            // console.log("hello : ",this.i++);
            const name = localStorage.getItem("userName");

            if (name) this.insertLeaderBoard();
            else {
              console.log("login urself to save the scores");
            }
          }
        }, 400);
      } else {
        setTimeout(() => {
          this.animated = true;
        }, 300);
        setTimeout(() => {
          this.flippedCards.forEach((card) => {
            card.isFlipped = false;
          });
          this.flippedCards = [];
          this.animated = false;
        }, 700);
      }
    },
    _startGame() {
      this._tick();
      this.interval = setInterval(this._tick, 1000);
      this.start = true;
    },
    _tick() {
      if (this.finish == true) {
        return;
      }
      if (this.totalTime.seconds !== 59) {
        this.totalTime.seconds++;
        return;
      }
      this.totalTime.minutes++;
      this.totalTime.seconds = 0;
    },
    async insertLeaderBoard() {
      const timeString = this.totalTime.minutes + ":" + this.totalTime.seconds;
      const email = localStorage.getItem("emailID");
      const name = localStorage.getItem("userName");
      const countryEmoji = localStorage.getItem("countryEmoji");

      const credentials = {
        email,
        name,
        lowScore: this.turns,
        time: timeString,
        countryEmoji,
      };
      try {
        const result = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/user/insertLeaderBoard`,
          credentials,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.log("error happend", error);
      }
    },
    reset() {
      this.cards.forEach((card) => {
        this.$set(card, "isFlipped", false);
        this.$set(card, "isMatched", false);
      });
      clearInterval(this.interval);
      
      setTimeout(() => {
        this.memoryCards = [];
        this.memoryCards = this.shuffleArray(
          this.memoryCards.concat(
            JSON.parse(JSON.stringify(this.cards)),
            JSON.parse(JSON.stringify(this.cards))
          )
        );
        this.totalTime.minutes = 0;
        this.totalTime.seconds = 0;
        this.start = false;
        this.finish = false;
        this.turns = 0;
        this.showWindow = false;
        this.flippedCards = [];
      }, 800);
    },
  },
  computed: {
    sec() {
      if (this.totalTime.seconds < 10) {
        return "0" + this.totalTime.seconds;
      }
      return this.totalTime.seconds;
    },
    min() {
      if (this.totalTime.minutes < 10) {
        return "0" + this.totalTime.minutes;
      }
      return this.totalTime.minutes;
    },
  },
  components: { MemoryCardGameHeader, NavBar },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.popup-msg {
  width: 28%;
  padding: 20px 27px;
  position: absolute;
  top: 10%;
  z-index: 1000;
  background-color: #e8e8e8;
  border: 1px solid #f9f7f7;
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
    Helvetica, Arial, "Lucida Grande", sans-serif;
  font-weight: 300;
  margin: 25px;
  text-align: center;
  /* left: 2%; */
  border-radius: 36px;
  right: -2%;
  font-size: 20px;
  color: #000000;
}

.game-end {
  background-color: #3bbb7f;
  color: white;
  padding: 8px;
  border-radius: 6px;
}

.game-start {
  background-color: #f24848;
  color: white;
  padding: 8px;
  border-radius: 6px;
}

button.close {
  padding: 10px;
  font-size: 30px;
  position: relative;
  top: -19px;
  color: black;
  right: -1px;
  transform: rotateX(180);
  transition: all 0.4s ease-in-out;
}

button.close:hover {
  background-color: grey;
  border-radius: 30px;
  outline: none;
}

body {
  margin: 0;
  color: #4d4d4d;
  font-family: Open Sans, sans-serif;
  letter-spacing: 1px;
  font-weight: 300;
  font-size: 15px;
}

.close-button {
  position: relative;
  top: -31.5%;
  right: -45.5%;
  padding: 0px 10px;
  background-color: black;
  color: white;
  font-size: 27px;
  border-radius: 23px;
  /* border-radius: 12px; */
}

.game-container {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 0px 0px;
}

.blink {
  font-size: 5em;
  color: #00ff88;
  text-align: center;
  animation: animate 1.5s linear infinite;
}

.game-icon {
  font-size: 90px;
  margin-bottom: 14px;
}

.turns,
.totalTime,
.restart {
  padding: 0px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.turn-button,
.totalTime-button,
.restart-button {
  align-items: center;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgb(45 35 66 / 40%) 0 2px 4px, rgb(45 35 66 / 30%) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
  box-sizing: border-box;
  color: black;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  -moz-user-select: none;
  user-select: none;
  -webkit-user-select: none;
  white-space: nowrap;
  font-size: 22px;
}

.restart-button {
  background-color: #3bbb7f;
}

.restart-button:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  outline: none;
}

.restart-button:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.restart-button:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}

.turns-class {
  /* d-flex flex-row justify-content-center py-3 */
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 21px;
}

@keyframes animate {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.7;
  }

  100% {
    opacity: 0;
  }
}

.memorycard {
  box-sizing: border-box;
  width: 150px;
  margin: 0 auto;
  display: flex;
  text-align: center;
  justify-content: center;
  /* position: relative; */
}

.start-button {
  padding: 21px 0px;
  width: 12%;
  font-size: 28px;
  font-weight: bold;
  border: 1px solid black;
  background-color: black;
  color: #1b754b;
  box-shadow: 0px 0px 20px 3px;
  font-weight: bold;
  border: 2px solid #1b754b;
  border-radius: 26px;
}

.start-button:hover {
  padding: 21px 0px;
  width: 12%;
  font-size: 28px;
  font-weight: bold;
  border: 1px solid black;
  background-color: black;
  color: #d14949;
  box-shadow: 0px 0px 20px 10px;
  transition: 0.4s;
  font-weight: bold;
  border: 2px solid #f7f7f7;
  border-radius: 26px;
}

.flip-container {
  perspective: 1000px;
  min-height: 120px;
  cursor: pointer;
}

.front,
.back {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.6s;
  -webkit-transform-style: preserve-3d;
  -moz-transition: 0.6s;
  -moz-transform-style: preserve-3d;
  -o-transition: 0.6s;
  -o-transform-style: preserve-3d;
  -ms-transition: 0.6s;
  -ms-transform-style: preserve-3d;
  transition: 0.6s;
  transform-style: preserve-3d;
  top: 0;
  left: 0;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
}

.front {
  width: 150px;
  height: 150px;
  background-color: #000000c7;
  border: 0.5px solid #fff5f5;
  border-radius: 19px;
  box-shadow: 7px 6px 3px 0px #b3b6b4;
}

.front:hover {
  background-color: lightgrey;
  box-shadow: 4px 3px 7px 1px #464141;
}

.back {
  -webkit-transform: rotateY(-180deg);
  -moz-transform: rotateY(-180deg);
  -o-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: center;
}

.flip-container.flipped .back {
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  transform: rotateY(0deg);
}

.flip-container.flipped .front {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

.matched {
  opacity: 0.9;
}

.light-blue {
  background-color: #b6e6ff;
}

.restart {
  display: flex;
  justify-content: center;
}

header {
  background-color: lightpink;
  padding: 0px 8px 0px;
  color: white;
  height: 20%;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.boxing {
  width: 45%;
  margin: 20px auto;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 60px 10px;
  box-shadow: 0px 0px 0px 15px #cacaca;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

.mood-emoji {
  font-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game-heading {
  color: #d11423;
  font-size: 85px;
  font-weight: bold;
  text-shadow: 2px 1px 2px #37e292;
  flex-wrap: nowrap;
  text-align: center;
}

@keyframes shake {

  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

#win-screen {
  height: 32%;
  width: 50%;
  border-radius: 10px;
  margin: auto auto;
  background-color: rgba(230, 230, 250, 0.95);
  position: absolute;
  left: 25.2%;
  top: 49%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.8s;
}

/* #win-screen.visible {
    visibility: visible;
    opacity: 1;
    transition: all 0.8s;
    } */
.game-starter {
  height: 100vh;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}

#replay-button {
  cursor: pointer;
  padding: 15px;
  margin: 10px;
  background-color: #f0f0ff;
  border: 1px solid white;
  border-radius: 5px;
  box-shadow: 0px 0px 3px white;
}

#replay-button:hover {
  background-color: #f8f8ff;
  border: 1px solid white;
  box-shadow: 0px 0px 5px 1px white;
}

@media screen and (max-width: 1600px) {
  .boxing {
    width: 50%;
  }
}

@media screen and (max-width: 1400px) {
  .boxing {
    width: 70%;
  }
}

@media screen and (max-width: 1050px) {
  .boxing {
    width: 90%;
  }

  .start-button,
  .start-button:hover {
    width: 35%;
  }

  .popup-msg {
    width: 50%;
    top: 6%;
    padding: 20px 17px;
    right: -5%;
    font-size: 15px;
  }
}

@media screen and (max-width: 680px) {

  .turn-button,
  .totalTime-button,
  .restart-button {
    align-items: center;
    background-color: #FCFCFD;
    border-radius: 4px;
    border-width: 0;
    box-shadow: rgb(45 35 66 / 40%) 0 2px 4px, rgb(45 35 66 / 30%) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
    box-sizing: border-box;
    color: black;
    font-weight: 300;
    cursor: pointer;
    display: inline-flex;
    font-family: "JetBrains Mono", monospace;
    height: 34px;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 5px;
    padding-right: 5px;
    position: relative;
    text-align: center;
    text-decoration: none;
    -moz-user-select: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    font-size: 11px;
    align-content: center;
    flex-wrap: wrap;
  }

  .restart-button {
    background-color: #3bbb7f;
  }

  .popup-msg {
    width: 50%;
    top: 6%;
    padding: 15px 5px;
    right: -5%;
    font-size: 15px;
  }

  .blink {
    font-size: 5em;
    color: #00ff88;
    font-size: 60px;
    font-weight: 900;
    text-align: center;
    -webkit-animation: animate-1ded894d 1.5s linear infinite;
    animation: animate-1ded894d 1.5s linear infinite;
  }

  #win-screen {
    height: 40%;
    width: 74%;
    border-radius: 10px;
    margin: auto auto;
    background-color: rgba(230, 230, 250, 0.95);
    position: absolute;
    left: 15.2%;
    top: 30%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.8s;
  }

  .close-button {
    top: -31.5%;
    right: -45.5%;
    border-radius: 24px;
  }

  .game-starter {
    height: 100vh;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    flex-wrap: nowrap;
  }

  /* 
    .memorycard {
        box-sizing: border-box;
        width: 150px;
        margin: 0 auto;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
    } */

  .start-button {
    width: 31%;
  }

  .game-heading {
    color: #d11423;
    font-size: 70px;
    font-weight: bold;
    text-shadow: 2px 1px 2px #37e292;
    flex-wrap: nowrap;
    text-align: center;
  }

  .start-button:hover {
    width: 31%;
    /* color: #ffffff; */
    background-color: black;
    color: #d14949;
    box-shadow: 0px 0px 20px 10px;
    transition: 0.4s;
    border: 2px solid #f7f7f7;
  }

  .flip-container {
    -webkit-perspective: 5000px;
    -moz-perspective: 5000px;
    -o-perspective: 5000px;
    perspective: 5000px;
    min-height: 120px;
    cursor: pointer;
  }

  .front,
  .back {
    width: 75px;
    height: 75px;
    top: 0;
    position: absolute;
    /* margin-right: 35%; */
    left: 28%;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  .front:hover {
    background-color: lightcoral;
    box-shadow: 4px 3px 7px 1px #464141;
  }

  div#card-box {
    width: 22%;
  }

  header {
    background-color: lightpink;
    padding: 0px 8px 0px;
    color: white;
    height: 20%;
    /* height: 100vh; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .boxing {
    width: 100%;
    margin: 18px 0;
    padding: 15px 0px;
  }

  .shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
  }

  .mood-emoji {
    /* line-height: rem; */
    font-size: 59px;
    /* margin-bottom: .25rem; */
  }
}
</style>