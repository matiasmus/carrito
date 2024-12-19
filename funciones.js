const menus = [
    {nombre: "Inicio", url: "index.html"},
    {nombre: "Contacto", url: "contacto.html"}
];

function cargarmenu() {
    let enlaces = document.getElementById("ulmenu");
    for (const menu of menus) {
        let lista = document.createElement("li");
        lista.innerHTML = `<a href="${menu.url}">${menu.nombre}</a>`;
        enlaces.appendChild(lista);
    }
}

cargarmenu();

const productos = [
    {nombre: "Remera", precio: "19000", img: "imagenes/remera gym.jpg", id: "1", stock: 6},
    {nombre: "Remera", precio: "19000", img: "imagenes/remera gym2.jpg", id: "2", stock: 6},
    {nombre: "Remera", precio: "19000", img: "imagenes/remera gym3.jpg", id: "3", stock: 6},
    {nombre: "Remera", precio: "19000", img: "imagenes/remera gym4.jpg", id: "4", stock: 6},
    {nombre: "Proteina Whey", precio: "24000", img: "imagenes/whey protein.png", id: "5", stock: 6},
    {nombre: "Creatina Monohidratada", precio: "27000", img: "imagenes/CREATINA.png", id: "6", stock: 6},
    {nombre: "Pre entreno v8", precio: "30000", img: "imagenes/v8.png", id: "7", stock: 6},
    {nombre: "Colageno", precio: "25000", img: "imagenes/Colageno.png", id: "8", stock: 6}
];

function cargarproductos() {
    let ventas = document.getElementById("boxproducto");
    for (const producto of productos) {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `
            <div class="boxproducto">
                <h3>${producto.nombre}</h3>
                <img src="${producto.img}" alt="" width="100"> 
                <p>$${producto.precio}</p>
                <p>Stock disponible: ${producto.stock} unidades</p>
                <button onclick="verdetalle('${producto.id}')">Detalle</button>
            </div>`;
        ventas.appendChild(contenedor);
    }
}

cargarproductos();

function verdetalle(idproducto) {
    const buscarproducto = productos.find(producto => producto.id === idproducto);
    const enJSON = JSON.stringify(buscarproducto);
    localStorage.setItem("detalleproducto", enJSON);
    window.location.href = "detalle.html";
}

// Función para actualizar el carrito
function actualizarCarrito() {
    let cantidadTotal = parseInt(localStorage.getItem("cantidadCarrito"), 10) || 0;
    
    // Actualizar el contador en el ícono del carrito
    const cantidadCarritoElement = document.getElementById("cantidad-carrito");
    if (cantidadCarritoElement) {
        cantidadCarritoElement.textContent = cantidadTotal;
    }
}

window.addEventListener('DOMContentLoaded', function() {
    actualizarCarrito();
});
