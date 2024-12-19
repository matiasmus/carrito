const menus = [{nombre:"Inicio", url:"index.html"},
    {nombre:"Contacto", url:"contacto.html"},
    ]
    
    function cargarmenu(){
        let enlaces = document.getElementById("ulmenu")
        for (const menu of menus) {
            let lista = document.createElement("li")
            lista.innerHTML=`<a href="${menu.url}">${menu.nombre}</a>`
            enlaces.appendChild(lista);
            
        }
    }
    
    cargarmenu();

    let productocarritos = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para cargar el carrito en la página
    function cargarCarrito() {
        let enlaces = document.getElementById("tablacarrito");
        enlaces.innerHTML = ""; // Limpiar tabla antes de cargar productos
    
        if (productocarritos.length > 0) {
            // Agrupar productos repetidos y sumar sus cantidades
            let productosAgrupados = {};
    
            productocarritos.forEach(producto => {
                producto.cantidad = parseInt(producto.cantidad, 10); // Asegurarse de que sea un número
                if (productosAgrupados[producto.id]) {
                    productosAgrupados[producto.id].cantidad += producto.cantidad;
                } else {
                    productosAgrupados[producto.id] = {...producto}; // Copiar el producto
                }
            });
    
            // Mostrar los productos agrupados en la tabla
            for (const id in productosAgrupados) {
                let producto = productosAgrupados[id];
                let lista = document.createElement("tr");
                lista.id = producto.id;
                lista.innerHTML = `
                    <td><img src="${producto.img}" alt="" width="50"></td>
                    <td>${producto.cantidad}</td>
                    <td>${producto.nombre}</td> 
                    <td>$ ${producto.precio}</td>
                    <td>$ ${(producto.cantidad * producto.precio).toFixed(2)}</td> <!-- Total -->
                    <td><button id="btneliminar" onclick="eliminarProducto('${producto.id}')">Eliminar</button></td>
                `;
                enlaces.appendChild(lista);
            }
    
            // Calcular el total y la cantidad total de productos
            let total = 0;
            let cantidadTotal = 0;
    
            for (const id in productosAgrupados) {
                let producto = productosAgrupados[id];
                total += producto.cantidad * producto.precio;
                cantidadTotal += producto.cantidad;
            }
            localStorage.setItem("cantidadCarrito", cantidadTotal);
            
            let totalFila = document.createElement("tr");
            totalFila.innerHTML = `
                <td colspan="5" style="text-align: right;">Total Final: $${total.toFixed(2)}</td>
                <td><button onclick="finalizarCompra()"Finalizar compra">Finalizar Compra</td>
            `;
            enlaces.appendChild(totalFila);
            actualizarCarrito(cantidadTotal);
            localStorage.setItem("cantidadCarrito", totalProductos);
            actualizarCarrito(totalProductos);

        } else {
            let mensaje = document.createElement("tr");
            mensaje.innerHTML = "<td colspan='6'>No hay productos en el carrito</td>";
            enlaces.appendChild(mensaje);
    
            // Restablecer el contador del carrito
            actualizarCarrito(0);
        }
    }
    
    cargarCarrito();
    
    function actualizarCarrito(totalProductos) {
    totalProductos = parseInt(totalProductos, 10); // Convertir a número entero

    // Actualizar el contador en el ícono del carrito
    const cantidadCarritoElement = document.getElementById("cantidad-carrito");
    if (cantidadCarritoElement) {
        cantidadCarritoElement.textContent = totalProductos;
    }
}

    function eliminarProducto(id) {
    productocarritos = productocarritos.filter(producto => producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(productocarritos));
    cargarCarrito();
    }
    
    
    function finalizarCompra() {
        alert("Procediendo con la compra.");
    }
    
    
    function actualizarCarrito(totalProductos) {
        totalProductos = parseInt(totalProductos, 10);
    
        
        const cantidadCarritoElement = document.getElementById("cantidad-carrito");
        if (cantidadCarritoElement) {
            cantidadCarritoElement.textContent = totalProductos;
        }
    }

    function actualizarCarrito() {
        // Recuperar la cantidad desde localStorage
        let cantidadTotal = parseInt(localStorage.getItem("cantidadCarrito"), 10) || 0;
    
        // Actualizar el contador en el ícono del carrito
        const cantidadCarritoElement = document.getElementById("cantidad-carrito");
        if (cantidadCarritoElement) {
            cantidadCarritoElement.textContent = cantidadTotal;
        }
    }
    