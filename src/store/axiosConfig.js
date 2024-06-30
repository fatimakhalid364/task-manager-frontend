import axios from "axios";
import { BACKEND_APIS } from "src/constants/constants";
export const APIS = axios.create({
    baseURL: `${BACKEND_APIS}`,
});
