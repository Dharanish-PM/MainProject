import { diseaseIdentifier } from '@/stores/diseaseIdentifier'
import { mapState, mapActions } from 'pinia'

export default {
  data() {
    return {
      images: [],
      isDragging: false,
      allFiles: [],
      isOpenPopUp: false
    }
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
      this.isOpenPopUp = !this.isOpenPopUp //change when success
      let formData = new FormData()
      formData.append('file', this.allFiles[0])
      this.uploadData({
        success: this.onSuccess,
        failure: this.onFailure,
        payload: formData
      })
    },
    onSuccess(data) {
      console.log(data)
    },
    onFailure() {},
    removePopop() {
      this.isOpenPopUp = !this.isOpenPopUp
    }
  }
}
