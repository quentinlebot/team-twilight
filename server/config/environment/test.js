module.exports = {
    
    ip: '127.0.0.1',
    port: process.env.PORT || 3000,
    
    //seedDB:true,
    
    mongo: {
        uri: 'mongodb://127.0.0.1/ti_db',
        port: 27017,
        options: {
            db: {
                safe: true
            }
        }
    }
}