import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Homepage from "./components/Homepage";
import CreateIngredient from "./components/CreateIngredient";
import CreateRecipe from "./components/CreateRecipe";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
   const navigate = useNavigate();
   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

   useEffect(() => {
      console.log(user);
      console.log("App effect");
      if (!user) {
         return navigate("/");
      }
      // localStorage.setItem("user", JSON.stringify(user));
   }, [setUser]);

   return (
      <Routes>
         <Route path="/" element={!user ? <SignIn /> : <Homepage />} />
         <Route path="/register" element={!user ? <Register /> : <Homepage />} />
         <Route path="/ingredient" element={<CreateIngredient />} />
         <Route path="/recipe" element={<CreateRecipe />} />
         <Route path="/homepage" element={<Homepage />} />
      </Routes>
   );
}

export default App;
