import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Homepage from "./components/Homepage";
import IngredientCreate from "./components/Ingredient/IngredientCreate";
import IngredientList from "./components/Ingredient/IngredientList";
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
      <div className="container">
         <Routes>
            <Route path="/" element={!user ? <SignIn /> : <Homepage />} />
            <Route path="/register" element={!user ? <Register /> : <Homepage />} />
            <Route path="/ingredients" element={<IngredientList />} />
            <Route path="/ingredients/create" element={<IngredientCreate />} />
            <Route path="/recipe" element={<CreateRecipe />} />
            <Route path="/homepage" element={<Homepage />} />
         </Routes>
      </div>
   );
}

export default App;
