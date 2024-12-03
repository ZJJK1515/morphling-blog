<template>
  <div class="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
    <div v-if="$slots.header" class="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
      <slot name="header"></slot>
    </div>
    <div v-if="$slots.default" class="p-6 pt-0">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="flex items-center p-6 pt-0">
      <slot name="footer"></slot>
    </div>
  </div>
</template> 