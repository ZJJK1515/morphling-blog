<template>
  <div class="min-h-screen bg-background">
    <main class="container py-8">
      <article class="max-w-4xl mx-auto space-y-8">
        <!-- 文章头部 -->
        <header class="space-y-4">
          <h1 class="text-4xl font-bold tracking-tight">{{ article.title }}</h1>
          <div class="flex items-center space-x-4 text-sm text-muted-foreground">
            <div class="flex items-center">
              <User class="h-4 w-4 mr-2" />
              {{ article.author }}
            </div>
            <div class="flex items-center">
              <Calendar class="h-4 w-4 mr-2" />
              {{ article.date }}
            </div>
            <MBadge>{{ article.category }}</MBadge>
          </div>
        </header>

        <!-- 文章特色图片 -->
        <img 
          :src="article.image" 
          :alt="article.title"
          class="w-full aspect-video rounded-lg object-cover"
        >

        <!-- 文章内容 -->
        <div 
          class="prose prose-lg dark:prose-invert max-w-none"
          v-html="article.content"
        ></div>

        <!-- 文���底部 -->
        <footer class="border-t border-border pt-6 mt-8">
          <div class="flex justify-between items-center">
            <MButton variant="outline" class="flex items-center">
              <ThumbsUp class="mr-2 h-4 w-4" />
              点赞
            </MButton>
            <div class="flex space-x-4">
              <MButton variant="ghost" class="flex items-center">
                <Share class="mr-2 h-4 w-4" />
                分享
              </MButton>
              <MButton variant="ghost" class="flex items-center">
                <MessageSquare class="mr-2 h-4 w-4" />
                评论
              </MButton>
            </div>
          </div>
        </footer>
      </article>
    </main>

    <!-- 相关文章 -->
    <section class="border-t border-border py-8 bg-muted/50">
      <div class="container">
        <h2 class="text-2xl font-bold mb-6">相关文章</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MCard v-for="post in relatedPosts" :key="post.id">
            <img 
              :src="post.image" 
              :alt="post.title"
              class="w-full aspect-video object-cover rounded-t-lg"
            >
            <div class="p-4">
              <h3 class="font-semibold mb-2">{{ post.title }}</h3>
              <p class="text-sm text-muted-foreground">{{ post.excerpt }}</p>
            </div>
          </MCard>
        </div>
      </div>
    </section>

    <footer class="border-t border-border py-6">
      <p class="text-center text-muted-foreground">
        &copy; {{ currentYear }} 我的个人博客. 保留所有权利.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, Calendar, ThumbsUp, Share, MessageSquare } from 'lucide-vue-next'
import MButton from './ui/m-button.vue'
import MBadge from './ui/m-badge.vue'
import MCard from './ui/m-card.vue'

const currentYear = ref(new Date().getFullYear())

const article = ref({
  title: '如何使用AI编码工具学习新的编程语言',
  author: '张三',
  date: '2024年8月7日',
  category: '技术',
  image: 'https://picsum.photos/800/400?random=4',
  content: `
    <p>在当今快速发展的技术世界中，学习新的编程语言已经成为程序员的必备技能...</p>
    <!-- 其他内容 -->
  `
})

const relatedPosts = ref([
  {
    id: 1,
    title: '人工智能编程助手对比',
    excerpt: '详细对比目前市面上主流的AI编程助手...',
    image: 'https://picsum.photos/400/300?random=5'
  },
  {
    id: 2,
    title: '提高编程效率的10个技巧',
    excerpt: '分享一些实用的编程效率提升方法...',
    image: 'https://picsum.photos/400/300?random=6'
  },
  {
    id: 3,
    title: '如何选择适合自己的编程语言',
    excerpt: '帮助你找到最适合自己的编程语言...',
    image: 'https://picsum.photos/400/300?random=7'
  }
])
</script>