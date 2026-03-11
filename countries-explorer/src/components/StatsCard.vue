<script setup>
    defineProps({
        title: String,
        value: [String, Number],
        subtitle: String
    })
</script>

<template>
  <div class="stats-card">
    <h3>{{ title }}</h3>
    <p class="main-value">{{ value }}</p>
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
    
    <div class="extra-info">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>