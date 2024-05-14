$(document).ready(function(){
    $.validator.addMethod("valueNotEquals", function(value, element, arg){
        return arg !== value;
       }, "Value must not equal arg.");
    
    $('#formGeneral').validate({
        rules: {
            restaurantSelection: {
                valueNotEquals: "Seleccionar"
            },
            dateVisit: {
                required: true
            },
            opinionTable: {
                required: true
            }
            
        },
        messages: {
            restaurantSelection: {
                valueNotEquals: "Debe seleccionar un restaurante"
            },
            dateVisit: {
                required: 'Elige la fecha de ida'
            },
            opinionTable: {
                required: 'Escribe tu opinión'
            }
        },
        submitHandler: function(form) {
            addCritiques();
            form.reset();
            return false;
        }
    })
});

function addCritiques(){
    let restaurantSelection = $('#restaurantSelection').val();
    let opinionTable = $('#opinionTable').val();
    let dateVisit = $('#dateVisit').val();
    $('#critiquesTable tbody').append(`
        <tr>
            <td>${restaurantSelection}</td>
            <td>${dateVisit}</td>
            <td>${opinionTable}</td>
    `);
}