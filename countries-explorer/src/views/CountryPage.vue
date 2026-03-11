<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFetch } from '@/composables/UseFetch';
import { useVisited } from '@/composables/useVisited';
import CountryDetails from '../components/CountryDetails.vue';

const route = useRoute();
const router = useRouter();
const { isVisited, toggleVisited } = useVisited();

const countryCode = route.params.code;

const { data, loading, error } = useFetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);

const country = computed(() => data.value ? data.value[0] : null);

const checkVisited = computed(() => {
    return country.value ? isVisited(country.value) : false;
});

const goBack = () => {
    router.push('/');
};
</script>

<template>
    <div class="country-page">
        <div class="container">
            <button @click="goBack" class="back-btn">← Retour à la liste</button>

            <div v-if="loading" class="loader">Chargement des détails...</div>

            <div v-else-if="error" class="error-banner">
                Erreur : Impossible de charger les données du pays.
            </div>

            <CountryDetails v-else-if="country" :country="country" :isVisited="checkVisited"
                @toggle-visited="toggleVisited" />
        </div>
    </div>
</template>

<style scoped>
.country-page {
    padding: 20px;
    min-height: 100vh;
    background: #f0f0f0;
}

.container {
    max-width: 1000px;
    margin: 0 auto;
}

.back-btn {
    margin-bottom: 20px;
    padding: 10px 20px;
    border: none;
    background: #2c3e50;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.loader {
    text-align: center;
    font-size: 1.5rem;
    margin-top: 50px;
}

.error-banner {
    background: #ff7675;
    color: white;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
}
</style>