<script setup>
    defineProps(['country']);
    defineEmits(['show-details']);
</script>

<template>
  <div class="country-card">
    <img :src="country.flags.svg" :alt="country.name.common" class="flag">
    <div class="info">
      <h3>{{ country.name.common }}</h3>
      <div class="card-actions">
        <router-link :to="'/country/' + country.cca3" class="detail-btn">
          Voir les détails
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

.detail-btn {
    margin-top: 10px;
    padding: 8px;
    background-color: #2980b9;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.country-card {
  background: rgb(255, 255, 255);
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.flag {
  width: 330px;
  height: 150px;
  border-radius: 4px;
  margin-bottom: 12px;
}

h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.card-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.visit-btn {
  padding: 8px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.visit-btn:hover {
  background-color: #27ae60;
}

</style>