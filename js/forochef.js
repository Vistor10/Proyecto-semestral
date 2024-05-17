$(document).ready(function(){
    $('#formGeneralChef').validate({
        rules: {
            IngresoNRestaurant: {
                required: true
            },
            IngresarDireccion: {
                required: true
            },
            Sugerencia: {
                required: true
            }
            
        },
        messages: {
            IngresoNRestaurant: {
                required: "Debe ingresar un nombre"
            },
            IngresarDireccion: {
                required: "Debe ingresar una dirección"
            },
            Sugerencia: {
                required: 'Ingrese una descripción de su restaurante'
            }
        }
    })
});