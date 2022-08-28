class User2 {
    constructor(ingresoName, ingresoPass) {
        this.ingresoName = ingresoName
        this.ingresoPass = ingresoPass
    }
}

//llamamos a los id 
const usersRegistro = JSON.parse(localStorage.getItem("users")) ?? []
const users2 = JSON.parse(localStorage.getItem("users2")) ?? []
const formUserLogin = document.getElementById("formUserLogin")
const datosIncorrectos = document.getElementById("datosIncorrectos")




formUserLogin.addEventListener("submit", (e) => {
    e.preventDefault()
    //pedimos nombre de usuario y contraseña
    const ingresoName = document.getElementById("ingresoName").value
    const ingresoPass = document.getElementById("ingresoPass").value

    const user2 = new User2(ingresoName, ingresoPass)
    users2.push(user2)


    formUserLogin.reset()
    // comparamos los datos de registro con los de login
    const encontrarName = usersRegistro.find(users => users.username == ingresoName)
    const encontrarPass = usersRegistro.find(users => users.password == ingresoPass)

    // condicional para poder ingresar correctamente 
    if (ingresoName == "" || ingresoPass == "") {
        Swal.fire({
            icon: 'error',
            title: 'Por favor, completa todos los campos para poder ingresar',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            confirmButtonColor: '#021120'
        })

    } else if (encontrarName == undefined || encontrarPass == undefined) {
        datosIncorrectos.innerHTML = `
            <p>Usuario o contraseña incorrectos</p>
            `


    } else if (ingresoName == encontrarName["username"] && ingresoPass == encontrarPass["password"]) {
        window.location.href = "./pages/movieList.html"
        localStorage.setItem("users2", JSON.stringify(users2))

    }


})


