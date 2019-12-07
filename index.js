var local = {
    vendedoras: ['Ada', 'Grace', 'Hedy', 'Sheryl'],

    ventas: [
        // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
        {
            id: 1,
            fecha: new Date(2019, 1, 4),
            nombreVendedora: 'Grace',
            sucursal: 'Centro',
            componentes: ['Monitor GPRS 3000', 'Motherboard ASUS 1500']
        },
        {
            id: 2,
            fecha: new Date(2019, 0, 1),
            nombreVendedora: 'Ada',
            sucursal: 'Centro',
            componentes: ['Monitor GPRS 3000', 'Motherboard ASUS 1500']
        },
        {
            id: 3,
            fecha: new Date(2019, 0, 2),
            nombreVendedora: 'Grace',
            sucursal: 'Caballito',
            componentes: ['Monitor ASC 543', 'Motherboard MZI']
        },
        {
            id: 4,
            fecha: new Date(2019, 0, 10),
            nombreVendedora: 'Ada',
            sucursal: 'Centro',
            componentes: ['Monitor ASC 543', 'Motherboard ASUS 1200']
        },
        {
            id: 5,
            fecha: new Date(2019, 0, 12),
            nombreVendedora: 'Grace',
            sucursal: 'Caballito',
            componentes: ['Monitor GPRS 3000', 'Motherboard ASUS 1200']
        }
    ],

    precios: [
        { componente: 'Monitor GPRS 3000', precio: 200 },
        { componente: 'Motherboard ASUS 1500', precio: 120 },
        { componente: 'Monitor ASC 543', precio: 250 },
        { componente: 'Motherboard ASUS 1200', precio: 100 },
        { componente: 'Motherboard MZI', precio: 30 },
        { componente: 'HDD Toyiva', precio: 90 },
        { componente: 'HDD Wezter Dishital', precio: 75 },
        { componente: 'RAM Quinston', precio: 110 },
        { componente: 'RAM Quinston Fury', precio: 230 }
    ],

    sucursales: ['Centro', 'Caballito']
};
let id = 0;

function crearVentaHTML(venta) {
    const ventaHTML = `
 <li class="venta" id="card-${++id}">
     <div class="fecha">${venta.fecha.getDate()}/${venta.fecha.getMonth() + 1}/${venta.fecha.getFullYear()}</div>
     <div class="sucursal">${venta.sucursal}</div>
     <div class="vendedora">${venta.nombreVendedora}</div>
     <div class="componentes">${venta.componentes}</div>
     <div>${precioMaquina(venta.componentes)}</div>
     <i class="fas fa-trash" onclick="abrirModalEliminar(${id})"></i>
 </li>
`;
    return ventaHTML;
}

//
//Función para buscar el precio de cada pieza
const obtenerPrecioComponente = nombreComponente => {
    let precio = 0;

    local.precios.forEach(function(comp) {
        if (comp.componente === nombreComponente) {
            precio = comp.precio;
        }
    });

    return precio;
};

//
// Primer función
const precioMaquina = componentes => {
    //funcion que suma los precios de las piezas
    let total = 0;
    componentes.forEach(function(partes) {
        total += obtenerPrecioComponente(partes);
    });

    return total;
};
const ventasHTML = local.ventas.map(crearVentaHTML);
const ul = document.getElementById('ventas');
ul.innerHTML = ventasHTML.join('');

//
//
// Segunda función
const cantidadVentasComponente = componente => {
    let total = 0;
    local.ventas.forEach(function(venta) {
        venta.componentes.forEach(function(componenteVenta) {
            if (componenteVenta === componente) {
                total++;
            }
        });
    });
    return total;
};

