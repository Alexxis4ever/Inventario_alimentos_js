let inventario = [];

// Cargar el inventario desde el almacenamiento local al cargar la página
window.onload = function () {
    let storedInventario = localStorage.getItem("inventario");
    if (storedInventario) {
        inventario = JSON.parse(storedInventario);
        actualizarTabla();
    }
};

function guardarInventarioEnLocal() {
    localStorage.setItem("inventario", JSON.stringify(inventario));
}

function actualizarTabla() {
    let tabla = document.getElementById("tablaInventario").getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';

    inventario.forEach(producto => {
        tabla.innerHTML += `
            <tr>
                <td>${producto.Nombre}</td>
                <td>${producto.Categoría}</td>
                <td>${producto.Precio}</td>
                <td>${producto.Cantidad}</td>
                <td>${producto.Marca}</td>
            </tr>`;
    });
}

function agregarProducto() {
    let nombre = prompt("Ingrese el nombre del producto:");
    let categoria = prompt("Ingrese la categoría del producto:");
    let precio = parseFloat(prompt("Ingrese el precio del producto:"));
    let cantidad = parseInt(prompt("Ingrese la cantidad del producto:"));
    let marca = prompt("Ingrese la marca del producto:");

    let producto = {
        Nombre: nombre,
        Categoría: categoria,
        Precio: precio,
        Cantidad: cantidad,
        Marca: marca
    };

    inventario.push(producto);
    guardarInventarioEnLocal();
    actualizarTabla();
    actualizarOutput("Producto agregado al inventario.");
}

function eliminarProducto() {
    if (inventario.length === 0) {
        actualizarOutput("El inventario está vacío.");
        return;
    }

    let listaProductos = generarListaProductos();
    let indice = parseInt(prompt(`Seleccione el índice del producto a eliminar:\n${listaProductos}`)) - 1;

    if (0 <= indice && indice < inventario.length) {
        inventario.splice(indice, 1);
        guardarInventarioEnLocal();
        actualizarTabla();
        actualizarOutput("Producto eliminado del inventario.");
    } else {
        actualizarOutput("Índice inválido.");
    }
}

function modificarProducto() {
    if (inventario.length === 0) {
        actualizarOutput("El inventario está vacío.");
        return;
    }

    let listaProductos = generarListaProductos();
    let indice = parseInt(prompt(`Seleccione el índice del producto a modificar:\n${listaProductos}`)) - 1;

    if (0 <= indice && indice < inventario.length) {
        let nombre = prompt("Ingrese el nuevo nombre del producto:");
        let categoria = prompt("Ingrese la nueva categoría del producto:");
        let precio = parseFloat(prompt("Ingrese el nuevo precio del producto:"));
        let cantidad = parseInt(prompt("Ingrese la nueva cantidad del producto:"));
        let marca = prompt("Ingrese la nueva marca del producto:");

        inventario[indice] = {
            Nombre: nombre,
            Categoría: categoria,
            Precio: precio,
            Cantidad: cantidad,
            Marca: marca
        };

        guardarInventarioEnLocal();
        actualizarTabla();
        actualizarOutput("Producto modificado en el inventario.");
    } else {
        actualizarOutput("Índice inválido.");
    }
}

function buscarPorNombre() {
    let nombreBuscar = prompt("Ingrese el nombre del producto a buscar:");
    let productosEncontrados = inventario.filter(producto => producto.Nombre.toLowerCase().includes(nombreBuscar.toLowerCase()));

    if (productosEncontrados.length > 0) {
        let resultado = "Productos encontrados:\n";
        productosEncontrados.forEach(producto => {
            resultado += `${producto.Nombre} - ${producto.Categoría} - $${producto.Precio} - Cantidad: ${producto.Cantidad} - Marca: ${producto.Marca}\n`;
        });
        actualizarOutput(resultado);
    } else {
        actualizarOutput("No se encontraron productos con ese nombre.");
    }
}

function filtrarPorRangoPrecio() {
    let rangoInferior = parseFloat(prompt("Ingrese el rango inferior de precios:"));
    let rangoSuperior = parseFloat(prompt("Ingrese el rango superior de precios:"));

    let productosEnRango = inventario.filter(producto => producto.Precio >= rangoInferior && producto.Precio <= rangoSuperior);

    if (productosEnRango.length > 0) {
        let resultado = "Productos en el rango de precio:\n";
        productosEnRango.forEach(producto => {
            resultado += `${producto.Nombre} - ${producto.Categoría} - $${producto.Precio} - Cantidad: ${producto.Cantidad} - Marca: ${producto.Marca}\n`;
        });
        actualizarOutput(resultado);
    } else {
        actualizarOutput("No hay productos en el rango de precio especificado.");
    }
}

function crearReporteInventario() {
    let fechaActual = new Date().toLocaleDateString();
    let resultado = `Reporte de Inventario - ${fechaActual}:\n`;

    inventario.forEach(producto => {
        resultado += `${producto.Nombre} - ${producto.Categoría} - $${producto.Precio} - Cantidad: ${producto.Cantidad} - Marca: ${producto.Marca}\n`;
    });

    actualizarOutput(resultado);
}

function generarListaProductos() {
    let lista = "Lista de productos:\n";
    inventario.forEach((producto, index) => {
        lista += `${index + 1}. ${producto.Nombre}\n`;
    });
    return lista;
}

function actualizarOutput(mensaje) {
    document.getElementById("output").innerText = mensaje;
}