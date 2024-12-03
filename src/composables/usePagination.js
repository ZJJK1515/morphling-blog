import { ref, computed } from 'vue'

export function usePagination(pageSize = 10) {
  const currentPage = ref(1)
  const total = ref(0)

  const totalPages = computed(() => {
    return Math.ceil(total.value / pageSize)
  })

  const setTotal = (value) => {
    total.value = value
  }

  const setCurrentPage = (page) => {
    currentPage.value = page
  }

  return {
    currentPage,
    totalPages,
    setTotal,
    setCurrentPage
  }
} 