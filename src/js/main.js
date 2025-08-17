// ---------------------------------Carrousel---------------------------------------------------------
// Obtener elementos del DOM
document.addEventListener('DOMContentLoaded', () => {
  const carrusel = document.querySelector('.carousel');
  const diapositivas = document.querySelectorAll('.slide');
  let indiceActual = 0;

  function actualizarCarrusel() {
    const desplazamiento = -indiceActual * 100;
    carrusel.style.transform = `translateX(${desplazamiento}%)`;
  }

  setInterval(() => {
    indiceActual = (indiceActual + 1) % diapositivas.length;
    actualizarCarrusel();
  }, 5000);

  actualizarCarrusel();
});

// ------------------------------------------------------------------------------------------------------------

// ---------------------------------Información---------------------------------------------------------------
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let bubbles = [];

function createBubble() {
    const radius = Math.random() * 8 + 4;
    bubbles.push({
    x: Math.random() * canvas.width,
    y: canvas.height + radius,
    radius,
    baseRadius: radius,
    speed: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.3 + 0.2,
    angle: Math.random() * Math.PI * 2,
    pulse: Math.random() * 0.05 + 0.01
});
}

function drawBubbles(mouseX, mouseY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach((bubble, index) => {
    const dx = mouseX - bubble.x;
    const dy = mouseY - bubble.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    bubble.angle += bubble.pulse;
    const pulseRadius = bubble.baseRadius + Math.sin(bubble.angle) * 1.5;
    const finalRadius = distance < 50 ? pulseRadius * 1.8 : pulseRadius;

    bubble.x += Math.sin(bubble.angle) * 0.3;

    const depthFactor = 1 - bubble.y / canvas.height;
    const adjustedRadius = finalRadius * (0.7 + depthFactor * 0.3);
    const adjustedOpacity = bubble.opacity * (0.5 + depthFactor * 0.5);

    const gradient = ctx.createRadialGradient(
        bubble.x - adjustedRadius * 0.3, bubble.y - adjustedRadius * 0.3, adjustedRadius * 0.1,
        bubble.x, bubble.y, adjustedRadius
    );
    gradient.addColorStop(0, `rgba(255, 255, 255, ${adjustedOpacity})`);
    gradient.addColorStop(0.7, `rgba(173, 216, 230, ${adjustedOpacity * 0.6})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, adjustedRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    bubble.y -= bubble.speed;
    if (bubble.y + adjustedRadius < 0) bubbles.splice(index, 1);
});
}

let mouseX = -100;
let mouseY = -100;

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

canvas.addEventListener('mouseleave', () => {
    mouseX = -100;
    mouseY = -100;
});

function animate() {
    drawBubbles(mouseX, mouseY);
    requestAnimationFrame(animate);
}

setInterval(createBubble, 400);
animate();

window.addEventListener('scroll', () => {
    const section = document.getElementById('apnea-info');
    const scrollY = window.scrollY;
    const maxScroll = section.offsetHeight;
    const percent = Math.min(scrollY / maxScroll, 1);
    const startColor = [0, 31, 63];
    const endColor = [0, 116, 217];
    const blendedColor = startColor.map((start, i) =>
    Math.round(start + (endColor[i] - start) * percent)
);

section.style.background = `rgb(${blendedColor.join(',')})`;
});

// ------------------------------------------------------------------------------------------

// ----------------tienda en linea----------------------------Estebangccoder------------------
const cardsContainer = document.getElementById('cardsContainer');
const cards = Array.from(cardsContainer.children);
const cardsPorPagina = 3;
let paginaActual = 1;
const paginaTotal = Math.ceil(cards.length / cardsPorPagina);

function mostrarPagina(pagina) {
  // Validar página
  if(pagina < 1) pagina = 1;
  if(pagina > paginaTotal) pagina = paginaTotal;
  paginaActual = pagina;

  // Ocultar todas las cards
  cards.forEach(card => card.style.display = 'none');

  // Mostrar solo las cards de la página actual
  const start = (pagina - 1) * cardsPorPagina;
  const end = start + cardsPorPagina;
  cards.slice(start, end).forEach(card => card.style.display = 'block');
}

document.getElementById('prevBtn').addEventListener('click', () => {
  mostrarPagina(paginaActual - 1);
});
document.getElementById('nextBtn').addEventListener('click', () => {
  mostrarPagina(paginaActual + 1);
});

// Inicializar mostrando la primera página
mostrarPagina(1);



// Obtener productos del JSON
const  productos = [
  {
    "code": 1001,
    "title": "Gara Modular",
    "brand": "Cressi",
    "price": 800000,
    "image": "./src/public/img/gara modular.webp"
  },
  {
    "code": 1002,
    "title": "Gara Modular Impulse",
    "brand": "Cressi",
    "price": 850000,
    "image": "./src/public/img/gara modular impulse.webp"
  },
  {
    "code": 1003,
    "title": "Aletas Fiberglass",
    "brand": "LeaderFins",
    "price": 1350000,
    "image": "./src/public/img/leaderfins1.webp"
  },
  {
    "code": 1004,
    "title": "Careta Superocchio",
    "brand": "Cressi",
    "price": 250000,
    "image": "./src/public/img/careta Superocchio.webp"
  },
  {
    "code": 1005,
    "title": "Careta Phantom",
    "brand": "LeaderFins",
    "price": 350000,
    "image": "./src/public/img/phantom.webp"
  },
  {
    "code": 1006,
    "title": "Snorkel Airflex",
    "brand": "Aqualung",
    "price": 90000,
    "image": "./src/public/img/aqualung-airflex.webp"
  }
]


function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

document.querySelectorAll(".agregar-carrito").forEach(boton => {
  boton.addEventListener("click", (e) => {
    e.preventDefault();

    const code = parseInt(boton.dataset.code);
    const producto = productos.find(p => p.code === code);

    if (!producto) return;

    let carrito = obtenerCarrito();
    const index = carrito.findIndex(p => p.code === code);

    if (index !== -1) {
      // Ya existe → aumentar cantidad
      carrito[index].quantity += 1;
    } else {
      // No existe → agregar con cantidad 1
      carrito.push({ ...producto, quantity: 1 });
    }

    guardarCarrito(carrito);
    // alert("Producto agregado al carrito.");
    Swal.fire({
        title: '¡Producto agregado!',
        text: `Has agregado: ${producto.title}`,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const btnVerCarrito = document.getElementById('btnVerCarrito');
  
  if (btnVerCarrito) {
    btnVerCarrito.addEventListener('click', mostrarResumenCarrito);
  }

function mostrarResumenCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    Swal.fire({
      title: 'Carrito vacío',
      text: 'Aún no has agregado productos.',
      icon: 'warning',
      confirmButtonText: 'Ok'
    });
    return;
  }

  // Creamos el HTML dinámicamente usando el DOM
  const contenedor = document.createElement("div");

  let total = 0;

  carrito.forEach(item => {
    const itemDiv = document.createElement("div");
    const subtotal = item.price * item.quantity;
    total += subtotal;

    itemDiv.innerHTML = `
      <p><strong>${item.title}</strong> x${item.quantity} - $${subtotal.toLocaleString("es-CO")}</p>
    `;
    contenedor.appendChild(itemDiv);
  });

  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<hr><p><strong>Total:</strong> $${total.toLocaleString("es-CO")}</p>`;
  contenedor.appendChild(totalDiv);

  // Mostrar SweetAlert2 con contenido generado por el DOM
  Swal.fire({
    title: 'Resumen del carrito',
    html: contenedor,
    icon: 'info',
    confirmButtonText: 'Finalizar'
  });
}
});
// ----------------------------------------------------------------