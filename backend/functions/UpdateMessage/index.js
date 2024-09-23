import { sendResponse, sendError } from "../../responses/index.js";
import db from "../../services/db.js";
import { updateSchema } from "../../utilities/models/bodySchema.js";

export const handler = async (event) => {
    try {
        const { id } = event.pathParameters;
        if (id.length !== 8) {
            throw new Error("Invalid ID");
        }
        const body = event.body ? JSON.parse(event.body) : { empty: true };

        if (body.empty) {
            throw new Error("Request body is missing or empty. You must provide a valid body to change a post.");
        }
        const { error } = updateSchema.validate(body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        await db.update({
            TableName: "shuiMessages",
            Key: {
                pk: id,
                sk: body.sk,
            },
            UpdateExpression: "SET #text = :text",
            ExpressionAttributeNames: {
                "#text": "text",
            },
            ExpressionAttributeValues: {
                ":text": body.text,
            },
            ReturnValues: "ALL_NEW",
        });

        return sendResponse(200, {
            message: `Post with ID: ${id} was successfully updated with new text!`,
            text: body.text,
        });
    } catch (error) {
        return sendError(error.statusCode || 400, error.message || error);
    }
};
