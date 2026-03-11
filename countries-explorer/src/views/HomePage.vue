<script setup>
import { ref, computed, onMounted } from 'vue';
import CountryCard from '../components/CountryCard.vue';
import SearchBar from '../components/SearchBar.vue';
import RegionFilter from '../components/RegionFilter.vue';
import CountryDetails from '../components/CountryDetails.vue';
import StatsCard from '../components/StatsCard.vue';
import { visited, addVisited, toggleVisited } from '../composables/useVisited';

const countries = ref([]);
const isLoading = ref(true);
const searchQuery = ref("");
const selectedRegion = ref("");
const resetKey = ref(0);
const selectedCountry = ref(null);

const totalCountries = computed(() => countries.value.length);
const totalPopulation = computed(() => {
  return countries.value.reduce((sum, country) => sum + country.population, 0);
});
const topCountry = computed(() => {
  if (countries.value.length === 0) return null;
  return [...countries.value].sort((a, b) => b.population - a.population)[0];
});

const filteredCountries = computed(() => {
  return countries.value.filter(country => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    
    const matchesRegion = selectedRegion.value === "" || 
                          country.region === selectedRegion.value;

    return matchesSearch && matchesRegion;
  });
});

const fetchCountries = async () => {
  try {
    isLoading.value = true;
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,languages,currencies,borders,flag,cca3");
    countries.value = await response.json();
  } catch (error) {
    console.error("Erreur :", error);
  } finally {
    isLoading.value = false;
  }
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedRegion.value = "";
  resetKey.value++;
};

const openDetails = (country) => {
  selectedCountry.value = country;
};

const closeDetails = () => {
  selectedCountry.value = null;
};

onMounted(fetchCountries);
</script>

<template>
  <div v-if="selectedCountry">
    <CountryDetails 
      :country="selectedCountry" 
      :isVisited="!!visited.find(c => c.cca3 === selectedCountry.cca3)"
      @close="closeDetails"
      @toggle-visited="toggleVisited"
    />
  </div>

  <div v-else>
    <header class="header-controls">
      <div class="stats-container" v-if="!isLoading">
        <StatsCard title="Total Pays" :value="totalCountries" />
        <StatsCard title="Population Mondiale" :value="totalPopulation.toLocaleString()">
        </StatsCard>
        <StatsCard 
          v-if="topCountry"
          title="Plus peuplé" 
          :value="topCountry.name.common" 
          :subtitle="topCountry.population.toLocaleString() + ' hab.'" 
        />
      </div>

      <div class="search-area">
        <SearchBar v-model="searchQuery" :key="'search-' + resetKey" />
        <RegionFilter v-model="selectedRegion" :key="'region-' + resetKey" />
        <button @click="resetFilters" class="reset-btn">Réinitialiser les filtres</button>
      </div>
    </header>

    <main id="app">
      <h1>Explorateur de Pays</h1>
      
      <div v-if="isLoading" class="loader">Chargement des pays...</div>
      
      <div v-else>
        <p class="results-count"><strong>{{ filteredCountries.length }}</strong> pays trouvé(s)</p>
        <div class="countries-grid">
          <CountryCard 
            v-for="country in filteredCountries" 
            :key="country.name.common" 
            :country="country"
            @show-details="openDetails"
            @add-visited="addVisited"
            @toggle-visited="toggleVisited"
            />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.header-controls {
  padding: 20px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.stats-container {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center;
}

.search-area {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.results-count {
    text-align: center;
    margin: 20px 0;
}

.reset-btn {
  padding: 12px 20px;
  border-radius: 25px;
  border: none;
  background-color: #e74c3c;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

.countries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 20px;
}

.loader {
  text-align: center;
  padding: 50px;
  font-size: 1.5rem;
}
</style>