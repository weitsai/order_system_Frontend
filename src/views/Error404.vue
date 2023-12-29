<script setup lang="ts"></script>
<template>
  <div class="wrapper">
    <h1>404</h1>
    <p>找不到你要的頁面</p>
    <a href="/">回首頁</a>
  </div>
</template>
<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  h1 {
    font-size: 10rem;
    margin: 0;
  }
  p {
    font-size: 2rem;
    margin: 0;
  }
  a {
    font-size: 1.5rem;
    margin: 0;
    color: #409eff;
    text-decoration: none;
    border: #409eff solid 1px;
    padding: 10px 20px;
    border-radius: 10px;
    &:hover {
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
