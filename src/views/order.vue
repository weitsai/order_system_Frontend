<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router'
interface OrderDataType {
  tableNumber: number | null
  name: string | null
  telephone: string | null
  remark: string | null
}
const cartStore = useCartStore()
const { cart } = storeToRefs(cartStore)
const { removeToCart, addToCart, clearCart } = cartStore
const active = ref(0)
const sendOrderStatus = ref<number>(0)
const orderFormRef = ref<FormInstance>()
const orderForm = ref<OrderDataType>({
  tableNumber: null,
  name: null,
  telephone: null,
  remark: ''
})
const orderInfo = ref({
  orderId: null,
  tableNumber: null,
  name: null,
  telephone: null,
  totalPrice: null
})
const loading = ref(false)
const addCart = (row) => {
  addToCart({
    id: row.id,
    name: row.name,
    price: row.price,
    count: 1
  })
}
const removeCart = (row) => {
  removeToCart({
    id: row.id,
    name: row.name,
    price: row.price,
    count: 1
  })
}
const SendOrder = (FormRef: FormInstance) => {
  if (!FormRef) return
  FormRef.validate((valid) => {
    if (valid) {
      loading.value = true
      fetch('/api/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart.value,
          orderData: orderForm.value
        })
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 200) {
            sendOrderStatus.value = 1
            orderInfo.value = res.data
            clearCart()
          } else {
            sendOrderStatus.value = 2
          }
        })
        .catch(() => {
          sendOrderStatus.value = 2
        })
        .finally(() => {
          active.value = 3
          loading.value = false
        })
    }
  })
}
const rules = reactive<FormRules<OrderDataType>>({
  tableNumber: [{ required: true, message: '請輸入桌號', trigger: 'blur' }],
  name: [{ required: true, message: '請輸入姓名', trigger: 'blur' }],
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
  <div>
    <el-steps :active="active" finish-status="success" simple>
      <el-step title="確認訂單內容" />
      <el-step title="填寫桌號及聯絡信息" />
      <el-step title="訂單狀態" />
    </el-steps>
    <div v-if="active === 0">
      <el-table :data="cart" show-summary sum-text="合計" style="width: 100%">
        <el-table-column prop="name" label="產品名稱" />
        <el-table-column prop="price" label="單價" />
        <el-table-column prop="count" label="數量" />
        <el-table-column prop="totalPrice" label="總價格" />
        <el-table-column label="數量" width="150">
          <template #default="scope">
            <el-button type="danger" @click="removeCart(scope.row)">-</el-button>
            <el-button type="success" @click="addCart(scope.row)">+</el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="點餐單是空的!" />
        </template>
      </el-table>
    </div>
    <div v-if="active === 1" style="display: flex; justify-content: center">
      <div style="width: 100%; max-width: 768px">
        <el-form :model="orderForm" ref="orderFormRef" :rules="rules">
          <el-form-item label="桌號" prop="tableNumber">
            <el-input v-model="orderForm.tableNumber" autocomplete="off" />
          </el-form-item>
          <el-form-item label="訂餐姓名" prop="name">
            <el-input v-model="orderForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="電話號碼" prop="telephone">
            <el-input v-model="orderForm.telephone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="備註" prop="remark">
            <el-input v-model="orderForm.remark" autocomplete="off" type="textarea" />
          </el-form-item>
          <div style="text-align: center">
            <el-button type="primary" @click="SendOrder(orderFormRef)" :loading="loading"
              >送出訂單</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
    <div v-if="active === 3">
      <div v-if="sendOrderStatus === 1">
        <el-result icon="success" title="訂單成功送出!" sub-title="請耐心等候!">
          <template #extra>
            <el-button type="primary" @click="router.push({ name: 'home' })">回首頁</el-button>
          </template>
        </el-result>
        <p>訂單編號: {{ orderInfo.orderId }}</p>
        <p>桌號: {{ orderInfo.tableNumber }}</p>
        <p>訂餐姓名: {{ orderInfo.name }}</p>
        <p>訂餐電話: {{ orderInfo.telephone }}</p>
        <p>總金額: {{ orderInfo.totalPrice }}</p>
      </div>
      <div v-if="sendOrderStatus === 2">
        <el-result icon="error" title="訂單送出失敗!" sub-title="請重新送出!">
          <template #extra>
            <el-button type="primary" @click="router.push('/')">回首頁</el-button>
          </template>
        </el-result>
      </div>
    </div>
    <el-button type="primary" @click="active++" v-show="active == 0 && cart.length > 0"
      >下一步</el-button
    >
  </div>
</template>
<style scoped lang="scss"></style>
