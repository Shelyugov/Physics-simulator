const viewProperties = {
	x0: 0, // абцисса точки обзора
	y0: 0, // ордината точки обзора
	scale: 100 // пикселей в метре
};

var paper;

function drawAxis() {
	// Нарисовать засечки оси x
	var x = 0, xLocal = viewProperties.x0;
	const canvas = $('#mainCanvas');
	const w = canvas.width();
	const h = canvas.height();
	const scale = viewProperties.scale;
	const textSize = 15;
	const textOffset = textSize * 2 / 3;
	const lineAttributes = {"stroke-width" : 1, "stroke": "#00FFFF"};
	const textAttributes = {"font-size": textSize, "fill": "green"};
	while (x < w) {
		if (x > 0) {
			paper.path(["M", x, 0, "L", x, h])
				.attr(lineAttributes);
		}
		paper.text(x + textOffset, h - textSize, xLocal)
			.attr(textAttributes);
		x += scale;
		xLocal++;
	}
	// Нарисовать засечки оси y
	var y = h - scale, yLocal = viewProperties.y0 + 1;
	while (y > 0) {
		if (y < h) {
			paper.path(["M", 0, y, "L", w, y])
				.attr(lineAttributes);
		}
		paper.text(textOffset, y - textSize, yLocal)
			.attr(textAttributes);
		y -= scale;
		yLocal++;
	}

}

function drawViewport() {
	drawAxis();
}

function initViewport() {
	paper = new Raphael("mainCanvas", "100%", "100%");
	drawViewport();
}

window.onload = initViewport;
