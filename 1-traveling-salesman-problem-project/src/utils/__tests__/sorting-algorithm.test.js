import sortingAlgorithm from "../sorting-algorithm";

describe("sorting", () => {
  it("sorts the array of coordinate pairs", () => {
    const coordinatesToSort = [
      [25, 43],
      [8, 47],
      [9, 51],
    ];

    const sortedCoordinates = [
      [
        [9, 51],
        [8, 47],
      ],
      [
        [8, 47],
        [25, 43],
      ],
      [
        [25, 43],
        [9, 51],
      ],
      [
        [9, 51],
        [9, 51],
      ],
    ];

    expect(sortingAlgorithm(coordinatesToSort)).toStrictEqual(
      sortedCoordinates
    );
  });
});
