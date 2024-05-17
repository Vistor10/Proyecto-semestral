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

            <td>
                <button class="btn btn-primary btn-sm edit-critique" onclick="editCritique(this)"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-primary btn-sm delete-critique" onclick="deleteCritique(this)"><i class="bi bi-trash"></i></button>
            </td>
    `);
}

function editCritique(button){
    var row = $(button).closest('tr');
    var cols = row.children('td');
    if(button.textContent === 'Editar'){
        $(cols[0]).html(`<input type="date" value="${$(cols[0]).text()}"`);
        $(cols[1]).html(`<input type="text" value="${$(cols[1]).text()}"`);
        $(button).text('Guardar').removeClass('btn-info').addClass('btn-success');
        $(button).next().text('Eliminar').removeClass('btn-danger').addClass('btn-warning');
    } else {
        $(cols[0]).text($(cols[0]).find('select').val());
        $(cols[1]).text($(cols[1]).find('input').val());
        $(button).text('Editar').removeClass('btn-success').addClass('btn-info');
        $(button).next().text('Eliminar').removeClass('btn-warning').addClass('btn-danger');
    }
}

function deleteCritique(button){
    if(button.textContent === 'Cancelar'){
        var row = $(button).closest('tr');
        var cols = row.children('td');
        $(cols)[0].text($(cols[0]).find('input').val());
        $(cols)[1].text($(cols[1]).find('input').val());
        $(button).prev().text('Editar').removeClass('btn-success').addClass('btn-info');
        $(button).text('Eliminar').removeClass('btn-warning').addClass('btn-danger');
    } else {
        $(button).closest('tr').remove();
    }
}