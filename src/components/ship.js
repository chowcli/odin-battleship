const Ship = (name, length) => {
  const shipName = name.toLowerCase();
  const shipLength = length;
  let shipLives = shipLength;

  const getName = () => shipName;
  const getLength = () => shipLength;
  const getLives = () => shipLives;

  function isHit() {
    if (shipLives > 0) shipLives -= 1;
  }

  function isSunk() {
    return shipLives === 0;
  }

  return { getName, getLength, getLives, isHit, isSunk };
};

export default Ship;
