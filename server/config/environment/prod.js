module.exports = {

    ip: process.env.IP || 'localhost',
    port: process.env.PORT || 3000,

    seedDB:true,

    mongo: {
        uri: process.env.MONGODB_URI_ALT,
        port: process.env.MONGODB_PORT,
        options: {
            db: {
                safe: true
            }
        }
    }
}
