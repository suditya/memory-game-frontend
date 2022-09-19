import axios from "axios";

export const insertEasyLeaderboard =  async (credentials)=>
{
    return await  axios.post(
        `${process.env.VUE_APP_BASE_URL}/user/insertEasyLeaderBoard`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
};

