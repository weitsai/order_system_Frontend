<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { openLoading, closeLoading } from '@/composables/loading'
import { Check, Close } from '@element-plus/icons-vue'
interface Product {
  id: number | null
  name: string | null
  price: number | null
  description: string | null
  image: []
  isSale: any
}
interface ProductForm {
  name: string | null
  price: number | null
  description: string | null
  image: []
  isSale: any
}
const tableData = ref<Product[]>([])
const editDialogWindow = ref(false)
const newProductDialogWindow = ref(false)
const editDataFormRef = ref<FormInstance>(null)
const newProductFormRef = ref<FormInstance>(null)
const editDataForm = ref<Product>({
  id: null,
  name: '',
  price: null,
  description: '',
  image: [],
  isSale: false
})
const newProductForm = ref<ProductForm>({
  name: '',
  price: null,
  description: '',
  image: [],
  isSale: true
})
const dialogWidth = ref('50%')
const handleEdit = (rowId: number) => {
  editDataForm.value = JSON.parse(JSON.stringify(tableData.value.find((item) => item.id === rowId)))
  editDialogWindow.value = true
}
const handlePostNewProduct = (FormRef: FormInstance) => {
  if (!FormRef) return
  FormRef.validate((vaild) => {
    if (vaild) {
      let formData = new FormData()
      formData.append('option', 'add')
      formData.append('name', newProductForm.value.name)
      formData.append('price', newProductForm.value.price.toString())
      formData.append('description', newProductForm.value.description)
      formData.append('isSale', newProductForm.value.isSale.toString())
      newProductForm.value.image.forEach((v: any) => {
        formData.append('image', v.raw)
      })
      openLoading('資料處理中...')
      fetch('/api/manage/manageProduct', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'cache-control': 'no-cache'
        },
        body: formData
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 200) {
            ElMessage.success('新增成功!')
            newProductDialogWindow.value = false
            tableData.value.push(res.data)
            FormRef.resetFields()
            newProductForm.value.image = []
          } else {
            ElMessage.error('新增失敗!')
          }
        })
        .catch(() => {
          ElMessage.error('新增失敗!')
        })
        .finally(() => {
          closeLoading()
        })
    }
  })
}
const handlePostEditData = (FormRef: FormInstance) => {
  if (!FormRef) return
  FormRef.validate((vaild) => {
    if (vaild) {
      let formData = new FormData()
      formData.append('option', 'edit')
      formData.append('productId', editDataForm.value.id.toString())
      formData.append('name', editDataForm.value.name)
      formData.append('price', editDataForm.value.price.toString())
      formData.append('description', editDataForm.value.description)
      formData.append('isSale', editDataForm.value.isSale.toString())
      editDataForm.value.image.forEach((v: any) => {
        formData.append('image', v.raw)
      })
      openLoading('資料處理中...')
      fetch('/api/manage/manageProduct', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'cache-control': 'no-cache'
        },
        body: formData
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 200) {
            ElMessage.success('修改成功!')
            editDialogWindow.value = false
            fetchProductData()
          } else {
            ElMessage.error('修改失敗!')
          }
        })
        .catch(() => {
          ElMessage.error('修改失敗!')
        })
        .finally(() => {
          closeLoading()
        })
    }
  })
}
const handleDelete = (row: Product) => {
  ElMessageBox.confirm('此操作將刪除該產品!, 是否繼續?', '提示', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      let formData = new FormData()
      formData.append('option', 'delete')
      formData.append('productId', row.id.toString())
      openLoading('資料處理中...')
      fetch('/api/manage/manageProduct', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'cache-control': 'no-cache'
        },
        body: formData
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 200) {
            ElMessage.success('刪除成功!')
            tableData.value = tableData.value.filter((item) => item.id !== row.id)
          } else {
            ElMessage.error('刪除失敗!')
          }
        })
        .catch(() => {
          ElMessage.error('刪除失敗!')
        })
    })
    .catch(() => {})
    .finally(() => {
      closeLoading()
    })
}
const fetchProductData = () => {
  //fetch user data
  openLoading('資料載入中...')
  fetch('/api/manage/getAllProduct', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 200) {
        tableData.value = res.data
      } else {
        ElMessage.error('資料取得失敗')
      }
    })
    .catch(() => {
      ElMessage.error('資料取得失敗')
    })
    .finally(() => {
      closeLoading()
    })
}
const beforeUpload = (file: File) => {
  const isImage =
    file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
  if (!isImage) {
    ElMessage.error('上傳檔案格式錯誤!')
  }
  return isImage
}
const handleExeceed = () => {
  ElMessage.warning(`只能上傳一個檔案`)
}
onMounted(() => {
  fetchProductData()
  dialogWidth.value = window.innerWidth < 768 ? '90%' : '50%'
  window.addEventListener('resize', () => {
    dialogWidth.value = window.innerWidth < 768 ? '90%' : '50%'
  })
})
const rules = reactive<FormRules<Product>>({
  name: [{ required: true, message: '請輸入產品名稱', trigger: 'change' }],
  price: [
    { required: true, message: '請輸入價格', trigger: 'change' },
    { type: 'number', message: '請輸入數字', trigger: 'change' }
  ]
})
</script>
<template>
  <div>
    <div
      style="display: flex; justify-content: space-between; align-items: center; padding: 0 10px"
    >
      <h1>產品管理</h1>
      <el-button type="primary" @click="newProductDialogWindow = true">新增產品</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="產品名稱" prop="name" />
      <el-table-column label="價格" prop="price" />
      <el-table-column label="產品狀態" prop="description">
        <template #default="scope">
          <el-tag effect="dark" :type="scope.row.isSale === true ? 'success' : 'danger'">{{
            scope.row.isSale === true ? '販售中' : '已下架'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row.id)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="editDialogWindow" title="修改產品資訊" :width="dialogWidth">
      <el-form :model="editDataForm" ref="editDataFormRef" :rules="rules">
        <el-form-item label="產品名稱" prop="name">
          <el-input v-model="editDataForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="價格" prop="price">
          <el-input v-model.number="editDataForm.price" autocomplete="off" />
        </el-form-item>
        <el-form-item label="產品敘述">
          <el-input v-model="editDataForm.description" autocomplete="off" type="textarea" />
        </el-form-item>
        <el-form-item label="產品販售狀態" prop="isSale">
          <el-switch
            v-model="editDataForm.isSale"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
          />
        </el-form-item>
        <el-upload
          v-model:file-list="editDataForm.image"
          list-type="picture"
          :auto-upload="false"
          :before-upload="beforeUpload"
          :limit="1"
          :on-exceed="handleExeceed"
        >
          <el-button type="primary">選擇照片</el-button>
          <template #tip>
            <div class="el-upload__tip">僅限上傳 jpg/png</div>
          </template>
        </el-upload>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogWindow = false">取消</el-button>
          <el-button type="primary" @click="handlePostEditData(editDataFormRef)"> 修改 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="newProductDialogWindow" title="新增產品" :width="dialogWidth">
      <el-form :model="newProductForm" ref="newProductFormRef" :rules="rules">
        <el-form-item label="產品名稱" prop="name">
          <el-input v-model="newProductForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="價格" prop="price">
          <el-input v-model.number="newProductForm.price" autocomplete="off" />
        </el-form-item>
        <el-form-item label="產品敘述">
          <el-input v-model="newProductForm.description" autocomplete="off" type="textarea" />
        </el-form-item>
        <el-form-item label="產品販售狀態" prop="isSale">
          <el-switch
            v-model="newProductForm.isSale"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
          />
        </el-form-item>
        <el-upload
          v-model:file-list="newProductForm.image"
          list-type="picture"
          :auto-upload="false"
          :before-upload="beforeUpload"
          :limit="1"
          :on-exceed="handleExeceed"
        >
          <el-button type="primary">選擇照片</el-button>
          <template #tip>
            <div class="el-upload__tip">僅限上傳 jpg/png</div>
          </template>
        </el-upload>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogWindow = false">取消</el-button>
          <el-button type="primary" @click="handlePostNewProduct(newProductFormRef)">
            新增
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss"></style>
