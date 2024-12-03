<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-900">
    <!-- 主要内容 -->
    <main class="container mx-auto px-4 py-8 max-w-5xl">
      <!-- 个人简介卡片 -->
      <section class="mb-12 bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm">
        <div class="flex items-center gap-6">
          <img 
            src="https://picsum.photos/100/100" 
            alt="头像" 
            class="w-20 h-20 rounded-full object-cover border-2 border-zinc-100 dark:border-zinc-700"
          >
          <div>
            <h1 class="text-2xl font-bold mb-2 text-zinc-800 dark:text-zinc-100">Morphling的博客</h1>
            <p class="text-zinc-600 dark:text-zinc-400 text-sm">记录学习、思考和生活的点点滴滴</p>
            <div class="flex gap-4 mt-3">
              <a href="#" class="text-xs text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1">
                <GithubIcon class="w-4 h-4" />
                GitHub
              </a>
              <a href="#" class="text-xs text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1">
                <TwitterIcon class="w-4 h-4" />
                Twitter
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 文章分类标签 -->
      <section class="mb-8 flex gap-2 flex-wrap">
        <button 
          v-for="tag in ['全部', '技术', '生活', '思考', '阅读']" 
          :key="tag"
          class="px-4 py-1.5 rounded-full text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
        >
          {{ tag }}
        </button>
      </section>

      <!-- 文章列表 -->
      <section class="space-y-6">
        <article 
          v-for="post in currentPosts" 
          :key="post.id"
          class="group bg-white dark:bg-zinc-800 rounded-xl p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex gap-6">
            <div class="w-48 h-32 overflow-hidden rounded-lg flex-shrink-0">
              <img 
                :src="post.image" 
                :alt="post.imageAlt"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              >
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2 py-0.5 rounded text-xs bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">技术</span>
                <time class="text-xs text-zinc-500 dark:text-zinc-400">{{ post.date }}</time>
              </div>
              <h2 class="text-xl font-bold mb-2 truncate text-zinc-800 dark:text-zinc-100">{{ post.title }}</h2>
              <p class="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2 mb-3">{{ post.excerpt }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <img 
                    :src="post.authorAvatar" 
                    :alt="post.author"
                    class="w-6 h-6 rounded-full"
                  >
                  <span class="text-sm text-zinc-600 dark:text-zinc-300">{{ post.author }}</span>
                </div>
                <router-link 
                  :to="{ name: 'Article', params: { id: post.id }}"
                  class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 flex items-center gap-1"
                >
                  阅读全文
                  <ArrowRightIcon class="w-4 h-4" />
                </router-link>
              </div>
            </div>
          </div>
        </article>
      </section>

      <!-- 分页 -->
      <div class="mt-8 flex justify-center">
        <Pagination
          v-if="totalPages > 1"
          v-model:currentPage="currentPage"
          :total-pages="totalPages"
        />
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="bg-white dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 mt-12">
      <div class="container mx-auto px-4 py-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
        <p>&copy; {{ currentYear }} Morphling的博客. 保留所有权利.</p>
        <p class="mt-2">由 Vue.js 强力驱动</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { GithubIcon, TwitterIcon, ArrowRightIcon } from 'lucide-vue-next'
import Pagination from './ui/m-pagination.vue'
import { usePagination } from '@/composables/usePagination'

const currentYear = ref(new Date().getFullYear())
const { currentPage, totalPages, setTotal } = usePagination(6)

// 模拟文章数据
const allPosts = ref([
  {
    id: 1,
    image: 'https://picsum.photos/400/300?random=1',
    imageAlt: '文章配图',
    title: '使用 Vue 3 和 TypeScript 构建现代化 Web 应用',
    author: 'Morphling',
    authorAvatar: 'https://picsum.photos/50/50?random=1',
    date: '2024年3月15日',
    excerpt: '本文将介绍如何使用 Vue 3 的组合式 API 和 TypeScript 来构建类型安全的现代化 Web 应用，包括最佳实践和常见陷阱的避免。'
  },
  // ... 更多文章数据
])

const currentPosts = computed(() => {
  const start = (currentPage.value - 1) * 6
  return allPosts.value.slice(start, start + 6)
})

setTotal(allPosts.value.length)
</script>