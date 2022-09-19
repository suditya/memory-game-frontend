<template>
    <div>
        <NavBar />
        <div class="level-wrapper">
            <div class="level-container">
                <div>
                    <h1 class="heading">  Select Game Level 🕹️</h1>
                    <hr>
                </div>
                <div class="select-level">
                    <ul class="levels">
                        <router-link class="link" to="/easyGame">
                            <li id="easy">Easy</li>
                        </router-link>
                        <router-link class="link" to="/mediumGame">
                            <li id="medium">Medium</li>
                        </router-link>
                        <router-link class="link" to="/hardGame">
                            <li id="hard">Hard</li>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import NavBar from './NavBar.vue';
export default {
    components: { NavBar }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

* {
    box-sizing: border-box;

}

.level-wrapper {
    display: flex;
    align-items: center;
    height: 75vh;
    width: 100%;
    justify-content: center;
}

.level-container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Lobster, Georgia, serif;
    color: #545454;
    flex-direction: column;
    width: 100%;
    height: 90%;
    margin-top: -5%;
}

.select-level {
    width: 100%;
    display: flex;
    align-content: center;
    align-items: center;
    margin: 1px auto;
    justify-content: center;
    align-items: center;
}

.heading {
    text-align: center;
    font-size: 2.4rem;
    margin: 0 0 0.8em;
    font-family: 'Lobster';
}

a:hover {
    text-decoration: none;
}

.levels {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    list-style: none;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-family: 'Lobster';
}

.levels li {
    margin: 0 15px 30px;
    padding: 5px;
    display: flex;
    width: 120px;
    height: 120px;
    align-items: center;
    color: #545454;
    justify-content: center;
    text-align: center;
    border: 1px solid #f6f6f6;
    border-radius: 5px;
    box-shadow: 10px 8px 6px 0px rgb(34 30 30 / 28%);
    position: relative;
    transition: all .2s ease-in-out;
    cursor: pointer;
    font-family: 'Lobster';
}

.levels li:hover {
    color: #fff;
    /* background-color: #99ce2a; */
    background-color: #80f096;
    transform: scale(1.04);
}

#medium:hover {
    /* background: lightcoral; */
    background-color: #99ce2a;
    background-color: orange;
}

#hard:hover {
    background: tomato;
}

@media screen and (min-width: 550px) {
    .levels li {}
}
</style>