<template>
    <section class="filters-wrapper">
        <h1>Filter ({{ numFiltersChanged }})</h1>
        <button @click="resetFilters">Reset Filters</button>
        <div class="filters">
            <!-- Sale Status -->
            <div class="filters-item">
                <h3>Sale Status</h3>
                <div v-for="status in saleStatusValues" :key="status">
                    <input :key="status" type="checkbox" :id="status" :name="status" v-model="filters.saleStatus"
                        :value="status" />
                    <label :for="status">{{ status }}</label>
                </div>
            </div>
            <!-- Type -->
            <div class="filters-item">
                <h3>Type</h3>
                <div v-for="type in typeValues" :key="type">
                    <input :key="type" type="checkbox" :id="type" :name="type" v-model="filters.type" :value="type" />
                    <label :for="type">{{ type }}</label>
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
            <!-- Furnished/Unfurnished -->
            <div class="filters-item">
                <h3>Furnished/Unfurnished</h3>
                <div v-for="furnished in furnishedValues" :key="furnished">
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
                <div v-for="direction in balconyDirectionValues" :key="direction">
                    <input :key="direction" type="radio" :id="direction" :name="direction"
                        v-model="filters.balconyDirection" :value="direction" />
                    <label :for="direction">{{ direction }}</label>
                </div>
            </div>
            <!-- Parking Availability -->
            <div class="filters-item">
                <h3>Parking Availability</h3>
                <div v-for="parking in parkingValues" :key="parking">
                    <input :key="parking" type="radio" :id="parking" :name="parking" v-model="filters.parkingSpots"
                        :value="parking" />
                    <label :for="parking">{{ parking }}</label>
                </div>
            </div>
            <!-- Has Storage or Shed -->
            <div class="filters-item">
                <h3>Has Storage or Shed</h3>
                <div v-for="storage in storageValues" :key="storage">
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
                <div v-for="energyLabel in energyLabelValues" :key="energyLabel">
                    <input :key="energyLabel" type="radio" :id="energyLabel" :name="energyLabel"
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
});

const { filterProps } = toRefs(props);

const filters = ref({
    saleStatus: [],
    type: [],
    minPrice: 225000,
    maxPrice: 1000000,
    furnished: '',
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
    balconyDirection: '',
    parkingSpots: -1,
    storage: '',
    energyLabel: '',
});

// update from props when opened
if(filterProps.value !== filters.value && Object.keys(filterProps.value).length > 0) {
    filters.value = filterProps.value;
}

const originalFilters = { ...filters.value }; // Create a copy of the original filters

const numFiltersChanged = computed(() => {
    // Calculate the number of filters changed by comparing with the original filters
    let count = 0;
    for (const key in filters.value) {
        if (Array.isArray(filters.value[key])) {
            // For arrays, compare their lengths
            if (filters.value[key].length !== originalFilters[key].length) {
                count++;
            }
        } else if (filters.value[key] !== originalFilters[key]) {
            count++;
        }
    }
    return count;
});

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
    // Reset all filter values
    filters.value = { ...originalFilters };
};

// Values based on schema
const saleStatusValues = ["sold", "for-sale", "reserved"];
const typeValues = ["penthouse", "appartment"];
const furnishedValues = [true, false];
const balconyDirectionValues = ["east", "west", "north", "south"];
const parkingValues = [0, 1, 2, 3];
const storageValues = [true, false];
const energyLabelValues = ["F", "E", "D", "B", "A", "A+", "A++", "A+++"];

</script>
  

<style scoped>
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
    display: flex;
    flex-wrap: wrap;
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
    /* Adjust the margin as needed */
}

input[type="checkbox"],
input[type="radio"],
input[type="range"] {
    width: 100%;
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