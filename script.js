function mostrarSeccion(id) {
  document.querySelectorAll('section').forEach(sec => sec.classList.remove('activo'));
  document.getElementById(id).classList.add('activo');
}

// Manejo de solicitudes
const form = document.getElementById('formSolicitud');
const lista = document.getElementById('listaSolicitudes');
let solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];

function renderSolicitudes() {
  lista.innerHTML = '';
  solicitudes.forEach((s, i) => {
    const li = document.createElement('li');
    li.textContent = `${s.nombre} (${s.correo}): ${s.descripcion}`;
    lista.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const nueva = {
    nombre: document.getElementById('nombre').value,
    correo: document.getElementById('correo').value,
    descripcion: document.getElementById('descripcion').value
  };
  solicitudes.push(nueva);
  localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
  form.reset();
  renderSolicitudes();
  alert('Solicitud enviada correctamente');
});

renderSolicitudes();
