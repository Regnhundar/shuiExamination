import axios from "axios";
import { Message } from "../pages/MessageBoardPage/MessageBoardPage";

interface GetResults {
    items: Message[];
    success: boolean;
    message: string;
}
export const getMessages = async (username?: string | null): Promise<GetResults> => {
    try {
        const url = username
            ? `https://kkc4dyarwk.execute-api.eu-north-1.amazonaws.com/messages?username=${username}`
            : `https://kkc4dyarwk.execute-api.eu-north-1.amazonaws.com/messages`;
        const response = await axios.get(url);

        return { items: response.data.data, message: "Det gick ju bra.", success: true };
    } catch (error) {
        console.error("Error at getMessages", error);
        if (axios.isAxiosError(error) && error.response) {
            return {
                items: [],
                message: error.response.data.error,
                success: false,
            };
        } else {
            return {
                items: [],
                message: "Something went wrong. Please try again.",
                success: false,
            };
        }
    }
};

interface ApiResult {
    success: boolean;
    message: string;
}

export const postMessage = async (username: string, text: string): Promise<ApiResult> => {
    try {
        await axios.post("https://kkc4dyarwk.execute-api.eu-north-1.amazonaws.com/messages", {
            username: username,
            text: text,
        });

        return {
            success: true,
            message: "Post succesfully uploaded",
        };
    } catch (error) {
        console.error("Error at postMessage", error);
        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                message: error.response.data.error,
            };
        } else {
            return {
                success: false,
                message: "Something went wrong. Please try again.",
            };
        }
    }
};

export const deleteMessage = async (pk: string, sk: string): Promise<ApiResult> => {
    try {
        await axios.delete(`https://kkc4dyarwk.execute-api.eu-north-1.amazonaws.com/messages/${pk}`, {
            data: {
                sk: sk,
            },
        });
        return {
            success: true,
            message: "Message deleted succesfully.",
        };
    } catch (error) {
        console.error("Error at postMessage", error);
        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                message: error.response.data.error,
            };
        } else {
            return {
                success: false,
                message: "Something went wrong. Please try again.",
            };
        }
    }
};

export const updateMessage = async (pk: string, sk: string, text: string): Promise<ApiResult> => {
    try {
        await axios.put(`https://kkc4dyarwk.execute-api.eu-north-1.amazonaws.com/messages/${pk}`, {
            sk: sk,
            text: text,
        });
        return {
            success: true,
            message: "Message updated succesfully.",
        };
    } catch (error) {
        console.error("Error at updateMessage", error);
        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                message: error.response.data.error,
            };
        } else {
            return {
                success: false,
                message: "Something went wrong. Please try again.",
            };
        }
    }
};
