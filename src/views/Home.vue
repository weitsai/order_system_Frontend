<script setup lang="ts"></script>
<template>
  <div style="display: flex; flex-direction: column; justify-content: center">
    <router-link to="/menu">
      <el-link>
        <el-icon><Food /></el-icon>
        查看菜單
      </el-link>
    </router-link>
    <router-link to="/orderHistory">
      <el-link>
        <el-icon><Clock /></el-icon>
        查看歷史訂單
      </el-link>
    </router-link>
    <router-link to="/order">
      <el-link>
        <el-icon><ShoppingCart /></el-icon>
        查看點餐單
      </el-link>
    </router-link>
    <router-link to="/feedback">
      <el-link>
        <el-icon><Comment /></el-icon>
        意見回饋
      </el-link>
    </router-link>
    <router-link to="/manage">
      <el-link>
        <el-icon><Operation /></el-icon>
        後臺管理
      </el-link>
    </router-link>
  </div>
</template>
<style scoped lang="scss">
.el-link {
  font-size: 20px;
  margin: 10px 0;
}
</style>
