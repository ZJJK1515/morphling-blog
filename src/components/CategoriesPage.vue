<template>
  <div class="min-h-screen bg-background">
    <div class="container py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- 分类导航 -->
        <div class="lg:col-span-3">
          <div class="sticky top-6">
            <h2 class="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">探索分类</h2>
            <div class="space-y-2 p-4 bg-card rounded-xl shadow-lg border border-border/50 backdrop-blur-sm">
              <button
                v-for="category in categories"
                :key="category.id"  
                @click="selectCategory(category.id)"
                class="w-full flex justify-between items-center px-4 py-3 text-sm rounded-lg transition-all duration-300 group"
                :class="{
                  'bg-primary text-primary-foreground shadow-md': selectedCategory === category.id,
                  'hover:bg-accent hover:shadow-sm': selectedCategory !== category.id
                }"
              >
                <div class="flex items-center gap-3">
                  <span 
                    class="w-2 h-2 rounded-full transition-colors"
                    :class="selectedCategory === category.id ? 'bg-primary-foreground' : 'bg-primary group-hover:bg-primary/80'"
                  ></span>
                  {{ category.name }}
                </div>
                <span 
                  class="text-xs font-mono px-2 py-1 rounded-full transition-colors"
                  :class="selectedCategory === category.id ? 'bg-primary-foreground/20' : 'bg-muted'"
                >{{ category.count }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 文章列表 -->
        <div class="lg:col-span-9">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-3xl font-bold">{{ currentCategoryName }}</h2>
            <p class="text-muted-foreground">共 {{ filteredPosts.length }} 篇文章</p>
          </div>
          
          <!-- 骨架屏 -->
          <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            <div 
              v-for="i in 4"
              :key="i"
              class="rounded-xl bg-card border border-border overflow-hidden shadow-sm"
            >
              <div class="h-48 bg-muted"/>
              <div class="p-6 space-y-3">
                <div class="h-4 w-1/3 bg-muted rounded-full"/>
                <div class="h-6 w-3/4 bg-muted rounded-full"/>
                <div class="h-4 w-full bg-muted rounded-full"/>
              </div>
            </div>
          </div>

          <!-- 文章列表 -->
          <TransitionGroup
            name="post-list"
            tag="div"
            class="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <article 
              v-for="post in currentPosts" 
              :key="post.id"
              class="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div class="absolute inset-0 bg-gradient-to-t from-primary/5 via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]"></div>
              <img
                :src="post.image"
                :alt="post.title"
                class="h-48 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              >
              <div class="relative p-6 space-y-4">
                <div class="flex items-center gap-3 text-sm">
                  <span class="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium transition-colors group-hover:bg-primary/15">
                    {{ currentCategoryName }}
                  </span>
                  <div class="flex items-center text-muted-foreground">
                    <Calendar class="h-4 w-4 mr-1" />
                    <span>{{ post.date }}</span>
                  </div>
                </div>
                <h3 class="text-xl font-bold leading-tight tracking-tight transition-all duration-300 group-hover:text-primary/90 group-hover:translate-x-0.5">
                  {{ post.title }}
                </h3>
                <p class="line-clamp-2 text-sm text-muted-foreground">
                  {{ post.excerpt }}
                </p>
                <div class="pt-4 flex items-center justify-between text-sm">
                  <div class="flex items-center gap-4 text-muted-foreground">
                    <span class="flex items-center gap-1">
                      <Eye class="h-4 w-4" />
                      {{ post.views }}
                    </span>
                    <span class="flex items-center gap-1">
                      <MessageSquare class="h-4 w-4" />
                      {{ post.comments }}
                    </span>
                  </div>
                  <button class="text-primary hover:text-primary/80 font-medium transition-colors">
                    阅读更多
                  </button>
                </div>
              </div>
            </article>
          </TransitionGroup>

          <!-- 分页控件 -->
          <div class="mt-12">
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

