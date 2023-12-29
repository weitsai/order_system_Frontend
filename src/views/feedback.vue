<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus'
import { openLoading, closeLoading } from '@/composables/loading'
interface feedbackFormType {
  name: string | null
  telephone: string | null
  sex: string | null
  feedback: string | null
}
const feedbackFormRef = ref<FormInstance | null>(null)
const feedbackForm = ref<feedbackFormType>({
  name: null,
  telephone: null,
  sex: 'male',
  feedback: null
})
const step = ref(0)
const sendFeedback = (FormRef: FormInstance) => {
  if (!FormRef) return
  FormRef.validate((valid) => {
    if (valid) {
      openLoading('資料處理中...')
      fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackForm.value)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 200) {
            step.value = 1
            ElMessage.success('回饋成功!')
          } else {
            ElMessage.error('回饋失敗!')
          }
        })
        .catch(() => {
          ElMessage.error('回饋失敗!')
        })
        .finally(() => {
          closeLoading()
        })
    }
  })
}
const rules = reactive<FormRules<feedbackFormType>>({
  name: [{ required: true, message: '請輸入姓名', trigger: 'blur' }],
  telephone: [
    { required: true, message: '請輸入電話', trigger: 'blur' },
    {
      pattern: /^09\d{8}$/,
      message: '請輸入正確的電話號碼',
      trigger: 'blur'
    }
  ],
  sex: [{ required: true, message: '請選擇性別', trigger: 'blur' }],
  feedback: [{ required: true, message: '請輸入回饋意見', trigger: 'blur' }]
})
</script>
<template>
  <h3 style="text-align: center">意見回饋</h3>
  <div style="display: flex; justify-content: center">
    <div style="width: 100%; max-width: 768px" v-show="step === 0">
      <el-form :model="feedbackForm" ref="feedbackFormRef" :rules="rules">
        <el-form-item label="您的姓名" prop="name">
          <el-input v-model="feedbackForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="您的性別" prop="sex">
          <el-select v-model="feedbackForm.sex" autocomplete="off">
            <el-option value="male" label="男" />
            <el-option value="female" label="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="電話號碼" prop="telephone">
          <el-input v-model="feedbackForm.telephone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="回饋意見" prop="feedback">
          <el-input v-model="feedbackForm.feedback" autocomplete="off" type="textarea" />
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" @click="sendFeedback(feedbackFormRef)">回饋</el-button>
        </div>
      </el-form>
    </div>
    <div v-show="step === 1">
      <el-result icon="success" title="感謝您的回饋" sub-title="您的評論我們會認真檢視!">
      </el-result>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
