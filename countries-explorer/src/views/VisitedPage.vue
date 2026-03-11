<script setup>
import { useVisited } from '../composables/useVisited';
import CountryCard from '../components/CountryCard.vue';

const { visited, clearVisited } = useVisited();
</script>

<template>
    <main class="visited-page">
        <div class="header-visited">
            <h2>Mes pays visités</h2>
            <button v-if="visited.length > 0" @click="clearVisited" class="clear-btn">
                Tout supprimer
            </button>
        </div>

        <div v-if="visited.length === 0" class="empty-state">
            <p>Vous n'avez pas encore marqué de pays comme visité. Explorez la liste pour en ajouter !</p>
            <router-link to="/" class="explore-link">Découvrir les pays</router-link>
        </div>

        <div v-else class="countries-grid">
            <CountryCard v-for="country in visited" :key="country.cca3" :country="country" />
        </div>
    </main>
</template>

<style scoped>
.visited-page {
    padding: 20px;
}

.header-visited {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.clear-btn {
    background: #e74c3c;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
}

.empty-state {
    text-align: center;
    padding: 100px 20px;
    background: white;
    border-radius: 15px;
}

.explore-link {
    display: inline-block;
    margin-top: 20px;
    color: #3498db;
    font-weight: bold;
}

.countries-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
}
</style>