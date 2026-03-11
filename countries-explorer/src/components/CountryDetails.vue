<script setup>
defineProps(['country', 'isVisited']);
defineEmits(['close', 'toggle-visited']);
</script>

<template>
  <div class="country-details">
    <button @click="$emit('close')" class="close-btn">← Retour à la liste</button>

    <div class="details-content">
      <img :src="country.flags.svg" alt="Drapeau" class="large-flag">

      <div class="text-info">
        <h2>{{ country.name.official }}</h2>

        <div class="visited-checkbox-area">
          <label class="checkbox-label">
            <input type="checkbox" :checked="isVisited" @change="$emit('toggle-visited', country)">
            Marquer comme "Pays visité"
          </label>
        </div>

        <div class="info-grid">
          <p><strong>Capitale :</strong> {{ country.capital?.[0] || 'N/A' }}</p>
          <p><strong>Région :</strong> {{ country.region }}</p>
          <p><strong>Population :</strong> {{ country.population.toLocaleString() }}</p>
          <p><strong>Langues :</strong> {{ Object.values(country.languages || {}).join(', ') || 'N/A' }}</p>
          <p><strong>Devises :</strong> {{Object.values(country.currencies || {}).map(c => c.name).join(', ') || 'N/A'
            }}</p>
          <p><strong>Frontières :</strong> {{ country.borders?.join(', ') || 'Aucune' }}</p>
        </div>
      </div>
    </div>
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