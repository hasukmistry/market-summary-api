'use strict';

const db = require('dbModels');

const users = db.sequelize.models.users;

const findOrCreateUser = async (whereParams) => {
    const options = {
        where: whereParams
    };

    let timestamp = new Date();
    let userRecord = await users.findOne(options);

    if (userRecord === null) {
        userRecord = await users.create({ points: 0, ip_addr: whereParams.ip_addr, timestamp });
    }

    return userRecord;
};

export const getUserByIp = async (req, res) => {
    try {
        let ipAddr = req.connection.remoteAddress;

        const whereParams = {
            ip_addr: ipAddr
        };

        const userRecord = await findOrCreateUser(whereParams);

        res.status(200).json({
            id: userRecord.id,
            points: userRecord.points,
            ip_addr: userRecord.ip_addr,
            timestamp: userRecord.timestamp
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json(error.message);
    }
};
