<template>
  <section id="app">
    <TestStart v-if="!isTestStarted" @start="(name) => {handleTestStart(name)}" />

    <section v-if="isTestStarted">

      <!-- App -->
      <HousesMap :comparisonNumbers="comparisonNumbers" @confirm="handleTestEnd()" @selectComparison="handleNewComparisonId($event)"/>
      <FilterMenu @removeFromComparison="removeFromComparison($event)" :comparisonNumbers="comparisonNumbers" />
      
      <!-- Completion and results -->
      <TestCompletion :isTestCompleted="isTestCompleted" @continue="isResultsOpen = true" />
      <TestResults 
        :prototypeVersion="prototypeVersion" 
        :startTime="startTime" 
        :endTime="endTime" 
        :isResultsOpen="isResultsOpen" 
        :logs="logs" 
        :testerName="testerName"
      />
      
    </section>
  </section>
</template>

<script setup>
import FilterMenu from '@/components/FilterMenu.vue'
import TestStart from '@/components/TestStart.vue'
import HousesMap from '@/components/HousesMap.vue'
import TestCompletion from '@/components/TestCompletion.vue'

import { ref } from 'vue';
import TestResults from './components/TestResults.vue';

const isTestStarted = ref(false)
const isTestCompleted = ref(false)
const isResultsOpen = ref(false)
const testStatus = ref('not-started')
const startTime = ref(null)
const endTime = ref(null)
const prototypeVersion = ref('1')
const testerName = ref('')
const comparisonNumbers = ref([])

const handleNewComparisonId = (id) => {
  comparisonNumbers.value.push(id)
}
const removeFromComparison = (id) => {
  const index = comparisonNumbers.value.indexOf(id)
  comparisonNumbers.value.splice(index, 1)
}

const handleTestStart = (name) => {
  testerName.value = name

  isTestStarted.value = true
  testStatus.value = 'running'
  startTime.value = Date.now()
  
  logs.value.push({
    id: logs.value.length,
    type: 'test-start',
    time: new Date(),
    millis: Date.now(),
    location: {
      x: null,
      y: null,
    },
    className: null,
  })
}

const handleTestEnd = () => {
  isTestCompleted.value = true
  testStatus.value = 'ended'
  endTime.value = Date.now()

  logs.value.push({
    id: logs.value.length,
    type: 'test-end',
    time: new Date(),
    millis: Date.now(),
    location: {
      x: null,
      y: null,
    },
    className: null,
  })
}

// event logger
document.addEventListener('click', (e) => {
  addLogEntry(e)
})
document.addEventListener('keydown', (e) => {
  addLogEntry(e)
});
  

const addLogEntry = (event) => {
  if (testStatus.value === 'running') {
    logs.value.push({
      id: logs.value.length,
      type: event.type,
      time: new Date(),
      millis: Date.now(),
      location: {
        x: event.clientX,
        y: event.clientY,
      },
      className: event.srcElement.className,
    })
  }
}


const logs = ref([])


</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');

#app {
  font-family: 'Manrope', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
