class User2 {
    constructor(nameAccess, passAccess) {
        this.nameAccess = nameAccess
        this.passAccess = passAccess
    }
}


const userSignup = JSON.parse(localStorage.getItem("users")) ?? []
const users2 = JSON.parse(localStorage.getItem("users2")) ?? []
const formUserAccess = document.getElementById("formUserAccess")
const errorData = document.getElementById("errorData")




formUserAccess.addEventListener("submit", (e) => {
    e.preventDefault()
    //pedimos nombre de usuario y contraseña
    const nameAccess = document.getElementById("nameAccess").value
    const passAccess = document.getElementById("passAccess").value

    const user2 = new User2(nameAccess, passAccess)
    users2.push(user2)


    formUserAccess.reset()
    // comparamos los datos de registro con los de login
    const findName = userSignup.find(users => users.username == nameAccess)
    const findPass = userSignup.find(users => users.password == passAccess)

    // condicional para poder ingresar correctamente 
    if (nameAccess == "" || passAccess == "") {
        Swal.fire({
            icon: 'error',
            title: 'Por favor, completa todos los campos para poder ingresar',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            confirmButtonColor: '#021120'
        })

    } else if (findName == undefined || findPass == undefined) {
        errorData.innerHTML = `
            <p>Usuario o contraseña incorrectos</p>
            `


    } else if (nameAccess == findName["username"] && passAccess == findPass["password"]) {
        window.location.href = "./pages/movieList.html"
        localStorage.setItem("users2", JSON.stringify(users2))
        
    }


})

