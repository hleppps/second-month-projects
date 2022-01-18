const getDistance = (coordinates1, coordinates2) => {
  if (!coordinates2) return 0;
  const distance = Math.sqrt(
    Math.abs(
      Math.pow(coordinates1[0] - coordinates2[0], 2) +
        Math.pow(coordinates1[1] - coordinates2[1], 2)
    )
  );
  return distance;
};

const getAllPermutations = (inputArr) => {
  let result = [];
  const permute = (arr, memo = []) => {
    if (arr.length === 0) {
      if (memo[0]) {
        memo.push(memo[0]);
      }
      result.push(memo);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), memo.concat(next));
      }
    }
  };
  permute(inputArr);
  return result;
};

const calculateShortestPath = (permutations) => {
  const shortestPath = { distance: 1000, path: [] };

  for (let coordinatePairs of permutations) {
    let resultDistance = 0;
    for (let i = 0; i < coordinatePairs.length - 1; i++) {
      resultDistance += getDistance(coordinatePairs[i], coordinatePairs[i + 1]);
    }

    if (shortestPath.distance >= resultDistance) {
      shortestPath.distance = resultDistance;
      shortestPath.path = coordinatePairs;
    }
  }

  return { path: shortestPath.path, distance: shortestPath.distance };
};

const sortingAlgorithm = (selectedCoordinates) => {
  const permutations = getAllPermutations(selectedCoordinates);
  // permututions = [ [[x1,y1], [x2,y2], [x1, y1]], [[x2, y2], [x1, y1], [x2, y2]] ]
  const { path } = calculateShortestPath(permutations);

  const coordinatePairs = path.map((coordinatePair, index, coordinates) => {
    let secondCoordinatePair = coordinates[index + 1];
    if (index === coordinates.length - 1) {
      secondCoordinatePair = coordinates[0];
    }
    return [coordinatePair, secondCoordinatePair];
  });
  // coordinatePairs = [ [[x1, y1], [x2, y2]], [[x2, y2], [x3, y3]], [[x3, y3], [x1, y1]] ]
  
  return coordinatePairs;
};

export default sortingAlgorithm;
