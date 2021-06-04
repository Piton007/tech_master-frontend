export default function ({ $axios, redirect }) {
  
    $axios.onError(error => {
        console.log(error,"hey")
      const code = parseInt(error.response && error.response.status)
      if (code === 401) {
        redirect('/')
      }
    })
  }
  