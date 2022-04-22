var mysql = require("mysql2/promise");
const { db } = require('../config.json');

const pool = mysql.createPool({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
});

function serverExists(guildId){
    const existPromise = new Promise( (resolve) => {
        setTimeout(async () => {
            let rows = await pool.query(`SELECT EXISTS(SELECT * FROM servers WHERE serverID = ${guildId});`);
            const serverExists = Boolean(rows.keys().next().value)
            resolve(serverExists);
        }, 2000);
    });
    return existPromise
}


module.exports = { pool, serverExists }
