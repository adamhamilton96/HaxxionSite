import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import GameOfLife from "./components/Sketches/GameOfLife/GameOfLife.tsx"
import BriansBrain from "./components/Sketches/BriansBrain/BriansBrain.tsx"
import LangtonsAnt from "./components/Sketches/LangtonsAnt/LangtonsAnt.tsx"
import WireWorld from "./components/Sketches/WireWorld/WireWorld.tsx"
import SandPiles from "./components/Sketches/SandPiles/SandPiles.tsx"
import CameraStippling from "./components/Sketches/CameraStippling/CameraStippling.tsx"
import Home from "./components/Home/Home.tsx"
import Nav from "./components/Nav/Nav.tsx"

createRoot(document.getElementById("root")!).render(
	<Router>
		<Nav />
		<Routes>
			<Route path="/" element={<GameOfLife />} />
			<Route path="/sketches/game-of-life" element={<GameOfLife />} />
			<Route path="/sketches/brians-brain" element={<BriansBrain />} />
			<Route path="/sketches/langtons-ant" element={<LangtonsAnt />} />
			<Route path="/sketches/wire-world" element={<WireWorld />} />
			<Route path="/sketches/sand-piles" element={<SandPiles />} />
			<Route path="/sketches/camera-stippling" element={<CameraStippling />} />
		</Routes>
	</Router>,
)
