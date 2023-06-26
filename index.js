const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const axios = require('axios');

const port = 8081;

hbs.registerHelper('if', function (conditional, options) {
    if (conditional) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

hbs.registerHelper('jsonStringify', function (context) {
    return JSON.stringify(context);
});

hbs.registerHelper('toLocaleDate', function (context) {
    const fecha = new Date(context);
    return fecha.toLocaleDateString();
});

// Definición carpeta documentos estáticos
app.use(express.static('public'));

// Configuración motor de plantillas
app.set('views', path.join(__dirname + '/public/views'));

app.use(express.json());

app.set('view engine', 'hbs');

// Definición ruta de documentos parciales
hbs.registerPartials(__dirname + '/public/views/partials');

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('listening on port ' + port);
});

// Página de login

app.get('/', (req, res) => {

    res.render('login', {
        titulo: 'CosmeTIC',
        user_name: 'Julian Carreño',
        consecutivo: 'Login'
    });
})

// Página de login

app.get('/dashboard', (req, res) => {

    res.render('dashboard', {
        titulo: 'CosmeTIC',
        user_name: 'Julian Carreño',
        consecutivo: 'Login',
        subtitulo: 'Dashboard'
    });
})

// Página de inicio

app.get('/home', (req, res) => {

    res.render('home', {
        titulo: 'CosmeTIC',
        user_name: 'Julian Carreño',
        consecutivo: 'Home'
    });
})

app.get('/recuperar', (req, res) => {

    res.render('recuperar', {
        titulo: 'CosmeTIC',
        user_name: 'Julian Carreño',
        consecutivo: 'Recuperar'
    });
})

app.get('/registarUsuario', (req, res) => {

    res.render('registarUsuario', {
        titulo: 'CosmeTIC',
        user_name: 'Julian Carreño',
        consecutivo: 'Registrar'
    });
})


app.get('/cambiarClave', (req, res) => {

    res.render('cambiarClave', {
        titulo: 'CosmeTIC',
        user_name: 'Julian Carreño',
        consecutivo: 'Registrar'
    });
})



// Página de Registro de empleado

app.get('/registroEmpleados', (req, res) => {

    res.render('Empleados/registroEmpleados', {
        titulo: 'CosmeTIC',
        user_name: 'Julian Carreño',
        consecutivo: 'registroEmpleados',
        subtitulo: 'Registro de Empleados'
    });
})

// Página de Registro de producto
app.get('/registroProductos', (req, res) => {

    res.render('Productos/registroProductos', {
        titulo: 'CosmeTIC',
        user_name: 'Julian Carreño',
        consecutivo: 'registroProductos',
        subtitulo: 'Registro de Productos'
    });
})

// Página de Editar de producto
app.get('/editarProductos', (req, res) => {
    
    res.render('Productos/editarProductos', { 
        titulo : 'CosmeTIC',
        user_name : 'Julian Carreño', 
        consecutivo: 'editarProductos',
        subtitulo:'Editar Productos'
    });
})


// Página de Empleados

app.get('/empleados', (req, res) => {

    const empleados = [
    ];
    res.render('Empleados/empleados', { 
        titulo : 'CosmeTIC',
        user_name : 'Julian Carreño', 
        consecutivo: 'Empleados',
        lista_empleados: empleados
    });
})

// Página de Editar de empleado

app.get('/editarEmpleados', (req, res) => {
    
    res.render('Empleados/editarEmpleados', { 
        titulo : 'CosmeTIC',
        user_name : 'Julian Carreño', 
        consecutivo: 'editarEmpleados',
        subtitulo:'Editar Empleados'
    });
})

// Página de Productos

