
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
    if (data.image == undefined){                           // Si l'objet n'a pas d'image
        // console.log(data.type);
        load_default_image(data.type, data.serial);         // Alors, on appelle la fonction qui charge l'image par défaut, qui prend en paramètre le type et le n° de série
        // console.log(load_default_image(data.type));
    }
    else image = data.image;                                // Sinon, on charge l'image

    let line =  '<tr class="table_row">\
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
        for (let element in data.types){                           // Pour chaque objet de data.types
            if (element == type){                                  // Si l'objet correspond au type passé en paramètre
                // console.log(data.types[element].default_image);
                image = data.types[element].default_image;          // On charge l'image par défaut dans image
                // Solution en jQuery

                // console.log(image);
                // console.log('Data Serial :' + serial);
                // console.log('Data image :' + image);
                // console.log(document.getElementsByTagName(`td:contains(${data.objects.serial})`));
                
                // $('td:contains('+serial+')').next().children().attr('src', '/static/images/'+image);
                

                // Solution en vanilla
                let getTableRow = document.getElementById('table_body').children;       // On cible tous les tr du tableau 
                // console.log(getTd);
                for (let i = 0 ; i < (getTableRow.length - 1); i++){                    // On parcourt le tableau
                    // console.log(getTableRow[i].children[0].textContent);
                    if (getTableRow[i].children[0].textContent == serial){              // Si le texte de la 1ère ligne correspond au n° de série en paramètre
                        getTableRow[i].children[1].innerHTML='<img src="./static/images/' + image + '"/>';      // Alors on remplace l'image undefined par l'image par défaut
                    }
                }
                return image;
            }
        }   
    });
}

// load_default_image('Digital_CO2');       // Test