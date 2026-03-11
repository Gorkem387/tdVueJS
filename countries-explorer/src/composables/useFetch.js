import { ref } from "vue"

export function useFetch(url) {
    const data = ref(null)
    const loading = ref(false)
    const error = ref(0)
    
    loading.value = true
    fetch(url)
    .then((res) => res.json())
    .then((json) => data.value = json)
    .catch((e) => (error.value = e))
    .finally(() => (loading.value = false))

    return {
        data,
        loading,
        error,
    }
}