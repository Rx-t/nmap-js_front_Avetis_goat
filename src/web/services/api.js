const { default: config } = require("@/web/config.js")

const { default: axios } = require("axios")

const api = axios.create({
  baseURL: config.api.baseURL,
  get headers() {
    return {
      authorization:
        typeof localStorage !== "undefined"
          ? localStorage.getItem(config.security.jwt.storageKey)
          : null,
    }
  },
})

export default api
