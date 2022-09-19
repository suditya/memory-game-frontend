<template>
    <div>

        <NavBar />
        
        <div id="login">
           
            <h1 class="heading">Login</h1>
            <form @submit.prevent="login()" class="form-container">
                <hr>

                <div v-show="errorShow == true" class="popup-msg">
                    
                    <h2>Login Failed</h2>
                    <p>{{ this.error }}</p>
                </div>

                <div v-show="successShow == true" class="success-msg">
                    <h2> ✅ Login Succesful</h2>
                </div>


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
                    <div class="wrapper">
                        <div id="password-input">
                            <input :required="true" id="pass" v-if="showPassword==true" type="text" v-model="password"
                                placeholder="password" />
                            <input :required="true" id="pass" placeholder="password" v-else type="password"
                                v-model="password">
                        </div>
                        <div class="eye-image">
                            <button @click.prevent="showPassword=showPassword ^ 1" class="show-hide">
                                <img v-show="showPassword==false" class="show-hide-icon" src="../assets/images/view.png"
                                    alt="show-icon">
                                <img v-show="showPassword==true" class="show-hide-icon" src="../assets/images/hide.png"
                                    alt="hide-icon">
                            </button>
                        </div>
                    </div>
                </div>
                <input class="submitInput" id="submit" type="submit" value="login">
                <p class="bottom">
                    Not have an account?
                    <router-link to="/register">Register here</router-link>
                </p>
            </form>


        </div>

    </div>
</template>
<script>

import NavBar from './NavBar.vue';
import {Signin} from '../services/signin'
import {savePlayerDetails} from '../services/savePlayerDetails'

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
            successShow: false,
            showPassword:false
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
            
            this.successShow = true;
            setTimeout(() => {
                this.successShow = false;
            }, 2500)
        },
        async login() {
            const credentials = {
                email: this.email,
                password: this.password,
            }; 
            try {
                const result = await Signin(credentials);
                // console.log(result);
                // console.log(result.data.message);
                this.error = "Credentials didn't matched, make sure you entered right credentials";

                if (result.data.message) {
                    
                    this.showErrorMessage();
                }
                else {
                    await this.savePlayerDetails();
                    this.showSucccessMessage();
                    setTimeout(() => {
                        this.$router.push({ path: "/level" });
                    }, 1500)
                }
            }
            catch (err) {
                this.showErrorMessage()
                this.error = "Credentials didn't matched, make sure you entered right credentials";
            }

        },
        async savePlayerDetails() {
            try {
                const result = await savePlayerDetails(this.email);
                console.log(result);
                localStorage.setItem("userName", result.data.name)
                localStorage.setItem("countryEmoji", result.data.countryEmoji)

            }
            catch (err) {
                console.log(err);
            }
        }
    },
    created:
    {

    },
    components: { NavBar}
};
</script>
<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
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
    border-radius: 36px;
    right: 1%;
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
.wrapper {
    display: flex;
    width: 66%;
    border-radius: 9px;
    border-radius: 10px;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    border: 2px solid grey;
}

#password-input {
    width: 85%;
    border: none;
}

.wrapper:focus,  .wrapper:focus:hover , #pass:focus, #pass:focus:hover, .show-hide:focus, .show-hide-:focus:hover{
    outline: none;
    border:none;
}
.eye-image {
    width: 12%;
    margin-left: 3px;
}

.show-hide {
    width: 80%;
    background: none;
    border: none;
    max-width: 45px;
}

.show-hide-icon {
    width: 100%;
}
#pass {
    width: 100%;
    border: none;
    border-radius: 10px;
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
        border-radius: 36px;
        right: -2%;
    }
    .wrapper
    {
        width: 180%;
    }
}
</style>