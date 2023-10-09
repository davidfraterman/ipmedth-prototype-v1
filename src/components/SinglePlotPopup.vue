<template>
    <!-- plot popup -->
    <section class="plot-popup">
        <section class="plot-popup__content">
            <section class="plot-popup__content__header">
                <h2>Appartment {{ currentPlot.number }}</h2>

            </section>
            Properties
            <section class="plot-popup__content__body">
                <section class="plot-popup__content__body__info">
                    <section class="plot-popup__content__body__info__content">
                        <h3>Price</h3>
                        <p>{{ currentPlot.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) }}</p>
                    </section>
                    <section class="plot-popup__content__body__info__content">
                        <h3>Type</h3>
                        <p>{{ currentPlot.type }}</p>
                    </section>
                    <section class="plot-popup__content__body__info__content">
                        <h3>Indoor Surface</h3>
                        <p>{{ currentPlot.indoor_surface }} m²</p>
                    </section>
                    <section class="plot-popup__content__body__info__content">
                        <h3>Bedrooms</h3>
                        <p>{{ currentPlot.bedrooms }}</p>
                    </section>
                    <section class="plot-popup__content__body__info__content">
                        <h3>Bathrooms</h3>
                        <p>{{ currentPlot.bathrooms }}</p>
                    </section>
                    <section class="plot-popup__content__body__info__content">
                        <h3>Other rooms</h3>
                        <p>{{ currentPlot.extra_rooms }}</p>
                    </section>
                    <section class="plot-popup__content__body__info__content">
                        <h3>Floor</h3>
                        <p>{{ currentPlot.floor }}</p>
                    </section>
                   
                    <section class="plot-popup__content__body__info__content">
                        <h3>Status</h3>
                        <p>{{ currentPlot.sale_status }}</p>
                    </section>
                    <section class="plot-popup__content__body__info__content">
                        <h3>Balcony dir.</h3>
                        <p>{{ currentPlot.balcony_direction }}</p>
                    </section>
                    <!-- Add more sections for other fields -->
                    <section class="plot-popup__content__body__info__content">
                        <h3>Furnished</h3>
                        <p>{{ currentPlot.furnished ? 'Yes' : 'No' }}</p>
                    </section>
                    <section class="plot-popup__content__body__info__content">
                        <h3>Energy label</h3>
                        <p>{{ currentPlot.energy_label }}</p>
                    </section>
                 
                 
                  
                    <section class="plot-popup__content__body__info__content">
                        <h3>Parking spots</h3>
                        <p>{{ currentPlot.parking_spots }}</p>
                    </section>
                    <section class="plot-popup__content__body__info__content">
                        <h3>Disability access</h3>
                        <p>{{ currentPlot.disability_access ? 'Yes' : 'No' }}</p>
                    </section>
                    <!-- Add more sections for other fields -->
                </section>
            </section>
            <button class="select-plot-button" @click="toggleConfirmPopup()">This is my closest match</button>
            <button class="plot-popup__content-close" @click="addToComparison(currentPlot.number)"
                :class="{ alreadyAddedCompareStyling: comparisonNumbers.includes(currentPlot.number) }">
                {{ comparisonNumbers.includes(currentPlot.number) ? 'Added to comparison' : 'Add to comparison' }}
            </button>
            <br><br>
            <button class="plot-popup__content-close" @click="handleCancel()">Back</button>
        </section>

        <section class="confirm-select" v-if="isConfirmPopupOpen">
            <section class="confirm-select__content">
                <h2>Confirm</h2>
                <button class="confirm-select__content__button" @click="handleConfirm()">Yes</button>
                <button class="confirm-select__content__button-cancel" @click="toggleConfirmPopup()">No</button>
            </section>
        </section>
    </section>
</template>

<script setup>
import { defineEmits, defineProps, ref, toRefs } from 'vue';

const emit = defineEmits(['confirm', 'cancel', 'comparison-add'])
const props = defineProps({
    currentPlot: Object,
    comparisonNumbers: Array,
})

let { comparisonNumbers } = toRefs(props)

const handleCancel = () => {
    emit('cancel')
}

const handleConfirm = () => {
    emit('confirm')
}

const isConfirmPopupOpen = ref(false)

const toggleConfirmPopup = () => {
    isConfirmPopupOpen.value = !isConfirmPopupOpen.value
}

const addToComparison = (plotNr) => {
    if (comparisonNumbers.value.includes(plotNr)) {
        return;
    }

    emit('comparison-add', plotNr)
}

</script>

<style scoped>
.confirm-select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .5);
}

.confirm-select__content {
    width: 90%;
    height: 30%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.confirm-select__content__button {
    width: 90%;
    padding: 1rem;
    border: none;
    background-color: #006241;
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
    outline: none;
    border-radius: 10px;
    margin-top: 1rem;
}

.confirm-select__content__button-cancel {
    width: 90%;
    padding: 1rem;
    border: none;
    background-color: #fff;
    color: #006241;
    font-size: 1.2rem;
    cursor: pointer;
    outline: none;
    border-radius: 10px;
    margin-top: 1rem;
    border: 1px solid #006241;
}

.plot-popup__content__header {
    position: relative;
}

.select-plot-button {
    width: 90%;
    padding: 1rem;
    border: none;
    background-color: #006241;
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
    outline: none;
    border-radius: 10px;
    margin-top: 2rem;

}

.plot-popup__content-close {
    width: 90%;
    padding: 1rem;
    border: none;
    background-color: #fff;
    color: #006241;
    font-size: 1.2rem;
    cursor: pointer;
    outline: none;
    border-radius: 10px;
    margin-top: 1rem;
    border: 1px solid #006241;

}

.plot-popup__content {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    padding: 1rem;
}

.plot-popup {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
}

.plot-popup__content__body {
    max-height: 40vh;
    overflow-y: scroll;
    margin: 1rem;
    border: 1px solid grey;
}

.popup__content__body__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.plot-popup__content__body__info__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid #000;
}

.alreadyAddedCompareStyling {
    background-color: #949494;
    border-color: #949494;
    color: #fff;
}
</style>