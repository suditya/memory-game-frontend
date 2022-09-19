<template>
    <div>
        <NavBar />
        <div class="game-starter">
            <h1 class="blink">{{ msg1 }} {{ msg2 }} {{ msg3 }} {{ msg4 }}</h1>
            <h1 class="game-heading">{{ heading1 }} {{ heading2 }}</h1>
            <h1 class="game-heading">{{ heading3 }}</h1>
            <h1 class="game-icon blink">{{ heading4 }}</h1>
            <router-link v-show="gameButton" class="start-button " to="/level">
                play
            </router-link>
        </div>
    </div>
</template>

<script>
import NavBar from './NavBar.vue';
export default {
    components: { NavBar },
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
            gameButton: false
        }
    },
    created() {
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
        }, 1600);
        setTimeout(() => {
            this.heading2 = "Card";
        }, 2000);
        setTimeout(() => {
            this.heading3 = "Game";
        }, 2400);
        setTimeout(() => {
            this.heading4 = "🎮";

        }, 2800);
        setTimeout(() => {
            this.gameButton = true;
        }, 3200);

    }
}
</script>

<style scoped>
/* body {
    margin: 0;
    color: #4d4d4d;
    font-family: Open Sans, sans-serif;
    letter-spacing: 1px;
    font-weight: 300;
    font-size: 15px;
} */

.game-starter {
    height: 100vh;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    align-items: center;
    padding-top: 9%;
}

.blink {
    font-size: 5em;
    color: #00ff88;
    text-align: center;
    animation: animate 1.5s linear infinite;
}

/* .blink {
    animation: blinker 1s infinite;
} */

@keyframes blinker {
    from {
        opacity: 1.0;
    }

    50% {
        opacity: 0.5;
    }

    to {
        opacity: 1.0;
    }
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


.game-heading {
    color: #d11423;
    font-size: 90px;
    font-weight: bold;
    text-shadow: 2px 1px 2px #37e292;
    flex-wrap: nowrap;
    text-align: center;
}

.game-icon {
    font-size: 90px;
    margin-bottom: 14px;
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
    text-align: center;
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

@media screen and (max-width: 680px) {
    .blink {
        font-size: 5em;
        color: #00ff88;
        font-size: 60px;
        font-weight: 900;
        text-align: center;
        -webkit-animation: animate 1.5s linear infinite;
        animation: animate 1.5s linear infinite;
    }

    .game-starter {
        padding-top: 28%;
        align-items: center;
    }

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
        background-color: black;
        color: #d14949;
        box-shadow: 0px 0px 20px 10px;
        transition: 0.4s;
        border: 2px solid #f7f7f7;
    }

}
</style>