app.get('/productos', (req, res) => {

    const productos = [
    ];
    res.render('Productos/productos', { 
        titulo : 'CosmeTIC',
        user_name : 'Julian Carreño', 
        consecutivo: 'Productos',
        lista_productos: productos
    });

    
})
app.get('/detalles', (req, res) => {

    const detalles = [
    ];
    res.render('Productos/detalles', { 
        titulo : 'CosmeTIC',
        user_name : 'Julian Carreño', 
        consecutivo: 'Detalles',
        lista_detalles: detalles
    });
})

//pagina registro Categoria
app.get('/registroCategorias', (req, res) => {

    res.render('Categorias/registroCategorias', {
        titulo: 'CosmeTIC',
        user_name: 'Marcela Morales',
        consecutivo: 'registroCategorias'
    });
})

app.get('/editarCategoria', (req, res) => {

    res.render('Categorias/editarCategoria', {
        titulo: 'CosmeTIC',
        user_name: 'Marcela Morales',
        consecutivo: 'editarCategorias'
    });
})


// pagina de categorias

app.get('/categorias', (req, res) => {

    const Categorias = [
        {
            id_proveedor: 1,
            nombre_categoria: 'Labiales',
            estado_categoria: 'Activo',
            observacion: 'esta laborando actualmente'
        }, {
            id_proveedor: 2,
            nombre_categoria: 'Bases',
            estado_categoria: 'Activo',
            observacion: 'esta laborando actualmente'
        }, {
            id_proveedor: 3,
            nombre_categoria: 'Cuidado Personal',
            estado_categoria: 'Activo',
            observacion: 'esta laborando actualmente'
        }];
    res.render('Categorias/categorias', {
        titulo: 'CosmeTIC | Categorias',
        user_name: 'Marcela Morales',
        consecutivo: 'Categorias',
        lista_categorias: Categorias
    });
})

// compras

app.get('/compras', (req, res) => {

    const compras = [
        {
            id_compra: 1,
            id_proveedor: 'Marcela Morales',
            numero_factura: 1229,
            fecha_compra: 02 - 05 - 2023,
            fecha_registro: 03 - 05 - 2023,
            total_compra: 102.000,
            estado_compra: 'Activo'
        }, {
            id_compra: 2,
            id_proveedor: 'Natalia Marulanda',
            numero_factura: 1230,
            fecha_compra: 02 - 03 - 2023,
            fecha_registro: 03 - 03 - 2023,
            total_compra: 234.000,
            estado_compra: 'Activo'
        }, {
            id_compra: 3,
            id_proveedor: 'Andres Jaramillo',
            numero_factura: 1231,
            fecha_compra: 05 - 04 - 2023,
            fecha_registro: 06 - 04 - 2023,
            total_compra: 420.000,
            estado_compra: 'Activo'
        }];
    res.render('Compras/compras', {
        titulo: 'CosmeTIC | Productos',
        user_name: 'Marcela Morales',
        consecutivo: 'Compras',
        lista_compras: compras
    });
})

// Página de Compra
app.get('/registrarCompra', (req, res) => {

    res.render('Compras/registrarCompra', {
        titulo: 'CosmeTIC',
        user_name: 'Julian Carreño',
        consecutivo: 'registrarCompra',
        subtitulo: 'Registro Compras'
    });
})

//Página de proveeedores
app.get('/proveedores', (req, res) => {

    const proveedores = [
    ];
    res.render('Proveedores/proveedores', { 
        titulo : 'CosmeTIC',
        user_name : 'Juan Sebastián', 
        consecutivo: 'Proveedores',
        lista_proveedores: proveedores
    });
})

app.get('/registroProveedores', (req, res) => {
    
    res.render('Proveedores/registroProveedores', { 
        titulo : 'CosmeTIC',
        user_name : 'Juan Sebastián', 
        consecutivo: 'registroProveedores',
        subtitulo:'Registro Proveedores '
    });
})

app.get('/editarProveedores', (req, res) => {
    res.render('Proveedores/editarProveedores', { 
        titulo : 'CosmeTIC',
        user_name : 'Juan Sebastián', 
        consecutivo: 'editarProveedores',
        subtitulo:'Editar Proveedores'
    });
})
//Página de pagos

