const prismaClient = require('../helpers/prisma_client');


async function getAllOrder(userId) {
    try {
        const result = await prismaClient.donhang.findMany({
            where : {
                khachhangid : userId
            }
        });
        return result;
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllOrder
}