const baseUrl = 'http://10.30.1.96:8098/employee'
const post = (requestBody) => {
  return fetch(baseUrl, {
    method: 'POST',
    body: requestBody,
    headers: {}
  })
}
export default {
  post
}
