import { sendResponse, sendError } from "../../responses/index.js";
import db from "../../services/db.js";
import { postSchema } from "../../utilities/models/bodySchema.js";
import { v4 as uuid } from "uuid";

export const handler = async (event) => {
    try {
        const body = event.body ? JSON.parse(event.body) : { empty: true };

        if (body.empty) {
            throw new Error("Request body is missing or empty. You must provide a valid body.");
        }
        const { error } = postSchema.validate(body);

        if (error) {
            throw new Error(error.details[0].message);
        }
        const id = uuid().substring(0, 8);
        const newMessage = {
            pk: id,
            sk: new Date().toISOString(),
            username: body.username,
            text: body.text,
        };

        await db.put({
            TableName: "shuiMessages",
            Item: newMessage,
        });

        return sendResponse(200, newMessage);
    } catch (error) {
        return sendError(error.statusCode || 400, error.message || error);
    }
};
