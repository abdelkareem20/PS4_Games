let rig_email = document.querySelector(".Email")
let pass = document.querySelector(".password")
let submit = document.querySelector(".submit")


let getemail = localStorage.getItem("Email")
let getpassword = localStorage.getItem("password")

    submit.addEventListener("click" , function(force){
        force.preventDefault();
        if(rig_email.value === "" || pass === ""){
            alert("please fill data")
        } else{
            if((getemail && getemail.trim() === rig_email.value.trim()) && (getpassword && getpassword.trim() === pass.value.trim())){
                console.log("ok")
                setTimeout(() => {
                    window.location = "Home page.html"
                } , 1500)
            }else{
                alert("Email or password is wrong!")
            }
        }
})

//
    