import Sketch from "react-p5"
import p5Types from "p5"
import { Delaunay } from "d3-delaunay"

function CameraStippling() {
	let sizeInput: any
	let pointInput: any
	let canvas: any
	let points: any[] = []
	let delaunay: any
	let voronoi: any
	let video: any
	let videoWidth: number // = 640;
	let videoHeight: number // = 360;
	let started: boolean = false
	let colourEnabled: boolean = false
	let debug: boolean

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.frameRate(24)
				let btnUpdate = p5.createButton("Update")
		btnUpdate.mousePressed(() => {
			init(p5)
		})
		btnUpdate.position(0, 110)
		let btnToggleColour = p5.createButton("Toggle Colour")
		btnToggleColour.mousePressed(toggleColour)
		btnToggleColour.position(110, 110)
		pointInput = p5.createInput("2000", "number")
		pointInput.position(0, 85)
		pointInput.size(110, 20)
		sizeInput = p5.createInput("8", "number")
		sizeInput.position(120, 85)
		sizeInput.size(110, 20)
		let details = navigator.userAgent
		let regexp = /android|iphone/i
		let isMobileDevice = regexp.test(details)
		if (isMobileDevice) {
			canvas = p5
				.createCanvas(p5.windowHeight, p5.windowWidth)
				.parent(canvasParentRef)
			videoWidth = 360
			videoHeight = 640
		} else {
			canvas = p5
				.createCanvas(p5.windowWidth, p5.windowHeight)
				.parent(canvasParentRef)
			videoWidth = 640
			videoHeight = 360
		}
		debug = false
		video = p5.createCapture("VIDEO")
		video.volume(0)
		video.size(videoWidth, videoHeight)
		video.hide()
		init(p5)
	}

	function toggleColour() {
		colourEnabled = !colourEnabled
	}

	function init(p5: p5Types) {
		canvas.resize(p5.windowWidth, p5.windowHeight)
		points = []
		for (let i = 0; i < Number(pointInput.value()); i++) {
			let x = p5.random(videoWidth)
			let y = p5.random(videoHeight)
			points.push(p5.createVector(x, y))
		}
		delaunay = calculateDelaunay(points)
		voronoi = delaunay.voronoi([0, 0, videoWidth, videoHeight])
		started = true
	}

	function calculateDelaunay(points: any) {
		let pointsArray = []
		for (let v of points) {
			pointsArray.push(v.x, v.y)
		}
		return new Delaunay(pointsArray)
	}

	const draw = (p5: p5Types) => {
		p5.scale(p5.windowWidth / 640, p5.windowHeight / 380)
		if (started) {
			p5.background(255)
			let polygons = voronoi.cellPolygons()
			let cells = Array.from(polygons)

			let centroids = new Array(cells.length)
			let weights = new Array(cells.length).fill(0)
			let counts = new Array(cells.length).fill(0)
			let avgWeights = new Array(cells.length).fill(0)
			for (let i = 0; i < centroids.length; i++) {
				centroids[i] = p5.createVector(0, 0)
			}

			video.loadPixels()
			let delaunayIndex = 0
			for (let i = 0; i < videoWidth; i++) {
				for (let j = 0; j < videoHeight; j++) {
					let index = (i + j * videoWidth) * 4
					let r = video.pixels[index + 0]
					let g = video.pixels[index + 1]
					let b = video.pixels[index + 2]
					let bright = (r + g + b) / 3
					let weight = 1 - bright / 255
					delaunayIndex = delaunay.find(i, j, delaunayIndex)
					centroids[delaunayIndex].x += i * weight
					centroids[delaunayIndex].y += j * weight
					weights[delaunayIndex] += weight
					counts[delaunayIndex]++
				}
			}

			let maxWeight = 0
			for (let i = 0; i < centroids.length; i++) {
				if (weights[i] > 0) {
					centroids[i].div(weights[i])
					avgWeights[i] = weights[i] / (counts[i] || 1)
					if (avgWeights[i] > maxWeight) {
						maxWeight = avgWeights[i]
					}
				} else {
					centroids[i] = points[i].copy()
				}
			}

			for (let i = 0; i < points.length; i++) {
				points[i].lerp(centroids[i], 1)
			}

			for (let i = 0; i < points.length; i++) {
				let v = points[i]
				let index = (p5.floor(v.x) + p5.floor(v.y) * videoWidth) * 4
				let r = video.pixels[index + 0]
				let g = video.pixels[index + 1]
				let b = video.pixels[index + 2]

				let sw = p5.map(
					avgWeights[i],
					0,
					maxWeight,
					0,
					Number(sizeInput.value()),
					true,
				)
				p5.strokeWeight(sw)
				if (colourEnabled) {
					p5.stroke(p5.color(r, g, b))
				} else {
					p5.stroke(51)
				}
				p5.point(v.x, v.y)
			}

			delaunay = calculateDelaunay(points)
			voronoi = delaunay.voronoi([0, 0, videoWidth, videoHeight])

			if (debug) {
				p5.textSize(30)
				p5.fill(255)
				p5.stroke(0)
				p5.strokeWeight(4)
				p5.text(p5.frameRate(), 0, 20)
				p5.noFill()
			}
		}
	}

	const windowResized = (p5: p5Types) => {
		init(p5)
	}

	return (
		<>
			<Sketch setup={setup} draw={draw} windowResized={windowResized} />
		</>
	)
}

export default CameraStippling
