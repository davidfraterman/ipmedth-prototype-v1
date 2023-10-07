<template>
    <section class="filters-wrapper">
    <h1>Filter</h1>
      <div class="filters">
        <div class="filters-item">
          <h3>Sale Status</h3>
          <input type="checkbox" id="sold" name="sold" v-model="filters.saleStatus" value="sold">
          <label for="sold">Sold</label>
          <input type="checkbox" id="forSale" name="forSale" v-model="filters.saleStatus" value="forSale">
          <label for="forSale">For Sale</label>
          <input type="checkbox" id="reserved" name="reserved" v-model="filters.saleStatus" value="reserved">
          <label for="reserved">Reserved</label>
        </div>
        <div class="filters-item">
          <h3>Type</h3>
          <input type="checkbox" id="studio" name="studio" v-model="filters.type" value="studio">
          <label for="studio">Studio</label>
          <input type="checkbox" id="penthouse" name="penthouse" v-model="filters.type" value="penthouse">
          <label for="penthouse">Penthouse</label>
          <input type="checkbox" id="detached" name="detached" v-model="filters.type" value="detached">
          <label for="detached">Detached</label>
        </div>
        <div class="filters-item">
          <h3>Price</h3>
          <input type="range" id="price" name="price" v-model="filters.price" min="0" max="1000000">
        </div>
        <div class="filters-item">
          <h3>Furnished/Unfurnished</h3>
          <input type="radio" id="furnished" name="furnished" v-model="filters.furnished" value="furnished">
          <label for="furnished">Furnished</label>
          <input type="radio" id="unfurnished" name="furnished" v-model="filters.furnished" value="unfurnished">
          <label for="unfurnished">Unfurnished</label>
        </div>
        <div class="filters-item">
          <h3>Indoor Square Footage</h3>
          <input type="range" id="indoorSquareFootage" name="indoorSquareFootage" v-model="filters.indoorSquareFootage" min="0" max="10000">
        </div>
        <div class="filters-item">
          <h3>Amount of Bedrooms</h3>
          <input type="range" id="bedrooms" name="bedrooms" v-model="filters.bedrooms" min="0" max="10">
        </div>
        <div class="filters-item">
          <h3>Garden/Balcony Square Footage</h3>
          <input type="range" id="outdoorSquareFootage" name="outdoorSquareFootage" v-model="filters.outdoorSquareFootage" min="0" max="10000">
        </div>
        <div class="filters-item">
          <h3>Total Amount of Rooms</h3>
          <input type="range" id="totalRooms" name="totalRooms" v-model="filters.totalRooms" min="0" max="20">
        </div>
        <div class="filters-item">
          <h3>Direction of Garden/Balcony</h3>
          <input type="radio" id="north" name="direction" v-model="filters.direction" value="north">
          <label for="north">North</label>
          <input type="radio" id="south" name="direction" v-model="filters.direction" value="south">
          <label for="south">South</label>
          <input type="radio" id="east" name="direction" v-model="filters.direction" value="east">
          <label for="east">East</label>
          <input type="radio" id="west" name="direction" v-model="filters.direction" value="west">
          <label for="west">West</label>
        </div>
        <div class="filters-item">
          <h3>Parking Availability</h3>
          <input type="radio" id="yes" name="parking" v-model="filters.parking" value="yes">
          <label for="yes">Yes</label>
          <input type="radio" id="no" name="parking" v-model="filters.parking" value="no">
          <label for="no">No</label>
        </div>
        <div class="filters-item">
          <h3>Has Storage or Shed</h3>
          <input type="radio" id="storageYes" name="storage" v-model="filters.storage" value="yes">
          <label for="storageYes">Yes</label>
          <input type="radio" id="storageNo" name="storage" v-model="filters.storage" value="no">
          <label for="storageNo">No</label>
        </div>
        <div class="filters-item">
          <h3>Floor Level</h3>
          <input type="range" id="floorLevel" name="floorLevel" v-model="filters.floorLevel" min="0" max="100">
        </div>
        <div class="filters-item">
          <h3>Energylabel</h3>
          <input type="radio" id="a" name="energylabel" v-model="filters.energylabel" value="a">
          <label for="a">A</label>
          <input type="radio" id="b" name="energylabel" v-model="filters.energylabel" value="b">
          <label for="b">B</label>
          <input type="radio" id="c" name="energylabel" v-model="filters.energylabel" value="c">
          <label for="c">C</label>
          <input type="radio" id="d" name="energylabel" v-model="filters.energylabel" value="d">
          <label for="d">D</label>
          <input type="radio" id="e" name="energylabel" v-model="filters.energylabel" value="e">
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const filters = ref({
    saleStatus: [],
    type: [],
    price: 0,
    furnished: '',
    indoorSquareFootage: 0,
    bedrooms: 0,
    outdoorSquareFootage: 0,
    totalRooms: 0,
    direction: '',
    parking: '',
    storage: '',
    floorLevel: 0,
    energylabel: ''
  });

</script>
  
<style scoped>
h1 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 2rem;
}
.filters-wrapper {
  background-color: #fff; /* Background color for the popup */
  border-top: 1px solid #ccc; /* Add a top border for separation */
  padding: 1rem;
  box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
  z-index: 999; /* Ensure it's above other content */
  max-height: 100vh;
  overflow-y: scroll;
}

.filters {
    margin-bottom: 10rem;
}

.filters-item {
    margin-bottom: 1rem;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
}

.filter-group h3 {
  flex: 1;
  margin: 0;
  font-size: 1.2rem;
}

.filter-options {
  display: flex;
  gap: 1rem; /* Adjust the gap as needed */
  flex: 2;
}


.filters-wrapper h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.filters-wrapper label {
  display: block;
  margin-bottom: 0.3rem;
}

/* Customize the appearance of the range input */
.filters-wrapper input[type="range"] {
  -webkit-appearance: none; /* Remove default styles on WebKit browsers */
  width: 100%;
  height: 6px;
  background-color: #f1f1f1; /* Track color */
  border-radius: 3px;
}

.filters-wrapper input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; /* Remove default thumb appearance on WebKit browsers */
  width: 20px;
  height: 20px;
  background-color: #007bff; /* Thumb color */
  border-radius: 50%;
  cursor: pointer;
}

</style>