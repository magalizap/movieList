
// Creamos la clase Movies
class Movie{
    constructor(nombrePeli, categoria, plataforma){
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
const mostrarFiltrado = document.getElementById("mostrarFiltrado")


//creamos un evento de tipo formulario para guardar los valores que me ingrese el usuario, en mismo evento mostramos y eliminamos las cards para una mejor experiencia de usuario


formPelis.addEventListener("submit", (e) =>{
    e.preventDefault()

    const nombrePeli = document.getElementById("nombrePeli").value
    const categoria = document.getElementById("categoria").value
    const plataforma = document.getElementById("plataforma").value
    //creamos el objeto movie
    const movie = new Movie (nombrePeli,  categoria, plataforma)
    // agregamos los datos al array 
    movies.push(movie)
    // guardamos en el localSotage
    localStorage.setItem("movies", JSON.stringify(movies))

    // limpiar form
    formPelis.reset()


    // Mostramos las peliculas agregadas a la lista
    console.log(movies)

    mostrarLista(movies)


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
        onClick: function(){} // Callback after click
      }).showToast();
}) 


 
const mostrarLista = (movies) =>{
    mostrar.innerHTML = ""
    const datosStorage = JSON.parse(localStorage.getItem("movies")) ?? []   //operador nullish


    datosStorage.forEach((movie, indice) => {

        let {nombrePeli, categoria, plataforma} = movie //Desestructuración de código

        mostrar.innerHTML += `
        <div id="pelis${indice}" class="card" style="width: 18rem; margin: 1em">
        <div class="card-body">
        <h5 class="card-title text-dark" >${nombrePeli}</h5>
        <h6 class="card-text text-dark">Categoría: ${categoria}</h6>
        <h6 class="card-text text-dark">Ver en: ${plataforma}</h6>
        <a href="#" class="btn btn-secondary">Eliminar</a>
        </div>
        </div>
        
        `
        movies.length === 0 ?  listaVacia.classList.remove("empty") : listaVacia.classList.add("empty")

    })
       
    datosStorage.forEach((movie, indice)=>{

        // eliminamos la tarea de la lista
        const eliminar = document.getElementById(`pelis${indice}`).lastElementChild.lastElementChild
        eliminar.addEventListener("click", ()=> {

            document.getElementById(`pelis${indice}`).remove()
            //movies.splice(movies.indexOf(indice), 1)
            movies.splice(indice,1)
            localStorage.setItem("movies", JSON.stringify(movies))
            console.log(`${movie.nombrePeli} Fue eliminada de la lista`)

            console.log(movies)



            movies.length === 0 ?  listaVacia.classList.remove("empty") : listaVacia.classList.add("empty")


        })
    })


    
} 



botonVerPelis.addEventListener("click", () =>{
    mostrar.innerHTML = ""
    const datosStorage = JSON.parse(localStorage.getItem("movies")) ?? []   //operador nullish


    datosStorage.forEach((movie, indice) => {

        let {nombrePeli, categoria, plataforma} = movie //Desestructuración de código
        
        mostrar.innerHTML += `
        <div id="pelis${indice}" class="card" style="width: 18rem; margin: 1em  "> 
        <div class="card-body">
        <h5 class="card-title text-dark" >${nombrePeli}</h5>
        <h6 class="card-text text-dark">Categoría: ${categoria}</h6>
        <h6 class="card-text text-dark">Ver en: ${plataforma}</h6>
        <a href="#" class="btn btn-secondary">Eliminar</a>
        </div>
        </div>
        
        `
        movies.length === 0 ?  listaVacia.classList.remove("empty") : listaVacia.classList.add("empty")

    })

    datosStorage.forEach((movie, indice)=>{

        // eliminamos la tarea de la lista
        const eliminar = document.getElementById(`pelis${indice}`).lastElementChild.lastElementChild

        eliminar.addEventListener("click", ()=> {

            document.getElementById(`pelis${indice}`).remove()
            //movies.splice(movies.indexOf(indice), 1)
            movies.splice(indice,1)
            localStorage.setItem("movies", JSON.stringify(movies))
            console.log(`${movie.nombrePeli} Fue eliminada de la lista`)

            console.log(movies)



            movies.length === 0 ?  listaVacia.classList.remove("empty") : listaVacia.classList.add("empty")


        })
    })
})




function seleccionarCategoria(){
    const datosStorage = JSON.parse(localStorage.getItem("movies")) ?? []  

    datosStorage.forEach((movie, indice) =>{
        
        let filtrado = document.getElementById("filtrado")
        let categoriaElegida = filtrado.value
        let {nombrePeli, plataforma} = movie
        
        mostrarFiltrado.innerHTML = `
        <div id="pelis${indice}"  class="card" style="width: 18rem; margin: 1em  "> 
        <div class="card-body">
        <h5 class="card-title text-dark" >${nombrePeli}</h5>
        <h6 class="card-text text-dark">Categoría: ${categoriaElegida}</h6>
        <h6 class="card-text text-dark">Ver en: ${plataforma}</h6>
        <a href="#" class="btn btn-secondary">Eliminar</a>
        </div>
        </div>
        
        `
    })
    
}































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




