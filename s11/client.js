const axios = require("axios")

let userObj = {
    id:1,
    email:"sajad@g.co",
    phoneNumber:"09304419522"
}
axios.post("http://127.0.0.1:8080/x",userObj)
.then(res=>console.log(res.data))
.catch(err=>console.log(err))