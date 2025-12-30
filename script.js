document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('cardGridContainer');
    const modal = document.getElementById('previewModal');

    // --- BASE DE DATOS DE TAREAS ---
    // Edita esto para agregar o cambiar contenido de cada semana
    const semanasData = [
        { 
            id: 1, 
            titulo: "Semana 1: Tema Avanzado", 
            desc: "Contenido de la semana 1 disponible para visualizar y descargar.",
            content: "<h3>Semana 1: Tema Avanzado</h3><p>Contenido detallado de la primera semana del curso.</p><ul><li>Conceptos básicos</li><li>Ejercicios prácticos</li><li>Evaluaciones</li></ul>",
            color: "#d9534f", // Rojo
            link: "docs/Semana01.pdf",
            gdoc: "#"
        },
        { 
            id: 2, 
            titulo: "Semana 2: Tema Avanzado", 
            desc: "Contenido de la semana 2 disponible para visualizar y descargar.",
            content: "<h3>Semana 2: Tema Avanzado</h3><p>Contenido detallado de la segunda semana del curso.</p><ul><li>Temas avanzados</li><li>Proyectos</li><li>Recursos adicionales</li></ul>",
            color: "#f0ad4e", // Naranja
            link: "docs/Semana02.pdf",
            gdoc: "#"
        },
        { 
            id: 3, 
            titulo: "Semana 3: Tema Avanzado", 
            desc: "Contenido de la semana 3 disponible para visualizar y descargar.",
            content: "<h3>Semana 3: Tema Avanzado</h3><p>Contenido detallado de la tercera semana del curso.</p><ul><li>Técnicas profesionales</li><li>Casos de estudio</li><li>Mejores prácticas</li></ul>",
            color: "#5bc0de", // Azul claro
            link: "docs/Semana03.pdf",
            gdoc: "#" 
        }
        // ... Puedes copiar y pegar bloques {} para agregar hasta la semana 16
    ];

    // Generar automáticamente las semanas 4 a 16 (Relleno)
    for(let i = 4; i <= 16; i++) {
        const weekNum = i.toString().padStart(2, '0');
        semanasData.push({
            id: i,
            titulo: `Semana ${i}: Tema Avanzado`,
            desc: "Contenido pendiente de subir o en desarrollo.",
            content: `<h3>Semana ${i}: Tema Avanzado</h3><p>Detalles no disponibles todavía.</p>`,
            color: "#726d6e", // Gris por defecto
            link: `docs/Semana${weekNum}.pdf`,
            gdoc: "#"
        });
    }

    // --- RENDERIZADO DE TARJETAS ---
    if (gridContainer) {
        gridContainer.innerHTML = ''; // Limpiar mensaje de carga
        
        semanasData.forEach((semana, index) => {
            const card = document.createElement('div');
            card.className = 'task-card';
            // Animación escalonada (delay)
            card.style.animationDelay = `${index * 0.05}s`;

            card.innerHTML = `
                <div class="task-icon-container" style="background-color: ${semana.color};">
                    <span class="task-initials">S${semana.id}</span>
                </div>
                <div class="task-details">
                    <span class="task-title">${semana.titulo}</span>
                    <span class="task-desc">${semana.desc}</span>
                    <div class="task-actions">
                        <i class="fas fa-eye" onclick="openPreview(${semana.id})" title="Vista Previa"></i>
                        <a href="${semana.link}" download style="color:inherit;"><i class="fas fa-file-download" title="Descargar"></i></a>
                        <a href="${semana.gdoc}" target="_blank" style="color:inherit;"><i class="fas fa-external-link-alt" title="Ver online"></i></a>
                    </div>
                </div>
            `;
            gridContainer.appendChild(card);
        });
        
        // Actualizar barra de progreso (ejemplo: tareas que no son 'pendientes')
        // Ajusta esta lógica según tus necesidades reales
        const completed = semanasData.filter(s => s.color !== "#726d6e").length;
        document.getElementById('progressText').innerText = `${completed}/16`;
        document.getElementById('progressBar').style.width = `${(completed/16)*100}%`;
    }

    // --- FUNCIONES DEL MODAL ---
    window.openPreview = (id) => {
        const data = semanasData.find(s => s.id === id);
        if(!data) return;

        document.getElementById('modalTitle').innerText = data.titulo;
        
        // Si el PDF existe, mostrar vista previa embebida
        if(data.link !== "#" && data.link.includes('.pdf')) {
            document.getElementById('modalBody').innerHTML = `
                <div class="pdf-preview">
                    <h4>Vista Previa del Documento</h4>
                    <div class="pdf-container">
                        <iframe src="${data.link}" width="100%" height="500px" frameborder="0">
                            <p>Tu navegador no soporta iframes. 
                            <a href="${data.link}" target="_blank">Haz clic aquí para ver el PDF</a>.</p>
                        </iframe>
                    </div>
                    <div class="pdf-info">
                        <p><strong>Archivo:</strong> ${data.link}</p>
                        <p><strong>Descripción:</strong> ${data.desc}</p>
                    </div>
                </div>
            `;
        } else {
            // Si no hay PDF, mostrar contenido por defecto
            document.getElementById('modalBody').innerHTML = data.content;
        }
        
        document.getElementById('modalDownload').href = data.link;
        document.getElementById('modalExternal').href = data.gdoc;

        modal.style.display = 'block';
        // Pequeño timeout para permitir la transición de opacidad
        setTimeout(() => modal.classList.add('show'), 10);
        document.body.style.overflow = 'hidden'; // Evitar scroll detrás
    };

    window.closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300); // Esperar a que termine la animación
    };

    // Cerrar al hacer clic fuera
    window.onclick = (event) => {
        if (event.target == modal) window.closeModal();
    };
});