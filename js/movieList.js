// Creamos la clase Movies
class Movie {
    constructor(movieName, category, platform) {
        this.movieName = movieName
        this.category = category
        this.platform = platform
    }
}

// consultamos los datos en la const movies

const movies = JSON.parse(localStorage.getItem("movies")) ?? []


// Llamamos a los id 
const formMovies = document.getElementById("formMovies")
const showList = document.getElementById("showList")
const btnShowList = document.getElementById("btnShowList")
const emptyList = document.getElementById("emptyList")
const filter = document.getElementById("filter")

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

formMovies.addEventListener("submit", (e) => {
    e.preventDefault()

    const movieName = document.getElementById("movieName").value
    const category = document.getElementById("category").value
    const platform = document.getElementById("platform").value
    //creamos el objeto movie
    const movie = new Movie(movieName, category, platform)
    // agregamos los datos al array 
    movies.push(movie)
    // guardamos en el localSotage
    localStorage.setItem("movies", JSON.stringify(movies))

    // limpiar form
    formMovies.reset()


    // Mostramos las peliculas agregadas a la lista

    showMovies(movies)

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

    emptyList.classList.add("empty")
})

const showMovies = (movies) => {
    btnShowList.addEventListener("click", () => {


        showList.innerHTML = ""
        //const datosStorage = JSON.parse(localStorage.getItem("movies")) ?? []   //operador nullish


        //mostramos la lista de películas
        movies.forEach((movie, indice) => {

            let { movieName, category, platform } = movie //Desestructuración de código

            showList.innerHTML += `
            <div id="film${indice}" class="myCards">
                <h4>${movieName}</h4>
                <h5>Categoría: ${category}</h5>
                <h5>Ver en: ${platform}</h5>
                <button class="delete">Eliminar</button>
            </div>
            `

            movies.length === 0 ? emptyList.classList.remove("empty") : emptyList.classList.add("empty")

        })
        movies.forEach((movie, indice) => {

            // eliminamos la tarea de la lista
            const eliminate = document.getElementById(`film${indice}`).lastElementChild
            eliminate.addEventListener("click", () => {
                document.getElementById(`film${indice}`).remove()
                //encuentro el indice de la película a eliminar
                const deletedMovies = movies.indexOf(movie)
                //elimino la película
                movies.splice(deletedMovies, 1)

                // guardamos los datos en el localStorage
                localStorage.setItem("movies", JSON.stringify(movies))
                
                movies.length === 0 ? emptyList.classList.remove("empty") : emptyList.classList.add("empty")


            })
        })
    })
}

// para que nos muestre las cards una vez actualizada la página

btnShowList.addEventListener("click", () => {
    showMovies(movies)
    movies.length === 0 ? emptyList.classList.remove("empty") : emptyList.classList.add("empty")
})

// FILTRAMOS LAS PELÍCULAS SEGÚN SU CATEGORÍA

filter.addEventListener("change", () => {
    showMovies(movies)
    showList.innerHTML = ""

    const moviesFilter = movies.filter(movie => movie.category == filter.value)

    moviesFilter.forEach((movie, indice) => {

        let { movieName, category, platform } = movie //Desestructuración de código

        showList.innerHTML += `
        <div id="film${indice}" class="myCards">
            <h4>${movieName}</h4>
            <h5>Categoría: ${category}</h5>
            <h5>Ver en: ${platform}</h5>
            <button class="delete">Eliminar</button>
        </div>
        `
    })

    moviesFilter.forEach((movie, indice) => {

        // eliminamos la tarea de la lista
        const eliminate = document.getElementById(`film${indice}`).lastElementChild
        eliminate.addEventListener("click", () => {

            document.getElementById(`film${indice}`).remove()
            const deletedMovies = movies.indexOf(movie)
            movies.splice(deletedMovies, 1)
            console.log(deletedMovies)
            localStorage.setItem("movies", JSON.stringify(movies))
            console.log(`${movie.movieName} Fue eliminada de la lista`)

            console.log(movies)

        })
    })
})


// CREAMOS NUESTRO CATALOGO DE PELICULAS


const API_KEY = "963613df74224797f8231f9800d2a1ca"
const film = document.getElementById("film")
const billboard = document.getElementById("billboard")
const seeBillboard = document.getElementById("seeBillboard")

seeBillboard.addEventListener("click", () => {
    film.innerHTML = ""
    getMovies()
    function getMovies() {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`)
            .then(res => res.json())
            .then(data => {
                console.log(data.results)
                movieBillboard(data.results)
            })
    }

    function movieBillboard(data) {
        billboard.innerHTML = ""
        data.forEach(movie => {

            let { poster_path, original_title, vote_average, overview } = movie
            film.innerHTML += `
            <div class="cards">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${original_title}">
                <div class="toLineUp">
                    <h3>${original_title}</h3>
                    <span class="score">${vote_average}</span>
                </div>
                <p class="overview">${overview}</p>
            </div>
            
            `


            billboard.appendChild(film)
        })
    }
})