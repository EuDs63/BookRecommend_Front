import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "/public/css/tailwind.css";
import { UserProvider } from "./context/UserContext";
import { Provider } from 'react-redux'; // 导入 Provider
import { PersistGate } from 'redux-persist/integration/react'; // 导入 PersistGate
import { store, persistor } from './Redux/store'; // 导入 Redux store 和 persistor


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <UserProvider>
        <React.StrictMode>
          <BrowserRouter>
            <ThemeProvider>
              <MaterialTailwindControllerProvider>
                <App />
              </MaterialTailwindControllerProvider>
            </ThemeProvider>
          </BrowserRouter>
        </React.StrictMode>
      </UserProvider>
    </PersistGate>
  </Provider>
);
