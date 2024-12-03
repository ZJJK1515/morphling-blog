<template>
  <div class="min-h-screen bg-background">
    <div class="container py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- 分类导航 -->
        <div class="lg:col-span-3">
          <div class="sticky top-6">
            <h2 class="text-2xl font-bold mb-4">文章分类</h2>
            <ul class="space-y-1">
              <li 
                v-for="category in categories" 
                :key="category.id"
                @click="selectCategory(category.id)"
                class="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors"
                :class="{
                  'bg-primary text-primary-foreground': selectedCategory === category.id,
                  'hover:bg-accent hover:text-accent-foreground': selectedCategory !== category.id
                }"
              >
                {{ category.name }}
                <span class="ml-2 text-xs opacity-70">({{ category.count }})</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 文章列表 -->
        <div class="lg:col-span-9">
          <h2 class="text-2xl font-bold mb-6">{{ currentCategoryName }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article 
              v-for="post in currentPosts" 
              :key="post.id" 
              class="group rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
            >
              <img 
                :src="post.image" 
                :alt="post.title" 
                class="w-full h-48 object-cover rounded-t-lg"
              >
              <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">{{ post.title }}</h3>
                <div class="flex items-center text-sm text-muted-foreground">
                  <Calendar class="h-4 w-4 mr-2" />
                  <span>{{ post.date }}</span>
                </div>
              </div>
            </article>
          </div>

          <!-- 分页控件 -->
          <div class="mt-8">
            <Pagination
              v-if="totalPages > 1"
              v-model:currentPage="currentPage"
              :total-pages="totalPages"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Calendar } from 'lucide-vue-next'
import { usePagination } from '@/composables/usePagination'

const selectedCategory = ref(1)
const categories = ref([
  { id: 1, name: '技术', count: 12 },
  { id: 2, name: '生活', count: 8 },
  { id: 3, name: '随笔', count: 5 },
])

const posts = ref([
  {
    id: 1,
    title: '如何使用Vue 3',
    date: '2024-03-15',
    image: 'https://picsum.photos/400/300?random=1',
    categoryId: 1
  },
  // ... 更多文章
])

const { currentPage, totalPages, setTotal, reset } = usePagination(8) // 每页8篇文章

const currentCategoryName = computed(() => {
  const category = categories.value.find(c => c.id === selectedCategory.value)
  return category ? category.name : ''
})

const filteredPosts = computed(() => {
  return posts.value.filter(post => post.categoryId === selectedCategory.value)
})

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
}

// 当分类改变时重置分页
watch(selectedCategory, () => {
  reset()
  fetchCategoryPosts()
})

// 获取分类文章
const fetchCategoryPosts = async () => {
  // 实际API调用
  // const response = await api.getCategoryPosts(selectedCategory.value, currentPage.value, pageSize)
  // posts.value = response.data.items
  // setTotal(response.data.total)
}
</script>