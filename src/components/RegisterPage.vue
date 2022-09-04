<template>
    <div>
        <NavBar />
        <div id="register">
            <!-- <MemoryCardGameHeader /> -->
            <h1 class="heading">Register </h1>
            <form @submit.prevent="register()" class="form-container">

                <hr>
                <div v-show="errorShow == true" class="popup-msg">
                    <!-- <button @click.prevent="closePopup" class="close">X</button> -->
                    <h2>Registration Failed</h2>
                    <p>{{ this.error }}</p>
                </div>
                <div v-show="successShow == true" class="success-msg">
                    <h2>✅ Registration Succesfull</h2>
                </div>
                <!-- <div v-show="this.success == true" class="success-msg">
                    <h2>Registration Succesfull</h2>
                </div> -->
                <div class="name input">
                    <label for="fullName">
                        <p>Full Name 👨‍🎓</p>
                    </label>
                    <input :required="true" class="nameInput" type="text" name="fullName" v-model="fullName"
                        placeholder="your full-name">
                </div>
                <div class="email input">
                    <label for="email">
                        <p>Email Id 📧</p>
                    </label>
                    <input :required="true" class="emailInput" type="email" name="email" v-model="email"
                        placeholder="email id">

                </div>

                <!-- <div v-show="this.emailProblem">
        <p>{{this.emailProblem}}</p>
      </div> -->
                <div class="password input">
                    <label for="password">
                        <p>Password 🔑</p>
                    </label>
                    <input :required="true" class="passInput" type="password" name="password" v-model="password"
                        placeholder="password">

                    <span class="validations" v-show="checkInvalidPass == true">
                        Password should contain atleast
                        <span v-show="this.password.length < 8">8 characters</span>
                        <span v-show="!(this.upperCharRegEx.test(this.password))"> 1 upper case character,</span>
                        <span v-show="!(this.lowerCharRegEx.test(this.password))"> 1 lower case character,</span>
                        <span v-show="!(this.numberRegEx.test(this.password))"> 1 number</span>
                    </span>
                    <span class="validPass" v-show="password.length > 0 && !(checkInvalidPass)">Password is valid</span>

                </div>
                <div class="password input">
                    <label for="password">
                        <p>Confirm Password 🔑</p>
                    </label>
                    <input :required="true" class="passInput" type="password" name="password" v-model="confirmPassword"
                        placeholder="confirm password">
                    <p class="validations"
                        v-show="!(this.password == this.confirmPassword) &&(this.confirmPassword.length>0)"> confirm
                        password is not
                        matching with password </p>
                </div>
                <label for="country">
                    <p>Choose Your Country 🌎</p>
                </label>
                <select name="" class="flags" :required="true" v-model="choosenCountry">
                    <option class="countryInput" v-for="(country, index) in countries " :key="index">
                        {{ country.name }}|{{ country.emoji }} </option>
                </select>

                <input class="submitInput" id="submit" type="submit" value="register">
                <p class="bottom">
                    Already have an account?
                    <!-- <a href="/">Login here</a> -->
                    <router-link to="/login">Login here</router-link>
                </p>
            </form>


        </div>
    </div>
</template>
<script>

import axios from "axios";
import NavBar from './NavBar.vue';
import * as nations from '../data/flags.json'
import '../assets/styles/flag.css'
console.log(nations);
export default {
    name: "registerPage",
    data() {
        return {
            email: "",
            password: "",
            fullName: "",
            confirmPassword: "",
            emailProblem: "",
            passProblem: "",
            countryEmoji: "",
            choosenCountry: "",
            countries: nations,
            upperCharRegEx: /[A-Z]+/,
            lowerCharRegEx: /[a-z]+/,
            specialCharRegEx: /[A-Z]/,
            numberRegEx: /[0-9]+/,
            error: "",
            successShow: false,
            errorShow: false,
            validPass: true,
            invalidPass: false,
            notValidPass: true
        };
    },
    methods: {
        closePopup() {
            this.error = "";
        },
        popMessage() {
            this.errorShow = true;
            setTimeout(() => {
                this.errorShow = false;
            }, 2500)
        },
        async register() {
            
            const emoji = this.choosenCountry.split('|');
            // console.log(emoji), " emoji of the nation ";
            const credentials = {
                name: this.fullName,
                email: this.email,
                password: this.password,
                countryEmoji: emoji[1]
            };
            
            try {
                const result = await axios.post(
                    `${process.env.VUE_APP_BASE_URL}/user/register`,
                    credentials,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                this.error = result.data.message;
                console.log(this.error);
                if (result.data.message) {
                    this.popMessage();
                    console.log(result.data.message, "failed to register");
                }
                else {
                    this.success == true;
                    this.successShow = true;
                    setTimeout(() => {
                        this.successShow = false;
                    }, 2000);
                    localStorage.removeItem('userName');
                    localStorage.removeItem('countryEmoji');
                    setTimeout(() => {
                        this.$router.push({ path: "/login" });
                    }, 1500)


                }
            }
            catch (err) {
                this.error = err.message;
                this.popMessage();
            }

        },
    },
    components: { NavBar },
    computed: {
        checkInvalidPass() {
            if (this.password.length == 0) return false;
            let invalidPass = this.password.length < 8 || (!(this.upperCharRegEx.test(this.password))) || (this.lowerCharRegEx.test(this.password)) || !(this.lowerCharRegEx.test(this.password)) || !(this.numberRegEx.test(this.password));
            console.log(this.invalidPass, "invalid password");

            return invalidPass;

        }
    }
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

.validations {
    color: red;
    text-align: center;
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
    margin: 12px auto;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 70%;
    border: 1px solid grey;
    padding: 5px 0;
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

.flags {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 36%;
    padding: 19px 0px;
    border: 2px solid #000000;
    border-radius: 8px;
}

input {
    padding: 18px 18px;
    border-radius: 10px;
    width: 73%;
}

#submit {
    width: 37%;
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
    text-align: center;
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
    margin-bottom: 20px;
}

@media screen and (max-width:800px) {
    #register {
        width: 100%;
    }

    .form-container {
        width: 95%;
    }

    input {
        padding: 22px 20px;
        width: 180%;
    }

    .flags {

        width: 90%;
        padding: 21px 0px;
    }

    .validations {
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
