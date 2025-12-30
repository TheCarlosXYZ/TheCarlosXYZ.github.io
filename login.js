.htmldocument.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    // Datos de login correctos
    const correctUsername = 'TheCarlosXYZ';
    const correctPassword = 'r/TheCarlosXYZ@2019';

    if (usernameInput === correctUsername && passwordInput === correctPassword) {
        // Si los datos son correctos, redirige a la página principal
        messageElement.textContent = 'Acceso concedido. Redirigiendo...';
        messageElement.style.color = '#28a745'; // Color verde para éxito
        window.location.href = 'index.html'; // Redirige a la página de perfil
    } else {
        // Si los datos son incorrectos, muestra un mensaje de error
        messageElement.textContent = 'Usuario o contraseña incorrectos.';
        messageElement.style.color = '#dc3545'; // Color rojo para error
    }
});
