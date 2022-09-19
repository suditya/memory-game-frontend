import axios from "axios";

export const insertHardLeaderboard =  async (credentials)=>
{
    return await  axios.post(
        `${process.env.VUE_APP_BASE_URL}/user/insertHardLeaderBoard`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
};

