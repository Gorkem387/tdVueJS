<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { visited, toggleVisited } from '../composables/useVisited';

const props = defineProps({
  country: { type: Object, default: null },
  isVisited: { type: Boolean, default: false },
  code: { type: String, default: null }
});

const emit = defineEmits(['close', 'toggle-visited']);

const router = useRouter();
const countryData = ref(props.country);
const loading = ref(false);

const fetchByCode = async (code) => {
  try {
    loading.value = true;
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,population,region,capital,languages,currencies,borders,flag,cca3`);
    const json = await res.json();
    countryData.value = Array.isArray(json) ? json[0] : json;
  } catch (e) {
    console.error('Failed to fetch country by code', e);
  } finally {
    loading.value = false;
  }
};

watch(() => props.code, (c) => {
  if (c) fetchByCode(c);
});

onMounted(() => {
  if (props.code && !props.country) {
    fetchByCode(props.code);
  }
});

const handleClose = () => {
  if (props.code) {
    router.push('/');
  } else {
    emit('close');
  }
};

const isVisitedComputed = computed(() => {
  if (props.isVisited) return true;
  if (!countryData.value) return false;
  return !!visited.value.find(c => c.cca3 === countryData.value.cca3);
});

const handleToggleVisited = () => {
  if (!countryData.value) return;
  toggleVisited(countryData.value);
  emit('toggle-visited', countryData.value);
};
</script>

<template>
  <div class="country-details" v-if="!loading && countryData">
    <button @click="handleClose" class="close-btn">← Retour à la liste</button>

    <div class="details-content">
      <img :src="countryData.flags.svg" alt="Drapeau" class="large-flag">

      <div class="text-info">
        <h2>{{ countryData.name.official }}</h2>

        <div class="visited-checkbox-area">
          <label class="checkbox-label">
            <input type="checkbox" :checked="isVisitedComputed" @change="handleToggleVisited">
            Marquer comme "Pays visité"
          </label>
        </div>

        <div class="info-grid">
          <p><strong>Capitale :</strong> {{ countryData.capital?.[0] || 'N/A' }}</p>
          <p><strong>Région :</strong> {{ countryData.region }}</p>
          <p><strong>Population :</strong> {{ countryData.population.toLocaleString() }}</p>
          <p><strong>Langues :</strong> {{ Object.values(countryData.languages || {}).join(', ') || 'N/A' }}</p>
          <p><strong>Devises :</strong> {{Object.values(countryData.currencies || {}).map(c => c.name).join(', ') || 'N/A'
            }}</p>
          <p><strong>Frontières :</strong> {{ countryData.borders?.join(', ') || 'Aucune' }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="loading" class="country-details">
    <div class="loader">Chargement...</div>
  </div>
</template>

<style scoped>
.country-details {
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
}

.details-content {
  display: flex;
  gap: 40px;
  background: white;
  padding: 30px;
}

.large-flag {
  width: 400px;
  border-radius: 8px;
  object-fit: contain;
}

.close-btn {
  margin-bottom: 20px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background: #2c3e50;
  color: white;
  border-radius: 5px;
}

.visited-checkbox-area {
  margin: 20px 0;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  cursor: pointer;
}

.checkbox-label input {
  width: 20px;
  height: 20px;
}

.info-grid p {
  margin: 8px 0;
  line-height: 1.6;
}
</style>