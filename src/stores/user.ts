import router from '@/router'
export const useUserStore = defineStore('user', () => {
  const isLogin = ref<Boolean>(false)
  function login(username: string, password: string) {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          isLogin.value = true
          ElMessage.success('登入成功')
          router.push({ name: 'manageHome' })
        } else if (res.code == '401') {
          ElMessage.error('帳號或密碼錯誤!')
        }
      })
      .catch((err) => {
        console.log(err)
        ElMessage.error('登入失敗')
      })
  }
  function logout() {
    fetch('/api/logout')
      .then((res) => res.json())
      .then((res) => {
        if (res.code == '200') {
          isLogin.value = false
          ElMessage.success('登出成功')
          router.push({ name: 'login' })
        } else {
          ElMessage.error('登出失敗')
        }
      })
  }
  function checkLogin() {
    fetch('/api/checkLogin')
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          isLogin.value = true
        } else {
          isLogin.value = false
        }
      })
      .catch(() => {
        isLogin.value = false
      })
  }
  return { isLogin, login, logout, checkLogin }
})
