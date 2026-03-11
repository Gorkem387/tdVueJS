<script>
export default {
    props: {
        modelValue: String
    },
    emits: ['update:modelValue']
}
</script>

<template>
    <div class="search-container">
    <input 
      type="text" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Rechercher un pays..."
      class="search-input"
    />
  </div>
</template>

<style scoped>

input {
  width: 760px;
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 25px;
  outline: none;
}

</style>