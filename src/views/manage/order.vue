<script setup lang="ts">
import { openLoading, closeLoading } from '@/composables/loading'
interface item {
  name: string
  count: number
}
interface Order {
  orderId: number
  date: string
  name: string
  tableNumber: string
  telephone: string
  remark: string
  totalPrice: number
  status: number
  item: item[]
}
const tableData = ref<Order[]>([])
const category = ref<string>('all')
const handleClick = (row: Order, type: string) => {
  openLoading()
  fetch('/api/manage/manageOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: type,
      orderId: row.orderId
    })
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 200) {
        ElMessage.success('操作成功!')
      } else {
        ElMessage.error('操作失敗!')
      }
    })
    .catch(() => {
      ElMessage.error('操作失敗!')
    })
    .finally(() => {
      closeLoading()
      fetchOrder()
    })
}
const fetchOrder = () => {
  openLoading()
  fetch(`/api/manage/getAllOrder?category=${category.value}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 200) {
        tableData.value = res.data
      } else {
        ElMessage.error('訂單加載失敗!')
      }
    })
    .catch(() => {
      ElMessage.error('訂單加載失敗!')
    })
    .finally(() => {
      closeLoading()
    })
}
onMounted(() => {
  fetchOrder()
})
</script>
<template>
  <div>
    <h1>訂單管理</h1>
    <div style="display: flex; margin-bottom: 10px">
      <label style="margin-right: 10px">篩選訂單狀態</label>
      <el-select v-model="category" placeholder="請選擇訂單狀態" @change="fetchOrder()">
        <el-option label="全部" value="all" />
        <el-option label="等待接單" value="wait" />
        <el-option label="已接單" value="accept" />
        <el-option label="已完成" value="end" />
        <el-option label="已取消" value="cancel" />
      </el-select>
      <div style="flex-grow: 1" />
      <el-button type="primary" @click="fetchOrder()">重新獲取訂單</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <div style="margin: 1rem 0 0 2rem">
            <p class="orderInfo">
              <span class="title">訂餐時間:</span>
              {{ props.row.date }}
            </p>
            <p class="orderInfo">
              <span class="title">姓名:</span>
              {{ props.row.name }}
            </p>
            <p class="orderInfo">
              <span class="title">電話:</span>
              {{ props.row.telephone }}
            </p>
            <p class="orderInfo">
              <span class="title">桌號:</span>
              {{ props.row.tableNumber }}
            </p>
            <p class="orderInfo">
              <span class="title">備註:</span>
              {{ props.row.remark }}
            </p>
            <p class="orderInfo" style="font-size: 18px; font-weight: bold; color: crimson">
              <span class="title">總計:</span>
              {{ props.row.totalPrice }}
            </p>
            <h3>品項</h3>
            <el-table :data="props.row.item">
              <el-table-column label="名稱" prop="name" />
              <el-table-column label="數量" prop="count" />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="訂餐時間" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="tableNumber" label="桌號" width="100" />
      <el-table-column prop="totalPrice" label="總價" width="100" />
      <el-table-column prop="status" label="狀態" width="100">
        <template #default="scope">
          <el-tag
            effect="dark"
            :type="
              scope.row.status === 0
                ? 'info'
                : scope.row.status === 1
                  ? 'warning'
                  : scope.row.status === 2
                    ? 'success'
                    : 'danger'
            "
            >{{
              scope.row.status === 0
                ? '等待接單'
                : scope.row.status === 1
                  ? '已接單'
                  : scope.row.status === 2
                    ? '已完成'
                    : '已取消'
            }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button
            type="danger"
            size="small"
            @click="handleClick(scope.row, 'cancel')"
            v-if="scope.row.status !== 2 && scope.row.status !== 3"
            >取消
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="handleClick(scope.row, 'accept')"
            v-if="scope.row.status === 0"
            >接單</el-button
          >
          <el-button
            type="success"
            size="small"
            @click="handleClick(scope.row, 'end')"
            v-if="scope.row.status === 1"
            >完成</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped lang="scss">
.orderInfo {
  margin: 0.5rem;
}
.orderInfo .title {
  font-weight: bold;
  color: black;
}
</style>
