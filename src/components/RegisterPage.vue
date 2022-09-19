<template>
    <div>
        <NavBar />
        <div id="register">

            <h1 class="heading">Register </h1>
            <form @submit.prevent="register()" class="form-container">

                <hr>
                <div v-show="errorShow == true" class="popup-msg">
                    <h2>Registration Failed</h2>
                    <p>{{ this.error }}</p>
                </div>
                <div v-show="successShow == true" class="success-msg">
                    <h2>✅ Registration Succesful</h2>
                </div>
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
                    <!-- Validating the Email -->
                    <span class="validations" v-if="email.length > 0">
                        <span v-show="!(this.emailRegEx.test(this.email))">email is not valid </span>
                    </span>

                </div>

                <div class="password ">
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
                   <!-- Validating Passwords -->
                    <span class="validations" v-if="password.length > 0 ">
                        <span v-show="this.password.length < 8">Password should have atleast <b>8 characters</b> </span>
                        <span v-show="!(this.upperCharRegEx.test(this.password))"> Password should have atleast <b>1
                                capital letter</b> ,</span>
                        <span v-show="!(this.lowerCharRegEx.test(this.password))">Password should have atleast <b> 1
                                small letter, </b></span>
                        <span v-show="!(this.numberRegEx.test(this.password))"> Password should have atleast <b> 1
                                number, </b></span>
                        <span v-show="!(this.specialCharRegEx.test(this.password))"> Password should have atleast <b>
                                1 special character </b></span>
                    </span>
                    <span class="validPass" v-if="password.length > 0 && (checkInvalidPass)==false">Password is
                        valid</span>

                </div>
                <div class="password input">
                    <label for="password">
                        <p>Confirm Password 🔑</p>
                    </label>
                    <div class="wrapper">
                        <div id="password-input">
                            <input :required="true" id="pass" v-if="showConfirmPassword==true" type="text"
                                v-model="confirmPassword" placeholder="confirm password" />
                            <input :required="true" id="pass" placeholder="confirm password" v-else type="password"
                                v-model="confirmPassword">
                        </div>
                        <div class="eye-image">
                            <button @click.prevent="showConfirmPassword=showConfirmPassword ^ 1" class="show-hide">
                                <img v-show="showConfirmPassword==false" class="show-hide-icon"
                                    src="../assets/images/view.png" alt="show-icon">
                                <img v-show="showConfirmPassword==true" class="show-hide-icon"
                                    src="../assets/images/hide.png" alt="hide-icon">
                            </button>
                        </div>
                    </div>

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
                    <router-link to="/login">Login here</router-link>
                </p>
            </form>


        </div>
    </div>
</template>
<script>

import NavBar from './NavBar.vue';
import * as nations from '../assets/nations/flags.json'
import {register} from '../services/register.js'
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
            numberRegEx: /[0-9]+/,
            emailRegEx: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            specialCharRegEx: /[-/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/,
            error: "",
            successShow: false,
            errorShow: false,
            validPass: true,
            invalidPass: false,
            notValidPass: true,
            showPassword: false,
            showConfirmPassword: false
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
            const credentials = {
                name: this.fullName,
                email: this.email,
                password: this.password,
                countryEmoji: emoji[1]
            };

            try {
                this.error = "";
                if (this.checkInvalidEmail() || this.checkInvalidPass())
                    this.error = "Invalid Credentials, Please try again!";

                if (this.error.length > 0) {   //if there is invalid data entered
                    this.popMessage();
                }
                else {
                    const result = await register(credentials); //calling register services
                    // console.log(result, "register ");
                    if(result.data.message)
                    this.error="User with this email id already exist";
                    if (this.error) {
                        this.popMessage();
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
            }
            catch (err) {
                this.error="User with this email id already exist";
                this.popMessage();
            }

        },
        checkInvalidPass() {

            let checkLength = (this.password.length >= 8);
            if (checkLength == false) return true;
            let upper = this.upperCharRegEx.test(this.password);
            if (upper == false) return true;
            let lower = this.lowerCharRegEx.test(this.password);
            if (lower == false) return true;
            let number = this.numberRegEx.test(this.password);
            if (number == false) return true;
            let special = this.specialCharRegEx.test(this.password);
            if (special == false) return true;
            let matchPassword = this.confirmPassword == this.password;
            if (matchPassword == false) return true;

            return false
        },
        checkInvalidEmail() {
            const invalidEmail = !(this.emailRegEx.test(this.email));
            return invalidEmail;
        }

    },
    components: { NavBar }
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

.wrapper {
    display: flex;
    width: 100%;
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

.wrapper:focus,
.wrapper:focus:hover,
#pass:focus,
#pass:focus:hover,
.show-hide:focus,
.show-hide-:focus:hover {
    outline: none;
    border: none;
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

.password {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 36%;
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
        top: 32%;
        font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
        font-weight: 300;
        margin: 25px;
        /* left: 2%; */
        border-radius: 36px;
        right: -2%;
    }

    #submit {
        font-size: 17px;
    }

    .wrapper {
        width: 250%;
    }

}
</style>
