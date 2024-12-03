<template>
  <header class="border-b border-border bg-background">
    <div class="header-content">
      <router-link to="/" class="logo">
        <div class="w-10 h-10 rounded-lg bg-primary/10 p-2 flex items-center justify-center">
          <img 
            src="https://api.dicebear.com/9.x/icons/svg?icon=pencil" 
            alt="博客Logo" 
            class="w-6 h-6 text-primary"
          >
        </div>
        <span class="ml-2 text-lg font-semibold text-foreground">Morphling</span>
      </router-link>
      
      <nav class="flex items-center space-x-6">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path"
          class="text-muted-foreground hover:text-foreground transition-colors"
        >
          {{ item.name }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
const menuItems = [
  { path: '/', name: '首页' },
  { path: '/categories', name: '分类' },
  { path: '/about', name: '关于我' },
  { path: '/new-article', name: '新建文章' }
]
</script>

<style scoped>
.header-content {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between;
}

.logo {
  @apply flex items-center hover:opacity-80 transition-opacity;
}
</style>