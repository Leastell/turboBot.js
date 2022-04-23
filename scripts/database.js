var mysql = require("mysql2/promise");
const { db } = require('../config.json');

let channelDict = {}

const pool = mysql.createPool({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
});

function guildExists(guildId){
    const existPromise = new Promise( (resolve) => {
        setTimeout(async () => {
            let rows = await pool.query(`SELECT EXISTS(SELECT * FROM ${db.guildTable} WHERE guildId = ?);`, [guildId]);
            const key = Object.keys(rows[0][0])[0]
            const guildExists = Boolean(rows[0][0][key])
            resolve(guildExists);
        }, 2000);
    });
    return existPromise
}

async function updateChannels(guildId, channels){
    await pool.query(`DELETE FROM ${db.channelTable} WHERE guildId = ?`, [guildId])
    for (const channelId of channels) {
        await pool.query(`INSERT INTO ${db.channelTable} (channelId, guildId) VALUES(?,?)`, [channelId, guildId])
    }
    refreshChannelDict()
}

function initializeGuild(guildId, channels){
    pool.query(`INSERT INTO ${db.guildTable} (guildId) VALUES(?)`, [guildId])
    updateChannels(guildId, channels)
}

async function refreshChannelDict(){
    channelDict = {}
    let rows = await pool.query(`SELECT * from ${db.channelTable}`);
    for (const row of rows[0]) {
        if (row.guildId in channelDict){
            channelDict[row.guildId].push(row.channelId)
        } else {
            channelDict[row.guildId] = [row.channelId]
        }
    }
}

module.exports = { pool, channelDict, guildExists, updateChannels, initializeGuild, refreshChannelDict }