app.get('/pagos', (req, res) => {

    const pagos = [
];
    res.render('Pagos/pagos', { 
        titulo : 'CosmeTIC',
        user_name : 'Juan Sebastián', 
        consecutivo: 'Pagos',
        lista_pagos: pagos
    });
})

app.get('/registroPagos', (req, res) => {
    
    res.render('Pagos/registroPagos', { 
        titulo : 'CosmeTIC',
        user_name : 'Juan Sebastián', 
        consecutivo: 'registroPagos',
        subtitulo:'Registro Pagos'
    });
})

app.get('/editarPagos', (req, res) => {
    res.render('Pagos/editarPagos', { 
        titulo : 'CosmeTIC',
        user_name : 'Juan Sebastián', 
        consecutivo: 'editarPagos',
        subtitulo:'Editar Pagos'
    });
})

//pagina de comisioines

app.get('/comisiones', (req, res) => {

    const comisiones = [
    ];
    res.render('Comisiones/comisiones', { 
        titulo : 'CosmeTIC',
        user_name : 'Juan Sebastián', 
        consecutivo: 'Comisiones',
        lista_comisiones: comisiones
    });
})

app.get('/registroComisiones', (req, res) => {
    
    res.render('Comisiones/registroComisiones', { 
        titulo : 'CosmeTIC',
        user_name : 'Juan Sebastián', 
        consecutivo: 'registroComisiones',
        subtitulo:'Registro Comisiones'
    });
})

app.get('/editarComisiones', (req, res) => {
    res.render('Comisiones/editarComisiones', { 
        titulo : 'CosmeTIC',
        user_name : 'Juan Sebastián', 
        consecutivo: 'editarComisiones',
        subtitulo:'Editar Comisiones'
    });
})

// Página de Usuarios

app.get('/usuarios', (req, res) => {

    const usuarios = [
        {
            id_Usuario: 1,
            id_Rol: 1,
            id_Empleado: 1,
            nombre_Usuario: 'magasi10',
            correo_Usuario: 'mariana@gmail.com',
            estado_Usuario: 'Activo',
            observacion: 'esta laborando actualmente'
        }, {
            id_Usuario: 2,
            id_Rol: 2,
            id_Empleado: 2,
            nombre_Usuario: 'macelita9',
            correo_Usuario: 'marcela@gmail.com',
            estado_Usuario: 'Activo',
            observacion: 'esta laborando actualmente'
        }, {
            id_Usuario: 3,
            id_Rol: 3,
            id_Empleado: 3,
            nombre_Usuario: 'julianC1',
            correo_Usuario: 'julian@gmail.com',
            estado_Usuario: 'Activo',
            observacion: 'esta laborando actualmente'
        }];
    res.render('Usuarios/usuarios', {
        titulo: 'CosmeTIC',
        user_name: 'Mariana Granados',
        consecutivo: 'Usuarios',
        lista_usuarios: usuarios
    });
})


// Página de clientes

app.get('/clientes', (req, res) => {

    const clientes = [
        {
            id_Cliente: 1,
            nit_O_Cedula_Cliente: 1000438876,
            nombre_Cliente: 'Carlos Emilio ',
            apellido_Cliente: 'Jaramillo Caicedo',
            correo_Cliente: 'carlos@gmail.com',
            telefono_Cliente: 3218505801,
            direccion_Cliente: 'calle 55 #44-56',
            estado_Cliente: 'Activo',
            observacion: 'ninguna'
        }, {
            id_Cliente: 2,
            nit_O_Cedula_Cliente: 9830438876,
            nombre_Cliente: 'Variedades la negra ',
            apellido_Cliente: 'Variedades la negra',
            correo_Cliente: 'variedadeslanegra@gmail.com',
            telefono_Cliente: 3218505802,
            direccion_Cliente: 'calle 44 #64-56',
            estado_Cliente: 'Activo',
            observacion: 'ninguna'
        }, {
            id_Cliente: 3,
            nit_O_Cedula_Cliente: 9693456723,
            nombre_Cliente: 'Casa de lau ',
            apellido_Cliente: 'Casa de lau',
            correo_Cliente: 'casadelau@gmail.com',
            telefono_Cliente: 3218505861,
            direccion_Cliente: 'calle 13 #44-56',
            estado_Cliente: 'Activo',
            observacion: 'ninguna'
        }];
    res.render('Clientes/clientes', {
        titulo: 'CosmeTIC',
        user_name: 'Mariana Granados',
        consecutivo: 'Clientes',
        lista_clientes: clientes
    });
})


