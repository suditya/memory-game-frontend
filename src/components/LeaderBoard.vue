<template>
  <div>
    <NavBar />
    <div class="leader">
      <h1 class="header">🏆 Global Leader Board 🏆</h1>
    </div>
    <div class="game-level">
      <div class="level-heading">
        <h4 style="text-align:center ; font-weight: 700;"> Game Level : 
          <span v-show="gameLevel=='Easy'" class="easy">🟢Easy</span>
          <span v-show="gameLevel=='Medium'" class="medium">🟠Medium</span>
          <span v-show="gameLevel=='Hard'" class="hard">🔴Hard</span> 
        </h4>
      </div>
      <div class="selection"><select v-model="gameLevel" class="select-level" style=" margin-left:1%" name="" id="">
        <option value="Easy" selected>select level
        </option>
          <option  value="Easy">🟢Easy</option>
          <option value="Medium">🟠Medium</option>
          <option value="Hard">🔴Hard</option>
        </select></div>

    </div>
    <!-- {{filteredPlayersRanking}} -->
    <div class="search-wrapper">
      <select v-model="searchCriteria" class="searchCriteria" style="width:32%; margin-right:1%" name="" id="">
        <option value="All" selected>search players
        </option>
        <option value="All">All</option>
        <option value="search by name">search by name</option>
        <option value="search by country">search by country</option>
      </select>
      <input v-show="searchCriteria == 'search by name'" type="text" v-model="search" placeholder="search by name" />
      <select v-show="searchCriteria == 'search by country'" name="" class="flags" :required="true"
        v-model="choosenCountry">
        <option value="" disabled selected>search by country
        </option>
        <option class="countryInput" v-for="(country, index) in countries " :key="index">
          {{ country.name }}|{{ country.emoji }} </option>
      </select>
    </div>
    <div class="loading" v-if="loadingShow==true">
      <img src="../assets/images/image_processing20210906-11731-hat7da.gif" alt="">
    </div>
    <div v-else>
      <nav aria-label="pagination-container">
        <ul class="pagination">
          <li class="">
            <button type="button" class="page-link"  :disabled="page==1" @click="page--"> Previous </button>
          </li>
          <!-- <li class="">
            <button type="button" :key="pageNumber" class="page-link" v-for="pageNumber in pages.slice(page-1, page+1)"
              @click="page = pageNumber"> {{pageNumber}} </button>
          </li> -->
          <li class="">
            <button type="button" @click="page++" :disabled="page >= pages.length" class="page-link"> Next </button>
          </li>
        </ul>
      </nav>
      <!-- showing all the rankings and the players with their scores-->
      <div class="table-container">
        <table v-if="showPlayers.length > 0" class="rwd-table">
          <tbody>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Turns</th>
              <th>Time</th>
            </tr>
            <tr v-for="(playerObj, index) in showPlayers" :key="index">
              <th :class="(playerObj.name == loggedinPlayer) ? 'personal' : ''" v-if="getRank(index) == 1">
                🥇{{getRank(index)}}</th>
              <th :class="(playerObj.name == loggedinPlayer) ? 'personal' : ''" v-else-if="getRank(index) == 2">🥈{{
              getRank(index)}}
              </th>
              <th :class="(playerObj.name == loggedinPlayer) ? 'personal' : ''" v-else-if="getRank(index) == 3">🥉{{
              getRank(index) }}
              </th>
              <th :class="(playerObj.name == loggedinPlayer) ? 'personal' : ''" v-else>{{ getRank(index) }}</th>
              <th :class="(playerObj.name == loggedinPlayer) ? 'personal' : ''">
                {{ playerObj.countryEmoji }}{{ playerObj.name }}</th>
              <th :class="(playerObj.name == loggedinPlayer) ? 'personal' : ''">{{ playerObj.lowScore }}</th>
              <th :class="(playerObj.name == loggedinPlayer) ? 'personal' : ''">{{ playerObj.time }}</th>
            </tr>
          </tbody>
        </table>
        <table v-else class="rwd-table">
          <div class="nodata">No result found 😔</div>
        </table>

      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable 
