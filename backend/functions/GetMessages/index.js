import { sendResponse, sendError } from "../../responses/index.js";
import db from "../../services/db.js";

export const handler = async (event) => {
    try {
        const { username } = event.queryStringParameters || {};
        const error = new Error();

        if (username) {
            const { Items } = await db.query({
                TableName: "shuiMessages",
                IndexName: "UsernameIndex",
                KeyConditionExpression: "username = :username",
                ExpressionAttributeValues: {
                    ":username": username,
                },
            });
            if (!Items || Items.length === 0) {
                error.message = `Can't find any messages from ${username}. Did you spell it correctly?`;
                error.statusCode = 404;
                throw error;
            }
            return sendResponse(200, Items);
        } else {
            const { Items } = await db.scan({
                TableName: "shuiMessages",
            });
            if (!Items || Items.length === 0) {
                error.message = `There doesn't seem to be any messages. Maybe start a conversation?`;
                error.statusCode = 404;
                throw error;
            }
            return sendResponse(200, Items);
        }
    } catch (error) {
        return sendError(error.statusCode || 400, error.message || error);
    }
};
