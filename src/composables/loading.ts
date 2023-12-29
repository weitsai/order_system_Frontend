let loadingCount = 0
let loading: any
export const openLoading = (text: string = '資料載入中') => {
  if (loadingCount === 0) {
    loading = ElLoading.service({
      lock: true,
      text: text,
      background: 'rgba(0, 0, 0, 0.7)'
    })
    loadingCount++
  }
}
export const closeLoading = () => {
  if (loadingCount <= 0) return
  loadingCount--
  if (loadingCount === 0) {
    if (loading) {
      loading.close()
    }
  }
}
