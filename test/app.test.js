/**
 * Bienvenue dans le fichier de tests.
 */
var app = require('../app');
var assert = require('assert');

test('la fonction de démarrage retourne une chaîne de caractères',()=>{
    const d = app.demarrage();
    assert.equal(typeof d, 'string')
});

test('la fonction de démarrage retourne une chaîne de caractères non vide',()=>{
    const d = app.demarrage();
    assert.equal(typeof d, 'string')
    assert.notEqual(d, undefined);
    assert.notEqual(d.length, 0);
});

test('home retourne un objet json',()=>{
    const d = app.home();
    assert.notEqual(d, undefined);
    assert.equal(typeof d, 'object')
});

test('home retourne un objet json non vide',()=>{
    const d = app.home();
    assert.notEqual(d, undefined);
    assert.equal(typeof d, 'object')
    assert.notEqual(Object.keys(d).length, 0);
});

test('la fonction données retourne toutes les données de la base dans un objet json', ()=> {
    const d = app.donnees();
    assert.notEqual(d, undefined);
    assert.equal(typeof d, 'object')
    assert.equal(d.objects.length, 11);
    assert.equal(d.communication.length, 2);
});

test('la fonction comms retourne un objet json contenant une liste des modes de communications dans la clé \'communication\'', ()=>{
    const d = app.comms();
    assert.notEqual(d, undefined);
    assert.equal(typeof d, 'object')
    assert.equal(d.communication.length, 2);
    assert.deepEqual(d.communication, ['wifi', 'lorawan']);
});


test('objects renvoie la liste des objets dans un objet json',()=>{
    const d= app.objects()
    assert.notEqual(d, undefined);
    assert.equal(typeof d, 'object')
    assert.equal(Object.keys(d).length,1);
    assert.equal(Object.keys(d)[0],'objects');
    assert.equal(d.objects.length, 11)
    assert.deepEqual(d, {"objects":
    [{
        "serial":"OBJ_001",
        "type":"raspberry_TH",
        "image":"raspberry-pi-4.jpg",
        "description":"Capteur de température et d'humidité de la salle de cours du Campus de Chambéry",
        "location":"45.644065, 5.867810",
        "refresh":5,
        "status":true,
        "provisionning":{"date":"2020-03-20",
        "operator":"JPA"}},
        {"serial":"OBJ_002",
        "type":"raspberry_TH",
        "image":"raspberry-pi-4.jpg",
        "description":"Capteur de température et d'humidité de la salle de cours du Campus de Grenoble",
        "location":"45.185679, 5.727761",
        "refresh":5,
        "status":true,
        "provisionning":{"date":"2020-03-20", "operator":"JPA"}},
        {"serial":"OBJ_003",
        "type":"raspberry_TH",
        "image":"raspberry-pi-4.jpg",
        "description":"Capteur de température et d'humidité de la salle de cours du Campus de Valence",
        "location":"44.932990, 4.890915",
        "refresh":5,"status":true,"provisionning":{"date":"2020-03-20","operator":"JPA"}},{"serial":"OBJ_004","type":"raspberry_TH","image":"raspberry-pi-4.jpg","description":"Capteur de température et d'humidité de la salle de cours du Campus d'Annecy","location":"45.907998, 6.102729","refresh":5,"status":true,"provisionning":{"date":"2020-03-20","operator":"JPA"}},{"serial":"OBJ_005","type":"raspberry_AQ","image":"raspberry-pi-4.jpg","description":"Capteur de qualité de l'air de la salle de cours du Campus de Chambéry","location":"45.644065, 5.867810","refresh":5,"status":true,"provisionning":{"date":"2020-03-20","operator":"JPA"}},{"serial":"OBJ_006","type":"raspberry_AQ","image":"raspberry-pi-4.jpg","description":"Capteur de qualité de l'air de la salle de cours du Campus de Grenoble","location":"45.185679, 5.727761","refresh":5,"status":true,"provisionning":{"date":"2020-03-20","operator":"JPA"}},{"serial":"OBJ_007","type":"raspberry_AQ","image":"raspberry-pi-4.jpg","description":"Capteur de qualité de l'air de la salle de cours du Campus de Valence","location":"44.932990, 4.890915","refresh":5,"status":true,"provisionning":{"date":"2020-03-20","operator":"JPA"}},{"serial":"OBJ_008","type":"raspberry_AQ","image":"raspberry-pi-4.jpg","description":"Capteur de qualité de l'air de la salle de cours du Campus d'Annecy","location":"45.907998, 6.102729","refresh":5,"status":true,"provisionning":{"date":"2020-03-20","operator":"JPA"}},{"serial":"OBJ_009","type":"Digital_CO2","description":"Capteur de mesure du CO2 de la salle de cours du Campus de Chambéry","location":"45.644065, 5.867810","refresh":60,"status":true,"provisionning":{"date":"2020-03-20","operator":"JPA"}},{"serial":"OBJ_010","type":"arduino_acc","image":"arduino_door.jpg","description":"Capteur d'ouverture porte de la salle de cours du Campus de Chambéry","location":"45.644065, 5.867810","refresh":0,"status":true,"provisionning":{"date":"2020-03-20","operator":"JPA"}},{"serial":"OBJ_011","type":"arduino_presence","image":"arduino_presence.jpg","description":"Capteur de présence de la salle de cours du Campus de Chambéry","location":"45.644065, 5.867810","refresh":0,"status":false,"provisionning":{"date":"2020-03-20","operator":"JPA"}}
    ]});
});

