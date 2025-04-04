import axios from "axios";
import { Record, RecordRequest, RecordResponse } from "./model";
import { API_URL } from "../../constants";

export const getRecords = async (requestParams: RecordRequest) : Promise<RecordResponse> => {
    const response = await axios.get(`${API_URL}/record`, {
        params: requestParams
    });
    return response.data;
};

export const postRecord = async (record: Record): Promise<RecordResponse> => {
    const response = await axios.post(`${API_URL}/record`, record);
    return response.data;
};
