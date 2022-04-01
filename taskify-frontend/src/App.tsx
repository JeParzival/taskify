import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
function App() {
  useEffect(() => {
    if(window && typeof window != "undefined") {
      setWindow(window);
      if(!window.localStorage.getItem("mail") || !window.localStorage.getItem("password")) {
         window.location.href = "/register"
         return
      }
      
    }
    
  })
  const [user, setUser] = useState<any>();
  const [windower, setWindow] = useState<any>();
  return (
    <div className="App">
      <h1>test</h1>
    </div>
  );
}

export default App;

