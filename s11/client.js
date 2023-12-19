const axios = require("axios")
axios.post("http://127.0.0.1:8080/x",{
    id:1,
    name:"sajad"
})
.then(res=>console.log(res))
.catch(err=>console.log(err))