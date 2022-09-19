import axios from "axios";

export const getEasyLeaderboard =  async ()=>
{
  return  await axios.get(
    `${process.env.VUE_APP_BASE_URL}/user/getEasyLeaderBoard`
  )
};

