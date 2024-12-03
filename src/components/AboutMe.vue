<template>
  <div class="min-h-screen bg-background">
    <main class="container py-8">
      <div class="flex flex-col items-center space-y-6">
        <h1 class="text-4xl font-bold text-foreground">关于我</h1>
        
        <img 
          :src="author.avatar" 
          :alt="author.name" 
          class="w-48 h-48 rounded-full object-cover shadow-lg"
        >
        
        <h2 class="text-2xl font-semibold text-foreground">{{ author.name }}</h2>
        
        <p class="text-lg text-muted-foreground max-w-2xl text-center">
          {{ author.bio }}
        </p>
        
        <div class="w-full max-w-2xl">
          <h3 class="text-xl font-semibold mb-4 text-foreground">技能</h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="skill in author.skills" 
              :key="skill"
              class="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
            >
              {{ skill }}
            </span>
          </div>
        </div>
        
        <div class="w-full max-w-2xl space-y-2">
          <h3 class="text-xl font-semibold mb-4 text-foreground">联系方式</h3>
          <p class="text-muted-foreground">
            邮箱：{{ author.email }}
          </p>
          <p class="text-muted-foreground">
            GitHub：
            <a 
              :href="author.github" 
              target="_blank"
              class="text-primary hover:underline"
            >
              {{ author.github }}
            </a>
          </p>
        </div>
      </div>
    </main>

    <footer class="py-6 border-t border-border">
      <p class="text-center text-muted-foreground">
        &copy; {{ currentYear }} 我的个人博客. 保留所有权利.
      </p>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'AboutMe',
  components: {
    
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      author: {
        name: '张三',
        avatar: 'https://picsum.photos/200/200?random=5',
        bio: '热爱技术、热爱生活的全栈开发者。喜欢探索新技术，分享学习心得。',
        skills: ['JavaScript', 'Vue.js', 'Node.js', 'Python', 'Docker'],
        email: 'zhangsan@example.com',
        github: 'https://github.com/zhangsan'
      }
    }
  }
}
</script>

