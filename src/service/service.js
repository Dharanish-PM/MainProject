const baseUrl = 'upload image URL'
const post = (requestBody) => {
  return fetch(baseUrl, {
    method: 'POST',
    body: requestBody,
    headers: {}
  })
}
const get = () => {
  const getDetailURL="get Details URL"
  return fetch(getDetailURL)
}
export default {
  post,
  get
}
