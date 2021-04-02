const prompt = require("prompt-sync")({ sigint: true });

// Input Coodinate information
const coodinate_info = prompt("");

// Parse the coodinate information to position object
const COODINATE = {
  x: parseInt(coodinate_info.split(" ")[0]),
  y: parseInt(coodinate_info.split(" ")[1]),
};

/**
 * Print the current position of the robot with status ex: 1 1 E
 * @param {Object} pos {x: 1, y: 1, orientation: 180, status: true}
 */
const display = (pos) => {
  if (pos.status) {
    console.log(pos.x, pos.y, getOrientation(pos.orientation));
  } else {
    console.log(pos.x, pos.y, getOrientation(pos.orientation), "LOST");
  }
};

/**
 * Get moved position of the robot
 * @param {Object} pos  Current position of the robot ex. {x: 1, y: 1, orientation: 180, status: true}
 * @param {String} action Instruction character ex. L
 * @returns {Object} New moved position of the robot ex. {x: 1, y: 1, orientation: 90, status: true}
 */
const move = (pos, action) => {
  switch (action) {
    // Robot will turn right
    case "R":
      return turnRight(pos);
    // Robot will turn left
    case "L":
      return turnLeft(pos);
    // Robot will move forwards
    case "F":
      return moveForwards(pos);
  }
};

/**
 * Get turned right position
 * @param {Object} pos  Current position of the robot ex. {x: 1, y: 1, orientation: 180, status: true}
 * @returns {Object}  New turned right position of the robot ex. {x: 1, y: 1, orientation: 270, status: true}
 */
const turnRight = (pos) => {
  return {
    ...pos,
    orientation: pos.orientation == 270 
      ? 0 
      : pos.orientation + 90,
  };
};

/**
 * Get turned left position
 * @param {Object} pos  Current position of the robot ex. {x: 1, y: 1, orientation: 180, status: true}
 * @returns {Object}  New turned left position of the robot ex. {x: 1, y: 1, orientation: 90, status: true}
 */
const turnLeft = (pos) => {
  return {
    ...pos,
    orientation: pos.orientation == 0 
      ? 270 
      : pos.orientation - 90,
  };
};

/**
 * Get forwards moved position
 * @param {Object} pos  Current position of the robot ex. {x: 1, y: 1, orientation: 180, status: true}
 * @returns {Object}  New moved position of the robot  ex. {x: 1, y: 0, orientation: 180, status: true}
 */
const moveForwards = (pos) => {
  let origin_pos = { ...pos };
  switch (pos.orientation) {
    case 0: // Orientation : North
      pos.y++;
      break;
    case 90: // Orientation : East, 90 degree turned right.
      pos.x++;
      break;
    case 180: // Orientation : South, 90 degree turned right.
      pos.y--;
      break;
    case 270: // Orientation : West, 90 degree turned right.
      pos.x--;
      break;
  }

  // Check the moved position is in the coodinate
  if (checkStatus(pos)) {
    return pos;
  }
  return { ...origin_pos, status: false };
};

/**
 * Get orientation character from degree. ex. 0: N, 90: E, 180: S, 270: W
 * @param {Number} orientation  Orientation degree ex. 180
 * @returns {String}  Orientation character ex. S
 */
const getOrientation = (orientation) => {
  switch (orientation) {
    case 0:
      return "N";
    case 90:
      return "E";
    case 180:
      return "S";
    case 270:
      return "W";
  }
};

/**
 * Convert orientation character to degree. ex. North: 0, East: 90, South: 180, West: 270
 * @param {String} orientation  Orientation character ex. E
 * @returns {Number}  Degree for each orientation character ex. 90
 */
const setDefaultOrientation = (orientation) => {
  switch (orientation) {
    case "N":
      return 0;
    case "E":
      return 90;
    case "S":
      return 180;
    case "W":
      return 270;
  }
};

/**
 * Check current position of the robot is in the coodinate
 * @param {Object} pos  Current position ex. {x: 2, y: 3, orientation: 90, status: true}
 * @returns {Boolean} True if current position of the robot is in the coodinate, false for otherwise.
 */
const checkStatus = (pos) => {
  if (
    pos.x >= 0 &&
    pos.x <= COODINATE.x &&
    pos.y >= 0 &&
    pos.y <= COODINATE.y
  ) {
    return true;
  }

  return false;
};

/**
 * Main Function
 * Input position and orientation of the robot
 * Input instructions
 */
const main = () => {
  // Input Position and orientation of the robot ex. 1 1 E
  const initial_pos = prompt("");

  // Parse position information from inputed value
  let pos = {
    x: parseInt(initial_pos.split(" ")[0]),
    y: parseInt(initial_pos.split(" ")[1]),
    orientation: setDefaultOrientation(initial_pos.split(" ")[2]),
    status: true,
  };

  // Check the inputed position is in the coodinate.
  if (!checkStatus(pos)) {
    console.log("Position is outside of the coodinate. Input again.");
    continue;
  }

  // Input Instructions
  const movement = prompt("");

  // Move as following instructions
  for (let i = 0; i < movement.length; i++) {
    pos = move(pos, movement[i]);

    // Check current position is in the coodinates
    if (!pos.status) {
      break;
    }
  }

  // Display current robot position
  display(pos);
};

/**
 * Unlimited Input values. ex.  1 1 E
 *                              RFRFRFRF
 */
while (1) {
  // Start Martian Robots
  main();
}
