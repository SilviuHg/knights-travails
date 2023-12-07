let board = [];

// creating two-dimensional array
for (let i = 0; i < 8; i++) {
  board[i] = [];
  for (let j = 0; j < 8; j++) {
    board[i][j] = false;
  }
}

function bfs(startPos, endPos) {
  const dX = [2, 2, -2, -2, -1, 1, -1, 1]; // dx & dy are used to simulate knight's movement on the chess board
  const dY = [-1, 1, -1, 1, -2, -2, 2, 2]; // which is 2 moves forward, in any direction, and one move to the side
  const queue = [startPos];
  const parent = {}; // object to store previous positions - useful for backtracking
  board[startPos[0]][startPos[1]] = true;

  while (queue.length !== 0) {
    let current = queue.shift();
    let x = current[0];
    let y = current[1];
    for (let i = 0; i < dX.length; i++) {
      let newX = x + dX[i];
      let newY = y + dY[i];
      if (
        newX >= 0 &&
        newX < 8 &&
        newY >= 0 &&
        newY < 8 &&
        !board[newX][newY]
      ) {
        board[newX][newY] = true; // mark the new position as visited
        queue.push([newX, newY]); // enqueue the new position
        parent[[newX, newY]] = [x, y]; // store [x, y] as the previous position

        // check if the new position matches the end position
        if (newX === endPos[0] && newY === endPos[1]) {
          console.log(board);

          return parent; // return parent object if the end position is found
        }
      }
    }
  }
  // return null if end position is not reachable
  return null;
}

function knightMoves(startPos, endPos) {
  if (startPos === null || endPos === null) return;
  const moves = bfs(startPos, endPos); // get our parent object which contains all the moves
  const shortestPath = [endPos];
  let currentPos = endPos; // start creating the path from our endPosition
  let countMoves = 0;

  while (!compareArrays(currentPos, startPos)) {
    let parent = moves[currentPos]; // find the previous move (parent move)
    currentPos = parent; // make it our current position
    shortestPath.push(currentPos);
    countMoves++;
  }

  const reversed = shortestPath.reverse(); // so order will be from first move to last move

  const reversedL = function () {
    for (let i = 0; i < reversed.length; i++) {
      console.log(reversed[i]);
    }
  };

  console.log(`You made it in ${countMoves} moves! Here's your path:`);
  reversedL();
}

const compareArrays = (a, b) => {
  return a.toString() === b.toString();
};

knightMoves([3, 3], [4, 3]);
