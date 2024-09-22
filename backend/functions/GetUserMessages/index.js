// const { username } = event.queryStringParameters || {};
// const error = new Error();

// if (username) {
//     const { Items } = await db.query({
//         TableName: "shuiMessages",
//         IndexName: "UsernameIndex",
//         KeyConditionExpression: "username = :username",
//         ExpressionAttributeValues: {
//             ":username": username,
//         },
//     });
//     if (!Items || Items.length === 0) {
//         error.message = `Can't find any messages from ${username}. Did you spell it correctly?`;
//         error.statusCode = 404;
//         throw error;
//     }
//     return sendResponse(200, Items);
// }