//
// Tercer función
const vendedoraDelMes = (mes, anio) => {
    let maxImporte = -1;
    let maxNombreVendedora = '';
    // Recorro el listado con los nombres de las vendedoras
    for (let i = 0; i < local.vendedoras.length; i++) {
        const vendedora = local.vendedoras[i];
        let totalVendido = 0;
        // Veo cuánto vendió cada una (no es por cantidad de componentes vendidos, si no cantidad de plata)
        // Filtro las ventas por cada una de las vendedoras
        const ventasFiltradas = local.ventas.filter(venta => {
            return venta.nombreVendedora === vendedora && venta.fecha.getFullYear() === anio && venta.fecha.getMonth() + 1 === mes;
        });
        // Ahora que tengo la venta de cada vendedora voy a averiguar el precio con la función precioMaquina
        for (let j = 0; j < ventasFiltradas.length; j++) {
            const venta = ventasFiltradas[j];
            const importe = precioMaquina(venta.componentes);
            totalVendido += importe;
        }
        // En este caso totalVendido va a contener el precio de todo lo vendido por X vendedora

        if (totalVendido > maxImporte) {
            maxImporte = totalVendido;
            maxNombreVendedora = vendedora;
        }
    }
};

//
// Cuarta función
const ventasMes = (mes, anio) => {
    let total = 0;
    local.ventas.forEach(venta => {
        // Este if se va a fijar que la venta sea del mismo mes y año que llega por parámetro
        if (venta.fecha.getFullYear() === anio && venta.fecha.getMonth() + 1 === mes) {
            total += precioMaquina(venta.componentes);
        }
    });
    return total;
};

//
// Quinta función
const ventasVendedora = nombre => {
    let total = 0;
    local.ventas.forEach(venta => {
        if (venta.nombreVendedora === nombre) {
            total += precioMaquina(venta.componentes);
        }
    });

    return total;
};

//
// Sexta función
const componenteMasVendido = () => {
    let maxVendido = 0;
    let maxNombreComponente = '';

    local.precios.forEach(componentes => {
        const cadaComponente = cantidadVentasComponente(componentes.componente);
        if (cadaComponente > maxVendido) {
            maxVendido = cadaComponente;
            maxNombreComponente = componentes.componente;
        }
    });
};
componenteMasVendido();

//
// Septima función
const huboVentas = (mes, anio) => {
    let ventasFecha;
    local.ventas.forEach(venta => {
        // Este if se va a fijar que la venta sea del mismo mes y año que llega por parámetro
        if (venta.fecha.getFullYear() === anio && venta.fecha.getMonth() + 1 === mes) {
            ventasFecha = true;
        } else {
            ventasFecha = false;
        }
    });
    return ventasFecha;
};

//
// Octava función
const ventasSucursal = sucursal => {
    let totalVentasSucursal = 0;
    local.ventas.forEach(venta => {
        if (venta.sucursal === sucursal) {
            totalVentasSucursal += precioMaquina(venta.componentes);
        }
    });
    return totalVentasSucursal;
};
//
// Venta Sucursal HTML
const ventaSucursalHTML = sucursal => {
    document.getElementById('venta-sucursal-ul').innerHTML = '';
    local.sucursales.forEach(sucursal => {
        const sucursalHTML = `
        <li class="sucursal-item">
        <div class="sucursal-li">${sucursal}</div>
        <div class="ventasSucursal">${ventasSucursal(sucursal)}</div>
        </li>
     `;
        const ul = document.getElementById('venta-sucursal-ul');
        ul.innerHTML += sucursalHTML;
    });
};
ventaSucursalHTML();

//
// Novena función
const sucursalDelMes = (mes, anio) => {
    let maxImporte = 0;
    let maxNombreSucursal = '';
    local.ventas.forEach(venta => {
        const sucursal = venta.sucursal;
        let totalVendido = 0;
        const ventasFiltradas = local.ventas.filter(venta => {
            return venta.sucursal === sucursal && venta.fecha.getFullYear() === anio && venta.fecha.getMonth() + 1 === mes;
        });
        ventasFiltradas.forEach(ventaF => {
            const venta = ventaF;
            const importe = precioMaquina(venta.componentes);
            totalVendido += importe;
        });
        if (totalVendido > maxImporte) {
            maxImporte = totalVendido;
            maxNombreSucursal = sucursal;
        }
    });
    return maxNombreSucursal;
};
//
//
//
// Funciones para que el modal funcione
const abrirModalNuevaVenta = () => {
    // document.querySelector('#modal-nueva-venta').style.display = 'block'; (para pisar estilos)
    document.querySelector('#modal-new-sale').classList.add('active');
};
document.querySelector('.btn-agregar-venta').onclick = abrirModalNuevaVenta;

