import axios from "axios";

export const getMediumLeaderboard =  async ()=>
{
  return  await axios.get(
    `${process.env.VUE_APP_BASE_URL}/user/getMediumLeaderBoard`
  )
};

