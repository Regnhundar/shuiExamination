import { sendResponse, sendError } from "../../responses/index.js";
import db from "../../services/db.js";

export const handler = async (event) => {
    try {
        const { id } = event.pathParameters;
        if (id.length !== 8) {
            throw new Error("Invalid ID");
        }

        const { Items } = await db.query({
            TableName: "shuiMessages",
            KeyConditionExpression: "pk = :pk",
            ExpressionAttributeValues: {
                ":pk": id,
            },
        });

        if (Items.length === 0) {
            throw new Error(`Post with ID: ${id} not found.`);
        }
        const { sk } = Items[0];

        await db.delete({
            TableName: "shuiMessages",
            Key: {
                pk: id,
                sk: sk,
            },
        });

        return sendResponse(200, {
            message: `Post with ID: ${id} was successfully deleted!`,
        });
    } catch (error) {
        return sendError(error.statusCode || 400, error.message || error);
    }
};
