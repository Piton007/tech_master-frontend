export default function ({ $axios, redirect ,app}) {
  
    $axios.onError(error => {
      const code = parseInt(error.response && error.response.status)
      const {response:{data}} = error
        const errors = Object.entries(data.errors).map(([key,value])=>`${value}`)
        app.$swal(
          {
            title:data.msg,
            icon:"error",
            text:errors.join("\n"),
            type:"error",
            confirmButtonText: 'OK',
          }
        ).then(()=>{
          
          if (code === 401) {
        
            redirect('/')
            return 
          }
        })
     
    })
  }
  