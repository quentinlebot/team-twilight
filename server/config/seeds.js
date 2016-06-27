var User =          require('../api/user/user.model');
var Tile =          require('../api/tile/tile.model');
var TilePick =      require('../api/tilePick/tilePick.model');
var Race =          require('../api/race/race.model');
var GameMap =       require('../api/map/map.model');
var Player =        require('../api/player/player.model');
var Game =          require('../api/game/game.model');
var Season =        require('../api/season/season.model');
var GameResult =    require('../api/gameResult/gameResult.model');
var config =        require('./environment');

var _ =             require('lodash');

User.find({}).remove(function () {
    User.create({
        provider: 'local',
        role: config.userRoles[config.adminRoleIndex],
        login: 'Admin',
        password: 'password'
    }, function () {
        console.log('Création des utilisateurs');
    }
    );
});

TilePick.find({}).remove(function(){
    console.log('Suppression des tilesPick');
});

GameMap.find({}).remove(function(){
    console.log('Suppression des maps');
});

Tile.find({}).remove(function () {
    var others = [{
            name: Tile.MECATOL,
            path: 'MecatolRex.gif',
            type: Tile.OTHER,
            ressource: 1,
            influence: 6,
            techno: ''
        }, {
            name: Tile.HOME,
            path: 'Home.gif',
            type: Tile.OTHER,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: Tile.NEXUS,
            path: 'WHNexus.gif',
            type: Tile.OTHER,
            ressource: 0,
            influence: 3,
            techno: ''
    }]; 
    var anomalys = [{
            name: 'Asteroid Field',
            path: 'AsteroidField.gif',
            type: Tile.ANOMALY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Asteroid Field',
            path: 'AsteroidField.gif',
            type: Tile.ANOMALY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Asteroid Field',
            path: 'AsteroidField.gif',
            type: Tile.ANOMALY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Asteroid Field',
            path: 'AsteroidField.gif',
            type: Tile.ANOMALY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Gravity Rift',
            path: 'GravityRift_1.gif',
            type: Tile.ANOMALY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Gravity Rift',
            path: 'GravityRift_1.gif',
            type: Tile.ANOMALY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Gravity Rift Cormund',
            path: 'GravityRift_2.gif',
            type: Tile.ANOMALY,
            ressource: 2,
            influence: 0,
            techno: ''
        }, {
            name: 'Ion Storm',
            path: 'IonStorm.gif',
            type: Tile.ANOMALY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Ion Storm',
            path: 'IonStorm.gif',
            type: Tile.ANOMALY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Nebula',
            path: 'Nebula_1.gif',
            type: Tile.ANOMALY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Nebula',
            path: 'Nebula_1.gif',
            type: Tile.ANOMALY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Nebula',
            path: 'Nebula_1.gif',
            type: Tile.ANOMALY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Nebula Everra',
            path: 'Nebula_2.gif',
            type: Tile.ANOMALY,
            ressource: 3,
            influence: 1,
            techno: ''
        }, {
            name: 'Supernova',
            path: 'Supernova_1.gif',
            type: Tile.ANOMALY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Supernova',
            path: 'Supernova_1.gif',
            type: Tile.ANOMALY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Supernova max',
            path: 'Supernova_2.gif',
            type: Tile.ANOMALY,
            ressource: 0,
            influence: 0,
            techno: ''
    }]; 
    var emptys = [{
            name: 'Vide',
            path: 'Vide.gif',
            type: Tile.EMPTY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Vide',
            path: 'Vide.gif',
            type: Tile.EMPTY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Vide',
            path: 'Vide.gif',
            type: Tile.EMPTY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Vide',
            path: 'Vide.gif',
            type: Tile.EMPTY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Vide',
            path: 'Vide.gif',
            type: Tile.EMPTY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Vide',
            path: 'Vide.gif',
            type: Tile.EMPTY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Vide',
            path: 'Vide.gif',
            type: Tile.EMPTY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Vide',
            path: 'Vide.gif',
            type: Tile.EMPTY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Vide',
            path: 'Vide.gif',
            type: Tile.EMPTY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Vide',
            path: 'Vide.gif',
            type: Tile.EMPTY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Vide',
            path: 'Vide.gif',
            type: Tile.EMPTY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Vide',
            path: 'Vide.gif',
            type: Tile.EMPTY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Vide',
            path: 'Vide.gif',
            type: Tile.EMPTY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Vide',
            path: 'Vide.gif',
            type: Tile.EMPTY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Vide Wormhole A',
            path: 'Vide_WHa.gif',
            type: Tile.EMPTY,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Vide Wormhole B',
            path: 'Vide_WHb.gif',
            type: Tile.EMPTY,
            ressource: 0,
            influence: 0,
            techno: ''
    }];
    var homes =[{
            name: 'The Ghosts of Creuss',
            path: 'GhostOfCreuss.gif',
            type: Tile.HOME,
            ressource: 4,
            influence: 2,
            techno: ''
        },{
            name: 'Federation of Sol',
            path: 'FederationOfSol.gif',
            type: Tile.HOME,
            ressource: 4,
            influence: 2,
            techno: ''
        }, {
            name: 'The Creuss Gate',
            path: 'GhostOfCreuss_TheCreussGate.gif',
            type: Tile.HOME,
            ressource: 0,
            influence: 0,
            techno: ''
        }, {
            name: 'Sardakk N\'orr',
            path: 'SardakkN\'orr.gif',
            type: Tile.HOME,
            ressource: 4,
            influence: 1,
            techno: ''
        }, {
            name: 'The Arborec',
            path: 'TheArborec.gif',
            type: Tile.HOME,
            ressource: 3,
            influence: 2,
            techno: 'V'
        }, {
            name: 'The Barony Of Letnev',
            path: 'TheBaronyOfLetnev.gif',
            type: Tile.HOME,
            ressource: 6,
            influence: 1,
            techno: ''
        }, {
            name: 'The Brotherhood Of Yin',
            path: 'TheBrotherhoodOfYin.gif',
            type: Tile.HOME,
            ressource: 2,
            influence: 4,
            techno: ''
        }, {
            name: 'The Clan Of Saar',
            path: 'TheClanOfSaar.gif',
            type: Tile.HOME,
            ressource: 3,
            influence: 1,
            techno: ''
        }, {
            name: 'The Embers Of Muaat',
            path: 'TheEmbersOfMuaat.gif',
            type: Tile.HOME,
            ressource: 4,
            influence: 1,
            techno: ''
        }, {
            name: 'The Emirates Of Hacan',
            path: 'TheEmiratesOfHacan.gif',
            type: Tile.HOME,
            ressource: 3,
            influence: 2,
            techno: ''
        }, {
            name: 'The L1z1x Mindnet',
            path: 'TheL1z1xMindnet.gif',
            type: Tile.HOME,
            ressource: 5,
            influence: 0,
            techno: ''
        }, {
            name: 'The Mentak Coalition',
            path: 'TheMentakCoalition.gif',
            type: Tile.HOME,
            ressource: 4,
            influence: 1,
            techno: ''
        }, {
            name: 'The Naalu Collective',
            path: 'TheNaaluCollective.gif',
            type: Tile.HOME,
            ressource: 3,
            influence: 3,
            techno: ''
        }, {
            name: 'The Nekro Virus',
            path: 'TheNekroVirus.gif',
            type: Tile.HOME,
            ressource: 4,
            influence: 0,
            techno: ''
        }, {
            name: 'The Winnu',
            path: 'TheWinnu.gif',
            type: Tile.HOME,
            ressource: 3,
            influence: 4,
            techno: 'J'
        }, {
            name: 'The Xxcha Kingdom',
            path: 'TheXxchaKingdom.gif',
            type: Tile.HOME,
            ressource: 3,
            influence: 4,
            techno: ''
        }, {
            name: 'Universities Of Jol-Nar',
            path: 'UniversitiesOfJol-Nar.gif',
            type: Tile.HOME,
            ressource: 3,
            influence: 5,
            techno: ''
    }];
    var regulars = [{
            name: 'Abyz et Fria',
            path: 'Abyz&Fria.gif',
            type: Tile.REGULAR,
            ressource: 5,
            influence: 0,
            techno: 'B'
        }, {
            name: 'Arcturus & Sumerian',
            path: 'Arcturus&Sumerian.gif',
            type: Tile.REGULAR,
            ressource: 3,
            influence: 3,
            techno: ''
        }, {
            name: 'Arinam & Meer',
            path: 'Arinam&Meer.gif',
            type: Tile.REGULAR,
            ressource: 1,
            influence: 6,
            techno: 'B'
        }, {
            name: 'Arnor & Lor',
            path: 'Arnor&Lor.gif',
            type: Tile.REGULAR,
            ressource: 3,
            influence: 3,
            techno: 'R'
        }, {
            name: 'Ashtroth & Loki & Abaddon',
            path: 'Ashtroth&Loki&Abaddon.gif',
            type: Tile.REGULAR,
            ressource: 4,
            influence: 2,
            techno: 'R'
        }, {
            name: 'Bereg & Lirta4',
            path: 'Bereg&Lirta4.gif',
            type: Tile.REGULAR,
            ressource: 5,
            influence: 4,
            techno: 'RV'
        }, {
            name: 'Capha',
            path: 'Capha.gif',
            type: Tile.REGULAR,
            ressource: 3,
            influence: 0,
            techno: ''
        }, {
            name: 'Centauri & Gral',
            path: 'Centauri&Gral.gif',
            type: Tile.REGULAR,
            ressource: 2,
            influence: 4,
            techno: 'B'
        }, {
            name: 'Coorneeq & Resculon',
            path: 'Coorneeq&Resculon.gif',
            type: Tile.REGULAR,
            ressource: 3,
            influence: 2,
            techno: 'R'
        }, {
            name: 'DalBootha & Xxehan',
            path: 'DalBootha&Xxehan.gif',
            type: Tile.REGULAR,
            ressource: 1,
            influence: 3,
            techno: 'RV'
        }, {
            name: 'El\'Nath',
            path: 'El\'Nath.gif',
            type: Tile.REGULAR,
            ressource: 2,
            influence: 0,
            techno: 'B'
        }, {
            name: 'Faunus',
            path: 'Faunus.gif',
            type: Tile.REGULAR,
            ressource: 1,
            influence: 3,
            techno: 'VV'
        }, {
            name: 'Garbozia',
            path: 'Garbozia.gif',
            type: Tile.REGULAR,
            ressource: 2,
            influence: 1,
            techno: 'V'
        }, {
            name: 'Harcalor & Tiamat',
            path: 'Harcalor&Tiamat.gif',
            type: Tile.REGULAR,
            ressource: 2,
            influence: 2,
            techno: 'JJ'
        }, {
            name: 'Hope\'s End',
            path: 'Hope\'sEnd.gif',
            type: Tile.REGULAR,
            ressource: 3,
            influence: 0,
            techno: ''
        }, {
            name: 'Industrex',
            path: 'Industrex.gif',
            type: Tile.REGULAR,
            ressource: 2,
            influence: 0,
            techno: 'RR'
        }, {
            name: 'Lazar & Sakulag',
            path: 'Lazar&Sakulag.gif',
            type: Tile.REGULAR,
            ressource: 3,
            influence: 1,
            techno: ''
        }, {
            name: 'Lesab',
            path: 'Lesab.gif',
            type: Tile.REGULAR,
            ressource: 2,
            influence: 1,
            techno: 'V'
        }, {
            name: 'Lisis & Velnor',
            path: 'Lisis&Velnor.gif',
            type: Tile.REGULAR,
            ressource: 4,
            influence: 2,
            techno: 'R'
        }, {
            name: 'Lodor',
            path: 'Lodor.gif',
            type: Tile.REGULAR,
            ressource: 3,
            influence: 1,
            techno: 'V'
        }, {
            name: 'MeharXull',
            path: 'MeharXull.gif',
            type: Tile.REGULAR,
            ressource: 1,
            influence: 3,
            techno: 'B'
        }, {
            name: 'Mellon & Zohbat',
            path: 'Mellon&Zohbat.gif',
            type: Tile.REGULAR,
            ressource: 3,
            influence: 3,
            techno: 'B'
        }, {
            name: 'Mirage',
            path: 'Mirage.gif',
            type: Tile.REGULAR,
            ressource: 1,
            influence: 2,
            techno: ''
        }, {
            name: 'New Albion & Starpoint',
            path: 'NewAlbion&Starpoint.gif',
            type: Tile.REGULAR,
            ressource: 4,
            influence: 2,
            techno: 'V'
        }, {
            name: 'Perimeter',
            path: 'Perimeter.gif',
            type: Tile.REGULAR,
            ressource: 2,
            influence: 2,
            techno: ''
        }, {
            name: 'Primor',
            path: 'Primor.gif',
            type: Tile.REGULAR,
            ressource: 2,
            influence: 1,
            techno: ''
        }, {
            name: 'Quann',
            path: 'Quann.gif',
            type: Tile.REGULAR,
            ressource: 2,
            influence: 1,
            techno: 'V'
        }, {
            name: 'Qucen\'n & Rarron',
            path: 'Qucen\'n&Rarron.gif',
            type: Tile.REGULAR,
            ressource: 1,
            influence: 5,
            techno: 'V'
        }, {
            name: 'Rigel1 & Rigel2 & Rigel3',
            path: 'Rigel1&Rigel2&Rigel3.gif',
            type: Tile.REGULAR,
            ressource: 2,
            influence: 4,
            techno: 'VB'
        }, {
            name: 'Saudor',
            path: 'Saudor.gif',
            type: Tile.REGULAR,
            ressource: 2,
            influence: 2,
            techno: ''
        }, {
            name: 'Sem-Lore',
            path: 'Sem-Lore.gif',
            type: Tile.REGULAR,
            ressource: 3,
            influence: 2,
            techno: 'J'
        }, {
            name: 'Tar\'Mann',
            path: 'Tar\'Mann.gif',
            type: Tile.REGULAR,
            ressource: 1,
            influence: 1,
            techno: ''
        }, {
            name: 'Tempesta',
            path: 'Tempesta.gif',
            type: Tile.REGULAR,
            ressource: 1,
            influence: 1,
            techno: 'BB'
        }, {
            name: 'Tequ\'ran & Torkan',
            path: 'Tequ\'ran&Torkan.gif',
            type: Tile.REGULAR,
            ressource: 2,
            influence: 3,
            techno: 'RB'
        }, {
            name: 'Thibah',
            path: 'Thibah.gif',
            type: Tile.REGULAR,
            ressource: 1,
            influence: 1,
            techno: ''
        }, {
            name: 'Tsion & Bellatrix',
            path: 'Tsion&Bellatrix.gif',
            type: Tile.REGULAR,
            ressource: 2,
            influence: 3,
            techno: 'R'
        }, {
            name: 'Vefut 2',
            path: 'Vefut2.gif',
            type: Tile.REGULAR,
            ressource: 2,
            influence: 0,
            techno: 'R'
        }, {
            name: 'Vega Minor & Vega Major',
            path: 'VegaMinor&VegaMajor.gif',
            type: Tile.REGULAR,
            ressource: 3,
            influence: 3,
            techno: 'B'
        }, {
            name: 'Wellon',
            path: 'Wellon.gif',
            type: Tile.REGULAR,
            ressource: 1,
            influence: 2,
            techno: ''
    }];

    var systems = others;
    var systems = _.concat(systems, emptys);
    var systems = _.concat(systems, anomalys);
    var systems = _.concat(systems, homes);
    var systems = _.concat(systems, regulars);

    for (var data in systems) {
        var tile = new Tile();
        tile.name = systems[data].name;
        tile.type = systems[data].type;
        tile.path = tile.build_Path(systems[data].path);
        tile.ressource = systems[data].ressource;
        tile.influence = systems[data].influence;
        tile.save();
    };
    console.log('Création des systemes TOTAL :'+systems.length+
        ' Autres :'+    others.length+
        ' Mères :'+     homes.length+
        ' Reguliers :'+ regulars.length+
        ' Vides :'+     emptys.length);
});

