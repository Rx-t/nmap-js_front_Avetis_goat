import { AppContextProvider } from "@/web/components/AppContext.jsx"

import "@/web/styles/globals.css"

const App = ({ Component, pageProps }) => (
  <AppContextProvider>
    <Component {...pageProps} />
  </AppContextProvider>
)

export default App
