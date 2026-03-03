import axios from "axios"

import { env } from "../env"

const baseURL = env.VITE_BACKEND_URL

export const httpClient = axios.create({
  baseURL,
})
