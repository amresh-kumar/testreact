import axios from "axios";
import { ROOT_URL } from "../constants/ActionTypes";

function headerConfig(contentType) {

    const header = {};

    if (contentType && contentType !== "") {
        header["Content-Type"] = contentType;
    }
    else {
        header["Content-Type"] = "application/json";
    }
    return header;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (params) => axios.create({
    responseType: "json",
    baseURL: ROOT_URL,
    headers: headerConfig(params && params.contentType)
});