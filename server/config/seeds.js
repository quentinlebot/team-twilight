﻿var User = require('../api/user/user.model');
var Tile = require('../api/tile/tile.model');
var Race = require('../api/race/race.model');
var config = require('./environment');

User.find({}).remove(function () {
    User.create({
        provider: 'local',
        role: config.userRoles[config.adminRoleIndex],
        login: 'Admin',
        password: 'Passw0rd2015Twilight'
    },{
        provider: 'local',
        role: config.userRoles[config.defaultRoleIndex],
        login: 'Quentin',
        password: 'admin'
    },{
        provider: 'local',
        role: config.userRoles[config.defaultRoleIndex],
        login: 'Fabien',
        password: 'admin'
    },{
        provider: 'local',
        role: config.userRoles[config.defaultRoleIndex],
        login: 'Anthony',
        password: 'admin'
    },{
        provider: 'local',
        role: config.userRoles[config.defaultRoleIndex],
        login: 'Thomas',
        password: 'admin'
    },{
        provider: 'local',
        role: config.userRoles[config.defaultRoleIndex],
        login: 'Georges',
        password: 'admin'
    },{
        provider: 'local',
        role: config.userRoles[config.defaultRoleIndex],
        login: 'J-F',
        password: 'admin'
    }, function () {
        console.log('Création des utilisateurs');
    }
    );
});


Tile.find({}).remove(function () {
    var systems = [{
            name: Tile.MECATOL,
            path: 'MecatolRex.gif',
            type: Tile.OTHER,
            ressource: 1,
            influence: 6,
            techno: ''
        }, {
            name: Tile.NEXUS,
            path: 'WHNexus.gif',
            type: Tile.OTHER,
            ressource: 0,
            influence: 3,
            techno: ''
        }, {
            name: 'The Ghosts of Creuss',
            path: 'GhostOfCreuss.gif',
            type: Tile.OTHER,
            ressource: 4,
            influence: 2,
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
        }, {
            name: Tile.NEUTRAL,
            path: 'Home.gif',
            type: Tile.HOME,
            ressource: 0,
            influence: 0,
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
        }, {
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
    
    for (var data in systems) {
        var tile = new Tile();
        tile.name = systems[data].name;
        tile.type = systems[data].type;
        tile.path = tile.build_Path(systems[data].path);
        tile.ressource = systems[data].ressource;
        tile.influence = systems[data].influence;
        tile.x = 0;
        tile.y = 0;
        tile.i = 0;
        tile.j = 0;
        tile.k = 0;
        if(systems[data].name === Tile.NEXUS){
            tile.x = -9;
            tile.y = -5;
        }
        tile.save();
    };

    console.log('Création des systemes');
});

Race.find({}).remove(function () {
    Race.create({
        _id : 1,
        path : 'assets/images/races/logo/FederationOfSol_V2.gif',
        name : 'Federation of Sol'
    }, {
        _id : 2 ,
        path : 'assets/images/races/logo/TheBaronyOfLetnev.gif',
        name : 'The Barony of Letnev'
    }, {
        _id : 3,
        path : 'assets/images/races/logo/TheEmiratesOfHacan.gif',
        name : 'The Emirates of Hacan'
    }, {
        _id : 4,
        path : 'assets/images/races/logo/TheL1z1xMindnet.gif',
        name : 'The L1Z1X Mindnet'
    }, {
        _id : 5,
        path : 'assets/images/races/logo/TheMentakCoalition.gif',
        name : 'The Mentak Coalition'
    }, {
        _id : 6,
        path : 'assets/images/races/logo/TheNaaluCollective.gif',
        name : 'The Naalu Collective'
    }, {
        _id : 7,
        path : 'assets/images/races/logo/TheSardakkN\'orr.gif',
        name : 'Sardakk N’orr'
    }, {
        _id : 8,
        path : 'assets/images/races/logo/TheUniversitiesOfJol-Nar.gif',
        name : 'The Universities of Jol-Nar'
    }, {
        _id : 9,
        path : 'assets/images/races/logo/TheXxchaKingdom.gif',
        name : 'The Xxcha Kingdom'
    }, {
        _id : 10,
        path : 'assets/images/races/logo/TheYssarilTribes.gif',
        name : 'The Yssaril Tribes'
    }, {
        _id : 11,
        path : 'assets/images/races/logo/TheYinBrotherhood.gif',
        name : 'The Brotherhood of Yin'
    }, {
        _id : 12,
        path : 'assets/images/races/logo/TheClanOfSaar.gif',
        name : 'The Clan of Saar'
    }, {
        _id : 13,
        path : 'assets/images/races/logo/TheEmbersOfMuaat.gif',
        name : 'The Embers of Muaat'
    }, {
        _id : 14,
        path : 'assets/images/races/logo/TheNekroVirus.gif',
        name : 'The Nekro Virus'
    }, {
        _id : 15,
        path : 'assets/images/races/logo/TheWinnu.gif',
        name : 'The Winnu'
    }, {
        _id : 16,
        path : 'assets/images/races/logo/TheGhostsOfCreuss.gif',
        name : 'Ghost of Creuss'
    }, {
        _id : 17,
        path : 'assets/images/races/logo/TheArborec.gif',
        name : 'The Arborec'
    });
console.log('Création des races');
});