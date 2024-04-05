import { diseaseIdentifier } from '@/stores/diseaseIdentifier'
import { mapState, mapActions } from 'pinia'

export default {
  data() {
    return {
      images: [],
      isDragging: false,
      allFiles: [],
      isOpenPopUp: false,
      isLoading: false,
      isDetailPopUp: false
    }
  },
  computed:{
    ...mapState(diseaseIdentifier,['information']),

  },
  methods: {
    ...mapActions(diseaseIdentifier, ['uploadData']),
    selectFiles() {
      this.$refs.fileInput.click()
    },
    onFileSelect(event) {
      const files = event.target.files
      this.allFiles = files
      if (files.length == 0) return
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.split('/')[0] != 'image') continue
        if (!this.images.some((e) => e.name === files[i].name)) {
          this.images.push({ name: files[i].name, url: URL.createObjectURL(files[i]) })
        }
      }
      console.log(this.allFiles)
    },
    deleteImage(index) {
      this.images.splice(index, 1)
    },
    onDragOver(e) {
      e.preventDefault()
      this.isDragging = true
      e.dataTransfer.dropEffect = 'copy'
    },
    onDragLeave(e) {
      e.preventDefault()
      this.isDragging = false
    },
    onDrop(e) {
      e.preventDefault()
      const files = e.dataTransfer.files
      this.allFiles = files
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.split('/')[0] != 'image') continue
        if (!this.images.some((e) => e.name === files[i].name)) {
          this.images.push({ name: files[i].name, url: URL.createObjectURL(files[i]) })
        }
      }
    },
    uploadImage() {
      console.log(this.allFiles)
      this.isLoading = true

      let formData = new FormData()
      formData.append('file', this.allFiles[0])
      this.uploadData({
        success: this.onSuccess,
        failure: this.onFailure,
        payload: formData
      })
    },
    onSuccess(data) {
      this.isLoading = false
      this.isOpenPopUp = !this.isOpenPopUp
      console.log(data)
    },
    onFailure() {},
    removePopop() {
      this.isOpenPopUp = !this.isOpenPopUp
    },
    removeDetailPopUp() {
      this.isDetailPopUp = !this.isDetailPopUp
    },
    getDetails() {
      this.isLoading = true
      this.isDetailPopUp = !this.isDetailPopUp
      //get Details API
      this.getProcessed({
        success: this.onSuccessGetDetail,
        failure: this.onFailureGetDetail
      })
    },
    onSuccessGetDetail(data) {
      this.isLoading = false
      // this.isDetailPopUp = !this.isDetailPopUp
      console.log(data)
    },
    onFailureGetDetail() {}
  }
}
