const images = [
  "/content/full/imagenes/DEF_2020_12_26__04-Interior-01-scaled (1).webp",
  "/content/full/imagenes/DEF_2020_12_26__05-Interior-02-scaled (1).webp",
  "/content/full/imagenes/DEF_2020_12_26__04-Interior-03-scaled (1).webp",
  "/content/full/imagenes/VISTA-ESQUINA-CALIDAD-INTERNET-scaled (3).webp"
];
let currentIndex = 0;

function openModal(element, index) {
  currentIndex = index;
  document.getElementById('modalImage').src = images[currentIndex];
  document.getElementById('imageModal').classList.remove('hidden');
  document.addEventListener('keydown', handleKeydown);
}

function closeModal(event) {
  // Verifica si el clic fue en el fondo de la modal o en la "X"
  const target = event.target;
  const clickedOnPlanoModal = target.id === 'planoModal';
  const clickedOnImageModal = target.id === 'imageModal';
  const clickedOnCloseButton = target.classList.contains('modal-close');

  if (clickedOnPlanoModal || (clickedOnCloseButton && document.getElementById('planoModal').classList.contains('hidden') === false)) {
    document.getElementById('planoModal').classList.add('hidden');
    document.removeEventListener('keydown', handleViviendaCloseKeydown);
  }

  if (clickedOnImageModal || (clickedOnCloseButton && document.getElementById('imageModal').classList.contains('hidden') === false)) {
    document.getElementById('imageModal').classList.add('hidden');
    document.removeEventListener('keydown', handleKeydown);
  }
}

function prevImage(event) {
  event.stopPropagation();
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
  document.getElementById('modalImage').src = images[currentIndex];
}

function nextImage(event) {
  event.stopPropagation();
  currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
  document.getElementById('modalImage').src = images[currentIndex];
}

function handleKeydown(event) {
  if (event.key === 'ArrowLeft') {
    prevImage(event);
  } else if (event.key === 'ArrowRight') {
    nextImage(event);
  } else if (event.key === 'Escape') {
    document.getElementById('imageModal').classList.add('hidden');
    document.removeEventListener('keydown', handleKeydown);
  }
}

function openIframeModal(url) {
  document.getElementById('modalIframe').src = url;
  document.getElementById('iframeModal').classList.remove('hidden');
  document.addEventListener('keydown', handleIframeKeydown);
}

function closeIframeModal(event) {
  if (event.target.id === 'iframeModal' || event.target.tagName === 'SPAN') {
    document.getElementById('iframeModal').classList.add('hidden');
    document.getElementById('modalIframe').src = '';
    document.removeEventListener('keydown', handleIframeKeydown);
  }
}

function handleIframeKeydown(event) {
  if (event.key === 'Escape') {
    closeIframeModal(event);
  }
}

const viviendaImages = [
  "/content/planoA.webp", // Índice 0
  "/content/planoB.webp", // Índice 1
  "/content/planoC.webp", // Índice 2
  "/content/planoD.webp",   // Índice 3
  "/content/planoE.webp",   // Índice 4
  "/content/planoF.webp",   // Índice 5
  "/content/planoG.webp",   // Índice 6
  "/content/planoH.webp",   // Índice 7
  "/content/planoI.webp",   // Índice 8
  "/content/planoJ.webp",   // Índice 9
  "/content/planoK.webp",   // Índice 10
];

let currentViviendaIndex = 0;

function openViviendaModal(index) {
  currentViviendaIndex = index;
  document.getElementById('modalPlan').src = viviendaImages[currentViviendaIndex];
  document.getElementById('planoModal').classList.remove('hidden');
  document.addEventListener('keydown', handleViviendaCloseKeydown);
}

function handleViviendaCloseKeydown(event) {
  if (event.key === 'Escape') {
    closeModal(event);
  }
}

// Función para abrir modal de fichas
function openFichaModal(imagePath) {
  document.getElementById('modalPlan').src = imagePath;
  document.getElementById('planoModal').classList.remove('hidden');
  document.addEventListener('keydown', handleViviendaCloseKeydown);
}

// Función para abrir modal de galería
function openGaleriaModal(imagePath) {
  // Encontrar el índice de la imagen en el array
  const index = images.findIndex(img => img === imagePath);
  if (index !== -1) {
    currentIndex = index;
  }

  document.getElementById('modalImage').src = imagePath;
  document.getElementById('imageModal').classList.remove('hidden');
  document.addEventListener('keydown', handleKeydown);
}

// Función para filtrar viviendas por tipo
function filterViviendas(tipo) {
  const items = document.querySelectorAll('.vivienda-item');
  const buttons = document.querySelectorAll('.filter-btn');

  // Actualizar botones activos
  buttons.forEach(btn => {
    btn.classList.remove('active', 'bg-primary', 'text-white');
  });

  event.target.classList.add('active', 'bg-primary', 'text-white');

  // Filtrar elementos
  items.forEach(item => {
    if (tipo === 'all') {
      item.style.display = 'block';
    } else {
      if (item.classList.contains(tipo)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    }
  });
}

// Filtrar viviendas al cargar la página (mostrar solo 2 dormitorios)
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.vivienda-item');
  items.forEach(item => {
    if (!item.classList.contains('2dorm')) {
      item.style.display = 'none';
    }
  });

  // Header transparente al inicio y con fondo al hacer scroll
  const header = document.getElementById('header');
  const headerTitle = document.getElementById('headerTitle');
  const headerNav = document.getElementById('headerNav');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('bg-background/95', 'backdrop-blur', 'supports-[backdrop-filter]:bg-background/60');
      headerTitle.classList.remove('text-white');
      headerTitle.classList.add('text-black');
      if (headerNav) {
        headerNav.querySelectorAll('a').forEach(link => {
          link.classList.remove('text-white');
          link.classList.add('text-black');
        });
      }
    } else {
      header.classList.remove('bg-background/95', 'backdrop-blur', 'supports-[backdrop-filter]:bg-background/60');
      headerTitle.classList.add('text-white');
      headerTitle.classList.remove('text-black');
      if (headerNav) {
        headerNav.querySelectorAll('a').forEach(link => {
          link.classList.add('text-white');
          link.classList.remove('text-black');
        });
      }
    }
  });
});

// Formspree form handler
var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "¡Gracias por tu mensaje! Nos pondremos en contacto pronto.";
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "¡Oops! Hubo un problema al enviar tu formulario"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "¡Oops! Hubo un problema al enviar tu formulario"
  });
}
form.addEventListener("submit", handleSubmit)