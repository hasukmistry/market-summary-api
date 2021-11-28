# Market Summary API Serivce App

An API service for market summary app. It contains initial routes to run front-end app. 

## Table of content
- [Dependencies](#dependencies)
- [Setup](#setup)
- [Available Endpoints](#available-endpoints)
- [How it works?](#how-it-works)

## Dependencies
Make sure to install docker, docker-compose and make command utilities in your local machine.

## Setup
```
make setup
```

## Available Endpoints
|**Endpoint**   |**Method**   |**Description**   |
|:---|:---|:---|
|`/rate`|*GET*|Fetches the current BTC rate in USD.|
|`/user`|*GET*|Fetches the details for active user.|
|`/guess/unResolved?userId=${user_id}`|*GET*|Verifies if there is an active unResolved guess.|
|`/guess`|*POST*|Creates new guess.|
|`/guess/resolve`|*POST*|Resolves guess when its atleast 60 seconds old.|

## How it works?
Once database server is up and running in your local machine.

Try to make below CURL request in console,
```
curl http://localhost:5000/rate -X GET
```
Expected Output:
```
{"symbol":"BTC-USD","price_24h":54987,"volume_24h":200.53651812,"last_trade_price":54340.6}
```