let fname = document.querySelector(".fname")
let lname = document.querySelector(".lname")
let rig_email = document.querySelector(".Email")
let pass = document.querySelector(".password")
let submit = document.querySelector("#submit")

console.log(fname , lname , rig_email , pass , submit)

submit.addEventListener("click" , function(prevent){
    prevent.preventDefault();
    if(fname.value === "" || lname.value === "" || rig_email.value === "" || pass.value === ""){
        alert("Please Fill Data")
    } else{
        localStorage.setItem("fname" , fname.value)
        localStorage.setItem("lname" , lname.value)
        localStorage.setItem("Email" , rig_email.value)
        localStorage.setItem("password" , pass.value)

        setTimeout(() => {
            window.location = "login.html"
        } , 1500)
    }
})

