import { AppProvider } from "../data/context/AppContext";
import { AuthProvider } from "../data/context/AuthContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  )
}
