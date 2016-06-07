module.exports = {
    
    ip: 'localhost',
    port: process.env.PORT || 3000,
    
    //seedDB:true,
    
    mongo: {
        uri: 'mongodb://localhost/ti_db',
        port: 27017,
        options: {
            db: {
                safe: true
            }
        }
    }
}