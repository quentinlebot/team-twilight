module.exports = {
    
    ip: '192.168.1.26',
    port: process.env.PORT || 3000,
    
    seedDB:true,
    
    mongo: {
        uri: 'mongodb://192.168.1.26/ti_db',
        port: 27017,
        options: {
            db: {
                safe: true
            }
        }
    }
}