import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import "./index.css";
import SignupPage from "./Pages/SignupPage";
import { useState } from "react";
import LoggedUser from "./Pages/LoggedUser";
import Connections from "./Pages/Connections";
const App = function () {
  const [state, setState] = useState(()=>Boolean(localStorage.getItem("token")));
  console.log(state)
  if (!state) {
    return (
      <div>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Login setState={setState}/>} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </HashRouter>
      </div>
    );
  }
  else{
    return (
      <div>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LoggedUser/>} />
            <Route path="/connections/:id" element={<Connections/>}/>
          </Routes>
        </HashRouter>
      </div>
    ); 
  }
};
export default App;
