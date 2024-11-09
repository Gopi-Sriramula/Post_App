import { createContext, useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./homepage.js";
import Login from "./login.js";
import Signup from "./signup.js";
import LoggedUser from "./loggeduser.js";
import "./style.css";
import Connections from "./connections.js"
export const AppContext = createContext()
const App = function () {
  const [isUserLogin, setisUserLogin] = useState(()=>Boolean(localStorage.getItem("token")));
  if (!isUserLogin) {
    return (
      <div>
        <AppContext.Provider value={{setisUserLogin}}>
        <BrowserRouter>
          <Routes>
            <Route path="" Component={HomePage}>
              <Route path="/login" Component={Login} />
              <Route path="/signup" Component={Signup} />
            </Route>
          </Routes>
        </BrowserRouter>
        </AppContext.Provider >
      </div>
    );
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" Component={LoggedUser} />
          <Route path="Connections/:id" Component={Connections}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
