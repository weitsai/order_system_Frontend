<script setup lang="ts">
import { openLoading, closeLoading } from '@/composables/loading'
interface item {
  name: string
  count: number
  totalPrice: number
}
const tableData = ref<item[]>([])
const dataType = ref<string>('day')
const today = ref<string>('')
const verifyDialogWindow = ref<boolean>(true)
const verifyCode = ref<string>('')
const isVerify = ref<boolean>(false)
const dialogWidth = ref('50%')
const changeDataType = () => {
  let day = new Date()
  if (dataType.value == 'month') {
    today.value = `${day.getFullYear()}-${day.getMonth() + 1}-1`
  } else {
    today.value = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`
  }
}
const fetchData = () => {
  let day = new Date(today.value)
  let date = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`
  openLoading()
  fetch(`/api/manage/getSales?type=${dataType.value}&day=${date}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 200) {
        tableData.value = res.data
      } else {
        ElMessage.error('統計資料加載失敗!')
      }
    })
    .catch(() => {
      ElMessage.error('統計資料加載失敗!')
    })
    .finally(() => {
      closeLoading()
    })
}
const verify = () => {
  if (!verifyCode.value) {
    ElMessage.error('請輸入驗證密碼!')
    return
  }
  openLoading('驗證中...')
  fetch('/api/manage/salesVerify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      verifyCode: verifyCode.value
    })
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 200) {
        ElMessage.success('驗證成功!')
        isVerify.value = true
        verifyDialogWindow.value = false
      } else {
        ElMessage.error('驗證失敗!')
      }
    })
    .catch(() => {
      ElMessage.error('驗證失敗!')
    })
    .finally(() => {
      closeLoading()
    })
}
onMounted(() => {
  let day = new Date()
  today.value = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`
  dialogWidth.value = window.innerWidth < 768 ? '90%' : '50%'
  window.addEventListener('resize', () => {
    dialogWidth.value = window.innerWidth < 768 ? '90%' : '50%'
  })
})
</script>
<template>
  <div>
    <h1>銷售統計</h1>
    <div v-show="isVerify" style="margin-bottom: 10px">
      <el-select v-model="dataType" placeholder="時間區段" @change="changeDataType()">
        <el-option label="月" value="month" />
        <el-option label="天" value="day" />
      </el-select>
      <el-date-picker
        v-model="today"
        :type="dataType == 'day' ? 'date' : 'month'"
        placeholder="統計日期"
      />
      <el-button type="primary" @click="fetchData()" style="margin-left: 5px">查詢</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-show="isVerify"
      show-summary
      sum-text="合計"
      stripe
      border
    >
      <el-table-column prop="name" label="名稱" />
      <el-table-column prop="count" label="數量" />
      <el-table-column prop="totalPrice" label="總金額" />
    </el-table>
    <el-dialog
      v-model="verifyDialogWindow"
      title="驗證身分"
      :width="dialogWidth"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form-item label="驗證密碼">
        <el-input v-model="verifyCode" placeholder="請輸入驗證密碼" required />
      </el-form-item>
      <template #footer>
        <el-button @click="verifyDialogWindow = false"> 取消 </el-button>
        <el-button type="primary" @click="verify()"> 驗證 </el-button>
      </template>
    </el-dialog>
    <el-button type="primary" @click="verifyDialogWindow = true" v-if="!isVerify"
      >開啟驗證視窗
    </el-button>
  </div>
</template>
<style scoped lang="scss"></style>
