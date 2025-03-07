function createGraph() {
  const graph = [];

  for (let i = 0; i < 8; i++) {
    graph[i] = [];
    for (let j = 0; j < 8; j++) {
      graph[i][j] = 0;
    }
  }

  return graph;
}

function knightMoves(graph, startPos, endPos) {
  const rowInbounds = (r) => 0 <= r && r < graph.length;
  const colInbounds = (c) => 0 <= c && c < graph[0].length;

  const [startR, startC] = startPos;
  const [endR, endC] = endPos;

  // Initialize a queue that stores each position for a BFS and the path taken
  const queue = [{ pos: [startR, startC], path: [[startR, startC]] }];

  const visited = new Set();

  if (
    !rowInbounds(startR) ||
    !colInbounds(startC) ||
    !rowInbounds(endR) ||
    !colInbounds(endC)
  )
    throw new Error('One or both positions are out of bounds');

  while (queue.length) {
    let current = queue.shift();
    let [r, c] = current.pos;

    // Use string so that there are no visited Set errors
    let posString = r + ',' + c;

    if (!rowInbounds(r) || !colInbounds(c)) continue;
    if (visited.has(posString)) continue;
    if (r === endR && c === endC) return current.path;

    visited.add(posString);

    // Generate 8 moves that will be in an L shape
    const moves = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];

    for (let [rOffset, cOffset] of moves) {
      const nextMove = [r + rOffset, c + cOffset];
      queue.push({ pos: nextMove, path: current.path.concat([nextMove]) });
    }
  }

  return false;
}

function knightsTravails(startPos, endPos) {
  const graph = createGraph();
  const result = knightMoves(graph, startPos, endPos);
  console.log(result);

  if (result) {
    // Subtract 1 from result length to exclude starting position from number of moves
    let resultStr = `You made it in ${
      result.length - 1
    } moves! Here is your path:\n`;
    for (let pos of result) {
      resultStr += `[${pos}]\n`;
    }

    console.log(resultStr);
  }
}

knightsTravails([3, 3], [0, 0]);
