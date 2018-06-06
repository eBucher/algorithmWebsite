class CustomShape{

	/*
		Must return an element that can be rendered.
	*/
	build(){
		throw new Error("build() must be implemented in the " + this.constructor.name + "class.");
	}
}

export default CustomShape;
