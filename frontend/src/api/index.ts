import axios from "axios";

export const getMessages = async () => {
    try {
        const response = await axios.get('https://kkc4dyarwk.execute-api.eu-north-1.amazonaws.com/messages');
        return response.data.data;
    } catch (error) {
        console.log("Error at getMessages", error);

    }
};