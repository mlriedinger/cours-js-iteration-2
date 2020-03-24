/**
 * Bienvenu du coté serveur de javascript les fonctions ci-dessous
 * devront être complétées pour passer les tests et permettre au
 * client web (front-end) d'accéder à des données.
 */

 /**
  * import de la bibliothèque fs et lecture du fichier data.json.
  */
const fs = require('fs');
const rawfile=fs.readFileSync('data/data.json');
let data = JSON.parse(rawfile);


 /**
  * Cette fonction est lancée au démarrage du serveur
  * elle ne prend pas de paramètres et retourne
  * une chaîne de caractères.
  */
function demarrage(){
    return "Hello world !";
}

 /**
  * Cette fonction est exécutée lorsqu'on demande l'adresse
  * http://localhost:5000/ représentée par la route '/'.
  * Elle ne prend pas de paramètres 
  * Elle retourne un objet javascript au format json.
  */
function home(){
    var undefined = {
            name: "home",
        }
    
    return undefined;
}

 /**
  * Cette fonction est exécutée lorsqu'on demande l'adresse
  * http://localhost:5000/data représentée par la route '/data'.
  * Elle ne prend pas de paramètres.
  * Elle retourne un objet javascript contenant toutes les données.
  */
function donnees(){
    return data;
}

 /**
  * Cette fonction est exécutée lorsqu'on demande l'adresse
  * http://localhost:5000/comms représentée par la route '/comms'
  * Elle ne prend pas de paramètres.
  * Elle retourne un objet javascript contenant une liste
  * de tous les modes de communications de la base de données.
  * Cette liste sera contenu dans la clé communication
  */
function comms(){
    return {"communication":[]};
}


 /**
  * Cette fonction est exécutée lorsqu'on demande l'adresse
  * http://localhost:5000/objects représentée par la route '/objects'
  * Elle ne prend pas de paramètres.
  * Elle retourne un objet javascript contenant une liste
  * de tous les objets de la base de données.
  * Cette liste sera contenue dans la clé objects
  */
function objects(){
    return {"objects":[]};
}

 /**
  * Cette fonction est exécutée lorsqu'on demande l'adresse
  * http://localhost:5000/types représentée par la route '/types'
  * Elle ne prend pas de paramètres.
  * Elle retourne un objet javascript contenant une liste
  * des types existant et leur détail dans la base de données.
  * Cette liste sera contenu dans la clé types
  */
function types(){
    return undefined;
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/formats représentée par la route '/formats'
 * Elle ne prend pas de paramètres.
 * Elle retourne un objet javascript contenant une liste
 * des formats de donnnées existant et leur détail dans la base de données.
 * Cette liste sera contenu dans la clé formats.
 */
function formats(){
   return undefined;
}

 /**
  * Cette fonction est exécutée lorsqu'on demande l'adresse
  * http://localhost:5000/objects/serials représentée par la route '/objects/serials'
  * Elle ne prend pas de paramètres.
  * Elle retourne un objet javascript contenant une liste
  * de tous les numéros de série des objets de la base de données.
  * Cette liste sera contenue dans la clé objects
  */
function objects_serials(){
    return {"objects":[]};
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/object/serial/<serial> représentée par la route '/object/serial/:serial'
 * Elle prend le serial de l'objet en paramètre.
 * Elle retourne un objet javascript contenant seulement
 * l'objet ayant le serial passé en paramètre.
 */
function get_object_by_serial(serial){
    return serial;
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/objects/operator/<operator> représentée par la route '/objects/operator/:operator'
 * Elle prend le serial de l'objet en paramètre.
 * Elle retourne un objet javascript contenant une
 * liste des objets ayant l'opérateur passé en paramètre.
 */
function get_objects_by_operator(operator){
    return operator;
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/types/comm/<comm> représentée par la route '/types/comm/:comm'
 * Elle prend le serial de l'objet en paramètre.
 * Elle retourne un objet javascript contenant une liste de types
 * ayant pour mode de communication celui passé en paramètre.
 */
function get_types_by_comm(comm){
    return comm;
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/types/format/<format> représentée par la route '/types/format/:format'
 * Elle prend le serial de l'objet en paramètre.
 * Elle retourne un objet javascript contenant une liste de types
 * ayant pour un format de données celui passé en paramètre.
 */
function get_types_by_format(format){
    return format;
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/objects/comm/<comm> représentée par la route '/objects/comm/:comm'
 * Elle prend le serial de l'objet en paramètre.
 * Elle retourne un objet javascript contenant une liste d'objets
 * ayant pour mode de communication celui passé en paramètre.
 */
function filter_objects_by_comm(comm){
    return comm;
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/objects/data_type/<data_type> représentée par la route '/objects/data_type/:data_type'
 * Elle prend le type de donnée renvoyer par un objet en paramètre.
 * Elle retourne un objet javascript contenant une liste d'objets
 * comprenant les noms des capteurs émettant des données
 * du même type que celui passé en paramètre.
 */
function filter_objects_by_data_type(data_type){
    return data_type;
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/object/full/<serial> représentée par la route '/object/full/:serial'
 * Elle prend le serial de l'objet en paramètre.
 * Elle retourne un objet javascript contenant seulement
 * l'objet ayant le serial passé en paramètre comprenant toutes les informations possible sur cet objet.
 * Les types de données des sensors et autres informations seront regroupé dans la clé sensors de l'objet.
 */
function get_full_object_by_serial(serial){
    return serial;
}

/**
 * À partir de ce commentaire ne rien modifier.
 * le serveur est lancé, ses routes sont définies
 * d'autres opérations sont effectuées afin de pouvoir tester le code.
 */

const express =require('express');
const app = express();
app.use(express.static('public'));

// définitions des routes
app.get('/', route(home));
app.get('/data', route(donnees));
app.get('/objects', route(objects));
app.get('/comms', route(comms));
app.get('/types', route(types));
app.get('/formats', route(formats));
app.get('/objects/serials', route(objects_serials));
app.get('/object/serial/:serial', route(get_object_by_serial));
app.get('/object/full/:serial', route(get_full_object_by_serial));
app.get('/objects/operator/:operator', route(get_objects_by_operator));
app.get('/objects/comm/:comm', route(filter_objects_by_comm));
app.get('/objects/data_type/:data_type', route(filter_objects_by_data_type));
app.get('/types/comm/:comm', route(get_types_by_comm));
app.get('/types/format/:format', route(get_types_by_format));


function route(fun){
    return function(req, res){
        if( Object.keys(req.params).length!==0 ){
            res.send(fun(req.params));
        }
        return res.send(fun());
    }
}

const port=process.argv[2]=="-u"?5001:process.argv[2];
app.listen(port , function(){
    console.log(demarrage());
});

module.exports={
    "demarrage":demarrage,
    "home":home,
    "donnees":donnees,
    "objects":objects,
    "types":types,
    "formats":formats,
    "objects_serials": objects_serials,
    "get_object_by_serial": get_object_by_serial,
    "get_full_object_by_serial": get_full_object_by_serial,
    "get_objects_by_operator": get_objects_by_operator,
    "filter_objects_by_comm": filter_objects_by_comm,
    "filter_objects_by_data_type": filter_objects_by_data_type,
    "get_types_by_comm": get_types_by_comm,
    "get_types_by_format": get_types_by_format,
    "comms":comms
};