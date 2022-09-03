<template>
    <div>
        <!-- <aside>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png" alt="404 Image" />
        </aside>
        <main>
            <h1>Sorry!</h1>
            <p>
                Either you aren't cool enough to visit this page or it doesn't exist!
            </p>
            <router-link :to="{ name: 'home' }">Wanna try going home?</router-link>
        </main> -->
        <section class="page_404">
            <div class="container">
                <div class="text-center">
                    <div class="four_zero_four_bg">
                        <h1 class="text-center ">404</h1>
                    </div>
                    <div class="contant_box_404">
                        <h3 class="h2">
                            Look like you're lost
                        </h3>
                        <p>the page you are looking for not avaible!</p>
                        <router-link to="/" class="link_404">Go to Home</router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'PageNotFound'
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fontdiner+Swanky&family=Roboto:wght@500&display=swap");

/* * {
    box-sizing: 0;
    margin: 0;
    padding: 0
}

body {
    background: linear-gradient(to right, white 50%, #383838 50%);
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
    color: white;
}

div {
    display: flex;
    align-items: center;
    height: 100vh;
    max-width: 1000px;
    width: calc(100% - 4rem);
    margin: 0 auto;
}

div>* {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    max-width: 500px;
    width: 100%;
    padding: 2.5rem;
}

aside {
    background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/right-edges.png");
    background-position: top right;
    background-repeat: no-repeat;
    background-size: 25px 100%;
}

aside img {
    display: block;
    height: auto;
    width: 100%;
}

main {
    text-align: center;
}

main h1 {
    font-family: "Fontdiner Swanky", cursive;
    font-size: 4rem;
    color: #c5dc50;
    margin-bottom: 1rem;
}

main p {
    margin-bottom: 2.5rem;
}

main p em {
    font-style: italic;
    color: #c5dc50;
}

@media (max-width: 700px) {
    body {
        background: #383838;
        font-size: 16px;
    }

    div {
        flex-flow: column;
    }

    div>* {
        max-width: 700px;
        height: 100%;
    }

    aside {
        background-image: none;
        background-color: white;
    }

    aside img {
        max-width: 300px;
    }
}@import url("https://fonts.googleapis.com/css2?family=Fontdiner+Swanky&family=Roboto:wght@500&display=swap");

* {
    box-sizing: 0;
    margin: 0;
    padding: 0
}

body {
    background: linear-gradient(to right, white 50%, #383838 50%);
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
    color: white;
}

div {
    display: flex;
    align-items: center;
    height: 100vh;
    max-width: 1000px;
    width: calc(100% - 4rem);
    margin: 0 auto;
}

div>* {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    max-width: 500px;
    width: 100%;
    padding: 2.5rem;
}

aside {
    background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/right-edges.png");
    background-position: top right;
    background-repeat: no-repeat;
    background-size: 25px 100%;
}

aside img {
    display: block;
    height: auto;
    width: 100%;
}

main {
    text-align: center;
}

main h1 {
    font-family: "Fontdiner Swanky", cursive;
    font-size: 4rem;
    color: #c5dc50;
    margin-bottom: 1rem;
}

main p {
    margin-bottom: 2.5rem;
}

main p em {
    font-style: italic;
    color: #c5dc50;
}

@media (max-width: 700px) {
    body {
        background: #383838;
        font-size: 16px;
    }

    div {
        flex-flow: column;
    }

    d
    div>* {
        max-width: 700px;
        height: 100%;
    }

    aside {
        background-image: none;
        background-color: white;
    }

    aside img {
        max-width: 300px;
    }
} */

/*======================
    404 page
=======================*/


.page_404 {
    padding: 40px 0;
    background: #fff;
    font-family: 'Arvo', serif;
}

.page_404 img {
    width: 100%;
}

.four_zero_four_bg {

    background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
    height: 400px;
    background-position: center;
}


.four_zero_four_bg h1 {
    font-size: 80px;
}

.four_zero_four_bg h3 {
    font-size: 80px;
}

.link_404 {
    color: #fff !important;
    padding: 10px 20px;
    background: #39ac31;
    margin: 20px 0;
    display: inline-block;
}

.contant_box_404 {
    margin-top: -50px;
}
</style>