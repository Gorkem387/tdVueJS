import { ref, watch } from 'vue';

const STORAGE_KEY = 'visited_countries_v1';
const visited = ref([]);

const raw = localStorage.getItem(STORAGE_KEY);
if (raw) visited.value = JSON.parse(raw);

watch(visited, (v) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
}, { deep: true });

export function useVisited() {
  
  const isVisited = (country) => {
    if (!country) return false;
    return visited.value.some(c => c.cca3 === country.cca3);
  };

  const addVisited = (country) => {
    if (!isVisited(country)) {
      visited.value.push(country);
    }
  };

  const removeVisited = (country) => {
    visited.value = visited.value.filter(c => c.cca3 !== country.cca3);
  };

  const toggleVisited = (country) => {
    if (isVisited(country)) {
      removeVisited(country);
    } else {
      addVisited(country);
    }
  };

  return {
    visited,
    addVisited,
    removeVisited,
    toggleVisited,
    isVisited
  };
}