<template>
    <section>
        <!-- Mobile bottom navbar -->
        <nav class="mobile-bottom-navbar">
            <button @click="toggleMenu('filter')" :class="{ activeMenuItem: currentMenuMode === 'filter' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M19 3H5c-1.414 0-2.121 0-2.56.412C2 3.824 2 4.488 2 5.815v.69c0 1.037 0 1.556.26 1.986c.26.43.733.698 1.682 1.232l2.913 1.64c.636.358.955.537 1.183.735c.474.411.766.895.898 1.49c.064.284.064.618.064 1.285v2.67c0 .909 0 1.364.252 1.718c.252.355.7.53 1.594.88c1.879.734 2.818 1.101 3.486.683c.668-.417.668-1.372.668-3.282v-2.67c0-.666 0-1 .064-1.285a2.68 2.68 0 0 1 .899-1.49c.227-.197.546-.376 1.182-.735l2.913-1.64c.948-.533 1.423-.8 1.682-1.23c.26-.43.26-.95.26-1.988v-.69c0-1.326 0-1.99-.44-2.402C21.122 3 20.415 3 19 3Z" />
                </svg>
                Filter
            </button>
            <button @click="toggleMenu('compare')" :class="{ activeMenuItem: currentMenuMode === 'compare' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none">
                        <path fill="currentColor" d="M6 4h6v16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" opacity=".16" />
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7m4-16h1a2 2 0 0 1 2 2v1m0 10v1a2 2 0 0 1-2 2h-1m3-9v2M12 2v20" />
                    </g>
                </svg>
                Compare ({{ comparisonNumbers.length }})
            </button>
        </nav>

        <transition name="slide-fade">
        <section class="mobile-nav-popup" v-if="currentMenuMode !== 'none'">
                <HousesFilters v-if="currentMenuMode === 'filter'" />
                <CompareHouses @removeFromComparison="removeFromComparison($event)" :comparisonNumbers="props.comparisonNumbers" v-if="currentMenuMode === 'compare'" />
            </section>
        </transition>

    </section>
</template>
  
<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import HousesFilters from '@/components/HousesFilters.vue'
import CompareHouses from '@/components/CompareHouses.vue'
//   const isMenuOpen = ref(false)

const props = defineProps({
    comparisonNumbers: Array,
})

const emit = defineEmits(['removeFromComparison'])

const removeFromComparison = (plotNr) => {
    emit('removeFromComparison', plotNr)
}

const currentMenuMode = ref('none')

const toggleMenu = (option) => {
    switch (option) {
        case 'filter':
            setMenuVariables('filter')
            break;
        case 'compare':
            setMenuVariables('compare')
            break;
        default:
            break;
    }
}

const setMenuVariables = (option) => {
    if(currentMenuMode.value === option) {
        currentMenuMode.value = 'none'
    } else {
        currentMenuMode.value = option
    }
}
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
  transform: translateY(200px);
  opacity: 0;
}

.activeMenuItem {
    background-color: #014e3486;
    border-radius: 0.5rem;
    /* Background color for the active menu item */
}
.mobile-nav-popup {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: #fff;
    z-index: 2;
}

.mobile-bottom-navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 6rem;
    width: 100%;
    background-color: #006241;
    /* Background color for the bottom menu */
    display: flex;
    justify-content: center;
    z-index: 3;
    gap: 3rem;
    padding: 1rem 0;
    /* Adjust the padding as needed */
}

button {
    background-color: #006241;
    color: #fff;
    /* Button text color */
    border: none;
    padding: 0.5rem 2rem;
    /* Adjust the padding as needed */
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    font-size: 1.2rem;
    cursor: pointer;
}

</style>