Race.find({}).remove(function () {
    Race.create({
        _id : 1,
        path : 'assets/images/races/icon-sol.png',
        name : 'Federation of Sol'
    }, {
        _id : 2 ,
        path : 'assets/images/races/icon-letnev.png',
        name : 'Barony of Letnev'
    }, {
        _id : 3,
        path : 'assets/images/races/icon-hacan.png',
        name : 'Emirates of Hacan'
    }, {
        _id : 4,
        path : 'assets/images/races/logo/TheL1z1xMindnet.gif',
        name : 'L1Z1X Mindnet'
    }, {
        _id : 5,
        path : 'assets/images/races/logo/TheMentakCoalition.gif',
        name : 'Mentak Coalition'
    }, {
        _id : 6,
        path : 'assets/images/races/logo/TheNaaluCollective.gif',
        name : 'Naalu Collective'
    }, {
        _id : 7,
        path : 'assets/images/races/logo/TheSardakkN\'orr.gif',
        name : 'Sardakk N’orr'
    }, {
        _id : 8,
        path : 'assets/images/races/icon-jol-nar.png',
        name : 'Universities of Jol-Nar'
    }, {
        _id : 9,
        path : 'assets/images/races/icon-xxcha.png',
        name : 'Xxcha Kingdom'
    }, {
        _id : 10,
        path : 'assets/images/races/logo/TheYssarilTribes.gif',
        name : 'Yssaril Tribes'
    }, {
        _id : 11,
        path : 'assets/images/races/logo/TheYinBrotherhood.gif',
        name : 'Brotherhood of Yin'
    }, {
        _id : 12,
        path : 'assets/images/races/logo/TheClanOfSaar.gif',
        name : 'Clan of Saar'
    }, {
        _id : 13,
        path : 'assets/images/races/logo/TheEmbersOfMuaat.gif',
        name : 'Embers of Muaat'
    }, {
        _id : 14,
        path : 'assets/images/races/logo/TheNekroVirus.gif',
        name : 'Nekro Virus'
    }, {
        _id : 15,
        path : 'assets/images/races/logo/TheWinnu.gif',
        name : 'Winnu'
    }, {
        _id : 16,
        path : 'assets/images/races/logo/TheGhostsOfCreuss.gif',
        name : 'Ghost of Creuss'
    }, {
        _id : 17,
        path : 'assets/images/races/logo/TheArborec.gif',
        name : 'Arborec'
    });
    console.log('Création des races');
});

