import Coord from 'components/drawArea/math/Coord.js';

/*
	Takes in two Coords. Returns the distance between them.
*/
function distance(p1, p2){
	return Math.sqrt((Math.pow(p1.x - p2.x, 2))  + Math.pow(p1.y - p2.y, 2));
}


/*
	Given a Coord on a slope, the function returns another point that is the given
	distance along the slope from the given point. If the slope were horizontal, a
	negative distance would indicate moving left, and a positive distance indicates
	moving to the right.
*/
function findPointFromDist(point, distance, slope){
	if (slope === Infinity){
		return new Coord(point.x, point.y + distance);
	}
	if (slope == 0){
		return new Coord(point.x + distance, point.y);
	}
	var xOffset = distance / Math.sqrt(1 + Math.pow(slope, 2));
	var yOffset = slope * xOffset;
	return new Coord(point.x + xOffset, point.y + yOffset);
}


/*
	Calculates the slope from p1 to p2
*/
function slopeBetween(p1, p2){
	var s = (p2.y - p1.y) / (p2.x - p1.x)
	if(s == -Infinity){
		s = Infinity;
	}
	return s;
}


/*
	Given a slope of a line, the function returns the slope of a line that would
	be perpendicular to it.
*/
function perpendicularSlope(originalSlope){
	// Handle vertical and horizontal slopes
	if (originalSlope === Infinity) {
		return 0;
	} else if (originalSlope == 0) {
		return Infinity;
	}

	return -1 / originalSlope;
}


export {distance, findPointFromDist, slopeBetween, perpendicularSlope};
