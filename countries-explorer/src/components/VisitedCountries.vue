<script setup>
defineProps(['countries']);
defineEmits(['remove']);
</script>

<template>
  <div class="visited-container">
    <h2>Ma collection de voyages ✈️</h2>
    <div v-if="countries.length === 0" class="empty-msg">
      Aucun pays visité pour le moment.
    </div>
    <div class="visited-list">
      <div v-for="country in countries" :key="country.cca3" class="visited-item">
        <span class="emoji">{{ country.flag }}</span>
        <span class="name">{{ country.name.common }}</span>
        <button @click="$emit('remove', country)" class="remove-btn">Retirer</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.visited-list { 
    display: flex; 
    flex-direction: 
    column; gap: 10px; 
    max-width: 500px; 
    margin: 20px auto; 
}

.visited-item { 
  display: flex; 
  align-items: center; 
  justify-content: space-between;
  background: white; 
  padding: 15px; 
  border-radius: 8px; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.emoji { font-size: 1.5rem; margin-right: 10px; }
.name { font-weight: bold; flex-grow: 1; }

.remove-btn {
    background: #ff7675; 
    color: white; 
    border: none; 
    padding: 5px 10px; 
    border-radius: 4px; 
    cursor: pointer; 
}
</style>