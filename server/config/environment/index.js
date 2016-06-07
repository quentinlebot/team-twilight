var path =  require('path');
var _ =     require('lodash');

var all = {
    env: process.env.NODE_ENV,
    
    root: path.normalize(__dirname + '/../../..'),
    
    seedDB: false,
    
    secrets: {
        session: 'team-twilight-secret'
    },

    userRoles: ['Administrateur', 'Player'],
    adminRoleIndex: 0,
    defaultRoleIndex: 1
}

module.exports = _.merge(all, require('./' + all.env + '.js'));
