
// Creamos la clase Movies
class Movie {
    constructor(nombrePeli, categoria, plataforma) {
        this.nombrePeli = nombrePeli
        this.categoria = categoria
        this.plataforma = plataforma
    }
}



const movies = JSON.parse(localStorage.getItem("movies")) ?? []


// Llamamos a los id 
const formPelis = document.getElementById("formPelis")
const mostrar = document.getElementById("mostrar")
const botonVerPelis = document.getElementById("botonVerPelis")
const listaVacia = document.getElementById("listaVacia")
const filtrado = document.getElementById("filtrado")



window.onload = () => {
    Toastify({
        text: `¡Bienvenido de vuelta!`,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to bottom right, rgba(2, 36, 239, 1.0), rgba(182, 100, 27, 1.0))",
        },
        onClick: function () { } // Callback after click
    }).showToast()
}

//creamos un evento de tipo formulario para guardar los valores que me ingrese el usuario, en mismo evento mostramos y eliminamos las cards para una mejor experiencia de usuario


formPelis.addEventListener("submit", (e) => {
    e.preventDefault()

    const nombrePeli = document.getElementById("nombrePeli").value
    const categoria = document.getElementById("categoria").value
    const plataforma = document.getElementById("plataforma").value
    //creamos el objeto movie
    const movie = new Movie(nombrePeli, categoria, plataforma)
    // agregamos los datos al array 
    movies.push(movie)
    // guardamos en el localSotage
    localStorage.setItem("movies", JSON.stringify(movies))

    // limpiar form
    formPelis.reset()


    // Mostramos las peliculas agregadas a la lista
    console.log(movies)

    mostrarLista(movies)

    // incorporamos librería tostify para que figure un aviso cada vez que agregamos una nueva película a la lista

    Toastify({
        text: "Agregaste una nueva peli a la lista",
        duration: 1000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to bottom right, rgba(2, 36, 239, 1.0), rgba(182, 100, 27, 1.0))",
        },
        onClick: function () { } // Callback after click
    }).showToast();

    listaVacia.classList.add("empty")
})








const mostrarLista = (movies) => {
    botonVerPelis.addEventListener("click", () => {


        mostrar.innerHTML = ""
        //const datosStorage = JSON.parse(localStorage.getItem("movies")) ?? []   //operador nullish


        //mostramos la lista de películas
        movies.forEach((movie, indice) => {

            let { nombrePeli, categoria, plataforma } = movie //Desestructuración de código

            mostrar.innerHTML += `
            <div id="pelis${indice}" class="cards2">
                <div>
                <h5>${nombrePeli}</h5>
                <h6>${categoria}</h6>
                <h6>${plataforma}</h6>
                <button class="eliminar">Eliminar</button>
                </div>
            </div>
            `

            movies.length === 0 ? listaVacia.classList.remove("empty") : listaVacia.classList.add("empty")

        })
        movies.forEach((movie, indice) => {

            // eliminamos la tarea de la lista
            const eliminar = document.getElementById(`pelis${indice}`).lastElementChild.lastElementChild
            eliminar.addEventListener("click", () => {
                document.getElementById(`pelis${indice}`).remove()
                //encuentro el indice de la película a eliminar
                const moviesEliminadas = movies.indexOf(movie)
                //elimino la película
                movies.splice(moviesEliminadas, 1)


                console.log(moviesEliminadas)

                localStorage.setItem("movies", JSON.stringify(movies))
                console.log(`${movie.nombrePeli} Fue eliminada de la lista`)


                movies.length === 0 ? listaVacia.classList.remove("empty") : listaVacia.classList.add("empty")


            })
        })
    })
}


// para que nos muestre las cards una vez actualizada la página

botonVerPelis.addEventListener("click", () => {
    mostrarLista(movies)
    movies.length === 0 ? listaVacia.classList.remove("empty") : listaVacia.classList.add("empty")


})

// FILTRAMOS LAS PELÍCULAS SEGÚN SU CATEGORÍA


filtrado.addEventListener("change", () => {
    mostrarLista(movies)
    mostrar.innerHTML = ""

    //const pelisFiltradas = movies.filter(categoria => categoria.value == filtrado.value )
    const pelisFiltradas = movies.filter(peli => peli.categoria == filtrado.value)

    pelisFiltradas.forEach((movie, indice) => {

        let { nombrePeli, categoria, plataforma } = movie //Desestructuración de código

        mostrar.innerHTML += `
            <div id="pelis${indice}" class="cards2">
                <div>
                <h5>${nombrePeli}</h5>
                <h6>${categoria}</h6>
                <h6>${plataforma}</h6>
                <button class="eliminar">Eliminar</button>
                </div>
            </div>
            `


    })

    pelisFiltradas.forEach((movie, indice) => {

        // eliminamos la tarea de la lista
        const eliminar = document.getElementById(`pelis${indice}`).lastElementChild.lastElementChild
        eliminar.addEventListener("click", () => {

            document.getElementById(`pelis${indice}`).remove()
            const moviesEliminadas = movies.indexOf(movie)
            movies.splice(moviesEliminadas, 1)
            console.log(moviesEliminadas)
            localStorage.setItem("movies", JSON.stringify(movies))
            console.log(`${movie.nombrePeli} Fue eliminada de la lista`)

            console.log(movies)





        })
    })
})





// CREAMOS NUESTRO CATALOGO DE PELICULAS


const API_KEY = "963613df74224797f8231f9800d2a1ca"
const pelis = document.getElementById("pelis")
const catalogo = document.getElementById("catalogo")
const verCatalogo = document.getElementById("verCatalogo")




verCatalogo.addEventListener("click", () => {
    pelis.innerHTML = ""
    getMovies()
    function getMovies() {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`)
            .then(res => res.json())
            .then(data => {
                console.log(data.results)
                catalogoMovies(data.results)
            })
    }

    function catalogoMovies(data) {
        catalogo.innerHTML = ""
        data.forEach(movie => {
            //.then(data => console.log(data))
            let { poster_path, original_title, vote_average, overview } = movie
            pelis.innerHTML += `
            <div class="cards">
                <img class="img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${original_title}">
                <div class="alinear">
                    <h3>${original_title}</h3>
                    <span class="puntuacion">${vote_average}</span>
                </div>
                <p class="p">${overview}</p>
            </div>
            
            `
            //console.log(original_title, overview, poster_path)

            catalogo.appendChild(pelis)
        })
    }
})





