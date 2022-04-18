import Homepage from "./components/SignIn"
import {   
  useNavigate,
} from "react-router-dom";

function App() {
  let navigate = useNavigate();

  const login = () => {
    navigate('/SignIn');
  }

  const register = () => {
    navigate('/Register');
  }

  return (
    <div className="App">
      <nav>
        <button class="button" onClick={login}>Login</button>
        <button class="button" onClick={register}>Register</button>
      </nav>
    </div>
  );
}

export default App;
