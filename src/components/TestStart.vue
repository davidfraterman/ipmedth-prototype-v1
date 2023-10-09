<template>
    <section class="testStartPopup">
        <h1>Welcome to the test</h1>
        <br>
        <p>Make sure to have filled in the survey prior to starting this test</p>
        <p>Please ensure to not get distracted during the test</p>
        <br><br><br><br>
        <input class="testerInput" type="text" name="tester-name" id="tester-name" v-model="testerName" placeholder="Tester name">
        <!-- Radio buttons whhich decide the prototype version -->
        <br><br>
        <p>Prototype version</p>
        <section class="prototype-version">
            <section>

                <input type="radio" id="prototype-version-1" name="prototype-version" value="1" v-model="prototypeVersion">
                <label for="prototype-version-1">Prototype version 1</label><br>
            </section>
            <section>

                <input type="radio" id="prototype-version-2" name="prototype-version" value="2" v-model="prototypeVersion">
                <label for="prototype-version-2">Prototype version 2</label><br>
            </section>
        </section>

        <button class="testStartButton" @click="startTest()">Start the test</button>
        <section class="error" v-if="showError">
            Please fill in your name and select a prototype version
        </section>
    </section>
</template>

<script setup>
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['start'])

const testerName = ref('')
const showError = ref(false)
const prototypeVersion = ref('prototype-version-1')

const startTest = () => {
    if(testerName.value !== '' && prototypeVersion.value !== '') {
        emit('start', {
            testerName: testerName.value,
            prototypeVers: prototypeVersion.value
        })
    } else {
        showError.value = true
    }
}
</script>

<style scoped>
input[type="radio"] {
    margin-right: 0.5rem;
}
.prototype-version {
    margin-bottom: 1rem;
}

.error {
    color: rgb(171, 47, 47);
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 1rem;
}
.testerInput {
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    border: 1px solid #006241;
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
    width: 90%;
}
.testStartButton {
    padding: 1rem 2rem;
    width: 90%;
    border-radius: 0.5rem;
    background-color: #006241;
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
    border: none;
    cursor: pointer;
}
.testStartPopup {
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
.testStartPopup p {
 margin: 0.5rem;
}
</style>