import axios from "axios";
import { serverUrl } from "../utils/constants";

export const api = axios.create({
  baseURL: (serverUrl),
  headers: {
    Accept: 'application/json',
  },
});