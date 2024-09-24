import { sendResponse, sendError } from "../../responses/index.js";
import db from "../../services/db.js";
import { usernameSchema } from "../../utilities/models/bodySchema.js";

export const handler = async (event) => {
    try {
        const { username } = event.queryStringParameters || {};

        let Items;

        if (username) {
            const { error } = usernameSchema.validate({ username });

            if (error) {
                throw new Error(error.details[0].message);
            }

            const result = await db.query({
                TableName: "shuiMessages",
                IndexName: "UsernameIndex",
                KeyConditionExpression: "username = :username",
                ExpressionAttributeValues: {
                    ":username": username,
                },
            });

            Items = result.Items;

            if (!Items || Items.length === 0) {
                const noUserError = new Error();
                noUserError.message = `Can't find any messages from ${username}. Did you spell it correctly?`;
                noUserError.statusCode = 404;
                throw noUserError;
            }
        } else {
            const result = await db.scan({
                TableName: "shuiMessages",
            });

            Items = result.Items;

            if (!Items || Items.length === 0) {
                const noMessagesError = new Error();
                noMessagesError.message = `There doesn't seem to be any messages. Maybe start a conversation?`;
                noMessagesError.statusCode = 404;
                throw noMessagesError;
            }
        }

        return sendResponse(200, Items);
    } catch (error) {
        return sendError(error.statusCode || 400, error.message || error);
    }
};
