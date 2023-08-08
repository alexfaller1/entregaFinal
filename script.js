document.addEventListener('DOMContentLoaded', () => {
  const productos = [
    { id: 1, nombre: 'Adidas forum low ', precio: 70000, imagen: 'lowazul.avif', color: 'Azul' },
    { id: 2, nombre: 'Adidas forum low ', precio: 70000, imagen: 'lowdoradas.avif', color: 'Doradas' },
    { id: 3, nombre: 'Adidas forum low ', precio: 70000, imagen: 'lowceleste.avif', color: 'Celeste' },
    { id: 4, nombre: 'Adidas forum low ', precio: 70000, imagen: 'lowblanconegro.avif', color: 'Blanco y Negro' },
  ];
  

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (!Array.isArray(carrito)) {
    carrito = [];
  }

  const productosDiv = document.getElementById('productos');
  const carritoDiv = document.getElementById('carrito');
  const sucursalesDiv = document.getElementById('sucursales');

  productos.forEach((producto) => {
    const divProducto = document.createElement('div');
    divProducto.classList.add('producto');

    const img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;
    divProducto.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = producto.nombre;
    divProducto.appendChild(h2);

    
    const pColor = document.createElement('p');
    pColor.textContent = `Color: ${producto.color}`;
    divProducto.appendChild(pColor);

    const p = document.createElement('p');
    p.textContent = `$${producto.precio}`;
    divProducto.appendChild(p);

    const buttonAgregar = document.createElement('button');
    buttonAgregar.textContent = 'Agregar al Carrito';
    buttonAgregar.addEventListener('click', () => agregarProductoAlCarrito(producto));
    divProducto.appendChild(buttonAgregar);

    productosDiv.appendChild(divProducto);
  });

  function mostrarAlerta(producto) {
    Swal.fire({
      icon: 'success',
      title: '¡Producto agregado!',
      text: `${producto.nombre} ha sido agregado al carrito.`,
    });
  }

  function agregarProductoAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.id === producto.id);
  
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({
        ...producto,
        cantidad: 1,
      });
    }
    guardarCarritoEnStorage();
    actualizarCarrito();
    actualizarTotal();
  
    mostrarAlerta(producto);
  }

  function actualizarCarrito() {
    carritoDiv.innerHTML = '';
  
    carrito.forEach((producto) => {
      const divProducto = document.createElement('div');
      divProducto.classList.add('productoAgregado');

      const divContenedorImagen = document.createElement('div');
      divContenedorImagen.classList.add('contenedor-imagen');

      const img = document.createElement('img');
      img.src = producto.imagen;
      img.alt = producto.nombre;
      divContenedorImagen.appendChild(img);

      divProducto.appendChild(divContenedorImagen);

      const divContenedorContenido = document.createElement('div');
      divContenedorContenido.classList.add('contenedor-contenido');

      const h2 = document.createElement('h2');
      h2.textContent = producto.nombre;
      divContenedorContenido.appendChild(h2);

      const pColor = document.createElement('p');
      pColor.textContent = `Color: ${producto.color}`;
      divContenedorContenido.appendChild(pColor);

      const p = document.createElement('p');
      p.textContent = `$${producto.precio} x ${producto.cantidad}`;
      divContenedorContenido.appendChild(p);

      const divContenedorBoton = document.createElement('div');
      divContenedorBoton.classList.add('contenedor-boton');

      const buttonEliminar = document.createElement('button');
    buttonEliminar.textContent = 'Eliminar';
    buttonEliminar.addEventListener('click', () => eliminarProductoDelCarrito(producto)); // Pasar el producto directamente
    divContenedorBoton.appendChild(buttonEliminar);

    divContenedorContenido.appendChild(divContenedorBoton);
    divProducto.appendChild(divContenedorContenido);

    carritoDiv.appendChild(divProducto);

      divContenedorContenido.appendChild(divContenedorBoton);
      divProducto.appendChild(divContenedorContenido);

      carritoDiv.appendChild(divProducto);
    });
  }

  function eliminarProductoDelCarrito(producto) {
    const index = carrito.findIndex(item => item.id === producto.id);
    
    if (index !== -1) {
      const productoExistente = carrito[index];
      productoExistente.cantidad--;
  
      if (productoExistente.cantidad === 0) {
        carrito.splice(index, 1);
      }
  
      guardarCarritoEnStorage();
      actualizarCarrito();
      actualizarTotal();
    }
  }
  

  function actualizarTotal() {
    const totalSpan = document.getElementById('total');
    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    totalSpan.textContent = total;
  }

  function guardarCarritoEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function mostrarSucursales(sucursales) {
    sucursales.forEach((sucursal) => {
      const divSucursal = document.createElement('div');
      divSucursal.classList.add('sucursal');

      const h2 = document.createElement('h2');
      h2.textContent = sucursal.nombre;
      divSucursal.appendChild(h2);

      const pDireccion = document.createElement('p');
      pDireccion.textContent = `Dirección: ${sucursal.direccion}`;
      divSucursal.appendChild(pDireccion);

      const pTelefono = document.createElement('p');
      pTelefono.textContent = `Teléfono: ${sucursal.telefono}`;
      divSucursal.appendChild(pTelefono);

      sucursalesDiv.appendChild(divSucursal);
    });
  }

  function cargarSucursales() {
    fetch('sucursales.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(sucursales => {
        mostrarSucursales(sucursales);
      })
      .catch(error => {
        console.error('Error fetching sucursales:', error);
      });
  }

  cargarSucursales();
  actualizarCarrito();
  actualizarTotal();

  const botonVaciarCarrito = document.getElementById('vaciarCarrito');
  botonVaciarCarrito.addEventListener('click', () => {
    carrito = [];
    guardarCarritoEnStorage();
    actualizarCarrito();
    actualizarTotal();
  });
});


































