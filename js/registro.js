const form = document.getElementById('registerform');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const rol = document.getElementById('rol');
const fecha = document.getElementById('fecha');
const certform = document.getElementById('certform');

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateDateOfBirth = () => {
    const fechaValue = new Date(fecha.value);

    if (isNaN(fechaValue.getTime()) || fechaValue.getFullYear() < 1900 || fechaValue.getFullYear() > new Date().getFullYear()) {
        setError(fecha, 'Por favor ingrese una fecha de nacimiento válida');
    } else {
        setSuccess(fecha);
    }
};

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const rolValue = rol.value;
    const fechaValue = fecha.value;
    const certformValue = certform.value;

    if (usernameValue === '') {
        setError(username, 'Se requiere que ingrese un nombre');
    } else {
        setSuccess(username);
    }

    if (emailValue === '') {
        setError(email, 'Se requiere un correo');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Ingrese un correo electrónico válido');
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'Se requiere una contraseña');
    } else if (passwordValue.length < 8) {
        setError(password, 'La contraseña debe tener al menos 8 caracteres.');
    } else {
        setSuccess(password);
    }

    if (password2Value === '') {
        setError(password2, 'Por favor confirma tu contraseña');
    } else if (password2Value !== passwordValue) {
        setError(password2, 'Las contraseñas no coinciden');
    } else {
        setSuccess(password2);
    }

    if (!rolValue) {
        setError(rol, 'Seleccione un rol');
    } else {
        setSuccess(rol);
    }

    if (!fechaValue) {
        setError(fecha, 'Seleccione su fecha de nacimiento');
    } else {
        validateDateOfBirth(); 
    }

    if (rolValue === 'dueño' && !certformValue) {
        setError(certform, 'Por favor adjunte su certificado de dueño');
    } else {
        setSuccess(certform);
    }

    
    if (usernameValue && emailValue && isValidEmail(emailValue) && passwordValue && passwordValue.length >= 8 && password2Value === passwordValue && rolValue && fechaValue && (rolValue !== 'dueño' || (rolValue === 'dueño' && certformValue))) {
     
        window.location.href = "../Logins/suscripcion.html";
    }
};