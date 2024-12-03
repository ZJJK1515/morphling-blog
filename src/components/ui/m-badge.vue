<template>
  <div
    class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    :class="[
      variants[variant],
      className
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  variant: {
    type: String,
    default: 'default',
  },
  className: {
    type: String,
    default: '',
  },
})

const variants = {
  default: 'border-transparent bg-primary text-primary-foreground',
  secondary: 'border-transparent bg-secondary text-secondary-foreground',
  destructive: 'border-transparent bg-destructive text-destructive-foreground',
  outline: 'text-foreground',
}
</script> 