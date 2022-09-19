import axios from "axios";

export const register =  async (credentials)=>
{
    return await axios.post(
        `${process.env.VUE_APP_BASE_URL}/user/register`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
};

