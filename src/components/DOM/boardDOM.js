/* eslint-disable no-plusplus */
function createBoardDOM(boardContainer) {
  boardContainer.innerHTML = "";

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const div = document.createElement("div");
      div.classList.add("cell", "empty");
      div.setAttribute("data-y", y);
      div.setAttribute("data-x", x);

      boardContainer.appendChild(div);
    }
  }
}

export default createBoardDOM;
