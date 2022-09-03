<template>
  <div>
    <div class="nav-bar">
      <div class="left list-unstyled">
        <router-link to="/" class="link-plain left-item" style="margin-right:30px">
          <div>Game</div>
        </router-link>
        <router-link to="/leaderboard" class="link-plain left-item">
          <div>LeaderBoard</div>
        </router-link>
      </div>
      <!-- <div class="middle list-unstyled ">
        <router-link to="/" class="link-plain middle-item" style="margin-right:30px">
          <div class="game-heading">Memory Card Game</div>
        </router-link>
      </div> -->
      <div class="right list-unstyled">
        <div v-if="this.fullName" id="hello-user">hello! 👋{{  this.fullName  }}{{  this.emoji  }}</div>
        <!-- <div  id="hello-user">hello 😉{{localStorage.getItem('userName')}}👋!</div> -->
        <router-link to="/register" class="link-plain right-item" style="margin-right:30px">
          <div>Register</div>
        </router-link>
        <div v-if="loggedIn == true" @click="logout" id="log-out">Logout</div>
        <div v-else @click="loginRedirect" id="log-in">Login</div>
      </div>
    </div>
    <div class="ham-container">
      <div class="ham-menu-heading">
        <h3 v-show="this.fullName" >hello {{  this.fullName  }}{{  this.emoji  }}</h3>
      </div>
      <div class="hamburger-menu" @click="hamContent = (1^hamContent)">
        <a href="#">
          <div class="ham-menu-icon"></div>
          <div class="ham-menu-icon"></div>
          <div class="ham-menu-icon"></div>
        </a>
      </div>
    </div>
    <!-- v-on:click="isHidden = true" -->
    <div v-show="hamContent==true" class="ham-content">
      <button class="nav-close-button" @click="hamContent = (1^hamContent)">X</button>
      <router-link to="/" class="nav-link">
        Game
      </router-link>
      <router-link to="/leaderboard" class="nav-link">
        LeaderBoard
      </router-link>
     
      <!-- <div  id="hello-user">hello 😉{{localStorage.getItem('userName')}}👋!</div> -->
      <router-link to="/register" class="nav-link">
        Register
      </router-link>
      <span v-if="loggedIn == true" @click="logout">Logout</span>
      <span v-else @click="loginRedirect">Login</span>
    </div>
    <!-- <nav  class="tabNav" role="navigation">
      <div id="menuToggle"> -->
    <!--
    A fake / hidden checkbox is used as click reciever,
    so you can use the :checked selector on it.
    -->
    <!-- <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span> -->

    <!--
    Too bad the menu has to be inside of the button
    but hey, it's pure CSS magic.
    -->
    <!-- <ul id="menu">
          <a href="#">
            <li>Home</li>
          </a>
          <a href="#">
            <li>About</li>
          </a>
          <a href="#">
            <li>Info</li>
          </a>
          <a href="#">
            <li>Contact</li>
          </a>
          <a href="https://erikterwan.com/" target="_blank">
            <li>Show me more</li>
          </a>
        </ul>
      </div>
    </nav> -->
  </div>
</template>
<!-- background-color: lightcoral ; color: white; -->
<script>


export default {
  name: 'NavBar',
  data() {
    return {
      fullName: "",
      loggedIn: false,
      emoji: "",
      hamContent:false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("emailID");
      localStorage.removeItem("userName");
      this.$router.push({ path: "/register" });
      // reload
    },
    loginRedirect() {
      this.$router.push({ path: "/login" });
    }
  },
  created() {
    this.fullName = localStorage.getItem('userName');
    if (this.fullName.length != 0) this.loggedIn = true;
    this.emoji = localStorage.getItem('countryEmoji');
    console.log("country emoji", this.emoji);
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#hello-user {
  margin-right: 45px;
  color: #00ff88;
}

#log-out {
  color: red;
  border: 2px solid;
  padding: 2px 8px;
  border-radius: 12px;
  cursor: pointer;
}

#log-in {
  color: #00ff88;
  border: 2px solid;
  padding: 2px 8px;
  border-radius: 12px;
  cursor: pointer;
}

#log-in:hover {
  background-color: #00ff88;
  color: black;
  transition: 0.5s;
}

#log-out:hover {
  background-color: red;
  color: black;
  transition: 0.5s;
}

.nav-bar {
  display: flex;
  padding: 21px 30px;
  background-color: black;
  font-size: 22px;
}

.link-plain {
  list-style: none;
  color: white;
}

.right {
  display: flex;
  width: 60%;
  justify-content: right;
  align-items: center;
  padding: 0px 10px;
}

.left {
  display: flex;
  width: 40%;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 10px;
}

.left a,
.right a {}

