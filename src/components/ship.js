const Ship = (name, length) => {
  const shipName = name.toLowerCase();
  const shipLength = length;
  let shipLives = shipLength;

  const getShipName = () => shipName;
  const getShipLength = () => shipLength;
  const getShipLives = () => shipLives;

  function isHit() {
    shipLives -= 1;
    return shipLives;
  }

  function isSunk() {
    return shipLives === 0;
  }

  return { getShipName, getShipLength, getShipLives, isHit, isSunk };
};

export default Ship;
