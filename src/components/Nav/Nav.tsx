import { useState, Fragment } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useNavigate } from "react-router-dom"
import "./Nav.css"

function Nav() {
	const navigate = useNavigate()
	const menuOptions = ["Single Player", "Multiplayer", "Sketches"]
	const spPages = ["Floaty Square", "Snake", "Godot Demo"]
	const mpPages = ["Connect4"]
	const skPages = [
		"Game of Life",
		"Brians Brain",
		"Langtons Ant",
		"Wire World",
		"Sand Piles",
		"Camera Stippling",
	]
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const [openMenu, setOpenMenu] = useState<string | null>(null)

	const handleClick = (
		event: React.MouseEvent<HTMLElement>,
		menuName: string,
	) => {
		setAnchorEl(event?.currentTarget)
		setOpenMenu(menuName)
	}

	const handleClose = () => {
		setAnchorEl(null)
		setOpenMenu(null)
	}

	const getPathForPage = (menuCategory: string, pageName: string): string => {
		const slug = pageName.toLowerCase().replace(/\s/g, "-") // Convert "Floaty Square" to "floaty-square"
		switch (menuCategory) {
			case "Single Player":
				return `/single-player/${slug}`
			case "Multiplayer":
				return `/multiplayer/${slug}`
			case "Sketches":
				return `/sketches/${slug}`
			default:
				return "/"
		}
	}

	const handleMenuItemClick = (menuCategory: string, pageName: string) => {
		const path = getPathForPage(menuCategory, pageName)
		navigate(path)
		handleClose()
	}

	const getMenuItems = (menuName: string | null) => {
		switch (menuName) {
			case "Single Player":
				return spPages
			case "Multiplayer":
				return mpPages
			case "Sketches":
				return skPages
			default:
				return []
		}
	}

	return (
		<AppBar position="static">
			<Toolbar disableGutters>
				<img
					src="/src/assets/anivbirb.gif"
					className="nav-toolbar-img left"
					alt="Little anivia little headbobby guy"
				/>
				<Box className="nav-box-flex-grow">
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						className="nav-typography-h6"
					>
						Haxxion
					</Typography>
					<Box className="nav-buttons-box">
						{menuOptions.map((page) => (
							<Fragment key={page}>
								<Button
									className="nav-menu-button"
									onClick={(event) => handleClick(event, page)}
								>
									{page}
								</Button>
								<Menu
									id={`${page}-menu`}
									anchorEl={anchorEl}
									open={openMenu === page}
									onClose={handleClose}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "center",
									}}
									transformOrigin={{
										vertical: "top",
										horizontal: "center",
									}}
									MenuListProps={{
										"aria-labelledby": `${page}-button`,
									}}
								>
									{getMenuItems(page).map((item) => (
										<MenuItem
											key={item}
											onClick={() => handleMenuItemClick(page, item)}
											className="nav-menu-item"
										>
											{item}
										</MenuItem>
									))}
								</Menu>
							</Fragment>
						))}
					</Box>
				</Box>
				<img
					src="/src/assets/anivbirb.gif"
					className="nav-toolbar-img right"
					alt="Little anivia little headbobby guy"
				/>
			</Toolbar>
		</AppBar>
	)
}

export default Nav
