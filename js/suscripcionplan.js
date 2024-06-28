document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('suscribeform');
    var select = document.querySelector('#subscription select');

    form.addEventListener(function(event) {
        if (subscription.value === 'selectionuser') {
            alert('Por favor, selecciona una suscripción.');
            event.preventDefault();
        }

        else {
            window.location.href = "../Logins/suscripcionrealizada.html";
        }

    });
});
