//JSON fetch:
let productosEnCarrito = localStorage.getItem("productos-agregados");
productosEnCarrito = JSON.parse(productosEnCarrito);

//DOM fetch:
let carritoSinNada = document.querySelector("#carritosin-nada");
let carritoProductos = document.querySelector("#carrito-productos");
let carritoAcciones = document.querySelector("#carrito-acciones");
let carritoCompletado = document.querySelector("#carrito-completado");
let carritoEliminarProducto = document.querySelectorAll(".carrito-eliminar-producto");
let btnVaciarCarrito = document.querySelector("#carrito-acciones-vaciar");
let btnTotal = document.querySelector("#carrito-acciones-total");
let btnComprar = document.querySelector("#carrito-acciones-comprar");

//Functions:
function agregarProducto() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        carritoSinNada.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoCompletado.classList.add("disabled");

        carritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {

            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-img" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-nombre-producto">
                    <small>Nombre:</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-cantidad-producto">
                    <small>cantidad:</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>precio:</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-subtotal-producto">
                    <small>subtotal:</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-eliminar-producto" id="${producto.id}"><i class="bi bi-trash3"></i></button> 
            `;
            carritoProductos.append(div);
        });
    } else {
        carritoSinNada.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoCompletado.classList.add("disabled");
    }
    botonesDeEliminar();
    total();
}
agregarProducto();

function botonesDeEliminar() {
    carritoEliminarProducto = document.querySelectorAll(".carrito-eliminar-producto");
    carritoEliminarProducto.forEach(boton => {
        boton.addEventListener("click", eliminarProducto);
    });
}

function eliminarProducto(e) {
    Toastify({
        text: "-1",
        duration: 2000,
        close: false,
        gravity: "bottom", 
        position: "right", 
        stopOnFocus: false, 
        style: {
          background: "linear-gradient(to right, #181818, gold)",
          borderRadius: "1rem",
        },
        onClick: function(){} 
      }).showToast();
    let idBoton = e.currentTarget.id;
    const productoEliminado = productosEnCarrito.find(producto => producto.id === idBoton);
    const INDEX = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(INDEX,1);
    agregarProducto();
    localStorage.setItem("productos-agregados", JSON.stringify(productosEnCarrito));
}

btnVaciarCarrito.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    Swal.fire({
        title: '<strong>¿Estas Seguro?</strong>',
        icon: 'question',
        html:
          'Se eliminaran TODOS tus productos',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
    }) .then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-agregados", JSON.stringify(productosEnCarrito));
            agregarProducto();
        }
      })
}

function total() {
    const calcularTotal = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad),0);
    btnTotal.innerText = `$${calcularTotal}`;
}

btnComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-agregados", JSON.stringify(productosEnCarrito));
    carritoSinNada.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoCompletado.classList.remove("disabled");
}
