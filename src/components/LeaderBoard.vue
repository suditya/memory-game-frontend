<template>
  <div>
    <NavBar />
    <div class="leader">
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
      <input v-show="searchCriteria == 'search by name'" type="text" v-model="search" placeholder="search by name" />
      <select v-show="searchCriteria == 'search by country'" name="" class="flags" :required="true"
        v-model="choosenCountry">
        <option value="" disabled selected>search by country
        </option>
        <option class="countryInput" v-for="(country, index) in countries " :key="index">
          {{ country.name }}|{{ country.emoji }} </option>
      </select>
    </div>
    <nav aria-label="pagination-container">
      <ul class="pagination">
        <li class="">
          <button type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </button>
        </li>
        <li class="">
          <button type="button" :key="pageNumber" class="page-link" v-for="pageNumber in pages.slice(page-1, page+3)"
            @click="page = pageNumber"> {{pageNumber}} </button>
        </li>
        <li class="">
          <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
        </li>
      </ul>
    </nav>
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
</template>

<script>
/*eslint-disable */ 
import axios from "axios";
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
      searchCriteria: "All",
      page: 1,
      perPage: 10,
      pages: [],
      numberOfPlayers:0,
      rank:0
    }
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
   
    paginate() {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      console.log(page, "page", perPage, "perPage", from , "from", to , "to");
      return this.filteredPlayersRanking.slice(from, to)
    },
    setPages() {
      let numberOfPages = Math.ceil(this.numberOfPlayers / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    getRank(index)
    {
      return index+1+(this.perPage*(this.page-1))
    },
  },
  computed: {
    showPlayers() {
      return this.paginate();
    },
    filteredPlayersRanking() {
      let choosenCountryEmoji = this.choosenCountry.split("|")[1];
      // console.log(choosenCountryEmoji);
      if (this.searchCriteria == "search by name"){
        
        let res = this.playersRanking.filter(player => {
          return (player.name.toLowerCase().includes(this.search.toLowerCase()));
        })
        this.numberOfPlayers=res.length;
        this.setPages();
        return res;
      }
      else if (this.searchCriteria == "search by country" && choosenCountryEmoji) {
        let res= this.playersRanking.filter(player => {
          return (player.countryEmoji.includes(choosenCountryEmoji));
        })
        this.numberOfPlayers=res.length;
        this.setPages();
        return res;
      }
      else
        {
          let res= this.playersRanking;
          this.numberOfPlayers=res.length;
          this.setPages();
          return res;
        }
    },
    

  },
  created() {
    // console.log("started");
    this.getPlayersRanking();
    this.filteredPlayersRanking();
    this.loggedinPlayer = localStorage.getItem('userName');
    // this.insertLeaderBoard();
  },
  // watch: {
  //   posts() {
  //     this.setPages();
  //   }
  // },
  components: { NavBar }
}
</script>

<style>
*:focus {
  outline: none;
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
  color: black;
  background-color: white;
  border: 1px solid rgba(100, 100, 100, 0.2);
  transition: .15s all ease-in-out;
  /* background: lightgrey; */
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