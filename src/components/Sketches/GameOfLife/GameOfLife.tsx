import Sketch from "react-p5"
import p5Types from "p5"

function GameOfLife() {
	let grid: number[][] = []
	let next: number[][] = []
	let squareSize: number
	let gridLength: number
	let gridHeight: number
	let canvas: any

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		canvas = p5
			.createCanvas(p5.windowWidth, p5.windowHeight)
			.parent(canvasParentRef)
		canvas.mousePressed(() => {
			createGrid(p5)
		})
		p5.frameRate(24)
		squareSize = 10
		gridLength = p5.windowWidth / squareSize
		gridHeight = p5.windowHeight / squareSize
		createGrid(p5)
	}

	function createGrid(p5: p5Types): void {
		for (let i: number = 0; i < gridLength; i++) {
			grid[i] = new Array()
			next[i] = new Array()
			for (let j: number = 0; j < gridHeight; j++) {
				next[i][j] = 0
				if (p5.random() > 0.25) grid[i][j] = 1
				else grid[i][j] = 0
			}
		}
	}

	const draw = (p5: p5Types) => {
		p5.background(51)
		generate()
		p5.fill(255)
		p5.noStroke()
		for (let i: number = 0; i < gridLength; i++) {
			for (let j: number = 0; j < gridHeight; j++) {
				if (grid[i][j] === 1) {
					p5.rect(i * squareSize, j * squareSize, squareSize, squareSize)
				}
			}
		}
	}

	function generate() {
		let neighbours: number
		for (let i: number = 1; i < gridLength - 1; i++) {
			for (let j: number = 1; j < gridHeight - 1; j++) {
				neighbours = 0
				if (grid[i - 1][j + 1] === 1) neighbours++
				if (grid[i][j + 1] === 1) neighbours++
				if (grid[i + 1][j + 1] === 1) neighbours++
				if (grid[i + 1][j] === 1) neighbours++
				if (grid[i - 1][j] === 1) neighbours++
				if (grid[i - 1][j - 1] === 1) neighbours++
				if (grid[i][j - 1] === 1) neighbours++
				if (grid[i + 1][j - 1] === 1) neighbours++

				if (grid[i][j] === 0) {
					if (neighbours === 3) next[i][j] = 1
					else next[i][j] = 0
				} else if (grid[i][j] === 1) {
					if (neighbours < 2 || neighbours > 3) next[i][j] = 0
					else next[i][j] = 1
				}
			}
		}
		grid = next
		next = new Array()
		for (let i: number = 0; i < gridLength; i++) {
			next[i] = new Array()
			for (let j: number = 0; j < gridHeight; j++) {
				next[i][j] = 0
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

export default GameOfLife
