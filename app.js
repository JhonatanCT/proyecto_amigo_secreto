// Variables globales
let amigos = []
let amigosSeleccionados = []
let modoJuego = "individual"

// Función para cambiar el modo de juego
function cambiarModo(modo) {
    modoJuego = modo

    // Actualizar botones de modo
    document.getElementById("modo-individual").classList.toggle("active", modo === "individual")

    // Mostrar/ocultar el contenedor de resultado según el modo
    document.querySelector(".result-container").classList.toggle("hidden", modo === "multijugador")

    // Limpiar resultados anteriores
    document.getElementById("resultado").innerHTML = ""

    // Actualizar la lista para reflejar el nuevo modo
    actualizarLista()
}

// Crear una función para agregar amigos
function agregarAmigo() {
    const amigo = document.getElementById("amigo").value.trim()

    // Validar entrada
    if (amigo === "") {
        alert("Por favor, inserte un nombre")
        return
    }

    // Validar que no exista un nombre duplicado
    if (amigos.includes(amigo)) {
        alert("Este nombre ya está en la lista")
        return
    }

    // Añadir amigo a lista de amigos
    amigos.push(amigo)

    // Limpiar el campo de texto
    document.getElementById("amigo").value = ""

    // Enfocar el campo para seguir añadiendo
    document.getElementById("amigo").focus()

    // Actualizar la lista
    actualizarLista()
}

// Función para eliminar un amigo específico
function eliminarAmigo(index) {
    // Verificar si el amigo ya ha sido sorteado en modo multijugador


    // Eliminar el amigo de la lista
    amigos.splice(index, 1)

    // Actualizar la lista
    actualizarLista()
}

// Función para vaciar la lista completa
function vaciarLista() {


    // Vaciar las listas
    amigos = []
    amigosSeleccionados = []

    // Limpiar el resultado
    document.getElementById("resultado").innerHTML = ""

    // Actualizar la lista
    actualizarLista()
}

// Crear una función para mostrar la lista de amigos
function actualizarLista() {
    const lista = document.getElementById("listaAmigos")
    lista.innerHTML = ""

    if (amigos.length === 0) {
        lista.innerHTML = '<li class="empty-list">No hay amigos en la lista</li>'
        return
    }

    amigos.forEach((amigo, index) => {
        const li = document.createElement("li")

        // Ya no aplicamos la clase sorteado para mantener el mismo estilo
        // Eliminamos la siguiente línea:
        // if (modoJuego === 'multijugador' && amigosSeleccionados.includes(amigo)) {
        //     li.classList.add('sorteado');
        // }

        // Crear contenido del elemento de lista
        li.innerHTML = `
            ${amigo}
            <button class="delete-button" onclick="eliminarAmigo(${index})" aria-label="Eliminar ${amigo}">×</button>
        `

        // Añadir con animación
        setTimeout(() => {
            lista.appendChild(li)
        }, index * 50)
    })
}

// Crear una función para sortear un amigo
function sortearAmigo() {
    // Validar que haya amigos disponibles
    if (amigos.length === 0) {
        alert("Debes ingresar el nombre de tus amigos primero...")
        return
    }



    // Filtrar amigos disponibles (en modo multijugador, excluir los ya seleccionados)
    let amigosDisponibles = [...amigos]
    if (modoJuego === "multijugador") {
        amigosDisponibles = amigos.filter((amigo) => !amigosSeleccionados.includes(amigo))
    }

    // Generar índice aleatorio entre los disponibles
    const indiceAmigo = Math.floor(Math.random() * amigosDisponibles.length)

    // Obtener el nombre sorteado
    const amigoSecreto = amigosDisponibles[indiceAmigo]

    // En modo multijugador, añadir a la lista de seleccionados
    if (modoJuego === "multijugador") {
        amigosSeleccionados.push(amigoSecreto)
        actualizarLista() // Actualizar para marcar el amigo como sorteado

        // Mostrar en modal
        document.getElementById("modal-amigo-secreto").textContent = amigoSecreto
        mostrarModal("modal-resultado")
    } else {
        // En modo individual, mostrar directamente en la página
        const resultado = document.getElementById("resultado")
        resultado.textContent = ""

        // Efecto de "sorteo" con timeout
        let contador = 0
        const nombres = [...amigos]
        const intervalo = setInterval(() => {
            resultado.textContent = nombres[Math.floor(Math.random() * nombres.length)]
            contador++

            if (contador > 10) {
                clearInterval(intervalo)
                resultado.textContent = amigoSecreto

                // Añadir animación al resultado final
                resultado.style.transform = "scale(1.1)"
                setTimeout(() => {
                    resultado.style.transform = "scale(1)"
                }, 300)
            }
        }, 100)
    }
}

// Funciones para manejar modales
function mostrarModal(modalId) {
    document.getElementById(modalId).style.display = "block"
}

function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = "none"
}

// Cerrar modales al hacer clic fuera de ellos
window.onclick = (event) => {
    const modales = document.getElementsByClassName("modal")
    for (let i = 0; i < modales.length; i++) {
        if (event.target === modales[i]) {
            modales[i].style.display = "none"
        }
    }
}

// Manejar la tecla Enter para agregar amigos
document.getElementById("amigo").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        agregarAmigo()
    }
})

// Inicializar la lista al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    actualizarLista()
})



