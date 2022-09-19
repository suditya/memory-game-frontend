import axios from "axios";

export const insertMediumLeaderboard =  async (credentials)=>
{
    return await  axios.post(
        `${process.env.VUE_APP_BASE_URL}/user/insertMediumLeaderBoard`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
};