// document.addEventListener('DOMContentLoaded', () => {
//   const productos = [
//     { nombre: 'Adidas forum low', precio: 70000, imagen: 'lowazul.avif', color: 'Azul' },
//     { nombre: 'Adidas forum low', precio: 70000, imagen: 'lowdoradas.avif', color: 'Doradas' },
//     { nombre: 'Adidas forum low', precio: 70000, imagen: 'lowceleste.avif', color: 'Celeste' },
//     { nombre: 'Adidas forum low', precio: 70000, imagen: 'lowblanconegro.avif', color: 'Blanco y Negro' },
//   ];

//   let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//   if (!Array.isArray(carrito)) {
//     carrito = [];
//   }

//   const productosDiv = document.getElementById('productos');
//   const carritoDiv = document.getElementById('carrito');
//   const sucursalesDiv = document.getElementById('sucursales');

//   productos.forEach((producto) => {
//     const divProducto = document.createElement('div');
//     divProducto.classList.add('producto');

//     const img = document.createElement('img');
//     img.src = producto.imagen;
//     img.alt = producto.nombre;
//     divProducto.appendChild(img);

//     const h2 = document.createElement('h2');
//     h2.textContent = producto.nombre;
//     divProducto.appendChild(h2);

//     // Agregar el <p> para mostrar el color del producto
//     const pColor = document.createElement('p');
//     pColor.textContent = `Color: ${producto.color}`;
//     divProducto.appendChild(pColor);

//     const p = document.createElement('p');
//     p.textContent = `$${producto.precio}`;
//     divProducto.appendChild(p);

//     const buttonAgregar = document.createElement('button');
//     buttonAgregar.textContent = 'Agregar al Carrito';
//     buttonAgregar.addEventListener('click', () => agregarProductoAlCarrito(producto));
//     divProducto.appendChild(buttonAgregar);

//     productosDiv.appendChild(divProducto);
//   });

//   function mostrarAlerta(producto) {
//     Swal.fire({
//       icon: 'success',
//       title: '¡Producto agregado!',
//       text: `${producto.nombre} ha sido agregado al carrito.`,
//     });
//   }

//   function agregarProductoAlCarrito(producto) {
//     const productoExistente = carrito.find(item => item.nombre === producto.nombre);

//     if (productoExistente) {
//       productoExistente.cantidad++;
//     } else {
//       carrito.push({
//         ...producto,
//         cantidad: 1,
//       });
//     }

//     guardarCarritoEnStorage();
//     actualizarCarrito();
//     actualizarTotal();

