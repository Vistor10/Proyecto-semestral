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
                required: 'Elige la fecha de visita'
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
    });

    $('#critiquesTable').on('click', '.edit-critique', function() {
        editCritique(this);
    });

    $('#critiquesTable').on('click', '.delete-critique', function() {
        deleteCritique(this);
    });
});

function addCritiques(){
    let restaurantSelection = $('#restaurantSelection').val();
    let opinionTable = $('#opinionTable').val();
    let dateVisit = $('#dateVisit').val();
    let calificacion = $('input[name="rating"]:checked').val(); 

    $('#critiquesTable tbody').append(`
        <tr>
            <td>${restaurantSelection}</td>
            <td>${dateVisit}</td>
            <td>${calificacion} estrella(s)</td> <!-- Mostrar la calificación en la tabla -->
            <td>${opinionTable}</td>
            <td>
                <button class="btn btn-primary btn-sm edit-critique"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-primary btn-sm delete-critique"><i class="bi bi-trash"></i></button>
            </td>
        </tr>
    `);
}

function editCritique(button){
    var row = $(button).closest('tr');
    var cols = row.children('td');
    if(button.textContent === 'Editar'){
        var currentRestaurant = $(cols[0]).text().trim();
        var selectOptions = `<select>`;
        $('#restaurantSelection option').each(function() {
            var optionValue = $(this).val();
            var selected = (optionValue === currentRestaurant) ? 'selected' : '';
            selectOptions += `<option value="${optionValue}" ${selected}>${optionValue}</option>`;
        });
        selectOptions += `</select>`;
        $(cols[0]).html(selectOptions); // Nombre del restaurante editable
        $(cols[1]).html(`<input type="date" value="${$(cols[1]).text()}">`); // Fecha de visita editable
        // Calificación editable con estrellas
        $(cols[2]).html(`
            <div class="rating" name="rRating">
                <input type="radio" id="star5_edit" name="rating_edit" value="5" ${(parseInt($(cols[2]).text()) === 5) ? 'checked' : ''}>
                <label for="star5_edit">★</label>
                <input type="radio" id="star4_edit" name="rating_edit" value="4" ${(parseInt($(cols[2]).text()) === 4) ? 'checked' : ''}>
                <label for="star4_edit">★</label>
                <input type="radio" id="star3_edit" name="rating_edit" value="3" ${(parseInt($(cols[2]).text()) === 3) ? 'checked' : ''}>
                <label for="star3_edit">★</label>
                <input type="radio" id="star2_edit" name="rating_edit" value="2" ${(parseInt($(cols[2]).text()) === 2) ? 'checked' : ''}>
                <label for="star2_edit">★</label>
                <input type="radio" id="star1_edit" name="rating_edit" value="1" ${(parseInt($(cols[2]).text()) === 1) ? 'checked' : ''}>
                <label for="star1_edit">★</label>
            </div>
        `);
        $(cols[3]).html(`<textarea rows="4">${$(cols[3]).text()}</textarea>`); // Opinión editable
        $(button).text('Guardar').removeClass('btn-info').addClass('btn-success');
        $(button).next().text('Cancelar').removeClass('btn-danger').addClass('btn-warning');
    } else {
        $(cols[0]).text($(cols[0]).find('select').val());
        $(cols[1]).text($(cols[1]).find('input').val());
        $(cols[2]).text($(cols[2]).find('input:checked').val() + ' estrella(s)');
        $(cols[3]).text($(cols[3]).find('textarea').val());
        $(button).text('Editar').removeClass('btn-success').addClass('btn-info');
        $(button).next().text('Eliminar').removeClass('btn-warning').addClass('btn-danger');
    }
}

function deleteCritique(button){
    if(button.textContent === 'Cancelar'){
        var row = $(button).closest('tr');
        var cols = row.children('td');
        $(cols)[0].text($(cols[0]).find('select').val());
        $(button).prev().text('Editar').removeClass('btn-success').addClass('btn-info');
        $(button).text('Eliminar').removeClass('btn-warning').addClass('btn-danger');
    } else {
        $(button).closest('tr').remove();
    }
} 