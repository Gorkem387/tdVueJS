import { ref, watch } from 'vue';

const STORAGE_KEY = 'visited_countries_v1';

const visited = ref([]);

try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) visited.value = JSON.parse(raw);
} catch (e) {
  console.warn('Failed to read visited from localStorage', e);
}

watch(visited, (v) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
  } catch (e) {
    console.warn('Failed to persist visited to localStorage', e);
  }
}, { deep: true });

function addVisited(country) {
  if (!visited.value.find(c => c.cca3 === country.cca3)) {
    visited.value.push(country);
  }
}

function removeVisited(country) {
  visited.value = visited.value.filter(c => c.cca3 !== country.cca3);
}

function toggleVisited(country) {
  const exists = visited.value.find(c => c.cca3 === country.cca3);
  if (exists) removeVisited(country); else addVisited(country);
}

export { visited, addVisited, removeVisited, toggleVisited };
