function toHex(color){
	if (color == "red"){
		return "#e74c3c";
	} else if (color == "orange"){
		return "#e67e22";
	} else if (color == "yellow"){
		return "#f1c40f";
	} else if (color == "green"){
		return "#2ecc71";
	} else if (color == "blue"){
		return "#3498db";
	} else if (color == "purple"){
		return "#9b59b6";
	} else if (color == "grey"){
		return "#95a5a6";
	} else if (color == "black"){
		return "#333333";
	} else if (color == "white"){
		return "#FFFFFF";
	}
}

export {toHex};
