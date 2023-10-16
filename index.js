window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const container = document.getElementById("container");
  function makeCharacter(radicals) {
    let sc = 0;
    const character = document.createElement("tr");
    const td = document.createElement("td");
    for (let _ = 0; _ < 2; _++) {
      let ch = radicals[getRandomInt(0, radicals.length)];
      for (let __ = 0; __ < 1; __++) {
        const node = document.createElement("span");
        node.innerText = ch;
        node.style.paddingRight = (sc*45) + "px";
        sc = Math.max(0.1, Math.random());
        node.style.transform = `scale(${sc},1)`;
        td.appendChild(node);
      }
    }
    character.appendChild(td);
    container.appendChild(character);
  }

  fetch("https://annaylin.com/100-days/sunmoonsky/radicals.json").then((r) => r.json()).then((r) => {
    for (let _ = 0; _ < 10; _++) {
      makeCharacter(r);
    }
  })
});