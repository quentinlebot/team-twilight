module.exports = {
    
    ip: '192.168.0.27',
    port: process.env.PORT || 3000,
    
    //seedDB:true,
    
    mongo: {
        uri: 'mongodb://192.168.0.27/ti_db',
        port: 27017,
        options: {
            db: {
                safe: true
            }
        }
    }
}