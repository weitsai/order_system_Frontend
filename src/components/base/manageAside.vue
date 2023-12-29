<script setup lang="ts"></script>
<template>
  <el-menu default-active="1" class="el-menu-vertical-demo" router>
    <div style="display: flex; justify-content: center; align-items: center">
      <h1 style="color: black; cursor: pointer" @click="$router.push('/manage')">後台管理</h1>
    </div>
    <el-menu-item
      index="/manage/productManage"
      :class="$route.path === '/manage/productManage' ? 'link-active' : ''"
    >
      <el-icon><Document /></el-icon>
      <template #title>
        <span>產品管理 </span>
      </template>
    </el-menu-item>
    <el-menu-item
      index="/manage/order"
      :class="$route.path === '/manage/order' ? 'link-active' : ''"
    >
      <el-icon><List /></el-icon>
      <template #title>
        <span>訂單資訊 </span>
      </template>
    </el-menu-item>
    <el-menu-item
      index="/manage/sales"
      :class="$route.path === '/manage/sales' ? 'link-active' : ''"
    >
      <el-icon><Money /></el-icon>
      <template #title>
        <span>銷售統計 </span>
      </template>
    </el-menu-item>
    <el-menu-item
      index="/manage/allFeedback"
      :class="$route.path === '/manage/allFeedback' ? 'link-active' : ''"
    >
      <el-icon><MessageBox /></el-icon>
      <template #title>
        <span>回饋數據總覽 </span>
      </template>
    </el-menu-item>
  </el-menu>
</template>
<style scoped lang="scss">
.el-menu {
  background-color: #d1d1d1;
  width: 200px;
  border-right: none;
  &.el-menu--collapse {
    width: 60px;
    &h1 {
      display: none;
    }
  }
}
.el-menu-item.is-active {
  color: unset;
}
.el-menu-item.link-active {
  background-color: #4d8fed;
  color: white;
  &:hover {
    background-color: white;
    color: #4d8fed;
  }
}
</style>
