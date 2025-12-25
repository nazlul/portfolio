import './index.css';
import { render } from "react-dom";
import { App } from "./App";
import { CanvasProvider } from "./contexts/CanvasContext";

render(
  <CanvasProvider>
    <App />
  </CanvasProvider>, 
  document.getElementById("root")
);