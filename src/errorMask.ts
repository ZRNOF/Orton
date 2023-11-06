export const errorMask = (title: string, detail: string) => {
	const errorOverlay = document.createElement("div")
	errorOverlay.style.cssText = `
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.9);
			display: none;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 999;
	`

	const errorText = document.createElement("div")
	errorText.style.cssText = `
			color: red;
			font-size: 24px;
			text-align: center;
			font-family: 'Consolas', monospace;
	`
	errorText.innerHTML = `<h2>${title}</h2><p>${detail}</p>`

	errorOverlay.appendChild(errorText)
	document.body.appendChild(errorOverlay)

	function showErrorOverlay() {
		errorOverlay.style.display = "flex" // Show the error overlay
	}

	function hideErrorOverlay() {
		errorOverlay.style.display = "none" // Hide the error overlay
	}

	errorOverlay.addEventListener("click", hideErrorOverlay)

	return {
		show: showErrorOverlay,
		hide: hideErrorOverlay,
	}
}