test('la fonction types retourne un objet json contenant une liste des types existants dans la clé \'types\'', ()=>{
    const d = app.types();
    assert.notEqual(d, undefined);
    assert.equal(typeof d, 'object')
    assert.equal(Object.keys(d).length,1);
    assert.equal(Object.keys(d)[0],'types');
    assert.equal(typeof d.types[0], 'object');
    assert.equal(d.types.length, 5);
});

test('la fonction formats retourne un objet json contenant une liste des formats dans la clé \'formats\'',()=>{
    const d = app.formats();
    assert.notEqual(d, undefined);
    assert.equal(typeof d, 'object');
    assert.equal(Object.keys(d).length,1);
    assert.equal(Object.keys(d)[0],'formats');
    assert.equal(typeof d.formats[0], 'object');
    assert.equal(d.formats.length, 12);
});

test('la fonction objects_serials renvoie une liste avec les serials de tous les objets',()=>{
    const d = app.objects_serials();
    assert.notEqual(d, undefined);
    assert.equal(typeof d, 'object');
    assert.equal(Object.keys(d).length,1);
    assert.equal(Object.keys(d)[0],'objects');
    assert.equal(typeof d.objects[0], 'string');
    assert.equal(d.objects.indexOf('OBJ_000'), -1);
    assert.notEqual(d.objects.indexOf('OBJ_001'), -1);
    assert.notEqual(d.objects.indexOf('OBJ_005'), -1);
    assert.notEqual(d.objects.indexOf('OBJ_011'), -1);
    assert.equal(d.objects.indexOf('OBJ_015'), -1);
    assert.equal(d.objects.length, 11);
})

test("la fonction get_object_by_serial retourne l'objet demandé", ()=>{
    const f = app.get_object_by_serial;
    assert.equal(f("12345"), undefined);
    assert.equal(typeof (f("OBJ_009")), 'object' );
    assert.equal(Object.keys(f("OBJ_010")).length ,8 );
    assert.deepEqual(f("OBJ_003"), { "serial": "OBJ_003", "type": "raspberry_TH", "image": "raspberry-pi-4.jpg", "description": "Capteur de température et d'humidité de la salle de cours du Campus de Valence", "location": "44.932990, 4.890915", "refresh": 5, "status": true, "provisionning": { "date": "2020-03-20", "operator": "JPA" } });
});

test("la fonction get_object_by_operator retourne la liste d'objet demandée", ()=>{
    const f = app.get_objects_by_operator;
    assert.equal(f("12345"), undefined);
    assert.equal(typeof (f("JPA")), 'object' );
    assert.equal(Object.keys(f("JPA")).length ,1 );
    assert.equal(Object.keys(f("JPA"))[0] ,"objects" );
    assert.equal(f("JPA").objects.length ,11 );
});

