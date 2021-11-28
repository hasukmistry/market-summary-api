'use strict';

const db = require('dbModels');

const axios = require('axios');

const btc_usd_changes = db.sequelize.models.btc_usd_changes;

const findOrCreateRateChange = async (dataParams, whereParams) => {
    const options = {
        where: whereParams
    };

    let timestamp = new Date();
    let rateRecord = await btc_usd_changes.findOne(options);

    if (rateRecord === null) {
        rateRecord = await btc_usd_changes.create({ token: 'btc-usd', current_price: dataParams.current_price, timestamp });
    } else {
        // record found lets update current price and last price
        await btc_usd_changes.update({ current_price: dataParams.current_price }, options);
    }

    return rateRecord;
};

const getLiveRates = async () => {
    let endpoint = 'https://api.blockchain.com/v3/exchange/tickers/BTC-USD';

    let response = await axios.get(endpoint, {});

    return response;
};

export const getCurrentMarketRate = async (req, res) => {
    try {
        let response = await getLiveRates();

        if (response.status === 200) {
            let rates = response.data;

            await findOrCreateRateChange({
                current_price: rates.last_trade_price
            }, {
                token: 'btc-usd'
            });

            res.status(200).json(rates);
        } else {
            res.status(response.status).json(response.data);
        }
    } catch (error) {
        console.log(error.message);

        res.status(500).json(error.message);
    }
};
