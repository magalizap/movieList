class User {
    constructor(username, email, password, reapetPassword) {
        this.username = username
        this.email = email
        this.password = password
        this.reapetPassword = reapetPassword
    }
}

const users = JSON.parse(localStorage.getItem("users")) ?? []

//Llamamos a los id

const formUser = document.getElementById("formUser")
const mensajeError = document.getElementById("mensajeError")




formUser.addEventListener("submit", (e) => {
    e.preventDefault()

    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const reapetPassword = document.getElementById("reapetPassword").value

    //creamos el objeto user
    const user = new User(username, email, password, reapetPassword)
    //agregamos los datos al array
    users.push(user)
    //guardamos los datos en el localStorage



    formUser.reset()
    if (username == "", email == "", password == "", reapetPassword == "") {
        Swal.fire({
            icon: 'error',
            title: 'Por favor, completa todos los campos para poder ingresar',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            confirmButtonColor: '#021120'
        })
    } else if (password != reapetPassword) {
        mensajeError.innerHTML += `
            <p>Las contraseñas no coinciden</p>
        `
    } else {
        window.location.href = "../pages/movieList.html"
        localStorage.setItem("users", JSON.stringify(users))
    }


})

