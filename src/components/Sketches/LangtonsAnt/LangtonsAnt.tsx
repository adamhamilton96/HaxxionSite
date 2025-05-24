import Sketch from "react-p5"
import p5Types from "p5"

function LangtonsAnt() {
	let grid: number[][] = []
	let squareSize: number
	let gridLength: number
	let gridHeight: number
	let x: number
	let y: number
	let direction: number
	let canvas: any
	let speedSlider: any

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		canvas = p5
			.createCanvas(p5.windowWidth, p5.windowHeight)
			.parent(canvasParentRef)
		canvas.mousePressed(() => {
			createGrid()
		})
		speedSlider = p5.createSlider(10, 500, 1)
		speedSlider.position(5, 70)
		squareSize = 5
		gridLength = p5.windowWidth / squareSize
		gridHeight = p5.windowHeight / squareSize
		x = 200
		y = 200
		direction = 1
		createGrid()
	}

	function createGrid(): void {
		for (let i: number = 0; i < gridLength; i++) {
			grid[i] = new Array()
			for (let j: number = 0; j < gridHeight; j++) {
				grid[i][j] = 0
			}
		}
	}

	const draw = (p5: p5Types) => {
		p5.background(51)
		p5.stroke(255)
		p5.noStroke()
		for (let i: number = 0; i < gridLength; i++) {
			for (let j: number = 0; j < gridHeight; j++) {
				if (i === x && j === y) {
					p5.fill(255, 0, 0)
					p5.rect(i * squareSize, j * squareSize, squareSize, squareSize)
				} else if (grid[i][j] === 0) {
					p5.fill(0)
					p5.rect(i * squareSize, j * squareSize, squareSize, squareSize)
				}
			}
		}
		for (let i: number = 0; i < speedSlider.value(); i++) {
			moveAnt(p5)
		}
	}

	function moveAnt(p5: p5Types) {
		if (x < 1) x += 10
		if (x > gridLength - 1) x -= 10
		if (y < 1) y += 10
		if (y > gridHeight - 1) y -= 10

		let c: number = p5.int(p5.random(1, 5))

		if (grid[x][y] === 0) {
			if (direction === 1) {
				grid[x][y] = c
				direction++
				x++
			} else if (direction === 2) {
				grid[x][y] = c
				direction++
				y--
			} else if (direction === 3) {
				grid[x][y] = c
				direction++
				x--
			} else if (direction === 4) {
				grid[x][y] = c
				direction = 1
				y++
			}
		} else if (grid[x][y] >= 1) {
			if (direction === 1) {
				grid[x][y] = 0
				direction = 4
				x--
			} else if (direction === 2) {
				grid[x][y] = 0
				direction--
				y++
			} else if (direction === 3) {
				grid[x][y] = 0
				direction--
				x++
			} else if (direction === 4) {
				grid[x][y] = 0
				direction--
				y--
			}
		}
	}

	const windowResized = (p5: p5Types) => {
		p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
		gridLength = p5.windowWidth / squareSize
		gridHeight = p5.windowHeight / squareSize
		createGrid()
	}

	return (
		<>
			<Sketch setup={setup} draw={draw} windowResized={windowResized} />
		</>
	)
}

export default LangtonsAnt
