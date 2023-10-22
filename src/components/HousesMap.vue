<template>
    <section class="map" :class="{ disableScroll: isPlotPopupOpen }">
        <h3>Appartement building map</h3><br>
        <p><span style="color:rgb(1, 175, 1); font-weight: bold;">Green</span> = Filter match</p>
        <p><span style="color:rgb(238, 63, 63); font-weight: bold;">Red</span> = No filter match</p>
        <br>
        Choose from <b>{{ totalAvailablePlots }}</b> appartments
        <br><br>
        <section class="apprtment_wrapper">
            <section v-for="plot in data" @click="handleWoningClick(plot.number)"  :key="plot.number" class="apprtment"
                :class="[
                    // { soldStyling: plot.sale_status === 'sold' },
                    { availableStyling: isPlotAvailable(plot) },
                    { soldStyling: !isPlotAvailable(plot) },
                    'apprt' + plot.number
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
        <SinglePlotPopup class="plot-popup" v-if="isPlotPopupOpen && currentPlot !== null" :current-plot="currentPlot"
            :comparisonNumbers="comparisonNumbers" @confirm="handleConfirm" @cancel="handleCancel"
            :prototypeVersion="prototypeVersion"
            @comparison-add="emit('selectComparison', $event)">
        </SinglePlotPopup>
    </transition>
</template>
  
<script setup>
import { ref, defineEmits, defineProps, computed } from 'vue';
import data from '@/assets/ipmedth-dummy.json';
import SinglePlotPopup from './SinglePlotPopup.vue';

const emit = defineEmits(['confirm', 'cancel', 'selectComparison', 'plotClick', 'totalAvailablePlotsUpdate']);

// Props and data
const props = defineProps({
    comparisonNumbers: Array,
    filters: Object,
    prototypeVersion: String,
});
const isPlotPopupOpen = ref(false);
const currentPlot = ref(null);

// Filtered plots computed property
const totalAvailablePlots = computed(() => {
    emit('totalAvailablePlotsUpdate', data.filter((plot) => isPlotAvailable(plot)).length);
    return data.filter((plot) => isPlotAvailable(plot)).length;
});

// Methods
const handleWoningClick = (id) => {
    for (let i = 0; i < data.length; i++) {
        const plot = data[i];

        if (plot.number === id) {
            currentPlot.value = plot;
            isPlotPopupOpen.value = true;
            emit('plotClick');
            break;
        }
    }
};

const handleConfirm = () => {
    emit('confirm', currentPlot.value.number);
};

const handleCancel = () => {
    isPlotPopupOpen.value = false;
    currentPlot.value = null;
    emit('cancel');
};



const isPlotAvailable = (plot) => {
    if (props.filters !== undefined && props.filters !== null && Object.keys(props.filters).length > 0) {

        const {
            saleStatus,
            type,
            minPrice,
            maxPrice,
            furnished,
            minIndoorSurface,
            maxIndoorSurface,
            minBedrooms,
            maxBedrooms,
            minExtraRooms,
            maxExtraRooms,
            minFloor,
            maxFloor,
            minBathrooms,
            maxBathrooms,
            balconyDirection,
            parkingSpots,
            storage,
            energyLabel,
        } = props.filters;
        // console.log('props.filters', props.filters);

        // Check if the plot's properties match the filter criteria
        const isSaleStatusMatch = saleStatus?.length === 0 || saleStatus?.includes(plot.sale_status);
        const isTypeMatch = type.length === 0 || type?.includes(plot.type);
        const isPriceMatch = (plot.price >= minPrice && plot.price <= maxPrice);
        const isFurnishedMatch = furnished === 'any' || plot.furnished === furnished;
        const isIndoorSurfaceMatch = (plot.indoor_surface >= minIndoorSurface && plot.indoor_surface <= maxIndoorSurface);
        const isBedroomsMatch = (plot.bedrooms >= minBedrooms && plot.bedrooms <= maxBedrooms);
        const isExtraRoomsMatch = (plot.extra_rooms >= minExtraRooms && plot.extra_rooms <= maxExtraRooms);
        const isFloorMatch = (plot.floor >= minFloor && plot.floor <= maxFloor);
        const isBathroomsMatch = (plot.bathrooms >= minBathrooms && plot.bathrooms <= maxBathrooms);
        const isBalconyDirectionMatch = balconyDirection === 'any' || plot.balcony_direction === balconyDirection;
        const isParkingSpotsMatch = parkingSpots.length === 0 || parkingSpots?.includes(plot.parking_spots);
        const isStorageMatch = storage === 'any' || (storage === plot.has_storage);
        const isEnergyLabelMatch = energyLabel.length === 0 || energyLabel?.includes(plot.energy_label);

        // Return true if all filter criteria are met, otherwise return false
        // console.log('isSaleStatusMatch', isSaleStatusMatch,
        //     isTypeMatch,
        //     isPriceMatch,
        //     isFurnishedMatch,
        //     isIndoorSurfaceMatch,
        //     isBedroomsMatch,
        //     isExtraRoomsMatch,
        //     isFloorMatch,
        //     isBathroomsMatch,
        //     isBalconyDirectionMatch,
        //     isParkingSpotsMatch,
        //     isStorageMatch,
        //     isEnergyLabelMatch);

        // if (isSaleStatusMatch &&
        //     isTypeMatch &&
        //     isPriceMatch &&
        //     isFurnishedMatch &&
        //     isIndoorSurfaceMatch &&
        //     isBedroomsMatch &&
        //     isExtraRoomsMatch &&
        //     isFloorMatch &&
        //     isBathroomsMatch &&
        //     isBalconyDirectionMatch &&
        //     isParkingSpotsMatch &&
        //     isStorageMatch &&
        //     isEnergyLabelMatch) {
        //     console.log('true');
        // }

        return (
            isSaleStatusMatch &&
            isTypeMatch &&
            isPriceMatch &&
            isFurnishedMatch &&
            isIndoorSurfaceMatch &&
            isBedroomsMatch &&
            isExtraRoomsMatch &&
            isFloorMatch &&
            isBathroomsMatch &&
            isBalconyDirectionMatch &&
            isParkingSpotsMatch &&
            isStorageMatch &&
            isEnergyLabelMatch
        );
    } else {
        return true;
    }
};
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


    grid-template-columns: repeat(4, 1fr);
    /* transform: skew(10deg, 0deg) scale(0.7); */
}

.apprtment {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: 1px solid rgb(71, 71, 71);
    padding: 0.25rem;
}

.apprtment-compare-icon {
    display: flex;
    align-items: center;

    justify-content: center;
}
</style>