//     mostrarAlerta(producto);
//   }

//   function actualizarCarrito() {
//     carritoDiv.innerHTML = '';
//     carrito.forEach((producto) => {
//       const divProducto = document.createElement('div');
//       divProducto.classList.add('productoAgregado');

//       const img = document.createElement('img');
//       img.src = producto.imagen;
//       img.alt = producto.nombre;
//       divProducto.appendChild(img);

//       const h2 = document.createElement('h2');
//       h2.textContent = producto.nombre;
//       divProducto.appendChild(h2);

//       // Agregar el <p> para mostrar el color del producto
//       const pColor = document.createElement('p');
//       pColor.textContent = `Color: ${producto.color}`;
//       divProducto.appendChild(pColor);

//       const p = document.createElement('p');
//       p.textContent = `$${producto.precio} x ${producto.cantidad}`;
//       divProducto.appendChild(p);

//       const buttonEliminar = document.createElement('button');
//       buttonEliminar.textContent = 'Eliminar';
//       buttonEliminar.addEventListener('click', () => eliminarProductoDelCarrito(producto.nombre));
//       divProducto.appendChild(buttonEliminar);

//       carritoDiv.appendChild(divProducto);
//     });
//   }

//   function eliminarProductoDelCarrito(nombreProducto) {
//     const productoExistente = carrito.find(item => item.nombre === nombreProducto);

//     if (productoExistente) {
//       productoExistente.cantidad--;
//       if (productoExistente.cantidad === 0) {
//         const index = carrito.indexOf(productoExistente);
//         carrito.splice(index, 1);
//       }
//       guardarCarritoEnStorage();
//       actualizarCarrito();
//       actualizarTotal();
//     }
//   }

//   function actualizarTotal() {
//     const totalSpan = document.getElementById('total');
//     const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
//     totalSpan.textContent = total;
//   }

//   function guardarCarritoEnStorage() {
//     localStorage.setItem('carrito', JSON.stringify(carrito));
//   }

//   function mostrarSucursales(sucursales) {
//     sucursales.forEach((sucursal) => {
//       const divSucursal = document.createElement('div');
//       divSucursal.classList.add('sucursal');

//       const h2 = document.createElement('h2');
//       h2.textContent = sucursal.nombre;
//       divSucursal.appendChild(h2);

//       const pDireccion = document.createElement('p');
//       pDireccion.textContent = `Dirección: ${sucursal.direccion}`;
//       divSucursal.appendChild(pDireccion);

//       const pTelefono = document.createElement('p');
//       pTelefono.textContent = `Teléfono: ${sucursal.telefono}`;
//       divSucursal.appendChild(pTelefono);

//       sucursalesDiv.appendChild(divSucursal);
//     });
//   }

//   function cargarSucursales() {
//     fetch('sucursales.json')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(sucursales => {
//         mostrarSucursales(sucursales);
//       })
//       .catch(error => {
//         console.error('Error fetching sucursales:', error);
//       });
//   }

//   cargarSucursales();
//   actualizarCarrito();
//   actualizarTotal();

//   const botonVaciarCarrito = document.getElementById('vaciarCarrito');
//   botonVaciarCarrito.addEventListener('click', () => {
//     carrito = [];
//     guardarCarritoEnStorage();
//     actualizarCarrito();
//     actualizarTotal();
//   });
// });



















// document.addEventListener('DOMContentLoaded', () => {
//   const productos = [
//     { nombre: 'Producto 1', precio: 10, imagen: 'lowazul.avif' },
//     { nombre: 'Producto 2', precio: 20, imagen: 'lowdoradas.avif' },
//     { nombre: 'Producto 3', precio: 15, imagen: 'lowceleste.avif' },
//     { nombre: 'Producto 4', precio: 25, imagen: 'lowblanconegro.avif' },
//   ];

//   let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//   if (!Array.isArray(carrito)) {
//     carrito = [];
//   }

//   const productosDiv = document.getElementById('productos');
//   const carritoDiv = document.getElementById('carrito');
//   const sucursalesDiv = document.getElementById('sucursales');

