// JavaScript para la funcionalidad de navegación y simulación del formulario.

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar la sección de inicio al cargar
    mostrarSeccion('inicio');
});

// Función para alternar la visibilidad de las secciones de navegación
function mostrarSeccion(id) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('activo');
    });
    document.getElementById(id).classList.add('activo');
}

// SIMULACIÓN DE ENVÍO DE FORMULARIO (JavaScript)
document.getElementById('formSolicitud').addEventListener('submit', function(e) {
    e.preventDefault();

    const dui = document.getElementById('dui').value;
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const categoria = document.getElementById('categoria').value;
    const descripcion = document.getElementById('descripcion').value;
    const lista = document.getElementById('listaSolicitudes');

    // Validación opcional del DUI (si el usuario lo introduce)
    // Permite formato "00000000-0" O formato "000000000" (9 dígitos sin guion)
    if (dui !== '' && !(/^[0-9]{8}-[0-9]$/.test(dui) || /^[0-9]{9}$/.test(dui))) {
        alert('Formato de DUI inválido. Debe ser 9 dígitos en total, con o sin guion (ej: 00000000-0 o 000000000). Por favor, corrija o déjelo en blanco.');
        return; // Detiene el envío si el formato es incorrecto
    }
    
    // Generar un ID ficticio para la solicitud
    const newId = 'S-2025-' + Math.floor(Math.random() * 1000).toString().padStart(4, '0');
    
    // Detalle para la lista
    const categoriaTexto = document.getElementById('categoria').options[document.getElementById('categoria').selectedIndex].text;

    // Crear el nuevo elemento de lista
    const newSolicitud = document.createElement('li');
    newSolicitud.innerHTML = `**ID: ${newId}** - **Categoría:** ${categoriaTexto}. Solicitud: ${descripcion.substring(0, 50)}... **Estado:** Recibida (Respuesta máxima en 10 días hábiles).`;

    // Insertar el nuevo elemento al principio de la lista
    lista.prepend(newSolicitud);

    alert(`Su solicitud ha sido enviada con el ID: ${newId}. Se responderá en el plazo legal (Art. 71 LAIP).`);

    // Limpiar el formulario
    this.reset();
});

