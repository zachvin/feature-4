import { useNavigate } from "react-router-dom";
import Nav from "../Shared/Nav";

export default function About() {
  const history = useNavigate();

  // go to home page
  const buttonHandler = () => {
    history("/");
  };

  return (
    <section>
      <Nav />
      <h1>This is the plant identifier, where you identify your plants</h1>
      <p>Got plants?</p>
      <button onClick={buttonHandler}>Home</button>
    </section>
  );
}