.left a:hover,
.right a:hover {
  /* display: block; */

}

.links {}

.links a {}

.heading {}

.ham-menu-icon {
  width: 35px;
  height: 5px;
  background-color: black;
  margin: 6px 0;
  transition: all .4s ease-in-out;
}

.ham-container {
  display: none;
  padding: 20px 23px;
  background-color: #e1dcdc;
}

.hamburger-menu {
  position: absolute;
  top: 2px;
  right: 1px;
  display: none;
}

.left-item,
.right-item {
  text-decoration: none;
  border: 2px solid white;
  border-radius: 11px;
  padding: 2px 8px;
  cursor: pointer;
}

.left-item:hover,
.right-item:hover {
  background-color: white;
  color: black;
  transition: 0.5s;
  padding: 2px 8px;
  border: 2px solid;
}

.tabNav {
  display: none;
}

.router-link-exact-active {
  background-color: white;
  color: black;
  transition: 0.5s;
  padding: 2px 8px;
  border: 2px solid;
}

@media only screen and (max-width:880px) {

  .nav-close-button {
    position: relative;
    top: -10%;
    border: none;
    font-size: 46px;
    right: -39%;
    background-color: white;
    transition: all .4s ease-in-out;
  }
  .start-button {
    width: 35%;
  }

  .tabNav {
    display: block;
  }

  .nav-bar {
    display: none;
  }

  .ham-content {
    transition: all .4s ease-in-out;
    display: flex;
    top: 0;
    height: 38%;
    justify-content: center;
    width: 48%;
    font-weight: 900;
    border-bottom-left-radius: 15px;
    z-index: 1000;
    /* border-left: 20px; */
    border-left-radius: 14px;
    /* border-radius: 15px; */
    border-top-left-radius: 11px;
    right: 0;
    font-size: 25px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 7px;
    background-color: rgb(255, 255, 255);
    color: black;
    position: absolute;
  }

  .ham-menu-icon {
    width: 51px;
    height: 8px;
    background-color: white;
    margin: 6px 0;
    transition: all .4s ease-in-out;
  }

  .ham-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 37px 2px;
    align-content: space-around;
    justify-content: space-between;
    /* align-items: flex-start; */
    color: white;
    background-color: black;
    margin: 0px 0px 0px 0px;
    /* border: 5px solid white; */
    /* /* border-radius: 10px; */
  }

  .hamburger-menu {
    position: absolute;
    top: 19px;
    /* right: 8px; */
    display: flex;
    /* border: 1px solid grey; */
    padding: 6px 21px;
    transition: all .4s ease-in-out;
    /* /* border-radius: 6px; */
  }

  #menuToggle {
    display: block;
    position: absolute;
    top: 15px;
    left: 23px;
    background-color: #080808;
    z-index: 1;
    user-select: none;
  }

  #menuToggle a {
    text-decoration: none;
    color: #232323;

    transition: color 0.3s ease;
  }

  #menuToggle a:hover {
    color: tomato;
  }


  #menuToggle input {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;

    cursor: pointer;

    opacity: 0;
    /* hide this */
    z-index: 2;
    /* and place it over the hamburger */

    -webkit-touch-callout: none;
  }

  /*
 * Just a quick hamburger
 */
  #menuToggle span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;

    background: #cdcdcd;
    border-radius: 3px;

    z-index: 1;

    transform-origin: 4px 0px;

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0),
      background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0),
      opacity 0.55s ease;
  }

  #menuToggle span:first-child {
    transform-origin: 0% 0%;
  }

  #menuToggle span:nth-last-child(2) {
    transform-origin: 0% 100%;
  }

  /* 
 * Transform all the slices of hamburger
 * into a crossmark.
 */
  #menuToggle input:checked~span {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: #232323;
  }

  /*
 * But let's hide the middle one.
 */
  #menuToggle input:checked~span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }

  /*
 * Ohyeah and the last one should go the other direction
 */
  #menuToggle input:checked~span:nth-last-child(2) {
    transform: rotate(-45deg) translate(0, -1px);
  }

  /*
 * Make this absolute positioned
 * at the top left of the screen
 */
  #menu {
    position: absolute;
    width: 300px;
    margin: -100px 0 0 -50px;
    padding: 50px;
    padding-top: 125px;

    background: #ededed;
    list-style-type: none;
    -webkit-font-smoothing: antialiased;
    /* to stop flickering of text in safari */

    transform-origin: 0% 0%;
    transform: translate(-100%, 0);

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0);
  }

  #menu li {
    padding: 10px 0;
    font-size: 22px;
  }

  /*
 * And let's slide it in from the left
 */
  #menuToggle input:checked~ul {
    transform: none;
  }
}
</style>