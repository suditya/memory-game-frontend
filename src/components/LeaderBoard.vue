<template>
  <div>
    <NavBar />
    <div class="leader">

      <!-- {{getPlayersRanking()}} -->
      <!-- <div v-for="(a,index) in playersRanking" :key="index">
        {{a}}
    </div> -->
      <h1 class="header">🏆 Global Leader Board 🏆</h1>
    </div>

    <div class="search-wrapper">
      <select v-model="searchCriteria" class="searchCriteria" style="width:32%; margin-right:1%" name="" id="">
        <option value="" disabled selected>search
        </option>
        <option value="All">All</option>
        <option value="search by name">search by name</option>
        <option value="search by country">search by country</option>
      </select>
      <!-- {{ searchCriteria }} -->
      <input v-show="searchCriteria == 'search by name'" type="text" v-model="search" placeholder="search by name" />
      <select v-show="searchCriteria == 'search by country'" name="" class="flags" :required="true"
        v-model="choosenCountry">
        <option value="" disabled selected>search by country
        </option>
        <option class="countryInput" v-for="(country, index) in countries " :key="index">
          {{ country.name }}|{{ country.emoji }} </option>
      </select>
    </div>

    <div class="table-container">
      <table v-if="filteredPlayersRanking.length > 0" class="rwd-table">
        <tbody>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Low Score</th>
            <th>Time</th>
          </tr>
          <tr v-for="(playerObj, index) in filteredPlayersRanking" :key="index">
            <th :class="(playerObj.name == loggedinPlayer) ? 'personal' : ''" v-if="index == 0">🥇{{ index + 1 }}</th>
            <th :class="(playerObj.name == loggedinPlayer) ? 'personal' : ''" v-else-if="index == 1">🥈{{ index + 1 }}
            </th>
            <th :class="(playerObj.name == loggedinPlayer) ? 'personal' : ''" v-else-if="index == 2">🥉{{ index + 1 }}
            </th>
            <th :class="(playerObj.name == loggedinPlayer) ? 'personal' : ''" v-else>{{ index + 1 }}</th>
            <th :class="(playerObj.name == loggedinPlayer) ? 'personal' : ''">
              {{ playerObj.countryEmoji }}{{ playerObj.name }}</th>
            <th :class="(playerObj.name == loggedinPlayer) ? 'personal' : ''">{{ playerObj.lowScore }}</th>
            <th :class="(playerObj.name == loggedinPlayer) ? 'personal' : ''">{{ playerObj.time }}</th>
          </tr>
          <div :class="darkMode ? 'dark-theme' : 'light-theme'"></div>
          <!-- :class="darkMode ? 'dark-theme' : 'light-theme'" -->
        </tbody>
      </table>
      <table v-else class="rwd-table">
        <div class="nodata">No result found 🙄</div>
      </table>
    </div>

  </div>
</template>

<script>

// import config from "@/config";
import axios from "axios";
// import from './vue';
import * as nations from '../data/flags.json'
import NavBar from "./NavBar.vue";
export default {
  name: "LeaderBoard",
  data() {
    return {
      playersRanking: [],
      loggedinPlayer: "",
      search: '',
      countries: nations,
      choosenCountry: "",
      searchName: false,
      searchCountry: false,
      searchCriteria: ""
    };
  },
  methods:
  {

    async getPlayersRanking() {
      try {
        const result = await axios.get(
          `${process.env.VUE_APP_BASE_URL}/user/getLeaderBoard`
        );
        console.log(result);

        this.playersRanking = result.data;

        this.playersRanking.sort((a, b) => a.lowScore - b.lowScore);
        console.log(this.playersRanking, "players ranking");

      }
      catch (err) {
        console.log(err);
      }
    },


  },
  computed: {
    filteredPlayersRanking() {
      let choosenCountryEmoji = this.choosenCountry.split("|")[1];
      console.log(choosenCountryEmoji);
      if (this.searchCriteria == "search by name")
        return this.playersRanking.filter(player => {
          return (player.name.toLowerCase().includes(this.search.toLowerCase()));
        })
      else if (this.searchCriteria == "search by country" && choosenCountryEmoji) {
        return this.playersRanking.filter(player => {

          return (player.countryEmoji.includes(choosenCountryEmoji));
        })
      }
      else
        return this.playersRanking;
    }

  },
  created() {
    console.log("started");
    this.getPlayersRanking();
    this.loggedinPlayer = localStorage.getItem('userName');
    // this.insertLeaderBoard();
  },
  components: { NavBar }
}
</script>

<style>
.personal {
  background-color: rgb(220 166 141);
}

.header {
  border: 1px solid grey;
  padding: 9px 0px;
  width: 80%;
  margin: 20px auto;
  text-align: center;
  border-radius: 20px;
  box-shadow: 4px 6px lightgrey;
  font-family: system-ui;
}

.board {
  border: 1px solid grey;
  width: 80%;
  margin: 20px auto;
  border-radius: 20px;
  display: flex;
  padding: 10px 26px;
  /* height: 100vh; */
}

.board-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.row-header {
  font-weight: 700;
}

.searchCriteria {
  width: 32%;
  margin-right: 1%;
}

@import 'https://fonts.googleapis.com/css?family=Open+Sans:600,700';

* {
  font-family: 'Open Sans', sans-serif;
}

.rwd-table {
  margin: auto;
  width: 100%;
  min-width: 100px;
  max-width: 100%;
  border-collapse: collapse;
}

.rwd-table tr {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #f5f9fc;
}

.rwd-table th {
  display: none;
}

.rwd-table td {
  display: block;
}

.rwd-table th,
.rwd-table td {
  text-align: left;
}

.rwd-table {
  color: #333;
  border-radius: .4em;
  overflow: hidden;
}

.rwd-table tr {
  border-color: #d2cece;
}

.rwd-table th,
.rwd-table td {
  padding: .5em 1em;
}

/* @media screen and (max-width: 601px) {
  .rwd-table tr:nth-child(2) {
    border-top: none;
  }
} */

/* @media screen and (min-width: 300px) { */

.rwd-table th,
.rwd-table td {
  display: table-cell;
  padding: .25em .5em;
}

.rwd-table th,
.rwd-table td {
  padding: 1em !important;
}

.table-container {
  display: block;
  text-align: center;
  width: 80%;
  box-shadow: 6px 6px lightgrey;
  border: 1px solid grey;
  margin: 20px auto;
  border-radius: 17px;
  padding: 0px 0px;
  /* height: 100vh; */
}

.search-wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  /* flex-direction: column; */
}

.nodata {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  font-size: 23px;
}

/* .flags {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 9px;
} */

.search-wrapper input,
.search-wrapper select,
.search-wrapper option {
  padding: 8px 12px;
  color: rgba(0, 0, 0, .70);
  border: 1px solid rgba(0, 0, 0, .12);
  transition: .15s all ease-in-out;
  /* background: white; */
  width: 45%;
  margin-top: 5px;
  border-radius: 8px;

}

/* .search-wrapper input:focus {
  outline: none;
  
  padding: 12px 12px;
  color: rgba(0, 0, 0, .70);
  border: 1px solid rgba(0, 0, 0, 0.924);
} */



/* } */
@media screen and (max-width:800px) {
  .table-container {
    width: 100%;
    margin: 20px 0;
    border-radius: 1px;
  }

  .header {
    width: 95%;
    font-size: 170%;
  }
}

/* } */
</style>