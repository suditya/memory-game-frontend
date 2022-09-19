import axios from "axios";

export const getHardLeaderboard =  async ()=>
{
  return  await axios.get(
    `${process.env.VUE_APP_BASE_URL}/user/getHardLeaderBoard`
  )
};