//   productos.forEach((producto) => {
//     const divProducto = document.createElement('div');
//     divProducto.classList.add('producto');

//     const img = document.createElement('img');
//     img.src = producto.imagen;
//     img.alt = producto.nombre;
//     divProducto.appendChild(img);

//     const h2 = document.createElement('h2');
//     h2.textContent = producto.nombre;
//     divProducto.appendChild(h2);

//     const p = document.createElement('p');
//     p.textContent = `$${producto.precio}`;
//     divProducto.appendChild(p);

//     const buttonAgregar = document.createElement('button');
//     buttonAgregar.textContent = 'Agregar al Carrito';
//     buttonAgregar.addEventListener('click', () => agregarProductoAlCarrito(producto));
//     divProducto.appendChild(buttonAgregar);

//     productosDiv.appendChild(divProducto);
//   });

//   function agregarProductoAlCarrito(producto) {
//     const productoExistente = carrito.find(item => item.nombre === producto.nombre);

//     if (productoExistente) {
//       productoExistente.cantidad++;
//     } else {
//       carrito.push({
//         ...producto,
//         cantidad: 1,
//       });
//     }

//     guardarCarritoEnStorage();
//     actualizarCarrito();
//     actualizarTotal();
//   }

//   function actualizarCarrito() {
//     carritoDiv.innerHTML = '';
//     carrito.forEach((producto) => {
//       const divProducto = document.createElement('div');
//       divProducto.classList.add('producto');

//       const img = document.createElement('img');
//       img.src = producto.imagen;
//       img.alt = producto.nombre;
//       divProducto.appendChild(img);

//       const h2 = document.createElement('h2');
//       h2.textContent = producto.nombre;
//       divProducto.appendChild(h2);

//       const p = document.createElement('p');
//       p.textContent = `$${producto.precio} x ${producto.cantidad}`;
//       divProducto.appendChild(p);

//       const buttonEliminar = document.createElement('button');
//       buttonEliminar.textContent = 'Eliminar';
//       buttonEliminar.addEventListener('click', () => eliminarProductoDelCarrito(producto.nombre));
//       divProducto.appendChild(buttonEliminar);

//       carritoDiv.appendChild(divProducto);
//     });
//   }

//   function eliminarProductoDelCarrito(nombreProducto) {
//     const productoExistente = carrito.find(item => item.nombre === nombreProducto);

//     if (productoExistente) {
//       productoExistente.cantidad--;
//       if (productoExistente.cantidad === 0) {
//         const index = carrito.indexOf(productoExistente);
//         carrito.splice(index, 1);
//       }
//       guardarCarritoEnStorage();
//       actualizarCarrito();
//       actualizarTotal();
//     }
//   }

//   function actualizarTotal() {
//     const totalSpan = document.getElementById('total');
//     const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
//     totalSpan.textContent = total;
//   }

//   function guardarCarritoEnStorage() {
//     localStorage.setItem('carrito', JSON.stringify(carrito));
//   }


//   function mostrarSucursales(sucursales) {
//     sucursales.forEach((sucursal) => {
//       const divSucursal = document.createElement('div');
//       divSucursal.classList.add('sucursal');

//       const h2 = document.createElement('h2');
//       h2.textContent = sucursal.nombre;
//       divSucursal.appendChild(h2);

//       const pDireccion = document.createElement('p');
//       pDireccion.textContent = `Dirección: ${sucursal.direccion}`;
//       divSucursal.appendChild(pDireccion);

//       const pTelefono = document.createElement('p');
//       pTelefono.textContent = `Teléfono: ${sucursal.telefono}`;
//       divSucursal.appendChild(pTelefono);

//       sucursalesDiv.appendChild(divSucursal);
//     });
//   }


//   fetch('sucursales.json')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json(); 
//     })
//     .then(sucursales => {

//       mostrarSucursales(sucursales);
//     })
//     .catch(error => {
//       console.error('Error fetching sucursales:', error);
//     });

  
//   actualizarCarrito();
//   actualizarTotal();

//   const botonVaciarCarrito = document.getElementById('vaciarCarrito');
//   botonVaciarCarrito.addEventListener('click', () => {
//     carrito = [];
//     guardarCarritoEnStorage();
//     actualizarCarrito();
//     actualizarTotal();
//   });
// });


































