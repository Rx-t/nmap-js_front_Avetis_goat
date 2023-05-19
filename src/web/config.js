const config = {
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  },
  security: {
    jwt: {
      storageKey: "nmap-js_jwt",
    },
  },
}

export default config
