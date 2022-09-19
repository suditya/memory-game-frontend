<template>
  <div>
    <div class="nav-bar">
      <div class="left list-unstyled">
        <router-link to="/" class="link-plain left-item" style="margin-right:30px">
          <div>Game</div>
        </router-link>
        <router-link to="/leaderboard" class="link-plain left-item" style="margin-right:30px">
          <div>LeaderBoard</div>
        </router-link>
        <router-link to="/level" class="link-plain left-item">
          <div>Level</div>
        </router-link>
      </div>
      <div class="right list-unstyled">
        <div v-if="this.fullName" id="hello-user">hello! 👋{{ this.fullName }}{{ this.emoji }}</div>
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
        <h3 v-show="this.fullName">👋{{ this.fullName }}{{ this.emoji }}</h3>
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
      <router-link to="/level" class="nav-link">
        Level
      </router-link>
      <router-link to="/leaderboard" class="nav-link">
        LeaderBoard
      </router-link>

      <!-- <div  id="hello-user">hello 😉{{localStorage.getItem('userName')}}👋!</div> -->
      <router-link to="/register" class="nav-link">
        Register
      </router-link>
      <span class="nav-link" v-if="loggedIn == true" @click="logout">Logout</span>
      <span class="nav-link" @click="loginRedirect">Login</span>
    </div>
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
      hamContent:false,
      accountDropdown:false,
      accountEdit:false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("emailID");
      localStorage.removeItem("userName");
      this.$router.push({ path: "/register" });
      window.location.reload()
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
.nav-link {
    display: block;
    color: black;
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

.account-image {
  border-radius: 29px;
  height: 42px;
  margin-left: 20px;
  background-color: white;
  cursor: pointer;

}

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

.account-dropdown {
  top: 13%;
  background-color: #ffffff00;
  z-index: 1000;
  text-align: center;
  /* border: 1px solid grey; */
  /* padding: 0px 0px; */
  right: -2.5%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: absolute;
  align-content: center;
  justify-content: center;
  align-items: center;
  transition: all .4s;

}

.update,
.delete {
  margin: 1px auto;
  border-radius: 23px;
  background-color: dimgrey;
  color: white;
  width: 69%;
  padding: 15px 12px;
  cursor: pointer;
}

.delete:hover {
  background-color: red;
}

.update:hover {
  background-color: #69b37c;
}

@media only screen and (max-width:880px) {

  label {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }

  .nav-close-button {
    font-weight: 900;
    position: relative;
    top: 0%;
    border: none;
    font-size: 53px;
    /* background-color: #00ff88; */
    right: -31%;
    background-color: white;
    transition: all .4s ease-in-out;
  }

  .nav-close-button:hover {
    padding: 0px 25px;
    border-radius: 53px;
    background-color: #49505712;
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
    height: 64%;
    width: 48%;
    font-weight: 800;
    border-bottom-left-radius: 15px;
    z-index: 1000;
    border-top-left-radius: 11px;
    right: 0;
    font-size: 25px;
    flex-direction: column;
    align-items: center;
    padding: auto 2px;
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
    top: 1.5%;
    right: -1%;
    display: flex;
    padding: 0% 5%;
    transition: all cubic-bezier(0.25, 0.46, 0.45, 0.94)s ease-in-out;
    align-content: center;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    transform: rotate(180deg);
  }

  .account-delete {

    position: absolute;
    top: 42%;
    height: 27%;
    left: 14%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 48px 2px;
    background-color: antiquewhite;
    z-index: 1000;
    border-radius: 22px;
    width: 72%;
    text-align: center;
    margin: 0 auto;

  }

  .yes {
    cursor: pointer;
    margin-right: 60px;
    padding: 13px;
    border: 1px;
    border-radius: 21px;
  }

  .no {
    cursor: pointer;
    padding: 13px;
    border: 1px;
    border-radius: 21px;
  }


}
</style>