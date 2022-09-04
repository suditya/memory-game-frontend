<template>
    <div>
        
        <NavBar />
        <div id="login">
            <!-- <MemoryCardGameHeader /> -->
            <h1 class="heading">Login</h1>
            <form @submit.prevent="login()" class="form-container">
                
                <hr>
                <!-- {{this.error.lengt}} -->
                <div v-show="errorShow == true" class="popup-msg">
                    <!-- <button @click.prevent="closePopup" class="close">X</button> -->
                    <h2>Login Failed</h2>
                    <p>{{  this.error  }}</p>
                </div>
                <!-- <div v-if="this.error.length > 0" class="popup-msg">
                    {{showErrorMessage()}}
                </div> -->
                <div v-show="successShow == true" class="success-msg">
                    <h2> ✅ Login Succesfull</h2>
                </div>

                <!-- <div v-show="message" class="success-msg">
                    <h2>Lorem ipsum dolor sit.</h2>
                </div> -->


                <div class="email input">
                    <label for="email">
                        <p>Email Id 📧</p>
                    </label>
                    <input :required="true" class="emailInput" type="email" name="email" v-model="email"
                        placeholder="email id">
                </div>
                <div class="password input">
                    <label for="password">
                        <p>Password 🔑</p>
                    </label>
                    <input :required="true" class="passInput" type="password" name="password" v-model="password"
                        placeholder="password">
                </div>
                <input class="submitInput" id="submit" type="submit" value="login">
                <p class="bottom">
                    Not have an account?
                    <!-- <a href="/">Register here</a> -->
                    <router-link to="/register">Register here</router-link>
                </p>
            </form>


        </div>

    </div>
</template>
<script>
// import MemoryCardGameHeader from './MemoryCardGameHeader.vue';
// import MemoryCardGameHeader from './MemoryCardGameHeader.vue';
// import config from "@/config";
import axios from "axios";
import NavBar from './NavBar.vue';
// import AccountDelete from "./AccountDelete.vue";
export default {
    name: "loginPage",
    data() {
        return {
            email: "",
            password: "",
            fullName: "",
            error: "",
            message: "",
            key: 0,
            errorShow: false,
            successShow: false
        };
    },
    methods: {
        closePopup() {
            this.error = "";
        },
        showErrorMessage() {
            this.errorShow = true;
            setTimeout(() => {
                this.errorShow = false;
            }, 2500)
        },
        showSucccessMessage() {
            console.log("success msg function envoked")
            this.successShow = true;
            setTimeout(() => {
                this.successShow = false;
            }, 2500)
        },
        async login() {
            // let that = this;
            console.log("this in function", this);
            const credentials = {
                email: this.email,
                password: this.password,
            };
            console.log("credentials:", credentials);

            console.log("lines is executing ");
            try {
                console.log("this in try", this);
                const result = await axios.post(
                    `${process.env.VUE_APP_BASE_URL}/user/login`,
                    credentials,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log(result);
                this.error = result.data.message;

                if (result.data.message) {
                    console.log("this in if", this);
                    this.showErrorMessage();
                    console.log(result.data.message, "failed to login");
                }
                else {
                    // this.key+=1;

                    console.log("this in else", this);

                    // console.log(this.message)
                    // console.log("succesfull log in ");
                    await this.savePlayerDetails();
                    // this.$forceUpdate();
                    // setTimeout(()=>
                    // {
                    //     console.log("setTimeOut");
                    //     console.log(this.message);

                    this.showSucccessMessage();
                    setTimeout(() => {
                        this.$router.push({ path: "/" });
                    }, 1500)

                    // },1000)

                }
            }
            catch (err) {
                this.showErrorMessage()
                this.error = err.message;
            }

        },
        async savePlayerDetails() {
            try {
                console.log("hi i am working ")
                const result = await axios.get(
                    `${process.env.VUE_APP_BASE_URL}/user/getPlayerDetails/${this.email}`
                );
                console.log(result.data), " getting details";
                localStorage.setItem("userName", result.data.name)
                localStorage.setItem("countryEmoji", result.data.countryEmoji)

            }
            catch (err) {
                console.log(err);
            }
        }
    },

    components: { NavBar}
};
</script>
<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    /* transition: all 400; */
}

.popup-msg,
.success-msg {
    width: 39%;
    padding: 20px 27px;
    position: absolute;
    top: 10%;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-weight: 300;
    margin: 25px;
    /* left: 2%; */
    border-radius: 36px;
    right: 1%;
    /* color: #D8000C;
    background-color: #FFBABA; */
}

.success-msg {

    background-color: #DFF2BF;
    color: #270;
}

.popup-msg {
    color: #D8000C;
    background-color: #FFBABA;
}

button.close {
    padding: 5px;
    background-color: #d2bdbd00;
    border: 1px solid #fafafa;
    position: relative;
    top: 0px;
    right: -1px;
    color: #09e868;
    -webkit-appearance: none;
    -moz-appearance: none;
    /* appearance: none; */
}



.form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 70%;
    margin: 1% auto;
    border: 1px solid grey;
    padding: 5px 0%;
    border-radius: 10px;
    box-shadow: aliceblue;
    box-shadow: rgb(0 0 0 / 25%) 0px 54px 55px, rgb(0 0 0 / 12%) 0px -12px 30px, rgb(0 0 0 / 12%) 0px 4px 6px, rgb(0 0 0 / 17%) 0px 12px 13px, rgb(0 0 0 / 9%) 0px -3px 5px;
}

.form-container:hover {
    box-shadow: aliceblue;
    box-shadow: rgba(71, 146, 212, 0.25) 0px 54px 55px, rgb(0 0 0 / 12%) 0px -12px 30px, rgb(0 0 0 / 12%) 0px 4px 6px, rgb(0 0 0 / 17%) 0px 12px 13px, rgb(0 0 0 / 9%) 0px -3px 5px;
}

.input {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

input {
    padding: 18px 18px;
    border-radius: 10px;
    width: 65%;
    /* background-color: blue; */
}

#submit {
    width: 33%;
    margin-top: 18px;
    background: #ee8081;
    font-size: 25px;
    color: wheat;
    font-family: monospace;
    font-weight: bold;
}

#submit:hover {
    background: #79e5d3;
    color: #3c8345;
}

label {
    font-size: 25px;
    font-weight: bold;
    /* text-align: center; */
}

p.bottom {
    padding: 15px 0px;
    font-size: 18px;
}

.heading {
    text-align: center;
    font-weight: 900;
    text-shadow: 3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    color: white;
    font-size: 52px;
}
@media screen and (max-width:800px) {
    #login {
        width: 100%;
    }

    .form-container {
        width: 95%;
    }

    input {
        padding: 22px 20px;
        width: 180%;
    }

    .popup-msg,
    .success-msg {
        width: 70%;
        padding: 1% 10%;
        position: absolute;
        top: 5%;
        font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
        font-weight: 300;
        margin: 25px;
        /* left: 2%; */
        border-radius: 36px;
        right: -2%;
        /* color: #D8000C;
    background-color: #FFBABA; */
    }
}
</style>