'use strict';

function rotate(matrix){
	let rotated = [];
	for (let i = 0; i < matrix.length; i++){
		rotated[i] = [];;
		for (let j = 0; j < matrix.length; j++){
			rotated[i][j] = matrix[matrix.length - 1 - j][i];
		}
	}
	return rotated;
}

module.exports = rotate;
