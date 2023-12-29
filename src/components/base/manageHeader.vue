<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const { logout } = userStore
const handleCommand = (command: string | number | object) => {
  if (command === 'logout') {
    logout()
  }
}
</script>
<template>
  <div class="header_content">
    <div>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar size="small">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
              <path
                fill="currentColor"
                d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"
              ></path>
            </svg>
          </el-avatar>
          <span>管理員</span>
          <el-icon class="el-icon--right">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
              <path
                fill="currentColor"
                d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
              ></path>
            </svg>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header_content {
  display: flex;
  justify-content: end;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 20px 0 0;
}
</style>
