document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Credenciales de ejemplo
    const validUsername = "admin";
    const validPassword = "1234";

    if (username === validUsername && password === validPassword) {
        // Si las credenciales son correctas, redirige a la página de inventario (por ejemplo, inventario.html)
        window.location.href = "paginaprincipal.html";
    } else {
        // Si las credenciales son incorrectas, muestra un mensaje de error
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
    }
});

function updateDateTime(){
    const now =new Date();
    const date=now.toLocaleDateString('es-MX',{
day:'2-digit',
month:'2-digit',
year:"numeric",
    });
    const time=now.toLocaleTimeString(es-MX,{
        hour:"2-digit",
        minute:"2-digit",
    });

    document.getElementById('date').textContent=`Fecha: ${date}`;
    document.getElementById('time').textContent=`Hora: ${time}`;
}

//Obtener usuario activo
function getActiveUser(){
    const user=localStorage.getItem('activeUser')||'Invitado';
    document.getElementById('user').textContent=`Usuario: ${user}`;
}

//Redirigir a otra pagina
function navigate(page){
    window.location.href=page;
}
//inicializar funciones al cargar la pagina

document.addEventListener('DOMContentLoaded',()=>{
    updateDateTime();
    getActiveUser();
})