import { getEasyLeaderboard } from "@/services/getEasyLeaderboard";
import { getMediumLeaderboard } from "@/services/getMediumLeaderboard";
import { getHardLeaderboard } from "@/services/getHardLeaderboard";
import * as nations from '../assets/nations/flags.json'
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
      searchCriteria: "All",
      page: 1,
      perPage: 10,
      pages: [],
      numberOfPlayers: 0,
      rank: 0,
      loadingShow: true,
      gameLevel: "Easy",
      easyResult: [],
      mediumResult: [],
      hardResult: []
    }
  },
  methods:
  {

    async getPlayersRanking() {
      try {

        this.easyResult = await getEasyLeaderboard();

        this.mediumResult = await getMediumLeaderboard();
        this.hardResult = await getHardLeaderboard();
        setTimeout(() => {
          this.loadingShow = false;
        }, 1000)
        // this.filteredPlayersRanking()
        // console.log(easyR)
        this.easyResult.data.sort((a, b) => a.lowScore - b.lowScore);
        this.playersRanking = this.easyResult.data;
        this.mediumResult.data.sort((a, b) => a.lowScore - b.lowScore);
        this.hardResult.data.sort((a, b) => a.lowScore - b.lowScore);


      }
      catch (err) {
        console.log(err);
      }
    },

    paginate() {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return this.filteredPlayersRanking.slice(from, to)
    },
    setPages() {
      let numberOfPages = Math.ceil(this.numberOfPlayers / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    getRank(index) {
      return index + 1 + (this.perPage * (this.page - 1))
    },
    filterByLevel() {
      let players;
      
      let choosenCountryEmoji = this.choosenCountry.split("|")[1];

      if (this.gameLevel == "Easy") players = this.easyResult.data;
      else if (this.gameLevel == "Medium") players = this.mediumResult.data;
      else players = this.hardResult.data;


      if (this.searchCriteria == "search by name" && this.search) {

        let res = players.filter(player => {
          return (player.name.toLowerCase().includes(this.search.toLowerCase()));
        })
        this.numberOfPlayers = res.length;
        this.setPages();
        return res;

      }
      else if (this.searchCriteria == "search by country" && choosenCountryEmoji) {

        let res = players.filter(player => {
          return (player.countryEmoji.includes(choosenCountryEmoji));
        })
        this.numberOfPlayers = res.length;
        this.setPages();
        return res;

      }
      else {

        let res = players;
        this.numberOfPlayers = res.length;
        this.setPages();
        return res;

      }
    },

  },
  computed: {
    showPlayers() {
      return this.paginate();
    },
    filteredPlayersRanking() {
      return this.filterByLevel()
    }
  },
  created() {
    this.loggedinPlayer = localStorage.getItem('userName');
    this.getPlayersRanking();
    this.filteredPlayersRanking();
  },
  components: { NavBar }
}
</script>

<style>
@import 'https://fonts.googleapis.com/css?family=Open+Sans:600,700';

*:focus {
  outline: none;
}

* {
  font-family: 'Open Sans', sans-serif;
}

.game-level {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.select-level {
  padding: 8px;
  border-radius: 16px;
}

.level-heading {
  margin-right: 20px;
}
.easy, .medium, .hard 
{
  padding: 0px 8px;
  border-radius: 10px;
  background-color: white;
}
.easy
{
  color: green;
}
.medium
{
  color: orange;
}
.hard{
  color: red;
}
.loading {
  display: flex;
  align-content: center;
  justify-content: center;
  transition: all .8s linear;
}

.personal {
  background-color: rgb(220 166 141);
}

.pagination {
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
  justify-content: center;
  margin: 13px auto 0px auto;

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

button.page-link {
  display: inline-block;
}

button.page-link {
  font-size: 20px;
  color: black;
  font-weight: 500;
  border-radius: 5px;
  background-color: lightgrey;
  margin-right: 1.5px;
  padding: 6px 15px;
}

.page-link:hover {
  z-index: 2;
  color: #f4f6f9;
  text-decoration: none;
  background-color: #000000;
  border-color: #000000;

}

.page-link:focus {
  box-shadow: none;
}

.offset {
  width: 500px !important;
  margin: 20px auto;
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
}

.nodata {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  font-size: 23px;
}

.search-wrapper input,
.search-wrapper select,
.search-wrapper option {
  padding: 8px 12px;
  color: black;
  background-color: white;
  border: 1px solid rgba(100, 100, 100, 0.2);
  transition: .15s all ease-in-out;
  width: 45%;
  margin-top: 5px;
  border-radius: 8px;

}

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
</style>