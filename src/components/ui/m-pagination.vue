<template>
  <nav
    role="navigation"
    aria-label="pagination"
    class="mx-auto flex w-full justify-center"
  >
    <ul class="flex flex-row items-center gap-1">
      <!-- 上一页按钮 -->
      <li>
        <Button
          variant="outline"
          class="h-9 w-9 p-0"
          :disabled="currentPage === 1"
          @click="onPageChange(currentPage - 1)"
        >
          <span class="sr-only">上一页</span>
          <ChevronLeft class="h-4 w-4" />
        </Button>
      </li>

      <!-- 页码按钮 -->
      <template v-for="page in displayedPages" :key="page">
        <!-- 省略号 -->
        <li v-if="page === '...'" class="px-2">
          <span class="text-muted-foreground">...</span>
        </li>
        <!-- 页码 -->
        <li v-else>
          <Button
            variant="outline"
            class="h-9 w-9 p-0"
            :class="{ 'bg-primary text-primary-foreground hover:bg-primary/90': page === currentPage }"
            @click="onPageChange(page)"
          >
            {{ page }}
          </Button>
        </li>
      </template>

      <!-- 下一页按钮 -->
      <li>
        <Button
          variant="outline"
          class="h-9 w-9 p-0"
          :disabled="currentPage === totalPages"
          @click="onPageChange(currentPage + 1)"
        >
          <span class="sr-only">下一页</span>
          <ChevronRight class="h-4 w-4" />
        </Button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import Button from './m-button.vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  maxDisplayed: {
    type: Number,
    default: 7
  }
})

const emit = defineEmits(['update:currentPage'])

// 计算要显示的页码
const displayedPages = computed(() => {
  const pages = []
  const { currentPage, totalPages, maxDisplayed } = props

  // 如果总页数小于等于最大显示数，显示所有页码
  if (totalPages <= maxDisplayed) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // 始终显示第一页
  pages.push(1)

  // 计算中间页码的起始和结束
  let start = Math.max(2, currentPage - Math.floor(maxDisplayed / 2))
  let end = Math.min(totalPages - 1, start + maxDisplayed - 3)
  
  // 调整起始位置
  if (end === totalPages - 1) {
    start = Math.max(2, end - maxDisplayed + 3)
  }

  // 添加左侧省略号
  if (start > 2) {
    pages.push('...')
  }

  // 添加中间页码
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  // 添加右侧省略号
  if (end < totalPages - 1) {
    pages.push('...')
  }

  // 始终显示最后一页
  pages.push(totalPages)

  return pages
})

// 页码改变处理函数
const onPageChange = (page) => {
  emit('update:currentPage', page)
}
</script> 