test('la fonction get_types_by_comm retourne la liste des types demandés et leurs détails',()=>{
    const f = app.get_types_by_comm;
    assert.equal(f('pigeon voyageur'), undefined);
    assert.equal(f('oiseau'), undefined);
    assert.equal(typeof f("wifi"), 'object');
    assert.equal(typeof f("lorawan"), 'object');
    assert.equal(Object.keys(f("wifi")).length, 1);
    assert.equal(Object.keys(f("lorawan")).length, 1);
    assert.equal(Object.keys(f("wifi"))[0], "types");
    assert.equal(Object.keys(f("lorawan"))[0], "types");
    assert.equal(f('wifi').types.length, 3 );
    assert.equal(f('lorawan').types.length, 2 );
    assert.notDeepEqual(f('wifi').types.length, f('lorawan').types.length);
});


test('la fonction get_types_by_format retourne la liste des types demandés et leurs détails',()=>{
    const f = app.get_types_by_format;
    assert.equal(f('un format au hasard'), undefined);
    assert.equal(f('hasard'), undefined);
    assert.equal(typeof f("presence"), 'object');
    assert.equal(Object.keys(f("humidity")).length, 1);
    assert.equal(Object.keys(f("temperature"))[0], 'types');
    assert.equal(f('acc_x').types.length, 1 );
    assert.equal(f('CO2').types.length, 2 );
    assert.equal(f('distance').types.length, 1 );
});

test("la fonction filter_objects_by_comm retourne la liste d'objets demandée",()=>{
    const f = app.filter_objects_by_comm;
    assert.equal(f("oiseau"), undefined);
    assert.equal(typeof f("wifi"), 'object');
    assert.equal(typeof f("lorawan"), 'object');
    assert.equal(Object.keys(f("wifi")).length, 1);
    assert.equal(Object.keys(f("lorawan")).length, 1);
    assert.equal(Object.keys(f("wifi"))[0], "objects");
    assert.equal(Object.keys(f("lorawan"))[0], "objects");
    assert.equal(f("wifi").objects.length, 9);
    assert.equal(f("lorawan").objects.length, 2);
    assert.equal(f("lorawan").objects.length + f("wifi").objects.length, 11);
});

test("la fonction filter_objects_by_data_type retourne la liste d'objets demandée",()=>{
    const f = app.filter_objects_by_data_type;
    assert.equal(f("typenull"), undefined);
    assert.notEqual(f("boolean"), undefined);
    assert.equal(typeof f("number"), 'object');
    assert.equal(typeof f("boolean"), 'object');
    assert.equal(Object.keys(f("number")).length, 1);
    assert.equal(Object.keys(f("boolean")).length, 1);
    assert.equal(Object.keys(f("number"))[0], "objects");
    assert.equal(Object.keys(f("boolean"))[0], "objects");
    assert.equal(Object.keys(f("number").objects).length,11);
    assert.equal(Object.keys(f("boolean").objects).length,1);
    assert.notEqual(Object.keys(f("boolean").objects[0]).indexOf("sensors"),-1);
    assert.notEqual(Object.keys(f("number").objects[0]).indexOf("sensors"),-1);
});

test('la fonction get_full_object_by_serial renvoie l\'objet et tous ses détails',()=>{
    const f = app.get_full_object_by_serial;
    assert.equal(f("12345"), undefined);
    assert.equal(typeof f("OBJ_009"), 'object');
    assert.equal(f("OBJ_004").hasOwnProperty("serial"), true);
    assert.notEqual(Object.keys(f("OBJ_008")).indexOf("sensors"),-1);
    assert.notEqual(Object.keys(f("OBJ_011").sensors['distance']).indexOf("unit"),-1);
    assert.notEqual(Object.keys(f("OBJ_003").sensors['humidity']).indexOf("data_type"),-1);
    assert.notEqual(Object.keys(f("OBJ_007")).indexOf("communication"),-1);
    assert.notEqual(Object.keys(f("OBJ_007")).indexOf("default_image"),-1);
    assert.equal(f("OBJ_009").description,"Capteur de mesure du CO2 de la salle de cours du Campus de Chambéry");
});