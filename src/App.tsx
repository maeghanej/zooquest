import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home.tsx";
import Intro from "./screens/Intro.tsx";
import AnimalStop from "./screens/AnimalStop.tsx";
import FinalScreen from "./screens/FinalScreen.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="/stop/:animal" element={<AnimalStop />} />
      <Route path="/complete" element={<FinalScreen />} />
    </Routes>
  );
} 