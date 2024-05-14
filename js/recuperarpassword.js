const form = document.getElementById('savepassword');
const email = document.getElementById('email');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

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
}

const validateInputs = () => {

    const emailValue = email.value.trim();

    if(emailValue === '') {
        setError(email, 'Se requiere un correo');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Ingrese un correo electronico valido');
    } else {
        setSuccess(email);
    }

    document.getElementById("miBoton").addEventListener("click", function() {
        // Redirigir a otra página
        window.location.href = "https://www.ejemplo.com/pagina-de-destino";
    });

};