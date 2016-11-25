<template>
    <div> <h1 v-for="n in 10">{{ msg }}</h1> </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'Hello World!ledadadade'
            }
        }
    }
</script>

<style>
    html {
        background: url('../logo.png') no-repeat;
    }
</style>