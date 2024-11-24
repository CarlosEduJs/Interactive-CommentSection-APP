import axios from "axios"

const api = axios.create({
    baseURL: "https://interactive-comment-section-api.vercel.app/api"
})

export default api