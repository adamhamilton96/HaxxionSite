import Sketch from "react-p5"
import p5Types from "p5"

function SandPiles() {
	let grid: number[][] = []
	let squareSize: number
	let gridLength: number
	let gridHeight: number
	let canvas: any
	let speedSlider: any

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		canvas = p5
			.createCanvas(p5.windowWidth, p5.windowHeight)
			.parent(canvasParentRef)
		canvas.mousePressed(() => {
			createGrid()
		})
		p5.frameRate(24)
		speedSlider = p5.createSlider(1, 500, 1)
		speedSlider.position(5, 70)
		gridLength = 640
		gridHeight = 360
		squareSize = p5.windowWidth / gridLength
		createGrid()
	}

	function createGrid(): void {
		for (let i: number = 0; i < gridLength; i++) {
			grid[i] = new Array()
			for (let j: number = 0; j < gridHeight; j++) {
				grid[i][j] = 0
			}
		}
		grid[gridLength / 2][gridHeight / 2] = 28000000
	}

	const draw = (p5: p5Types) => {
		p5.background(51)
		p5.noStroke()
		for (let i: number = 0; i < gridLength; i++) {
			for (let j: number = 0; j < gridHeight; j++) {
				if (grid[i][j] > 2) {
					p5.fill(150, 0, 150)
					p5.rect(i * squareSize, j * squareSize, squareSize, squareSize)
				} else if (grid[i][j] !== 0) {
					p5.fill(255, 0, 0)
					p5.rect(i * squareSize, j * squareSize, squareSize, squareSize)
				}
			}
		}
		for (let i: number = 0; i < speedSlider.value(); i++) {
			calculateGrid()
		}
	}

	function calculateGrid() {
		for (let i: number = 1; i < gridLength - 1; i++) {
			for (let j: number = 1; j < gridHeight - 1; j++) {
				if (grid[i][j] >= 4) {
					grid[i][j] -= 4
					grid[i + 1][j] += 1
					grid[i - 1][j] += 1
					grid[i][j + 1] += 1
					grid[i][j - 1] += 1
				}
			}
		}
	}

	const windowResized = (p5: p5Types) => {
		p5.setup()
	}

	return (
		<>
			<Sketch setup={setup} draw={draw} windowResized={windowResized} />
		</>
	)
}

export default SandPiles