Player.find({}).remove(function(){
    console.log('Création des joueurs');
    Player.create({
        _id : 1,
        name : 'Fabien'
    }, {
        _id : 2 ,
        name : 'Anthony'
    }, {
        _id : 3 ,
        name : 'Thomas'
    }, {
        _id : 4 ,
        name : 'J-F'
    }, {
        _id : 5 ,
        name : 'Yohan'
    }, {
        _id : 6 ,
        name : 'Quentin'
    }, {
        _id : 7 ,
        name : 'Georges'
    }, {
        _id : 8 ,
        name : 'Quentin 2'
    });
});

Season.find({}).remove(function(){
    console.log('Création des saisons');
    Season.create({
        _id:1,
        name: "Saison 1",
        begin:new Date(2015, 06, 01),
        end:null
    });
});

Game.find({}).remove(function(){
    console.log('Création des games');
    Game.create({
        _id:1,
        _season:1
    },{
        _id:2,
        _season:1
    },{
        _id:3,
        _season:1
    },{
        _id:4,
        _season:1
    },{
        _id:5,
        _season:1
    });
});

GameResult.find({}).remove(function(){
    console.log('Création des resultats des games');
    GameResult.create({
        _game:1,
        _player:6,  //Quentin
        _race:14,   //Nekro
        point:9
    },{
        _game:1,
        _player:3,  //Thomas
        _race:17,   //Arborec
        point:6
    },{
        _game:1,
        _player:1,  //Fabien
        _race:13,   //Muat
        point:4
    },{
        _game:1,
        _player:2,  //Tony
        _race:3,   //Haccan
        point:2
    },{
        _game:1,
        _player:7,  //Georges
        _race:9,   //Xxcha
        point:0
    },{
        _game:2,
        _player:4,  //J-F
        _race:1,   //Sol
        point:9,
        bonus:1
    },{
        _game:2,
        _player:1,  //Fabien
        _race:6,   //Naalu
        point:6
    },{
        _game:2,
        _player:2,  //Tony
        _race:10,   //Yssaril
        point:4
    },{
        _game:2,
        _player:7,  //Georges
        _race:3,   //Haccan
        point:2
    },{
        _game:2,
        _player:3,  //Thomas
        _race:5,   //Mentak
        point:0
    },{
        _game:3,
        _player:2,  //Tony
        _race:1,   //Sol
        point:11
    },{
        _game:3,
        _player:1,  //Fabien
        _race:5,   //Mentak
        point:8
    },{
        _game:3,
        _player:3,  //Thomas
        _race:17,   //Arborec
        point:6
    },{
        _game:3,
        _player:7,  //Georges
        _race:10,   //Yssaril
        point:4
    },{
        _game:3,
        _player:5,  //Yohan
        _race:3,   //Haccan
        point:2
    },{
        _game:3,
        _player:6,  //Quentin
        _race:11,   //Yin
        point:1
    },{
        _game:3,
        _player:4,  //JF
        _race:9,   //Xxcha
        point:0
    },{
        _game:4,
        _player:4,  //JF
        _race:9,   //Xxcha
        point:10,
        bonus:1
    },{
        _game:4,
        _player:1,  //Fabien
        _race:15,   //Winuu
        point:7
    },{
        _game:4,
        _player:2,  //Tony
        _race:14,   //Nekro
        point:5
    },{
        _game:4,
        _player:3,  //Thomas
        _race:6,   //Naalu
        point:3
    },{
        _game:4,
        _player:5,  //Yohan
        _race:4,   //L1Z1X
        point:1
    },{
        _game:4,
        _player:6,  //Quentin
        _race:11,   //Yin
        point:0
    },{
        _game:5,
        _player:7,  //George
        _race:8,   //Jol Nar
        point:10,
        bonus:2
    },{
        _game:5,
        _player:6,  //Quentin
        _race:3,   //Haccan
        point:7
    },{
        _game:5,
        _player:3,  //Thomas
        _race:10,   //Yssaril
        point:5
    },{
        _game:5,
        _player:4,  //JF
        _race:4,   //L1Z1X
        point:3
    },{
        _game:5,
        _player:2,  //Tony
        _race:17,   //Arborec
        point:1
    },{
        _game:5,
        _player:8,  //Quentin2voisin
        _race:2,   //Letnev
        point:0
    });
});
