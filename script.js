
// Creamos la clase Movies
class Movies{
    constructor(nombrePeli, categoria, plataforma){
        this.nombrePeli = nombrePeli
        this.categoria = categoria
        this.plataforma = plataforma
    }
}


const movies = []


// Llamamos a los id 
const formPelis = document.getElementById("formPelis")
const mostrar = document.getElementById("mostrar")
const verListado = document.getElementById("verListado")
const listaVacia = document.getElementById("listaVacia")
const lista = document.getElementById("lista")


//creamos un evento de tipo formulario para guardar los valores que me ingrese el usuario, en mismo evento mostramos y eliminamos las cards para una mejor experiencia de usuario



formPelis.addEventListener("submit", (e) =>{
    e.preventDefault()

    const nombrePeli = document.getElementById("nombrePeli").value
    const categoria = document.getElementById("categoria").value
    const plataforma = document.getElementById("plataforma").value
    //creamos el objeto movie
    const movie = new Movies (nombrePeli, categoria, plataforma)
    // agregamos los datos al array 
    movies.push(movie)
    // guardamos en el localSotage
    localStorage.setItem("Movies", JSON.stringify(movies))

    // limpiar form
    formPelis.reset()


    // Mostramos las peliculas agregadas a la lista
    console.log(movies)

    const datosStorage = JSON.parse(localStorage.getItem("Movies")) ?? []

    mostrar.innerHTML = ""
    
    datosStorage.forEach((movie, indice) => {

        mostrar.innerHTML += `
        <div id="pelis${indice}" class="card" style="width: 18rem; margin: 1em">
            <div class="card-body">
            <h5 class="card-title text-dark" >${movie.nombrePeli}</h5>
            <h6 class="card-text text-dark">Categoría: ${movie.categoria}</h6>
            <h6 class="card-text text-dark">Ver en: ${movie.plataforma}</h6>
            <a href="#" class="btn btn-secondary">Eliminar</a>
            </div>
        </div>
        
        `

        movies.length === 0 &&  listaVacia.classList.remove("empty")

        
    })
        // eliminamos la tarea de la lista
    datosStorage.forEach((movie, indice) => {

        const eliminar = document.getElementById(`pelis${indice}`).lastElementChild.lastElementChild
        
        eliminar.addEventListener("click", ()=>{

            document.getElementById(`pelis${indice}`).remove()
            movies.splice(indice,1)
            localStorage.setItem("Movies", JSON.stringify(movies))
            console.log(`${movie.nombrePeli} Fue eliminada de la lista`)

            console.log(movies)

            movies.length === 0 &&  listaVacia.classList.remove("empty")
    

    
        })
    
    
    })


    
})


// OPERADOR SPREAD 

/*const guardarStorage = structuredClone(datosStorage)
console.log(guardarStorage)

const formPelis2 = structuredClone({
    formPelis,
    
        // eliminamos la tarea de la lista

    
})*/





lista.addEventListener("click", () =>{


    const datosStorage = JSON.parse(localStorage.getItem("Movies"))
    datosStorage.forEach((movie, indice) => {
        mostrar.innerHTML += `
        <div id="pelis${indice}" class="card" style="width: 18rem; margin: 1em">
            <div class="card-body">
            <h5 class="card-title text-dark" >${movie.nombrePeli}</h5>
            <h6 class="card-text text-dark">Categoría: ${movie.categoria}</h6>
            <h6 class="card-text text-dark">Ver en: ${movie.plataforma}</h6>
            <a href="#" class="btn btn-secondary">Eliminar</a>
            </div>
        </div>
        
        `

    })
})

verListado.addEventListener("click", () =>{ // Descifrar cómo mostrar solo las cards que aparecen filtradas por categoría

    const filtrado = document.getElementById("filtrado").value
    movies.filter(filtrado => filtrado.value)

    const datosStorage = JSON.parse(localStorage.getItem("Movies"))
    datosStorage.filter((movie, indice) => {
        filtrado.innerHTML +=  `
        <div id="pelis${indice.value}" class="card" style="width: 18rem; margin: 1em">
            <div class="card-body">
            <h5 class="card-title text-dark" >${movie.nombrePeli}</h5>
            <h6 class="card-text text-dark">Categoría: ${movie.categoria}</h6>
            <h6 class="card-text text-dark">Ver en: ${movie.plataforma}</h6>
            <a href="#" class="btn btn-secondary">Eliminar</a>
            </div>
        </div>
        
        `

    })
    
    console.log(filtrado) 

})



/**
 * Cosas para resolver:
 * 
 *  - el boton de mostrar listado me devuelve la peli nueva sumada a las que ya estaban a la vista, me repite cards
 *  - si activo el boton sumar peli para que me muestre las cards también, la función eliminar no funciona 
 *  - mejorar los estilos css, eliminar las tarjetas bootstrap por tarjetas de css
 *  - Crear un formulario de login, para que más de un usuario tenga su cuenta con sus peliculas a elección
 *  - Agregar imagenes a las cards => no se que película puede elegir el usuario :(
 *  - crear un filtrado por categorías para que, de haber muchas en la lista, el usuario pueda encontrar la que desee más facilmente
 *  - FALTA AGREGAR CONDICIONALES!!!
 */




/**
 *     
 *     
 */