// Página de devoluciones

app.get('/devoluciones', (req, res) => {

    const devoluciones = [
        {
            id_Devolucion: 1,
            fecha_Devolucion: '10/05/2023',
            id_Detalle_Venta: 1,
            id_Producto: 1,
            cantidad_Devuelta: 1,
            motivo_Devolucion: 'Malo',
            devolver_Inventario: 'Si'
        }, {
            id_Devolucion: 2,
            fecha_Devolucion: '11/05/2023',
            id_Detalle_Venta: 2,
            id_Producto: 2,
            cantidad_Devuelta: 2,
            motivo_Devolucion: 'Malo',
            devolver_Inventario: 'Si'
        }, {
            id_Devolucion: 3,
            fecha_Devolucion: '12/05/2023',
            id_Detalle_Venta: 3,
            id_Producto: 3,
            cantidad_Devuelta: 3,
            motivo_Devolucion: 'Quebrado',
            devolver_Inventario: 'Si'
        }];
    res.render('Devoluciones/devoluciones', {
        titulo: 'CosmeTIC',
        user_name: 'Mariana Granados',
        consecutivo: 'Devoluciones',
        lista_devoluciones: devoluciones
    });
})

// Página de Registro de usuario

app.get('/registroUsuario', (req, res) => {

    res.render('Usuarios/registroUsuario', {
        titulo: 'CosmeTIC',
        user_name: 'Mariana Granados',
        consecutivo: 'registroUsuario',
        subtitulo: 'Registro de Usuario'
    });
})


//Registro de Clientes 
app.get('/registroClientes', (req, res) => {

    res.render('Clientes/registroClientes', {
        titulo: 'CosmeTIC',
        user_name: 'Mariana Granados',
        consecutivo: 'registroClientes',
        subtitulo: 'Registro Clientes'
    });
})


//Registro de Devoluciones 
app.get('/registroDevoluciones', (req, res) => {

    res.render('Devoluciones/registroDevoluciones', {
        titulo: 'CosmeTIC',
        user_name: 'Mariana Granados',
        consecutivo: 'registroDevoluciones',
        subtitulo: 'Registro Devoluciones'
    });
})

// Página de Roles

