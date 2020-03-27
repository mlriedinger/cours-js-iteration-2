
/**
 * Fonction à appeler au chargement de la page
 * Cette fonction devra exécuter les actions suivantes :
 *    - charger la liste des objets depuis l'API
 *    - charger les données des objets dans la table
 */
function load_components(){
    console.log("Chargement des données de la page");
    $.get('http://localhost:5000/objects', function(data){
        for (let element of data.objects){
            // console.log(element);
            add_line_to_table(element);
        }
    })
}

// Solution 1 pour appeler la fonction load_components()
// load_components();

function add_line_to_table(data){
    let image;
    if (data.image == undefined){
        // console.log(data.type);
        load_default_image(data.type, data.serial);
        // console.log(load_default_image(data.type));
    }
    else image = data.image;

    let line =  '<tr>\
                    <td>' + data.serial + '</td>\
                    <td><img src="./static/images/' + image + '"/></td>\
                    <td>' + data.description + '</td>\
                    <td><input type="checkbox"></td>\
                    <td><input type="button" class="btn btn-dark" value="Détails"></td>\
                </tr>';

    document.getElementById("table_body").innerHTML += line;
    console.log('L\'élément a été ajouté.');
}

let object_data = {
    "serial": "OBJ_001",
    "type": "raspberry_TH",
    "image": "raspberry-pi-4.jpg",
    "description": "Capteur de température et d'humidité de la salle de cours du Campus de Chambéry",
    "location": "45.644065, 5.867810",
    "refresh": 5,
    "status": true,
    "provisionning":{
        "date": "2020-03-20",
        "operator": "JPA"
        }
   }
   
function load_default_image(type, serial){
    
    $.get('http://localhost:5000/data', function(data){
      
    let image;
        for (let element in data.types){
            if (element == type){
                // console.log(data.types[element].default_image);
                image = data.types[element].default_image;
                // console.log(image);
                $('td:contains('+serial+')').next().children().attr('src', '/static/images/'+image);
                console.log('Data Serial :' + serial);
                console.log('Data image :' + image);
                // console.log(document.getElementsByTagName(`td:contains(${data.objects.serial})`));
                return image;
            }
        }   
    });
}

// load_default_image('Digital_CO2');