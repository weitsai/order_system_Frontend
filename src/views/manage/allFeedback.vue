<script setup lang="ts">
import { openLoading, closeLoading } from '@/composables/loading'
interface tableDataType {
  name: string
  telephone: string
  sex: string
  feedback: string
  create_at: string
}
const currentPage = ref<number>(1)
const totalCount = ref<number>(0)
const activeName = ref<number>(1)
const tableData = ref<tableDataType[]>([])
const getFeedbackCount = () => {
  openLoading('加載數據中...')
  fetch('/api/manage/getFeedbackCount', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 200) {
        totalCount.value = res.data.count
      } else {
        ElMessage.error('回饋數據加載失敗!')
      }
    })
    .catch(() => {
      ElMessage.error('回饋數據加載失敗!')
    })
    .finally(() => {
      closeLoading()
    })
}
const getFeedbackData = () => {
  openLoading('加載數據中...')
  fetch(`/api/manage/getAllFeedback?page=${currentPage.value}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 200) {
        tableData.value = res.data
      } else {
        ElMessage.error('回饋數據加載失敗!')
      }
    })
    .catch(() => {
      ElMessage.error('回饋數據加載失敗!')
    })
    .finally(() => {
      closeLoading()
    })
}
onMounted(() => {
  getFeedbackCount()
  getFeedbackData()
})
watch(currentPage, () => {
  getFeedbackData()
})
</script>
<template>
  <div>
    <h1>回饋總覽</h1>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item
        v-for="(item, index) in tableData"
        :key="index"
        :title="item.name"
        :name="index"
      >
        <div class="text">回饋時間: {{ item.create_at }}</div>
        <div class="text">姓名: {{ item.name }}</div>
        <div class="text">電話號碼: {{ item.telephone }}</div>
        <div class="text">性別:{{ item.sex === 'male' ? '男' : '女' }}</div>
        <div class="text">回饋內容:{{ item.feedback }}</div>
      </el-collapse-item>
    </el-collapse>

    <el-pagination
      v-model:current-page="currentPage"
      layout="prev, pager, next"
      :total="totalCount"
    />
  </div>
</template>
<style scoped lang="scss">
.text {
  margin-bottom: 5px;
  font-weight: bold;
}
.el-collapse-item.is-active {
  :deep(.el-collapse-item__wrap) {
    padding-left: 10px;
  }
}
.el-pagination {
  justify-content: center;
}
</style>
