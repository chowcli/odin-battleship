const Ship = (name, length) => {
  const shipName = name.toLowerCase();
  const shipLength = length;
  let shipLives = shipLength;

  const getShipName = () => shipName;
  const getShipLength = () => shipLength;
  const getShipLives = () => shipLives;

  function isHit() {
    if (shipLives > 0) shipLives -= 1;
  }

  function isSunk() {
    return shipLives === 0;
  }

  return { getShipName, getShipLength, getShipLives, isHit, isSunk };
};

export default Ship;
