import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './views/HomePage.vue'
import VisitedCountries from './components/VisitedCountries.vue'
import CountryDetails from './components/CountryDetails.vue'

const routes = [
    { 
        path: '/', 
        name: 'Home', 
        component: HomePage 
    },
    { 
        path: '/visited', 
        name: 'Visited', 
        component: VisitedCountries 
    },
    { 
        path: '/country/:code', 
        name: 'CountryDetails', 
        component: () => import('./views/CountryPage.vue'),
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router