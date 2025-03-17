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

        <!-- 文章底部 -->
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

const article = {
  title: '打造完美博客：Vue 3 + TailwindCSS + TypeScript 技术栈详解',
  author: 'Morphling',
  date: '2024年3月20日',
  category: '技术',
  image: 'https://picsum.photos/800/400?random=4',
  content: `
    <h2>现代前端技术栈概述</h2>
    <p>在这个博客项目中，我们采用了当下最流行且强大的技术组合。Vue 3 作为核心框架，配合 TailwindCSS 处理样式，使用 TypeScript 确保代码质量，这些技术的组合不仅提供了出色的开发体验，还确保了最终产品的高质量输出。</p>

    <h3>核心技术栈详解</h3>
    <ul>
      <li><strong>Vue 3 组合式 API</strong>：使用最新的组合式 API 实现更好的代码组织和逻辑复用，让代码更容易维护和扩展。</li>
      <li><strong>TailwindCSS</strong>：采用实用优先的 CSS 框架，快速构建美观的用户界面，支持响应式设计和暗色模式。</li>
      <li><strong>TypeScript</strong>：通过静态类型检查提高代码质量，减少运行时错误。</li>
      <li><strong>Vite</strong>：享受极速的开发体验和高效的构建过程。</li>
    </ul>

    <h3>项目特色功能实现</h3>
    <p>在这个博客项目中，我们实现了许多现代化的特性：</p>

    <h4>1. 响应式设计</h4>
    <p>使用 TailwindCSS 的响应式类名，轻松实现多设备适配：</p>
    <pre><code>
    &lt;div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"&gt;
      // 响应式卡片布局
    &lt;/div&gt;
    </code></pre>

    <h4>2. 暗色模式支持</h4>
    <p>通过 TailwindCSS 的暗色模式支持，实现了完美的明暗主题切换：</p>
    <pre><code>
    &lt;div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"&gt;
      // 自适应明暗主题的内容
    &lt;/div&gt;
    </code></pre>

    <h4>3. 组件化开发</h4>
    <p>项目中的每个 UI 组件都经过精心设计，确保可复用性：</p>
    <ul>
      <li>MButton：统一的按钮组件，支持多种变体</li>
      <li>MCard：文章卡片组件，用于展示文章列表</li>
      <li>MBadge：标签组件，用于显示文章分类</li>
    </ul>

    <h3>性能优化措施</h3>
    <p>为了确保最佳的用户体验，我们采取了以下优化措施：</p>
    <ul>
      <li>图片懒加载：使用 loading="lazy" 属性延迟加载图片</li>
      <li>组件按需加载：利用 Vue Router 的动态导入特性</li>
      <li>样式优化：通过 TailwindCSS 的 purge 功能移除未使用的样式</li>
    </ul>

    <h3>未来展望</h3>
    <p>这个博客系统还在不断完善中，计划添加的功能包括：</p>
    <ul>
      <li>评论系统集成</li>
      <li>文章搜索功能</li>
      <li>用户认证系统</li>
      <li>文章数据统计</li>
    </ul>

    <p>通过这些技术的组合使用，我们成功打造了一个现代化的博客系统。它不仅具有出色的用户体验，还保持着良好的可维护性和扩展性。</p>
  `
}

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