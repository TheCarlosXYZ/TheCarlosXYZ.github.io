document.addEventListener('DOMContentLoaded', () => {
    const taskAccordion = document.getElementById('taskAccordion');
    const weekSelect = document.getElementById('weekSelect');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileUpload = document.getElementById('fileUpload');
    const uploadStatus = document.getElementById('uploadStatus');

    // Datos de las tareas por semana (puedes añadir los tuyos aquí)
    const tasksData = {
        'Semana 1': {
            description: 'Introducción al HTML y CSS. Creación de la primera página web.',
            content: `
                <div class="bg-dark p-3 rounded">
                    <h5 class="text-info">Archivos de Tarea:</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-file-code me-2"></i>index.html</li>
                        <li><i class="fas fa-file-alt me-2"></i>style.css</li>
                    </ul>
                    <h5 class="text-info mt-3">Carpetas de Tarea:</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-folder me-2"></i>assets</li>
                    </ul>
                </div>
            `
        },
        'Semana 2': {
            description: 'Uso de Git y GitHub. Creación de repositorios y primer commit.',
            content: `
                <div class="bg-dark p-3 rounded">
                    <h5 class="text-info">Archivos de Tarea:</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-file-alt me-2"></i>README.md</li>
                    </ul>
                    <h5 class="text-info mt-3">Carpetas de Tarea:</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-folder me-2"></i>.git</li>
                    </ul>
                </div>
            `
        },
        // Agrega más semanas aquí hasta la 16
        'Semana 3': {
            description: 'Introducción a JavaScript: Variables y tipos de datos.',
            content: `
                <div class="bg-dark p-3 rounded">
                    <h5 class="text-info">Archivos de Tarea:</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-file-code me-2"></i>variables.js</li>
                    </ul>
                    <h5 class="text-info mt-3">Carpetas de Tarea:</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-folder me-2"></i>js</li>
                    </ul>
                </div>
            `
        },
        'Semana 4': { description: 'Introducción a DOM y eventos.', content: 'No hay contenido detallado aún.' },
        'Semana 5': { description: 'Proyecto de E-commerce básico con HTML y CSS.', content: 'No hay contenido detallado aún.' },
        'Semana 6': { description: 'Funciones y objetos en JavaScript.', content: 'No hay contenido detallado aún.' },
        'Semana 7': { description: 'Desarrollo de una galería de fotos interactiva.', content: 'No hay contenido detallado aún.' },
        'Semana 8': { description: 'Clases y herencia en JavaScript.', content: 'No hay contenido detallado aún.' },
        'Semana 9': { description: 'Uso de APIs y promesas.', content: 'No hay contenido detallado aún.' },
        'Semana 10': { description: 'Proyecto de blog con uso de fetch para obtener datos.', content: 'No hay contenido detallado aún.' },
        'Semana 11': { description: 'Introducción a Node.js.', content: 'No hay contenido detallado aún.' },
        'Semana 12': { description: 'Creación de un servidor web con Express.js.', content: 'No hay contenido detallado aún.' },
        'Semana 13': { description: 'Bases de datos con MongoDB.', content: 'No hay contenido detallado aún.' },
        'Semana 14': { description: 'Proyecto de aplicación web completa (MERN Stack).', content: 'No hay contenido detallado aún.' },
        'Semana 15': { description: 'Seguridad en aplicaciones web.', content: 'No hay contenido detallado aún.' },
        'Semana 16': { description: 'Proyecto final y presentación.', content: 'No hay contenido detallado aún.' },
    };

    if (taskAccordion && weekSelect) {
        for (let i = 1; i <= 16; i++) {
            const weekKey = `Semana ${i}`;
            const weekData = tasksData[weekKey] || { description: 'No hay tarea asignada para esta semana.', content: '<p>Contenido no especificado.</p>' };

            const accordionItem = document.createElement('div');
            accordionItem.className = 'accordion-item bg-dark text-light border-secondary';
            accordionItem.innerHTML = `
                <h2 class="accordion-header" id="headingWeek${i}">
                    <button class="accordion-button bg-secondary text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWeek${i}" aria-expanded="true" aria-controls="collapseWeek${i}">
                        ${weekKey}
                    </button>
                </h2>
                <div id="collapseWeek${i}" class="accordion-collapse collapse" aria-labelledby="headingWeek${i}" data-bs-parent="#taskAccordion">
                    <div class="accordion-body">
                        <p class="text-muted">${weekData.description}</p>
                        ${weekData.content}
                    </div>
                </div>
            `;
            taskAccordion.appendChild(accordionItem);

            const option = document.createElement('option');
            option.value = weekKey;
            option.textContent = weekKey;
            weekSelect.appendChild(option);
        }
    }

    // Lógica para la subida de archivos
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            const selectedWeek = weekSelect.value;
            const files = fileUpload.files;
            
            // Validar que se haya seleccionado una semana y al menos un archivo
            if (selectedWeek === 'Elige una semana...' || files.length === 0) {
                uploadStatus.innerHTML = `<div class="alert alert-danger" role="alert">
                    Por favor, selecciona una semana y un archivo/carpeta.
                </div>`;
                return;
            }

            // Simular la subida
            console.log(`Subiendo tarea para la ${selectedWeek}...`);
            let fileListHTML = '<ul>';
            for (const file of files) {
                fileListHTML += `<li>${file.webkitRelativePath || file.name}</li>`;
            }
            fileListHTML += '</ul>';

            uploadStatus.innerHTML = `<div class="alert alert-success" role="alert">
                ¡Tarea subida con éxito para la ${selectedWeek}! Archivos enviados:
                ${fileListHTML}
            </div>`;

            // Opcional: Cerrar el modal después de un tiempo
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('uploadModal'));
                modal.hide();
                uploadStatus.innerHTML = ''; // Limpiar el mensaje de estado
            }, 5000);
        });
    }
});