class CustomShape{

	/*
		Must return an element that can be rendered.
	*/
	build(){
		throw new Error("build() must be implemented in " + this.constructor.name);
	}
}

export default CustomShape;