//
const cerrarModal = () => {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
};
// Puedo agregar más funciones a un botón escribiendo lo mismo y cambiando el nombre de la función después del 'click'
// document.querySelector('.btn-modal-agregar').addEventListener('click', agregarVenta);

const agregarVenta = () => {
    let vendedoraValue = document.querySelector('#vendedora').value;
    let sucursalValue = document.querySelector('#sucursal').value;
    let componentesValue = Array.from(document.querySelector('#componentes').selectedOptions).map(option => option.value);
    let fecha = new Date();
    let precioTotal = precioMaquina(componentesValue);

    let nuevaVenta = {
        id: ++id,
        fecha: fecha,
        nombreVendedora: vendedoraValue,
        sucursal: sucursalValue,
        componentes: componentesValue
    };
    local.ventas.push(nuevaVenta);

    const ventaModalHTML = `
    <li class="venta"  id="card-${nuevaVenta.id}">
        <div class="fecha">${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}</div>
        <div class="sucursal">${sucursalValue}</div>
        <div class="vendedora">${vendedoraValue}</div>
        <div class="componentes">${componentesValue}</div>
        <div>${precioTotal}</div>
        <i class="fas fa-trash" onclick="abrirModalEliminar(${nuevaVenta.id})" ></i>
    </li>
   `;
    const ul = document.getElementById('ventas');
    ul.innerHTML += ventaModalHTML;
    cerrarModal();

    // Borrar datos ingresados
    document.getElementById('vendedora').value = '';
    document.getElementById('sucursal').value = '';
    document.getElementById('componentes').value = '';
    ventaSucursalHTML();
    productoEstrella();
    vendedoraMasIngresos();
};
document.querySelector('.btn-agregar-modal').onclick = agregarVenta;

let ventaAEliminar;

// Modal Eliminar
const abrirModalEliminar = id => {
    document.querySelector('#modal-eliminar').classList.add('active');
    ventaAEliminar = id;
};

//Selecciono todos los botones que tienen esa clase, los recorro y a todos les pongo
document.querySelectorAll('.btn-cerrar-modal').forEach(btn => {
    btn.onclick = cerrarModal;
});
document.querySelectorAll('.btn-x-modal').forEach(btn => {
    btn.onclick = cerrarModal;
});

const eliminarCard = id => {
    local.ventas.forEach((venta, i) => {
        if (ventaAEliminar === venta.id) {
            local.ventas.splice(i, 1);
            document.getElementById(`card-${ventaAEliminar}`).remove();
        }
    });
    cerrarModal();
    ventaSucursalHTML();
    productoEstrella();
    vendedoraMasIngresos();
};

//
// Funciones del footer: producto estrella y vendedora que más ingresos generó
const productoEstrella = () => {
    document.getElementById('producto-estrella').innerHTML = '';

    let maxComponente = 0;
    let maxNombreComponente = '';

    local.precios.forEach(componentes => {
        const cadaComponente = cantidadVentasComponente(componentes.componente);
        if (cadaComponente > maxComponente) {
            maxComponente = cadaComponente;
            maxNombreComponente = componentes.componente;
        }
    });
    document.querySelector('.producto-estrella').innerHTML += 'Producto estrella: <strong>' + maxNombreComponente + '</strong>';
};
productoEstrella();

const vendedoraMasIngresos = () => {
    document.getElementById('vendedora-mayor').innerHTML = '';

    let maxVendedora = 0;
    let maxNombreVendedora = '';

    local.vendedoras.forEach(vendedora => {
        const nombreVendedora = vendedora;
        let totalVendidoVendedora = ventasVendedora(nombreVendedora);

        if (totalVendidoVendedora > maxVendedora) {
            maxVendedora = totalVendidoVendedora;
            maxNombreVendedora = nombreVendedora;
        }
    });
    document.querySelector('.vendedora-mayor').innerHTML = 'Vendedora que más ingresos generó: <strong>' + maxNombreVendedora + '</strong>';
};
vendedoraMasIngresos();
