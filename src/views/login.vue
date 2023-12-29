<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'
const userStore = useUserStore()
const { login, checkLogin } = userStore
const { isLogin } = storeToRefs(userStore)
interface User {
  username: string
  password: string
}
const formRef = ref<FormInstance | null>(null)
const form = reactive({
  username: '',
  password: ''
})
const formVaild = (formRef: FormInstance) => {
  if (!formRef) return
  formRef.validate((valid) => {
    if (valid) {
      login(form.username, form.password)
    } else {
      ElMessage.error('帳號密碼格式錯誤!')
    }
  })
}
const rules = reactive<FormRules<User>>({
  username: [
    { required: true, message: '請輸入帳號', trigger: 'blur' },
    { min: 6, max: 20, message: '長度需介於6-20個字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 6, message: '密碼長度需大於6個字符', trigger: 'blur' }
  ]
})
onMounted(() => {
  checkLogin()
  userStore.$subscribe((mutation, state) => {
    if (state.isLogin) {
      router.push('/manage')
    }
  })
})
</script>
<template>
  <div>
    <div class="wrapper">
      <el-form :model="form" ref="formRef" :rules="rules" @keyup.enter="formVaild(formRef)">
        <h3 style="text-align: center">後台管理系統登入</h3>
        <el-form-item label="帳號" prop="username">
          <el-input v-model="form.username" autosize />
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input v-model="form.password" autosize type="password" :show-password="true" />
        </el-form-item>
        <div class="loginBtnWrapper">
          <el-button type="primary" @click="formVaild(formRef)">登入</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wrapper {
  width: 100vw;
  height: 100vh;
  background-color: #cccccc;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    padding: 30px;
    width: 300px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    .loginBtnWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    }
  }
}
</style>