app.get('/roles', async (req, res) => {
    try {
        const url = "https://apifinal-5pf3.onrender.com/api/rol";
        const response = await axios.get(url, {
            method: "GET",
            mode: "cors",
            headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        if (response.status === 200) {
            const data = response.data;
            const roles = data.rol;
            res.render('Roles/roles', {
                titulo: 'CosmeTIC | Roles',
                user_name: 'Alejandro Cañas',
                consecutivo: 'Roles',
                lista_roles: roles
            });
        } else {
            console.error("Error al obtener la lista de roles:", response.status);
            res.status(response.status).send("Error al obtener la lista de roles");
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        res.status(500).send("Error al obtener los roles");
    }
});

app.get('/registroRoles', (req, res) => {

    const modulos = [
        {
            nombre_modulo: 'Dashboard'
        }, {
            nombre_modulo: 'Usuarios'
        }, {
            nombre_modulo: 'Proveedores'
        }, {
            nombre_modulo: 'Compras'
        }, {
            nombre_modulo: 'Categorias de Productos'
        }, {
            nombre_modulo: 'Productos'
        }, {
            nombre_modulo: 'Clientes'
        }, {
            nombre_modulo: 'Empleados'
        }, {
            nombre_modulo: 'Pedidos'
        }, {
            nombre_modulo: 'Ventas'
        }, {
            nombre_modulo: 'Pagos'
        }, {
            nombre_modulo: 'Devoluciones'
        }, {
            nombre_modulo: 'Comisiones'
        }];
    res.render('Roles/registroRoles', {
        titulo: 'CosmeTIC | Nuevo Rol',
        user_name: 'Alejandro Cañas',
        consecutivo: 'Roles',
        lista_modulos: modulos
    });
})

app.get('/editarRoles', async (req, res) => {
    const modulos = [
        {
            nombre_modulo: 'Dashboard'
        }, {
            nombre_modulo: 'Usuarios'
        }, {
            nombre_modulo: 'Proveedores'
        }, {
            nombre_modulo: 'Compras'
        }, {
            nombre_modulo: 'Categorias de Productos'
        }, {
            nombre_modulo: 'Productos'
        }, {
            nombre_modulo: 'Clientes'
        }, {
            nombre_modulo: 'Empleados'
        }, {
            nombre_modulo: 'Pedidos'
        }, {
            nombre_modulo: 'Ventas'
        }, {
            nombre_modulo: 'Pagos'
        }, {
            nombre_modulo: 'Devoluciones'
        }, {
            nombre_modulo: 'Comisiones'
        }];
    try {
        const rolId = req.query._id;
        const url = `https://apifinal-5pf3.onrender.com/api/rol/getOne?_id=${rolId}`;
        const response = await axios.get(url, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        if (response.status === 200) {
            const rol = response.data;
            console.log(rol);
            const modulosRol = rol.rol.modulosRol;
            const modulosConEstado = modulos.map((modulo) => ({
                nombre_modulo: modulo.nombre_modulo,
                seleccionado: modulosRol.includes(modulo.nombre_modulo)
            }));
            console.log(modulosConEstado)
            res.render('Roles/editarRoles', {
                titulo: 'CosmeTIC | Editar Rol',
                user_name: 'Alejandro Cañas',
                consecutivo: 'Editar Roles',
                lista_modulos: modulosConEstado,
                _id: rolId,
                rol: rol
            });
        } else {
            console.error('Error al obtener los datos del rol:', response.status);
            res.status(response.status).send('Error al obtener los datos del rol');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        res.status(500).send('Error al obtener el rol');
    }
});

// Página de Pedidos

let listaDetalle = [];

app.get('/pedidos', async (req, res) => {
    try {
        const url = "https://apifinal-5pf3.onrender.com/api/pedido";
        const response = await axios.get(url, {
            method: "GET",
            mode: "cors",
            headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        if (response.status === 200) {
            const data = response.data;
            const pedidos = data.pedido;
            listaDetalle = []
            res.render('Pedidos/pedidos', {
                titulo: 'CosmeTIC | Pedidos',
                user_name: 'Alejandro Cañas',
                consecutivo: 'Pedidos',
                lista_pedidos: pedidos
            });
        } else {
            console.error("Error al obtener la lista de pedidos:", response.status);
            res.status(response.status).send("Error al obtener la lista de pedidos");
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        res.status(500).send("Error al obtener los pedidos");
    }
});

app.post('/cambiarEstadoPedido', async (req, res) => {
    const pedidoId = req.body.pedidoId;
    console.log(pedidoId);
    try {
        const url = `https://apifinal-5pf3.onrender.com/api/pedido/getOne?_id=${pedidoId}`;
        const response = await axios.get(url, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        if (response.status === 200) {
            const { numeroPedido, cliente, empleado, fechaPedido, tipoPago, productos, totalPedido } = response.data.pedido;
            const fecha = fechaPedido.slice(0, 10);
            const fechaEntrega = new Date();
            const venta = {
                numeroVenta: numeroPedido,
                cliente: cliente,
                empleado: empleado,
                fechaVenta: fecha,
                fechaEntrega: fechaEntrega,
                tipoPago: tipoPago,
                productos: productos,
                totalVenta: totalPedido,
                estadoVenta: "Por pagar"
            }
            console.log(venta);
            console.log("hola2")
            try {
                const urlVenta = `https://apifinal-5pf3.onrender.com/api/venta`;
                const ventaResponse = await axios.post(urlVenta, venta, {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-type': 'application/json; charset=UTF-8' }
                });
                if (ventaResponse.status === 200) {
                    console.log('Venta registrada exitosamente');
                    const eliminarPedidoUrl = 'https://apifinal-5pf3.onrender.com/api/pedido';
                    const eliminarPedidoResponse = await axios.delete(eliminarPedidoUrl, {
                        data: {
                            _id: pedidoId
                        },
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    });
                    if (eliminarPedidoResponse.status === 200) {
                        console.log('Pedido eliminado exitosamente');
                        res.json({ msg: 'Cambio de estado realizado con éxito' });
                    } else {
                        console.error('Error al eliminar el pedido:', eliminarPedidoResponse.status);
                    }
                } else {
                    console.error('Error al registrar la venta:', ventaResponse.status);
                    res.status(ventaResponse.status).send('Error al registrar la venta');
                }
            } catch (error) {
                console.error('Error al realizar la solicitud de venta:', error);
                res.status(500).send('Error al registrar la venta');
            }
        } else {
            console.error('Error al obtener los datos del Pedido:', response.status);
            res.status(response.status).send('Error al obtener los datos del Pedido');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud del Pedido:', error);
        res.status(500).send('Error al obtener el Pedido');
    }
});

app.get('/registroPedidos', (req, res) => {
    listaProductos = {
        producto: [{
            _id: 1,
            nombreProducto: 'Labial',
            precioCompra: 5000,
            precioVenta: 6000,
        }, {
            _id: 2,
            nombreProducto: 'Rubor',
            precioCompra: 2000,
            precioVenta: 7000,
        }, {
            _id: 3,
            nombreProducto: 'Base',
            cantidad: 10,
            precioCompra: 5000,
            precioVenta: 9000,
        }],
    };
    res.render('Pedidos/registroPedidos', {
        titulo: 'CosmeTIC | Nuevo Pedido',
        user_name: 'Alejandro Cañas',
        consecutivo: 'Registrar Pedido',
        listaProductos: listaProductos,
        listaDetalle: listaDetalle
    });
});

app.post('/registroPedidos', (req, res) => {
    const data = req.body;
    const _id = data._id;
    const cantidad = data.cantidad;
    listaProductos = {
        producto: [{
            _id: 1,
            nombreProducto: 'Labial',
            precioCompra: 5000,
            precioVenta: 6000,
        }, {
            _id: 2,
            nombreProducto: 'Rubor',
            precioCompra: 2000,
            precioVenta: 7000,
        }, {
            _id: 3,
            nombreProducto: 'Base',
            cantidad: 10,
            precioCompra: 5000,
            precioVenta: 9000,
        }],
    };
    const productoEncontrado = listaProductos.producto.find(producto => producto._id == _id);
    if (productoEncontrado) {
        const precioTotal = productoEncontrado.precioVenta * cantidad;
        const productoFinal = {
            ...productoEncontrado,
            cantidad: cantidad,
            precioTotal: precioTotal
        };
        listaDetalle.push(productoFinal);
    }
    res.render('Pedidos/registroPedidos', {
        titulo: 'CosmeTIC | Nuevo Pedido',
        user_name: 'Alejandro Cañas',
        consecutivo: 'Registrar Pedido',
        listaProductos: listaProductos,
        listaDetalle: listaDetalle
    });
});

app.post('/eliminarProducto', (req, res) => {
    const productoId = req.body.productoId;
    for (let i = 0; i < listaDetalle.length; i++) {
        console.log("hola");
        if (listaDetalle[i]._id == productoId) {
            listaDetalle.splice(i, 1);
            console.log('Producto eliminado exitosamente');
            break
        }
    }
    res.redirect('/registroPedidos');
});

app.get('/detallePedido', async (req, res) => {
    listaProductos = {
        producto: [{
            _id: 1,
            nombreProducto: 'Labial',
            precioCompra: 5000,
            precioVenta: 6000,
        }, {
            _id: 2,
            nombreProducto: 'Rubor',
            precioCompra: 2000,
            precioVenta: 7000,
        }, {
            _id: 3,
            nombreProducto: 'Base',
            cantidad: 10,
            precioCompra: 5000,
            precioVenta: 9000,
        }],
    };
    try {
        const pedidoId = req.query._id;
        const url = `https://apifinal-5pf3.onrender.com/api/pedido/getOne?_id=${pedidoId}`;
        const response = await axios.get(url, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        if (response.status === 200) {
            const pedido = response.data;
            const productos = pedido.pedido.productos;
            const fecha = pedido.pedido.fechaPedido;
            pedido.pedido.fechaPedido = fecha.slice(0, 10);
            res.render('Pedidos/detallePedido', {
                titulo: 'CosmeTIC | Detalle Pedido',
                user_name: 'Alejandro Cañas',
                consecutivo: 'Detalle Pedido',
                detallePedido: pedido,
                listaProductos: listaProductos,
                productos: productos,
                _id: pedidoId
            });
        } else {
            console.error('Error al obtener los datos del Pedido:', response.status);
            res.status(response.status).send('Error al obtener los datos del Pedido');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        res.status(500).send('Error al obtener el Pedido');
    }
});

// Página de Ventas

app.get('/ventas', async (req, res) => {
    try {
        const url = "https://apifinal-5pf3.onrender.com/api/venta";
        const response = await axios.get(url, {
            method: "GET",
            mode: "cors",
            headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        if (response.status === 200) {
            const data = response.data;
            const ventas = data.venta;
            console.log(ventas);
            res.render('Ventas/ventas', {
                titulo: 'CosmeTIC | Ventas',
                user_name: 'Alejandro Cañas',
                consecutivo: 'Ventas',
                lista_ventas: ventas
            });
        } else {
            console.error("Error al obtener la lista de ventas:", response.status);
            res.status(response.status).send("Error al obtener la lista de ventas");
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        res.status(500).send("Error al obtener las ventas");
    }
})

app.get('/detalleVenta', async (req, res) => {
    try {
        const ventaId = req.query._id;
        const url = `https://apifinal-5pf3.onrender.com/api/venta/getOne?_id=${ventaId}`;
        const response = await axios.get(url, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        if (response.status === 200) {
            const venta = response.data;
            const productos = venta.venta.productos;
            const fecha = venta.venta.fechaVenta;
            const fechaEntrega = venta.venta.fechaEntrega;
            venta.venta.fechaVenta = fecha.slice(0, 10);
            venta.venta.fechaEntrega = fechaEntrega.slice(0, 10);
            res.render('Ventas/detalleVenta', {
                titulo: 'CosmeTIC | Detalle Venta',
                user_name: 'Alejandro Cañas',
                consecutivo: 'Detalle Venta',
                detalleVenta: venta,
                productos: productos
            });
        } else {
            console.error('Error al obtener los datos de la Venta:', response.status);
            res.status(response.status).send('Error al obtener los datos de la Venta');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        res.status(500).send('Error al obtener la Venta');
    }
});

