<template>
  <div
    class="relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground"
    :class="[
      variants[variant],
      className
    ]"
    role="alert"
  >
    <component 
      :is="icons[variant]" 
      class="h-4 w-4"
      v-if="icons[variant]"
    />
    <slot name="title">
      <h5 v-if="title" class="mb-1 font-medium leading-none tracking-tight">
        {{ title }}
      </h5>
    </slot>
    <slot></slot>
  </div>
</template>

<script setup>
import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-vue-next'
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
  title: {
    type: String,
    default: '',
  },
})

const variants = {
  default: 'bg-background text-foreground',
  destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
  success: 'border-green-500/50 text-green-600 dark:border-green-500 [&>svg]:text-green-600',
  warning: 'border-yellow-500/50 text-yellow-600 dark:border-yellow-500 [&>svg]:text-yellow-600',
  info: 'border-blue-500/50 text-blue-600 dark:border-blue-500 [&>svg]:text-blue-600',
}

const icons = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
}
</script> 