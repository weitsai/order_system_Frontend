<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
const { count } = storeToRefs(cartStore)
const activeIndex = ref('/')
const isElllipsis = ref(false)
const shopName = import.meta.env.VITE_SHOP_NAME
onMounted(() => {
  isElllipsis.value = window.innerWidth < 768
  window.addEventListener('resize', () => {
    isElllipsis.value = window.innerWidth < 768
  })
})
</script>
<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    router
    :ellipsis="isElllipsis"
  >
    <el-menu-item index="/" :class="$route.path === '/' ? 'link-active' : ''"
      >{{ shopName }}點餐系統</el-menu-item
    >
    <div class="flex-grow" />
    <el-menu-item index="menu" :class="$route.path === '/menu' ? 'link-active' : ''"
      >菜單</el-menu-item
    >
    <el-menu-item index="orderHistory" :class="$route.path === '/orderHistory' ? 'link-active' : ''"
      >點餐紀錄</el-menu-item
    >
    <el-menu-item index="feedback" :class="$route.path === '/feedback' ? 'link-active' : ''"
      >評論回饋</el-menu-item
    >
    <el-menu-item
      index="order"
      style="position: relative"
      :class="$route.path === '/order' ? 'link-active' : ''"
    >
      <el-badge :value="count" class="item" />
      <el-icon><ShoppingCart /></el-icon>
      點餐單
    </el-menu-item>
  </el-menu>
</template>
<style scoped lang="scss">
.flex-grow {
  flex-grow: 1;
}
.item {
  position: absolute;
  top: -35px;
  right: 10px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  color: unset !important;
  border-bottom: unset !important;
}
.el-menu--horizontal > .el-menu-item.link-active {
  border-bottom: 2px solid var(--el-menu-active-color) !important;
  color: var(--el-menu-active-color) !important;
}
</style>
