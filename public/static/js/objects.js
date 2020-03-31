
/**
 * Fonction à appeler au chargement de la page
 * Cette fonction devra exécuter les actions suivantes :
 *    - charger la liste des objets depuis l'API
 *    - charger les données des objets dans la table
 */
function load_components(){
    // console.log("Chargement des données de la page");
    $.get('/objects', function(data){
        for (let element of data.objects){
            // console.log(element);
            add_line_to_table(element);
        };
    });
}

// load_components();                                                   // Solution 1 pour appeler la fonction load_components()

/* Fonction qui ajoute une ligne 
dans le tableau pour chaque objet*/
function add_line_to_table(data){
    let image;
    if (data.image == undefined){                                       // Si l'objet n'a pas d'image
        // console.log(data.type);
        load_default_image(data.type, data.serial);                     // Alors, on appelle la fonction qui charge l'image par défaut, qui prend en paramètre le type et le n° de série
        // console.log(load_default_image(data.type));
    }
    else image = data.image;                                            // Sinon, on charge l'image

    let line =  `<tr class="table_row">
                    <td>${data.serial}</td>
                    <td><img src="./static/images/${image}"/></td>
                    <td>${data.description}</td>
                    <td>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" ${(data.status) ? "checked" : ""}/>
                        </div>
                    </td>
                    <td>
                        <div class="content" id="content_div">
                            <input type="button" class="btn btn-dark" value="Détails" data-toggle="modal" data-target="#modal-details" onClick="load_modale(this.parentElement.parentElement.parentElement.children[0].innerText)">
                        </div>
                    </td>
                </tr>`;

    // document.getElementById("table_body").innerHTML += line;         // Solution vanilla
    $("#table_body").append(line);                                      // Solution jQuery

    console.log('L\'élément a bien été ajouté.');
}

// let object_data = {                                                  // Test fonction add_line_to_table()
//     "serial": "OBJ_001",
//     "type": "raspberry_TH",
//     "image": "raspberry-pi-4.jpg",
//     "description": "Capteur de température et d'humidité de la salle de cours du Campus de Chambéry",
//     "location": "45.644065, 5.867810",
//     "refresh": 5,
//     "status": true,
//     "provisionning":{
//         "date": "2020-03-20",
//         "operator": "JPA"
//         }
//    }
   
function load_default_image(type, serial){
    
    $.get('/data', function(data){
      
    let image;
        for (let element in data.types){                                                // Pour chaque objet de data.types
            if (element == type){                                                       // Si l'objet correspond au type passé en paramètre
                // console.log(data.types[element].default_image);
                image = data.types[element].default_image;                              // On charge l'image par défaut dans image
                
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
                        getTableRow[i].children[1].innerHTML=`<img src="./static/images/${image}"/>`;      // Alors on remplace l'image undefined par l'image par défaut
                    };
                };
                return image;
            };
        };   
    });
}

// load_default_image('Digital_CO2');                                                               // Test

function update_modale(serial){
    $.get('/data', function(data){
        $('.col-4:nth-child(2)').html('');

        for (let key in data.objects){
            // console.log(data.objects[element].serial);

            if (data.objects[key].serial == serial){                                                // Si le n° de série correspond
                $('#serialNumber').html(`N° de série : ${data.objects[key].serial}`);               // On affiche le n° de série
                // console.log($('#serialNumber').append(data.objects[element].serial));
                // console.log($('#serialNumber').text());
                $('#type').html(`Type : ${data.objects[key].type}`);                                // On affiche le type
                $('#status').html(`${data.objects[key].status ? "Connecté" : "Non connecté"}`).css(data.objects[key].status ? {"background-color":"#339966","color":"#ffffff"} : {"background-color":"#ff4d4d","color":"#ffffff"});                          // On affiche le statut
                $('#image').attr('src', '/static/images/'+ data.objects[key].image);                // On affiche l'image de l'objet - il manque l'image par défaut !
            
                for (let key2 in data.types){
                    
                if (data.objects[key].type == key2){                                                // Si le type correspond
                        
                        for (let key3 in data.types[key2].sensors){                                 // Pour chaque sensor de l'objet
                            // console.log(data.types[key2].sensors[key3]);
                            let lineSensor = `
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title" id="sensor">Capteur : ${data.types[key2].sensors[key3]} </h5>
                                    </div>
                                            
                                </div>`;
                            $('.col-4:nth-child(2)').append(lineSensor);                            // On ajoute une ligne pour chaque sensor
                        
                        for (let key4 in data.data_formats){                    
                            
                            if (data.types[key2].sensors[key3] == key4){                            // Si le sensor correspond
                                // console.log(data.data_formats[key4].data_type);
                                // console.log(data.data_formats[key4].unit);
                                let lineType = `                                
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item" id="type">Type : ${data.data_formats[key4].data_type} </li>
                                        <li class="list-group-item" id="unit">Unit : ${data.data_formats[key4].unit} </li>
                                    </ul>`;
                                $('.col-4:nth-child(2)').append(lineType);                          // On ajoute une ligne data_type et unit pour chaque sensor
                            };
                        };                
                        };
                    };
                };
                var location = data.objects[key].location.split(', ');                              // On crée un tableau avec les coordonnées géographiques
                console.log(data.objects[key].location.split(', '));
                
                let mymap;
                var container = L.DomUtil.get('mapId'); if (container != null) { container._leaflet_id = null; };   // On vide le container pour pouvoir afficher une nouvelle carte à chaque clic sur un bouton
    
                mymap = L.map('mapId').setView([location[0], location[1]], 10);                     // On charge les coordonnées geographiques de chaque objet pour créer la carte
                let marker = L.marker([location[0], location[1]]).addTo(mymap);                     // On charge les coordonnées géographiques de chaque objet pour créer le marqueur
                marker.bindPopup("<b>Hey c'est moi !</b><br>C'est Butters !").openPopup();          // On affiche un message en pop-up sur le marqueur, parce que Butters a des choses à dire
        
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoibWxvd2l0aGFjb2NvIiwiYSI6ImNrOGZ0Yjh2bjA2ZHgzbnBlMWkyZDQ4bHYifQ.qHvP5XsgA-xSGhRS80ntdw'             // On ajoute le token
                }).addTo(mymap);
            };
        };
        
    });
}

// function test_update_modale(serial){                                                               // Test
//     update_modale(serial);
// }

// test_update_modale('OBJ_004');                                                                     // Test

function load_modale(button){
    console.log(button);
    update_modale(button);
}