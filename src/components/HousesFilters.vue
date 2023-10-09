<template>
    <section class="filters-wrapper">
        <h1>Filter ({{ numFiltersChanged }})</h1>
        <p class="plotsLeftover">Selection: {{ totalAvailablePlots }}</p>
        <button class="resetFilters" @click="resetFilters">Reset Filters</button>
        <div class="filters">
            <!-- Sale Status -->
            <div class="filters-item">
                <h3>Sale Status</h3>
                <div v-for="status in saleStatusValues" :key="status" class="list-item">
                    <input :key="status" type="checkbox" :id="status" :name="status" v-model="filters.saleStatus"
                        :value="status" />
                    <label :for="status">{{ status }}</label>
                </div>
            </div>
            <!-- Price -->
            <div class="filters-item">
                <h3>Price</h3>
                <div>
                    <label for="minPrice">Min Price</label>
                    <input type="number" id="minPrice" v-model="filters.minPrice" />
                </div>
                <div>
                    <label for="maxPrice">Max Price</label>
                    <input type="number" id="maxPrice" v-model="filters.maxPrice" />
                </div>
            </div>
            <!-- Type -->
            <div class="filters-item">
                <h3>Type</h3>
                <div v-for="type in typeValues" :key="type" class="list-item">
                    <input :key="type" type="checkbox" :id="type" :name="type" v-model="filters.type" :value="type" />
                    <label :for="type">{{ type }}</label>
                </div>
            </div>

            <!-- Furnished/Unfurnished -->
            <div class="filters-item">
                <h3>Furnished/Unfurnished</h3>
                <div v-for="furnished in furnishedValues" :key="furnished" class="list-item">
                    <input :key="furnished" type="radio" :id="furnished" :name="furnished" v-model="filters.furnished"
                        :value="furnished" />
                    <label :for="furnished">{{ furnished }}</label>
                </div>
            </div>
            <!-- Indoor Square Footage -->
            <div class="filters-item">
                <h3>Indoor Square Footage</h3>
                <div>
                    <label for="minIndoorSurface">Min Indoor Surface</label>
                    <input type="number" id="minIndoorSurface" v-model="filters.minIndoorSurface" />
                </div>
                <div>
                    <label for="maxIndoorSurface">Max Indoor Surface</label>
                    <input type="number" id="maxIndoorSurface" v-model="filters.maxIndoorSurface" />
                </div>
            </div>
            <!-- Amount of Bedrooms -->
            <div class="filters-item">
                <h3>Amount of Bedrooms</h3>
                <div>
                    <label for="minBedrooms">Min Bedrooms</label>
                    <input type="number" id="minBedrooms" v-model="filters.minBedrooms" />
                </div>
                <div>
                    <label for="maxBedrooms">Max Bedrooms</label>
                    <input type="number" id="maxBedrooms" v-model="filters.maxBedrooms" />
                </div>
            </div>
            <!-- Outdoor Square Footage -->
            <div class="filters-item">
                <h3>Garden/Balcony Square Footage</h3>
                <div>
                    <label for="minOutdoorSurface">Min Outdoor Surface</label>
                    <input type="number" id="minOutdoorSurface" v-model="filters.minOutdoorSurface" />
                </div>
                <div>
                    <label for="maxOutdoorSurface">Max Outdoor Surface</label>
                    <input type="number" id="maxOutdoorSurface" v-model="filters.maxOutdoorSurface" />
                </div>
            </div>
            <!-- Total Amount of Rooms -->
            <div class="filters-item">
                <h3>Total Amount of Rooms</h3>
                <div>
                    <label for="minExtraRooms">Min Extra Rooms</label>
                    <input type="number" id="minExtraRooms" v-model="filters.minExtraRooms" />
                </div>
                <div>
                    <label for="maxExtraRooms">Max Extra Rooms</label>
                    <input type="number" id="maxExtraRooms" v-model="filters.maxExtraRooms" />
                </div>
            </div>
            <!-- Direction of Garden/Balcony -->
            <div class="filters-item">
                <h3>Direction of Garden/Balcony</h3>
                <div v-for="direction in balconyDirectionValues" :key="direction" class="list-item">
                    <input :key="direction" type="radio" :id="direction" :name="direction"
                        v-model="filters.balconyDirection" :value="direction" />
                    <label :for="direction">{{ direction }}</label>
                </div>
            </div>
            <!-- Parking Availability -->
            <div class="filters-item">
                <h3>Parking Availability</h3>
                <div v-for="parking in parkingValues" :key="parking" class="list-item">
                    <input :key="parking" type="checkbox" :id="parking" :name="parking" v-model="filters.parkingSpots"
                        :value="parking" />
                    <label :for="parking">{{ parking }}</label>
                </div>
            </div>
            <!-- Has Storage or Shed -->
            <div class="filters-item">
                <h3>Has Storage or Shed</h3>
                <div v-for="storage in storageValues" :key="storage" class="list-item">
                    <input :key="storage" type="radio" :id="storage" :name="storage" v-model="filters.storage"
                        :value="storage" />
                    <label :for="storage">{{ storage }}</label>
                </div>
            </div>
            <!-- Floor Level -->
            <div class="filters-item">
                <h3>Floor Level</h3>
                <div>
                    <label for="minFloor">Min Floor</label>
                    <input type="number" id="minFloor" v-model="filters.minFloor" />
                </div>
                <div>
                    <label for="maxFloor">Max Floor</label>
                    <input type="number" id="maxFloor" v-model="filters.maxFloor" />
                </div>
            </div>
            <!-- Energylabel -->
            <div class="filters-item">
                <h3>Energylabel</h3>
                <div v-for="energyLabel in energyLabelValues" :key="energyLabel" class="list-item">
                    <input :key="energyLabel" type="checkbox" :id="energyLabel" :name="energyLabel"
                        v-model="filters.energyLabel" :value="energyLabel" />
                    <label :for="energyLabel">{{ energyLabel }}</label>
                </div>
            </div>
            <!-- Bathrooms -->
            <div class="filters-item">
                <h3>Bathrooms</h3>
                <div>
                    <label for="minBathrooms">Min Bathrooms</label>
                    <input type="number" id="minBathrooms" v-model="filters.minBathrooms" />
                </div>
                <div>
                    <label for="maxBathrooms">Max Bathrooms</label>
                    <input type="number" id="maxBathrooms" v-model="filters.maxBathrooms" />
                </div>
            </div>
        </div>
    </section>
