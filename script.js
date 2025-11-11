// JavaScript para la funcionalidad de navegación y conexión a Google Sheets

// --- CONFIGURACIÓN IMPORTANTE ---
// PEGA AQUÍ LA URL DE DESPLIEGUE (DEPLOY) DE TU GOOGLE APPS SCRIPT
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbygZaFTXWjs2efMik1zkP4IDdHX6qIkulnKIstFPWF-o-hvm6B1zY3By1ksVKSLcB6y/exec'; // ¡REEMPLAZA ESTO!
// --------------------------------

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

// FUNCIÓN PRINCIPAL PARA EL ENVÍO DE DATOS A GOOGLE SHEETS
document.getElementById('formSolicitud').addEventListener('submit', function(e) {
    e.preventDefault();

    const dui = document.getElementById('dui').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const categoria = document.getElementById('categoria').value;
    const descripcion = document.getElementById('descripcion').value.trim();
    const lista = document.getElementById('listaSolicitudes');

    // Validación opcional del DUI (si el usuario lo introduce)
    // Permite formato "00000000-0" O formato "000000000" (9 dígitos sin guion)
    if (dui !== '' && !(/^[0-9]{8}-[0-9]$/.test(dui) || /^[0-9]{9}$/.test(dui))) {
        alert('Formato de DUI inválido. Debe ser 9 dígitos en total, con o sin guion (ej: 00000000-0 o 000000000). Por favor, corrija o déjelo en blanco.');
        return;
    }
    
    // 1. Crear el objeto FormData
    // Los nombres de los campos (dui, nombre, etc.) deben coincidir con los que espera el Apps Script
    const formData = new FormData();
    formData.append('dui', dui);
    formData.append('nombre', nombre);
    formData.append('correo', correo);
    formData.append('categoria', categoria);
    formData.append('descripcion', descripcion);
    
    // Botón de envío para deshabilitarlo durante el proceso
    const submitButton = e.submitter;
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    // 2. Usar Fetch API para enviar los datos al Apps Script
    fetch(WEB_APP_URL, {
        method: 'POST',
        body: formData // Envía los datos
    })
    .then(response => response.json())
    .then(data => {
        // Manejo de la respuesta del Apps Script
        if (data.result === 'success') {
            const categoriaTexto = document.getElementById('categoria').options[document.getElementById('categoria').selectedIndex].text;
            
            // Actualización simulada de la lista en la página (usando el ID generado por el script)
            const newSolicitud = document.createElement('li');
            newSolicitud.innerHTML = `**ID: ${data.id}** - **Categoría:** ${categoriaTexto}. Solicitud: ${descripcion.substring(0, 50)}... **Estado:** Recibida (Respuesta máxima en 10 días hábiles).`;
            lista.prepend(newSolicitud);

            alert(`Su solicitud ha sido enviada con éxito al registro central. ID: ${data.id}.`);
            
            document.getElementById('formSolicitud').reset();
        } else {
            throw new Error(data.message || 'Error al registrar la solicitud.');
        }
    })
    .catch(error => {
        console.error('Error de envío:', error);
        alert('Hubo un error al enviar la solicitud. Por favor, intente de nuevo más tarde.');
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar Solicitud';
    });
});



