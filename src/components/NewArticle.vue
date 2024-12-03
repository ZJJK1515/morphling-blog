<template>
  <div class="min-h-screen bg-background">
    <main class="container py-8">
      <MCard class="max-w-4xl mx-auto">
        <template #header>
          <h1 class="text-2xl font-bold">新建文章</h1>
        </template>

        <form @submit.prevent="submitArticle" class="space-y-6">
          <div class="space-y-2">
            <label for="title" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              标题
            </label>
            <MInput 
              id="title" 
              v-model="article.title" 
              placeholder="请输入文章标题"
              required 
            />
          </div>

          <div class="space-y-2">
            <label for="category" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              分类
            </label>
            <MInput 
              id="category" 
              v-model="article.category" 
              placeholder="请输入文章分类"
              required 
            />
          </div>

          <div class="space-y-2">
            <label for="content" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              内容
            </label>
            <div id="vditor" class="vditor-container border border-input rounded-md"></div>
          </div>

          <MButton type="submit" class="w-full">
            发布文章
          </MButton>
        </form>
      </MCard>
    </main>

    <footer class="border-t border-border py-6 mt-12">
      <p class="text-center text-muted-foreground">
        &copy; {{ currentYear }} 我的个人博客. 保留所有权利.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import MCard from './ui/m-card.vue'
import MInput from './ui/m-input.vue'
import MButton from './ui/m-button.vue'

const currentYear = ref(new Date().getFullYear())
const article = ref({
  title: '',
  category: '',
  content: ''
})

onMounted(() => {
  new Vditor('vditor', {
    height: 400,
    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })
})

const submitArticle = () => {
  // 处理文章提交逻辑
  console.log('提交文章:', article.value)
}
</script>

<style>
.vditor-container {
  @apply bg-background;
}
</style>