// document.addEventListener('DOMContentLoaded', () => {
//     const productos = [
//       { nombre: 'Producto 1', precio: 10, imagen: 'lowazul.avif' },
//       { nombre: 'Producto 2', precio: 20, imagen: 'lowdoradas.avif' },
//       { nombre: 'Producto 3', precio: 15, imagen: 'lowceleste.avif' },
//       { nombre: 'Producto 4', precio: 25, imagen: 'lowblanconegro.avif' },
//     ];
  
//     let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
//     if (!Array.isArray(carrito)) {
//       carrito = [];
//     }
  
//     const productosDiv = document.getElementById('productos');
//     const carritoDiv = document.getElementById('carrito');
  
//     productos.forEach((producto) => {
//       const divProducto = document.createElement('div');
//       divProducto.classList.add('producto');
  
//       const img = document.createElement('img');
//       img.src = producto.imagen;
//       img.alt = producto.nombre;
//       divProducto.appendChild(img);
  
//       const h2 = document.createElement('h2');
//       h2.textContent = producto.nombre;
//       divProducto.appendChild(h2);
  
//       const p = document.createElement('p');
//       p.textContent = `$${producto.precio}`;
//       divProducto.appendChild(p);
  
//       const buttonAgregar = document.createElement('button');
//       buttonAgregar.textContent = 'Agregar al Carrito';
//       buttonAgregar.addEventListener('click', () => agregarProductoAlCarrito(producto));
//       divProducto.appendChild(buttonAgregar);
  
//       productosDiv.appendChild(divProducto);
//     });
  
//     function agregarProductoAlCarrito(producto) {
//       const productoExistente = carrito.find(item => item.nombre === producto.nombre);
  
//       if (productoExistente) {
//         productoExistente.cantidad++;
//       } else {
//         carrito.push({
//           ...producto,
//           cantidad: 1,
//         });
//       }
  
//       guardarCarritoEnStorage();
//       actualizarCarrito();
//       actualizarTotal();
//     }
  
//     function actualizarCarrito() {
//       carritoDiv.innerHTML = '';
//       carrito.forEach((producto) => {
//         const divProducto = document.createElement('div');
//         divProducto.classList.add('producto');
  
//         const img = document.createElement('img');
//         img.src = producto.imagen;
//         img.alt = producto.nombre;
//         divProducto.appendChild(img);
  
//         const h2 = document.createElement('h2');
//         h2.textContent = producto.nombre;
//         divProducto.appendChild(h2);
  
//         const p = document.createElement('p');
//         p.textContent = `$${producto.precio} x ${producto.cantidad}`;
//         divProducto.appendChild(p);
  
//         const buttonEliminar = document.createElement('button');
//         buttonEliminar.textContent = 'Eliminar';
//         buttonEliminar.addEventListener('click', () => eliminarProductoDelCarrito(producto.nombre));
//         divProducto.appendChild(buttonEliminar);
  
//         carritoDiv.appendChild(divProducto);
//       });
//     }
  
//     function eliminarProductoDelCarrito(nombreProducto) {
//       const productoExistente = carrito.find(item => item.nombre === nombreProducto);
  
//       if (productoExistente) {
//         productoExistente.cantidad--;
//         if (productoExistente.cantidad === 0) {
//           const index = carrito.indexOf(productoExistente);
//           carrito.splice(index, 1);
//         }
//         guardarCarritoEnStorage();
//         actualizarCarrito();
//         actualizarTotal();
//       }
//     }
  
//     function actualizarTotal() {
//       const totalSpan = document.getElementById('total');
//       const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
//       totalSpan.textContent = total;
//     }
  
//     function guardarCarritoEnStorage() {
//       localStorage.setItem('carrito', JSON.stringify(carrito));
//     }
  
//     actualizarCarrito();
//     actualizarTotal();
  
//     const botonVaciarCarrito = document.getElementById('vaciarCarrito');
//     botonVaciarCarrito.addEventListener('click', () => {
//       carrito = [];
//       guardarCarritoEnStorage();
//       actualizarCarrito();
//       actualizarTotal();
//     });
//   });
  