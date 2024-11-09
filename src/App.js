import { createContext, useContext, useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
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
        <HashRouter>
          <Routes>
            <Route path="" Component={HomePage}>
              <Route path="/login" Component={Login} />
              <Route path="/signup" Component={Signup} />
            </Route>
          </Routes>
        </HashRouter>
        </AppContext.Provider >
      </div>
    );
  }
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="" Component={LoggedUser} />
          <Route path="Connections/:id" Component={Connections}/>
        </Routes>
      </HashRouter>
    </div>
  );
};
export default App;
