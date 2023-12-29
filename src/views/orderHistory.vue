<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus'
interface FindOrderType {
  orderId: number | null
  name: string | null
  telephone: string | null
}
interface item {
  name: string
  count: number
}
interface OrderStatusType {
  orderId: number
  tableNumber: number
  name: string
  telephone: string
  totalPrice: number
  status: number
  item: item[]
}
const findOrderFormRef = ref<FormInstance | null>(null)
const findOrderForm = ref<FindOrderType>({
  orderId: null,
  name: null,
  telephone: null
})
const loading = ref(false)
const orderStatusData = ref<OrderStatusType[]>([])
const findOrder = (FormRef: FormInstance) => {
  if (!FormRef) return
  FormRef.validate((valid) => {
    if (valid) {
      loading.value = true
      fetch('/api/orderStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(findOrderForm.value)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 200) {
            orderStatusData.value = res.data
            ElMessage.success('查詢成功!')
          } else {
            ElMessage.error('查無此訂單!')
          }
        })
        .catch(() => {
          ElMessage.error('查詢失敗!')
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}
const cancelOrder = (orderId: number) => {
  ElMessageBox.confirm('此操作將取消訂單, 是否繼續?', '提示', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      fetch('/api/cancelOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: orderId
        })
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 200) {
            ElMessage.success('取消成功!')
            findOrder(findOrderFormRef.value)
          } else {
            ElMessage.error('取消失敗!')
          }
        })
        .catch(() => {
          ElMessage.error('取消失敗!')
        })
    })
    .catch(() => {})
}
const rules = reactive<FormRules<FindOrderType>>({
  name: [{ required: true, message: '請輸入訂餐姓名', trigger: 'blur' }],
  telephone: [
    { required: true, message: '請輸入電話號碼', trigger: 'blur' },
    {
      pattern: /^09\d{8}$/,
      message: '請輸入正確的電話號碼',
      trigger: 'blur'
    }
  ]
})
</script>
<template>
  <h3 style="text-align: center">點餐紀錄查詢</h3>
  <p style="text-align: center; color: red">僅能查詢30天內訂單</p>
  <div style="display: flex; justify-content: center">
    <div style="width: 100%; max-width: 768px">
      <el-form :model="findOrderForm" ref="findOrderFormRef" :rules="rules">
        <el-form-item label="訂單編號" prop="orderId">
          <el-input v-model="findOrderForm.orderId" autocomplete="off" placeholder="可不填" />
        </el-form-item>
        <el-form-item label="訂餐姓名" prop="name">
          <el-input v-model="findOrderForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="電話號碼" prop="telephone">
          <el-input v-model="findOrderForm.telephone" autocomplete="off" />
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" @click="findOrder(findOrderFormRef)" :loading="loading"
            >查詢</el-button
          >
        </div>
      </el-form>
      <el-table :data="orderStatusData">
        <el-table-column type="expand">
          <template #default="props">
            <div style="margin: 1rem 0 0 2rem">
              <h3>品項</h3>
              <el-table :data="props.row.item">
                <el-table-column label="名稱" prop="name" />
                <el-table-column label="數量" prop="count" />
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="orderId" label="訂單編號" />
        <el-table-column prop="tableNumber" label="桌號" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="telephone" label="電話號碼" />
        <el-table-column prop="totalPrice" label="總價格" />
        <el-table-column prop="status" label="訂單狀態">
          <template #default="scope">
            <el-tag
              effect="dark"
              :type="
                scope.row.status === 0
                  ? 'info'
                  : scope.row.status === 1
                    ? ''
                    : scope.row.status === 2
                      ? 'success'
                      : 'danger'
              "
              >{{
                scope.row.status === 0
                  ? '等待中'
                  : scope.row.status === 1
                    ? '已接單'
                    : scope.row.status === 2
                      ? '已完成'
                      : '已取消'
              }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="status" label="操作" width="100">
          <template #default="scope">
            <el-button
              :disabled="scope.row.status !== 0"
              type="danger"
              size="small"
              @click="cancelOrder(scope.row.orderId)"
              >取消訂單</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
