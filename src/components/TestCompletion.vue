<template>
    <section v-if="isTestCompleted" class="completed-container">
        <p class="completed-container-text">
            The test has concluded
        </p>
        <br><br>
        <p class="completed-container-subtext">
            Please fill in the survey.
        </p>


        <button class="continue-button" @click="continueToResults()">Continue to results</button>
    </section>
</template>

<script setup>

import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['continue'])

defineProps({
    isTestCompleted: Boolean,
})

const continueToResults = () => {
    emit('continue')
}
</script>

<style scoped>
.completed-container-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: #006241;
    margin-bottom: 1rem;
}
.completed-container-subtext {
    font-size: 1.2rem;
    font-weight: 400;
    color: #006241;
    margin-bottom: 1rem;
}
.completed-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;
}
.continue-button {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10vh;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    z-index: 100;
    border: none;
    outline: none;
    font-size: 1.5rem;
    font-weight: 700;
    color: #006241;
    cursor: pointer;
    transition: all .2s ease-in-out;
}
</style>