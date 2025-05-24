import Sketch from "react-p5"
import p5Types from "p5"
import { WindPowerSharp } from "@mui/icons-material"

function WireWorld() {
	let grid: number[][] = []
	let next: number[][] = []
	let squareSize: number
	let gridLength: number
	let gridHeight: number
	let choice: number
	let canvas: any

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		canvas = p5
			.createCanvas(p5.windowWidth, p5.windowHeight)
			.parent(canvasParentRef)
		choice = 1
		canvas.mousePressed(() => {
			for (let i: number = 0; i < gridLength; i++) {
				for (let j: number = 0; j < gridHeight; j++) {
					if (
						p5.mouseX > squareSize * i &&
						p5.mouseX < squareSize * i + squareSize &&
						p5.mouseY > squareSize * j &&
						p5.mouseY < squareSize * j + squareSize
					) {
						if (choice == 1) grid[i][j] = 1
						else if (choice == 2) grid[i][j] = 2
						else if (choice == 3) grid[i][j] = 0
					}
				}
			}
		})
		squareSize = 10
		gridLength = p5.windowWidth / squareSize
		gridHeight = p5.windowHeight / squareSize
		createGrid()
	}

	function createGrid(): void {
		for (let i: number = 0; i < gridLength; i++) {
			grid[i] = new Array()
			next[i] = new Array()
			for (let j: number = 0; j < gridHeight; j++) {
				next[i][j] = 0
				grid[i][j] = 0
			}
		}
	}

	const draw = (p5: p5Types) => {
		p5.background(0)
		p5.noStroke()
		generate()
		for (let i: number = 0; i < gridLength; i++) {
			for (let j: number = 0; j < gridHeight; j++) {
				if (grid[i][j] == 0) p5.fill(0)
				else if (grid[i][j] == 1) p5.fill(255, 255, 0)
				else if (grid[i][j] == 2) p5.fill(0, 0, 255)
				else if (grid[i][j] == 3) p5.fill(255, 0, 0)
				p5.rect(i * squareSize, j * squareSize, squareSize, squareSize)
			}
		}
		p5.stroke(255)
		p5.textSize(30)
		p5.fill(255)
		p5.text("A = Conductor\nS = Electron\nD = Delete", 10, 30)
	}

	function generate() {
		let neighbours: number
		for (let i: number = 1; i < gridLength - 1; i++) {
			for (let j: number = 1; j < gridHeight - 1; j++) {
				neighbours = 0
				if (grid[i - 1][j + 1] === 2) neighbours++
				if (grid[i][j + 1] === 2) neighbours++
				if (grid[i + 1][j + 1] === 2) neighbours++
				if (grid[i + 1][j] === 2) neighbours++
				if (grid[i - 1][j] === 2) neighbours++
				if (grid[i - 1][j - 1] === 2) neighbours++
				if (grid[i][j - 1] === 2) neighbours++
				if (grid[i + 1][j - 1] === 2) neighbours++

				if (grid[i][j] == 1 && (neighbours == 1 || neighbours == 2))
					next[i][j] = 2
				else if (grid[i][j] == 1) next[i][j] = 1
				else if (grid[i][j] == 2) next[i][j] = 3
				else if (grid[i][j] == 3) next[i][j] = 1
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

	const mouseDragged = (p5: p5Types) => {
		for (let i: number = 0; i < gridLength; i++) {
			for (let j: number = 0; j < gridHeight; j++) {
				if (
					p5.mouseX > squareSize * i &&
					p5.mouseX < squareSize * i + squareSize &&
					p5.mouseY > squareSize * j &&
					p5.mouseY < squareSize * j + squareSize
				) {
					if (choice == 1) grid[i][j] = 1
					else if (choice == 2) grid[i][j] = 2
					else if (choice == 3) grid[i][j] = 0
				}
			}
		}
	}

	const keyPressed = (p5: p5Types) => {
		if (p5.keyCode == 65) choice = 1
		else if (p5.keyCode == 83) choice = 2
		else if (p5.keyCode == 68) choice = 3
	}

	const windowResized = (p5: p5Types) => {
		p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
	}

	return (
		<>
			<Sketch
				setup={setup}
				draw={draw}
				mouseDragged={mouseDragged}
				keyPressed={keyPressed}
				windowResized={windowResized}
			/>
		</>
	)
}

export default WireWorld
