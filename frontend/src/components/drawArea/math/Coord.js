class Coord {

	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	/*
		Given another Coord object, the function will add the other object's
		x and y values to this object's ones and return the sum.
	*/
	add = (otherCoord) => {
		return new Coord(this.x + otherCoord.x, this.y + otherCoord.y);
	}

}

export default Coord;
