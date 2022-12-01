const redisClient = require('../helpers/redis_client');


async function setCart(username, item, count) {
    try {
        if (count < 0){
            await redisClient.hDel('cart:' + username, item);
        } else {
            await redisClient.hSet('cart:' + username, item, count);
        }
    } catch (error) {
        throw error
    }
}

async function getAllCart( username ) {
    try {
        const data = await redisClient.hGetAll('cart:' + username);
        return data;
        
    } catch (error) {
        throw error;
    }
}


module.exports = {
    setCart,
    getAllCart
}