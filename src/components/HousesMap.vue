<template>
    <section class="map" :class="{ disableScroll: isPlotPopupOpen }">
        <p>Appartement buildling side view</p><br>
        <section class="apprtment_wrapper">
            <section v-for="plot in data.plots" @click="handleWoningClick(plot.id)" :key="plot.id"
                class="apprtment" :class="[
                    { soldStyling: plot.status === 'verkocht' },
                    { availableStyling: plot.status === 'te-koop' },
                    { greyStyling: plot.status === 'in-optie' },
                ]">
                {{ plot.number }}
                <section class="apprtment-compare-icon" v-if="comparisonNumbers.includes(plot.number)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <g fill="none">
                        <path fill="currentColor" d="M6 4h6v16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" opacity=".16" />
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7m4-16h1a2 2 0 0 1 2 2v1m0 10v1a2 2 0 0 1-2 2h-1m3-9v2M12 2v20" />
                    </g>
                </svg>
                </section>
            </section>
        </section>
    </section>
    <transition name="slide-fade">
        <SinglePlotPopup v-if="isPlotPopupOpen && currentPlot !== null" :current-plot="currentPlot"
            :comparisonNumbers="comparisonNumbers" @confirm="handleConfirm" @cancel="handleCancel"
            @comparison-add="emit('selectComparison', $event)">
        </SinglePlotPopup>
    </transition>
</template>

<script setup>

import { ref, defineEmits, defineProps } from 'vue'
import data from '@/assets/wonen-in-de-kuil.json'
import SinglePlotPopup from './SinglePlotPopup.vue';

defineProps({
    comparisonNumbers: Array,
})

const emit = defineEmits(['confirm', 'cancel', 'selectComparison'])

// Plot click
const handleWoningClick = (id) => {
    for (let i = 0; i < data.plots.length; i++) {
        const plot = data.plots[i];

        if (plot.id === id) {
            console.log('plot', plot)
            currentPlot.value = plot
            isPlotPopupOpen.value = true

            break;
        }
    }
}

// Popup handling
const handleConfirm = () => {
    isPlotPopupOpen.value = false
    emit('confirm', currentPlot.value)
}

const handleCancel = () => {
    isPlotPopupOpen.value = false
}

const isPlotPopupOpen = ref(false)
const currentPlot = ref(null)


</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.disableScroll {
    max-height: 100vh;
    overflow: hidden;
}

.availableStyling {
    background-color: #00ff0080;
}

.soldStyling {
    background-color: #ff000088;
}

.greyStyling {
    background-color: #8080801a;
}

.map {
    margin: 1rem;
    overflow: scroll;
    margin-bottom: 8rem;
}

.apprtment_wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    /* transform: skew(10deg, 0deg) scale(0.7); */
}

.apprtment {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: 1px solid #000;
    padding: 0.25rem;
}
.apprtment-compare-icon {
    display: flex;
    align-items: center;

    justify-content: center;
}
</style>