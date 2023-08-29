//ListaDeproductos fetch:
let listaDeProductos = [];
fetch("./js/fetch.json")
    .then(response => response.json())
    .then(data => {
        listaDeProductos = data;
        agregarProducto(listaDeProductos);
    })

// DOM fetch:
const mainContent = document.querySelector("#main-content");
let btnAgregar = document.querySelectorAll(".agregar");
const CONTADOR = document.querySelector("#contador");

//Functions:
function agregarProducto() {
    listaDeProductos.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = ` 
        <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="nombre">${producto.titulo}</h3>          
            <p class="precio">$${producto.precio}</p>
            <button class="agregar" id= "${producto.id}">Agregar</button>
        </div>
            `
        mainContent.append(div);
    });
    botonesAgregar();
    console.log(btnAgregar);
}
// agregarProducto(); //no hace falta llamarla aca x que se la llama al finalizar el fetch

function botonesAgregar() {
    btnAgregar = document.querySelectorAll(".agregar");
    btnAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-agregados");
if(productosEnCarritoLS) { 
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    contador();
} else {
    productosEnCarrito = [];
}
function agregarAlCarrito(e) {
    Toastify({
        text: "+1",
        duration: 2000,
        close: false,
        gravity: "bottom", 
        position: "left", 
        stopOnFocus: false, 
        style: {
          background: "linear-gradient(to right, #181818, gold)",
          borderRadius: "1rem",
        },
        onClick: function(){} 
      }).showToast();
    const idBoton = e.currentTarget.id;
    const productosAgregados = listaDeProductos.find(producto => producto.id === idBoton);  //listaDeProductos == productos (version de carpi)

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++; 
    } else {
        productosAgregados.cantidad = 1;
        productosEnCarrito.push(productosAgregados);
    }
    contador();

    localStorage.setItem("productos-agregados", JSON.stringify(productosEnCarrito));
};

function contador() {
    let contador = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    CONTADOR.innerHTML = contador;
}