</template>
  
<script setup>
import { ref, computed, defineEmits, watch, defineProps, toRefs } from 'vue';

const emit = defineEmits(['amtOfFiltersChanged', 'filterUpdate', "update:modelValue"]);

const props = defineProps({
    filterProps: Object,
    totalAvailablePlots: Number,
});

const { filterProps } = toRefs(props);

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
    parkingSpots:[],
    storage: 'any',
    energyLabel: [],
});

const originalFilters = ref({
    saleStatus: [],
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

// update from props when opened
if (filterProps.value !== filters.value && Object.keys(filterProps.value).length > 0) {
    filters.value = filterProps.value;
}


const numFiltersChanged = computed(() => {
    // Calculate the number of filters changed by comparing with the original filters
    let count = 0;
    for (const key in filters.value) {
        if (Array.isArray(filters.value[key])) {
            // For arrays, compare their lengths
            if (filters.value[key].length !== originalFilters.value[key].length) {
                count++;
            }
        } else if (filters.value[key] !== originalFilters.value[key]) {
            count++;
        }
    }
    return count;
});
emit('amtOfFiltersChanged', numFiltersChanged);

watch(numFiltersChanged, (newValue) => {
    // Emit the number of filters changed
    emit('amtOfFiltersChanged', newValue);
    // emit('filterUpdate', filters.value);
});

watch(filters.value, () => {
    // Emit the number of filters changed
    emit('filterUpdate', filters.value);
    // emit('update:modelValue', filters.value)
});

const resetFilters = () => {
    console.log('reset filters');

    // Reset all filter values
    filters.value = originalFilters.value;
    emit('filterUpdate', filters.value);
};

// Values based on schema
const saleStatusValues = ["sold", "for-sale", "reserved"];
const typeValues = ["penthouse", "appartment"];
const furnishedValues = [true, false, 'any'];
const balconyDirectionValues = ["east", "west", "north", "south", 'any'];
const parkingValues = [0, 1, 2, 3];
const storageValues = [true, false, 'any'];
const energyLabelValues = ["F", "E", "D", "B", "A", "A+", "A++", "A+++"];

</script>
  

<style scoped>
.plotsLeftover{
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    background-color: #fff;
    color: #333;
    font-size: 1rem;
    font-weight: 500;
}
.list-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 0.5rem;
    text-align: left;
}

.resetFilters {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    background-color: #fff;
    color: #333;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-out;
}

h1 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 2rem;
}

.filters {
    margin-bottom: 10rem;
}

.filters-wrapper {
    max-height: 100vh;
    overflow-y: scroll;
    background-color: #f7f7f7;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 20px;
    margin: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
}

.filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.filters-item {
    flex: 1;
    background-color: #fff;
    padding: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.filters-item h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #333;
}

label {
    color: #333;
    margin-left: 10px;
    text-align: left;
    /* Adjust the margin as needed */
}

input[type="number"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: #f9f9f9;
    color: #333;
    margin-bottom: 1rem;
}

input[type="checkbox"],
input[type="radio"],
input[type="range"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: #f9f9f9;
    color: #333;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background-color: #007bff;
    border-radius: 50%;
    cursor: pointer;
}

/* Customize the appearance of checkboxes and radios */
input[type="checkbox"]::before,
input[type="radio"]::before {
    border: 2px solid #007bff;
    background-color: #fff;
}

/* Highlight the selected checkboxes and radios */
input[type="checkbox"]:checked+label,
input[type="radio"]:checked+label {
    color: #007bff;
}
</style>