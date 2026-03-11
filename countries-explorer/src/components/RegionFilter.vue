
<script setup>
defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
</script>

<template>
  <div class="filter-container">
    <select 
      :value="modelValue" 
      @change="emit('update:modelValue', $event.target.value)"
      class="region-select"
    >
      <option value="">Toutes les régions</option>
      <option v-for="region in regions" :key="region" :value="region">
        {{ region }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.region-select {
  padding: 12px 15px;
  border-radius: 25px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  outline: none;
  font-size: 16px;
  min-width: 180px;
}
</style>