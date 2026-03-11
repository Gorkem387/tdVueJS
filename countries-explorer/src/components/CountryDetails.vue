<script setup>
defineProps({
  country: { type: Object, required: true },
  isVisited: { type: Boolean, default: false }
});

defineEmits(['toggle-visited']);
</script>

<template>
  <div class="details-card">
    <div class="header">
      <img :src="country.flags.svg" :alt="country.name.common" class="flag-img">
      <div class="title-area">
        <h2>{{ country.name.official }}</h2>

        <div class="visited-toggle">
          <label>
            <input type="checkbox" :checked="isVisited" @change="$emit('toggle-visited', country)">
            <span>J'ai visité ce pays</span>
          </label>
        </div>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-item"><strong>Capitale :</strong> {{ country.capital?.[0] || 'N/A' }}</div>
      <div class="info-item"><strong>Région :</strong> {{ country.region }} ({{ country.subregion }})</div>
      <div class="info-item"><strong>Population :</strong> {{ country.population.toLocaleString() }}</div>
      <div class="info-item"><strong>Langues :</strong> {{ Object.values(country.languages || {}).join(', ') }}</div>
      <div class="info-item"><strong>Monnaie :</strong> {{Object.values(country.currencies || {}).map(c =>
        c.name).join(', ') }}</div>
      <div class="info-item">
        <strong>Frontières : </strong>
        <span v-if="country.borders">{{ country.borders.join(', ') }}</span>
        <span v-else>Aucune frontière terrestre</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details-card {
  background: white;
  padding: 40px;
}

.header {
  display: flex;
  gap: 40px;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 30px;
}

.flag-img {
  width: 350px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.visited-toggle {
  margin-top: 15px;
  font-size: 1.1rem;
}

.visited-toggle label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.info-item {
  font-size: 1.1rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    text-align: center;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>