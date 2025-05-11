<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
interface Menu {
  id: number
  name: string
  price: number
  count: number
  description: string
  image: string
}
const cartStore = useCartStore()
const { addToCart } = cartStore
const menus = ref<Menu[] | null>(null)
const loading = ref(true)

// 模擬數據，使用我們創建的SVG圖片
const mockMenus: Menu[] = [
  {
    id: 1,
    name: '牛肉漢堡',
    price: 80,
    count: 1,
    description: '美味的牛肉漢堡',
    image: '/images/burger.svg'
  },
  {
    id: 2,
    name: '雞肉漢堡',
    price: 70,
    count: 1,
    description: '美味的雞肉漢堡',
    image: '/images/chicken_burger.svg'
  },
  {
    id: 3,
    name: '薯條',
    price: 40,
    count: 1,
    description: '香脆薯條',
    image: '/images/fries.svg'
  },
  {
    id: 4,
    name: '可樂',
    price: 30,
    count: 1,
    description: '冰涼可樂',
    image: ''  // 這個暫時沒有圖片，會使用默認圖片
  }
]

onMounted(() => {
  // 使用模擬數據替代API調用
  setTimeout(() => {
    menus.value = mockMenus
      loading.value = false
  }, 500) // 添加一點延遲模擬網絡請求

  /*
  fetch('/api/allMenu')
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 200) {
        menus.value = res.data
      } else {
        ElMessage.error('菜單加載失敗!')
      }
    })
    .catch(() => {
      ElMessage.error('菜單加載失敗!')
})
    .finally(() => {
      loading.value = false
    })
  */
})
</script>
<template>
  <div>
    <el-row :gutter="20">
      <el-skeleton style="width: 240px" :loading="loading" animated :count="3">
        <template #template>
          <el-skeleton-item variant="image" class="image" style="height: 240px" />
          <div style="padding: 14px">
            <div
              style="
                display: flex;
                align-items: center;
                justify-items: space-between;
                margin-top: 16px;
                height: 16px;
              "
            >
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="width: 30%" />
            </div>
          </div>
        </template>
        <template #default>
          <el-col v-for="menu in menus" :key="menu.id" :span="24" :sm="12" :md="8">
            <el-card :body-style="{ padding: '0px' }">
              <el-image
                :key="menu.image"
                style="width: 335px; height: 335px"
                :src="menu.image === '' || menu.image === null ? '/images/burger.svg' : menu.image"
                lazy
                fit="fill"
              >
                <template #error>
                  <div class="image-slot">
                    <el-icon><icon-picture /></el-icon>
                  </div>
                </template>
              </el-image>
              <div style="padding: 14px">
                <div style="display: flex; justify-content: space-between; align-items: center">
                  <span class="name">{{ menu.name }}</span>
                  <span class="price">{{ menu.price * menu.count }}元</span>
                </div>
                <div class="bottom">
                  <el-input-number v-model="menu.count" :min="1" />
                  <el-button type="success" @click="addToCart(menu)">添加至購物車</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </template>
      </el-skeleton>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
.bottom {
  margin: 10px 5px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.name {
  font-size: 20px;
  color: #606266;
  line-height: 30px;
  margin-left: 20px;
  display: block;
}
.price {
  color: #f60;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  display: block;
  margin-right: 20px;
}
.el-col {
  margin-top: 10px;
}
</style>
