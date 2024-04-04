import { defineStore } from 'pinia'
import Service from '../service/service'
export const diseaseIdentifier = defineStore('diseaseIdentifier', {
  state: () => ({
    information: []
  }),
  actions: {
    async uploadData({ success, failure, payload }) {
      try {
        console.log('hello')
        const response = await Service.post(payload)

        if (response.status === 404) {
          failure && failure()
          throw new Error('Page not found')
        } else if (response.status === 500) {
          failure && failure()
          throw new Error('Server error')
        } else if (!response.ok) {
          failure && failure()
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        success && success(data)
      } catch (err) {
        console.error(err)
      }
    },
    async getProcessed({ success, failure }) {
      try {
        console.log('hello')
        const response = await Service.get()
        if (response.status === 404) {
          failure && failure()
          throw new Error('Page not found')
        } else if (response.status === 500) {
          failure && failure()
          throw new Error('Server error')
        } else if (!response.ok) {
          failure && failure()
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        success && success()
        //store the data in information array by accessing it as this.information.
      } catch (err) {
        console.error(err)
      }
    }
  }
})
