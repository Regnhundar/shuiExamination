import { sendResponse, sendError } from "../../responses/index.js";
import db from "../../services/db.js";
import { skSchema } from "../../utilities/models/bodySchema.js";

export const handler = async (event) => {
    try {
        const { id } = event.pathParameters;

        if (id.length !== 8) {
            throw new Error("Invalid ID");
        }

        const body = event.body ? JSON.parse(event.body) : { empty: true };
        if (body.empty) {
            throw new Error("Request body is missing or empty. You must provide a valid body.");
        }
        const { error } = skSchema.validate(body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        await db.delete({
            TableName: "shuiMessages",
            Key: {
                pk: id,
                sk: body.sk,
            },
            ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk)", //Om inte båda nycklar existeras skapas ett specifikt error som vi kan kolla efter.
        });

        return sendResponse(200, {
            message: `Post with ID: ${id} was successfully deleted!`,
        });
    } catch (error) {
        if (error.name === "ConditionalCheckFailedException") {
            return sendError(404, `No item with ID: ${event.pathParameters.id} exists.`); // Enbart id fungerar inte här då det är undefined... Scope?
        }
        return sendError(error.statusCode || 400, error.message || error);
    }
};
