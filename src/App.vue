<template>
  <section :class="{ disableScrollApp: isPlotPopupOpen }">
    <TestStart v-if="!isTestStarted" @start="(name) => {handleTestStart(name)}" />

    <section v-if="isTestStarted">

      <!-- App -->
      <HousesMap 
        @totalAvailablePlotsUpdate="totalAvailablePlots = $event"
        :comparisonNumbers="comparisonNumbers" 
        @confirm="handleTestEnd($event)" 
        @selectComparison="handleNewComparisonId($event)"
        :filters="filters"
        @cancel="isPlotPopupOpen = false"
        @plotClick="isPlotPopupOpen = true"
      />
      <FilterMenu 
        :totalAvailablePlots="totalAvailablePlots"
        :filters="filters"
        @removeFromComparison="removeFromComparison($event)" 
        @filterUpdate="filterUpdate($event)"
        :comparisonNumbers="comparisonNumbers" 
      />
      
      <!-- Completion and results -->
      <TestCompletion :isTestCompleted="isTestCompleted" @continue="isResultsOpen = true" />
      <TestResults 
        :prototypeVersion="prototypeVersion" 
        :startTime="startTime" 
        :endTime="endTime" 
        :isResultsOpen="isResultsOpen" 
        :logs="logs" 
        :testerName="testerName"
        :selectedPlotId="selectedPlotId"
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
const isPlotPopupOpen = ref(false)
const selectedPlotId = ref(null)
const totalAvailablePlots = ref(0)

const filters = ref({
    saleStatus: ['for-sale'],
    type: [],
    minPrice: 225000,
    maxPrice: 1000000,
    furnished: 'any',
    minIndoorSurface: 30,
    maxIndoorSurface: 250,
    minBedrooms: 1,
    maxBedrooms: 5,
    minExtraRooms: 1,
    maxExtraRooms: 5,
    minOutdoorSurface: 0,
    maxOutdoorSurface: 10000,
    minFloor: 1,
    maxFloor: 25,
    minBathrooms: 1,
    maxBathrooms: 3,
    balconyDirection: 'any',
    parkingSpots: [],
    storage: 'any',
    energyLabel: [],
});

const filterUpdate = (filtersParameter) => {
  filters.value = filtersParameter
  console.log('filter update', filtersParameter)
}

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
  
  appendLogEntry(
    logs.value.length,
    'test-start',
    new Date(),
    Date.now(),
    {
      x: null,
      y: null,
    },
    null
  )
}

const handleTestEnd = (plotId) => {
  isTestCompleted.value = true
  testStatus.value = 'ended'
  endTime.value = Date.now()
  selectedPlotId.value = plotId

  appendLogEntry(
    logs.value.length,
    'test-end',
    new Date(),
    Date.now(),
    {
      x: null,
      y: null,
    },
    null
  )
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
    appendLogEntry(
      logs.value.length,
      event.type,
      new Date(),
      Date.now(),
      {
        x: event.clientX,
        y: event.clientY,
      },
      event.srcElement.className
    )
  }
}

const appendLogEntry = (id, type, time, millis, location, className) => {
  logs.value.push({
    id: id,
    type: type,
    time: time,
    millis: millis,
    location: location,
    className: className,
  })
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

.disableScrollApp {
  max-height: 100vh;
  overflow: hidden;
}
</style>
