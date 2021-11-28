'use strict';

const db = require('dbModels');

const btc_usd_changes = db.sequelize.models.btc_usd_changes;
const users = db.sequelize.models.users;
const user_guesses = db.sequelize.models.user_guesses;

const createNewGuess = async (dataParams) => {
    const options = {
        where: {
            token: 'btc-usd'
        }
    };

    let rateRecord = await btc_usd_changes.findOne(options);
    let timestamp = new Date();

    let guessRecord = await user_guesses.create({
        user_id: dataParams.userId,
        guess_price: rateRecord.current_price,
        guess: dataParams.guess,
        status: 'incorrect',
        processing_status: 'unresolved',
        timestamp
    });

    return guessRecord;
};

export const postUserGuess = async (req, res) => {
    try {
        const params = {
            userId: req.body.userId,
            guess: req.body.guess
        };
        
        const guessRecord = await createNewGuess({
            userId: params.userId,
            guess: params.guess
        });

        res.status(200).json({
            id: guessRecord.id,
            guess: guessRecord.guess,
            processing_status: guessRecord.processing_status,
            timestamp: guessRecord.timestamp
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json(error.message);
    }
};

const findOneUnresolvedGuess = async (whereParams) => {
    const options = {
        where: whereParams,
        order: [
            ['timestamp', 'ASC']
        ]
    };

    const guessRecord = await user_guesses.findOne(options);

    return guessRecord;
};

const isAtleast60SecondOld = (guessRecord) => {
    const currDateTime = new Date();
    const guessDateTime = new Date(guessRecord.timestamp);

    let diffMs = (currDateTime - guessDateTime);
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

    return diffMins >= 1;
};

const calculatePoints = async (guessRecord) => {
    let isCorrect = null;

    const options = {
        where: {
            token: 'btc-usd'
        }
    };

    let rateRecord = await btc_usd_changes.findOne(options);

    // continue only when diff is atleast 60 seconds.
    if (rateRecord !== null && isAtleast60SecondOld(guessRecord)) {
        switch (guessRecord.guess) {
        case 'up':
            isCorrect = rateRecord.current_price >= guessRecord.guess_price;
            break;
        case 'down':
            isCorrect = rateRecord.current_price < guessRecord.guess_price;
            break;
        default:
            break;
        }

        await user_guesses.update({
            status: isCorrect ? 'correct' : 'incorrect',
            processing_status: 'resolved'
        }, {
            where: {
                user_id: guessRecord.user_id,
                processing_status: guessRecord.processing_status,
                timestamp: guessRecord.timestamp
            }
        });

        let userRecord = await users.findOne({
            where: {
                id: guessRecord.user_id
            }
        });
        
        const newPoints = isCorrect ? userRecord.points + 1 : userRecord.points - 1;

        await users.update({
            points: newPoints
        }, {
            where: {
                id: guessRecord.user_id
            }
        });
    }

    return isCorrect;
};

const resolveUserGuessResponse = (res, guessRecord, isCorrect) => {
    if (isCorrect === null) {
        res.status(200).json({
            resolved: false,
            lastGuessIsCorrect: isCorrect
        });
    } else {
        res.status(200).json({
            resolved: true,
            lastGuessIsCorrect: isCorrect,
            id: guessRecord.id,
            timestamp: guessRecord.timestamp
        });
    }
};

export const resolveUserGuess = async (req, res) => {
    try {
        let isCorrect = false;

        const params = {
            user_id: req.body.userId,
            processing_status: 'unresolved'
        };
        
        const guessRecord = await findOneUnresolvedGuess(params);

        if (guessRecord !== null) {
            isCorrect = await calculatePoints(guessRecord);

            resolveUserGuessResponse(res, guessRecord, isCorrect);
        } else {
            res.status(200).json({
                resolved: true
            });
        }
    } catch (error) {
        console.log(error.message);

        res.status(500).json(error.message);
    }
};

export const getUnresolvedGuessCount = async (req, res) => {
    try {
        let count = 0;

        const params = {
            user_id: req.query.userId,
            processing_status: 'unresolved'
        };
        
        const guessRecord = await findOneUnresolvedGuess(params);

        if (guessRecord !== null) {
            count = 1;
        }

        res.status(200).json({
            count
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json(error.message);
    }
};