<style scoped>
.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.post-list-leave-active {
  position: absolute;
  width: 100%;
  z-index: 0;
}

.post-list-enter-active {
  z-index: 1;
  transition-delay: 0.3s;
}
</style>
<script setup>
import { ref, computed, watch } from 'vue'
import { Calendar, Eye, MessageSquare } from 'lucide-vue-next'
import { usePagination } from '@/composables/usePagination'

const selectedCategory = ref(1)
const categories = ref([
  { id: 1, name: '前端开发', count: 24 },
  { id: 2, name: '后端技术', count: 18 },
  { id: 3, name: '人工智能', count: 12 },
  { id: 4, name: '开发工具', count: 15 },
  { id: 5, name: '技术随笔', count: 9 },
])

const posts = ref([
  {
    id: 1,
    title: '深入理解Vue3组合式API的优势与实践',
    date: '2024-03-15',
    image: 'https://picsum.photos/800/400?random=1',
    excerpt: '本文深入探讨Vue3组合式API的核心概念，通过实际案例展示其在大型应用开发中的优势，以及如何最大化利用其特性提升开发效率。',
    categoryId: 1,
    views: 1234,
    comments: 23
  },
  {
    id: 2,
    title: 'Node.js微服务架构设计实践',
    date: '2024-03-14',
    image: 'https://picsum.photos/800/400?random=2',
    excerpt: '探索如何使用Node.js构建可扩展的微服务架构，包括服务发现、负载均衡、容错处理等关键技术点的实现方案。',
    categoryId: 2,
    views: 856,
    comments: 15
  },
  {
    id: 3,
    title: '机器学习在前端智能化中的应用',
    date: '2024-03-13',
    image: 'https://picsum.photos/800/400?random=3',
    excerpt: '介绍如何将机器学习技术应用于前端开发，实现智能化的用户界面和交互体验，提升应用的个性化推荐能力。',
    categoryId: 3,
    views: 967,
    comments: 18
  },
  {
    id: 4,
    title: 'Git高级技巧与工作流程优化',
    date: '2024-03-12',
    image: 'https://picsum.photos/800/400?random=4',
    excerpt: '分享Git版本控制的高级用法，包括分支管理策略、提交信息规范、冲突解决技巧等，帮助团队提升协作效率。',
    categoryId: 4,
    views: 723,
    comments: 12
  },
  {
    id: 5,
    title: '从零开始的开源项目维护之路',
    date: '2024-03-11',
    image: 'https://picsum.photos/800/400?random=5',
    excerpt: '记录维护开源项目的心得体会，分享如何有效管理社区贡献者、处理issue和PR、制定项目规范等经验。',
    categoryId: 5,
    views: 645,
    comments: 9
  },
  {
    id: 6,
    title: 'TypeScript高级类型系统详解',
    date: '2024-03-10',
    image: 'https://picsum.photos/800/400?random=6',
    excerpt: '深入探讨TypeScript类型系统的高级特性，包括条件类型、映射类型、类型推导等概念，提升代码的类型安全性。',
    categoryId: 1,
    views: 889,
    comments: 16
  },
])

const isLoading = ref(false)
const { currentPage, totalPages, setTotal, reset } = usePagination(6) // 每页6篇文章

const currentCategoryName = computed(() => {
  const category = categories.value.find(c => c.id === selectedCategory.value)
  return category ? category.name : ''
})

const filteredPosts = computed(() => {
  return posts.value.filter(post => post.categoryId === selectedCategory.value)
})

const currentPosts = computed(() => {
  const start = (currentPage.value - 1) * 6
  const end = start + 6
  return filteredPosts.value.slice(start, end)
})

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  // reset()
}

// 监听分类变化
watch(filteredPosts, (posts) => {
  setTotal(Math.ceil(posts.length / 6))
}, { immediate: true })

// 获取分类文章
const fetchCategoryPosts = async () => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  isLoading.value = false
}

// 初始加载
fetchCategoryPosts()
</script>