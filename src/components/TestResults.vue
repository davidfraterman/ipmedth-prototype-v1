<template>
    <section class="results-list" v-if="isResultsOpen">
        <!-- Event details -->
       
        <!-- Events -->
        <section class="results-list__content">
            <section class="results-list__content__header">
                <section>
                    <h2>Test events</h2>
                    <p v-if="endTime !== null && startTime !== null">Time: {{ (endTime - startTime) / 1000 }}s</p>
                    <p>Events: {{logs.length}}</p>
                </section>
            </section>
            <section class="results-list__content__body">
                <section class="results-list__content__body__item" v-for="log in logs" :key="log.time" @click="handleDetailsClick(log.id)" >
                    ID: {{ log.id }}
                    Type: {{ log.type }} 
                        
                    <section class="eventDetailsPopup" v-if="log.id === currentOpenDetailsId">

                        {{ log.id === currentOpenDetailsId }}
                        <h3>Event {{ log.id }} details</h3>
                        <p>Time: <span>{{ log.time }}</span></p>
                        <p>Milliseconds: <span>{{ log.millis }}</span></p>
                        <p>Location: <span>{{ log.location.x }} / {{ log.location.y }}</span></p>
                        <p>Element: <span>{{ log.element }}</span></p>
                        <button class="closeDetailsButton" @click.stop="handleCloseDetails()">Close</button>
                    </section>
                </section>
            </section>
        </section>
        <button @click="handleExportEventsClick()" class="backToStart">
            Export data
        </button>
    </section>
</template>

<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
    logs: Array,
    startTime: Number,
    endTime: Array,
    isResultsOpen: Boolean,
    testerName: String,
    prototypeVersion: String,
    selectedPlotId: String,
})


const currentOpenDetailsId = ref(null)

const handleDetailsClick = (logId) => {
    if(logId !== currentOpenDetailsId.value) {
        currentOpenDetailsId.value = logId
    } else {
        currentOpenDetailsId.value = null
    }
}

const handleCloseDetails = () => {
    currentOpenDetailsId.value = null
}

const handleExportEventsClick = () => {
    const jsonData = JSON.stringify({
        tester: props.testerName,
        selectedPlotId: props.selectedPlotId,
        prototypeVersion: props.prototypeVersion,
        logs: props.logs
    });
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    // getdate
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const name = `impedth-results-v${props.prototypeVersion}-${props.testerName}-${day}-${month}-${year}-${hour}-${minute}.json`;
    link.download = name;

    link.click();

    URL.revokeObjectURL(url);
}



</script>

<style scoped>
.exportEventsTopRightButton {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem;
    background-color: #006241;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;
    border: none;
    outline: none;
    cursor: pointer;
}
.showDetailsButton {
    margin-left: 1rem;
}
.eventDetailsPopup h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 3rem;
    color:black;
}
.eventDetailsPopup p {
    font-size: 1rem;
    font-weight: 300;
    margin-bottom: 1rem;
    color:black;
}
.eventDetailsPopup {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50vh;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.closeDetailsButton {
    width: 100px;
    height: 50px;
    background-color: #fff;
    border: none;
    outline: none;
    font-size: 2rem;
    cursor: pointer;
}
.backToStart {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10%;
    background-color: #006241;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;
    border: none;
    outline: none;
    cursor: pointer;
}
.results-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    z-index: 100;
}

.results-list__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.results-list__content__header {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
}

.results-list__content__body {
    width: 100%;
    height: 75%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: scroll;
}

.results-list__content__body__item {
    width: 100%;
    min-height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
 
    border-bottom: 1px solid #000;
}

.results-list__content__body__item:nth-child(odd) {
    background-color: #f2f2f2;
}

.results-list__content__body__item:nth-child(even) {
    background-color: #fff;
}

.results-list__content__body__item:last-child {
    border-bottom: none;
}

.results-list__content__body__item:hover {
    background-color: #006241;
    color: #fff;
    cursor: pointer;
}



.results-list__content__body__item h3 {
    font-size: 1.2rem;
    font-weight: 500;
}

.results-list__content__body__item p {
    font-size: 1rem;
    font-weight: 300;
}

.results-list__content__body__item p span {
    font-weight: 500;
}
</style>