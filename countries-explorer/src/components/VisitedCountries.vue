<script setup>

defineProps({
  countries: {
    type: Array,
    default: () => []
  }
});

defineEmits(['remove']);
</script>

<template>
  <div class="visited-view">
    <h2>Mes pays visités</h2>

    <div v-if="countries.length === 0" class="empty-msg">
      Vous n'avez pas encore marqué de pays comme visité.
    </div>

    <div v-else class="list">
      <div v-for="c in countries" :key="c.cca3" class="item">
        <span class="flag-emoji">{{ c.flag }}</span>
        <span class="country-name">{{ c.name.common }}</span>
        <button @click="$emit('remove', c)" class="remove-btn">Retirer</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.visited-view {
  padding: 20px;
  background: rgba(196, 246, 171, 0.638);
  margin-top: 20px;
  margin-bottom: 20px;
}

.empty-msg {
  color: #7f8c8d;
  font-style: italic;
  text-align: center;
  padding: 20px;
}

.list {
  display: grid;
  gap: 10px;
  margin-top: 15px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #eee;
}

.flag-emoji {
  font-size: 1.5rem;
  margin-right: 10px;
}

.country-name {
  font-weight: bold;
  flex-grow: 1;
}

.remove-btn {
  background: #ff7675;
  color: white;
  border: none;
  padding: 5px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn:hover {
  background: #d63031;
}
</style>