<template>
    <section class="comparison">
        <h1>Compare ({{ comparisonNumbers.length }})</h1>
        <table v-if="houses.length > 0">
            <thead>
                <tr>
                    <th>Apprt. Number</th>
                    <th v-for="nr in comparisonNumbers" :key="nr">
                        {{ nr }} <p @click="removeFromComparison(nr)" class="removeFromComparison">remove</p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(label, key) in Object.keys(houses[0])" :key="key">
                    <td>{{ label }}</td>
                    <td v-for="house in houses" :key="house.number">
                        {{ house[label] }}
                    </td>

                </tr>
            </tbody>
        </table>
        <section class="error-msg" v-else>
            Select houses to compare for them to show up here.
        </section>
    </section>
</template>
  
<script setup>
import data from '@/assets/ipmedth-dummy.json'
import { ref, watch } from 'vue';
import { defineProps, toRefs, defineEmits } from 'vue'

const props = defineProps({
    comparisonNumbers: Array,
})

let emit = defineEmits(['removeFromComparison'])

let { comparisonNumbers } = toRefs(props)

watch(comparisonNumbers.value, (newValue, oldValue) => {
    console.log('newValue', newValue);
    console.log('oldValue', oldValue);
    setComparisons()
})

// const labels = ref([]);
const houses = ref([]);

// const filteredValues = ref(["number", "price", "parking_count", "parking_value", "parking_description", "living_surface", "plot_surface", "type", "from_price", "to_price", "room_count", "service_costs", "description", "volume_unit", "volume_external", "energy_class", "energy_index", "energy_epc", "energy_beng", "bedrooms", "publish_at", "unpublished_at", "id", "status", "house_type"]);

const setComparisons = () => {
    houses.value = [];

    if (comparisonNumbers.value.length > 0) {

        for (let i = 0; i < comparisonNumbers.value.length; i++) {
            const plotNumber = comparisonNumbers.value[i];

            for (let j = 0; j < data.length; j++) {
                const plot = data[j];
                if (plot.number === plotNumber) {
                    console.log('plot', plot.number, plotNumber);
                    houses.value.push(plot);
                }
            }
        }
    }
}

setComparisons()

const removeFromComparison = (nr) => {
    emit('removeFromComparison', nr)
}

</script>
  
<style scoped>

h1 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    margin-top: 1rem;
}
.removeFromComparison {
    color: red;
    font-size: 0.8rem;
    cursor: pointer;
    font-weight: lighter;
    text-decoration: underline;
}

.error-msg {
    text-align: center;
    margin-top: 4rem;
    font-size: 1rem;
}

.comparison {
    overflow-x: auto;
    max-width: 100vh;
    margin-bottom: 6rem;
    /* Add horizontal scroll for small screens */
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

/* Highlighting logic */
.highlight {
    font-weight: bold;
    color: #007bff;
    /* Highlight color */
}
</style>