
/**
 * Fonction à appeler au chargement de la page
 * Cette fonction devra exécuter les actions suivantes :
 *    - charger la liste des objets depuis l'API
 *    - charger les données des objets dans la table
 */
function load_components(){
    console.log("Chargement des données de la page");
    $.get('http://localhost:5000/objects', function(data){
       console.log(data);
    })
    // Ajouter ici le code permettant de charger dynamiquement les éléments de la page
}

// Solution 1 pour appeler la fonction load_components()

// load_components();

function add_line_to_table(data){
    let line =  '<tr>\
                    <td>' + data.serial + '</td>\
                    <td><img src="./static/images/' + data.image + '"/></td>\
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