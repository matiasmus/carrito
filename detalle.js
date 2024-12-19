let productos = [
    {nombre: "Remera", precio: "19000", img: "imagenes/remera gym.jpg", id: "1", stock: 6},
    {nombre: "Remera", precio: "19000", img: "imagenes/remera gym2.jpg", id: "2", stock: 6},
    {nombre: "Remera", precio: "19000", img: "imagenes/remera gym3.jpg", id: "3", stock: 6},
    {nombre: "Remera", precio: "19000", img: "imagenes/remera gym4.jpg", id: "4", stock: 6},
    {nombre: "Proteina Whey", precio: "24000", img: "imagenes/whey protein.png", id: "5", stock: 6},
    {nombre: "Creatina Monohidratada", precio: "27000", img: "imagenes/CREATINA.png", id: "6", stock: 6},
    {nombre: "Pre entreno v8", precio: "30000", img: "imagenes/v8.png", id: "7", stock: 6},
    {nombre: "Colageno", precio: "25000", img: "imagenes/Colageno.png", id: "8", stock: 6}
];

let productodetalle = JSON.parse(localStorage.getItem("detalleproducto"));

function cargarproducto() {
    if (!productodetalle || !productodetalle.img) {
        console.error("Error: Producto no encontrado o imagen no disponible.");
        return;
    }

    let enlaces = document.getElementById("boxproducto");
    let lista = document.createElement("div");

    lista.innerHTML = `
        <h3>${productodetalle.nombre}</h3>
        <img src="${productodetalle.img}" alt="${productodetalle.nombre}" width="250">
        <p>$ ${productodetalle.precio}</p>
        <p>Stock disponible: <span id="stock-disponible">${productodetalle.stock}</span> unidades</p>
        <div class="botonescontador">
            <button onclick="sumar()">+</button>
            <p id="contarproducto">0</p>
            <button onclick="restar()">-</button>
        </div>
        <button onclick="cargarcarrito()" id="botoncargar">Agregar al carrito</button>
    `;

    enlaces.appendChild(lista);
}

cargarproducto();

let contador = 0;

function sumar() {
    if (contador < productodetalle.stock) {
        contador++;
        document.getElementById("contarproducto").innerHTML = contador;
    } else {
        alert("No hay suficiente stock disponible.");
    }
}

function restar() {
    if (contador > 0) {
        contador--;
        document.getElementById("contarproducto").innerHTML = contador;
    }
}

function cargarcarrito() {
    if (contador === 0) {
        alert("Ingrese la cantidad de productos deseados.");
    } else if (contador > productodetalle.stock) {
        alert("No hay suficiente stock disponible.");
    } else {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const cantidadproducto = parseInt(document.getElementById("contarproducto").innerHTML);
        const productonuevo = {
            id: productodetalle.id,
            nombre: productodetalle.nombre,
            cantidad: cantidadproducto,
            precio: productodetalle.precio,
            img: productodetalle.img
        };

        carrito.push(productonuevo);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        window.location.href = "carrito.html";
    }
}

