import axios from "axios";

export const Signin =  async (credentials)=>
{

 return await axios.post(
    `${process.env.VUE_APP_BASE_URL}/user/login`,
    credentials,
    {
        headers: {
            "Content-Type": "application/json",
        },
    }
)
};