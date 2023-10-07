import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')

// Path: src/components/FilterMenu.vue
import FilterMenu from '@/components/FilterMenu.vue'
import HousesMap from '@/components/HousesMap.vue'
import SinglePlotPopup from '@/components/SinglePlotPopup.vue'
import CompareHouses from '@/components/CompareHouses.vue'
import HousesFilters from '@/components/HousesFilters.vue'
import TestCompletion from '@/components/TestCompletion.vue'
import TestStart from '@/components/TestStart.vue'
import TestResults from '@/components/TestResults.vue'
import { Icon } from '@iconify/vue';

app.component('FilterMenu', FilterMenu)
app.component('HousesFilters', HousesFilters)
app.component('CompareHouses', CompareHouses)
app.component('HousesMap', HousesMap)
app.component('TestResults', TestResults)
app.component('TestStart', TestStart)
app.component('TestCompletion', TestCompletion)
app.component('SinglePlotPopup', SinglePlotPopup)
app.component('IconifyIcon', Icon)