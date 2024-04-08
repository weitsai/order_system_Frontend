<script setup lang="ts">
const year = new Date().getFullYear()
const shopName = import.meta.env.VITE_SHOP_NAME
</script>
<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
    <el-footer> Copyright © {{ year }} {{ shopName }}點餐系統. </el-footer>
  </el-container>
</template>
<style scoped lang="scss">
.el-container {
  height: 100%;
}
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
  --el-header-padding: 0;
  position: sticky;
  top: 0;
  z-index: 2000;
}
.el-main {
  color: #333;
  text-align: center;
  height: 100%;
  min-height: calc(100vh - 120px);
  overflow-y: hidden;
}
.el-footer {
  background-color: #9f9f9f;
  font-size: 14px;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
