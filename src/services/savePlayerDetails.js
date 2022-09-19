import axios from "axios";

export const savePlayerDetails =  async (email)=>
{
    return await axios.get(
    `${process.env.VUE_APP_BASE_URL}/user/getPlayerDetails/${email}`)
};