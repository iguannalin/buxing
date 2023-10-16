window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  let px = 100;
  let py = 300;
  let charW = 40;
  let charH = 18;

  const container = document.getElementById("container");
  function makeCharacter(radicals) {
    let sc = Math.min(Math.max(0.3, Math.random()), 0.6);
    const character = document.createElement("p");
    for (let _ = 0; _ < 2; _++) {
      let ch = radicals[getRandomInt(0, radicals.length)];
      const node = document.createElement("span");
      node.innerText = ch;
      if (_ > 0) {
        node.style.paddingLeft = (sc*25) + "px";
        node.style.transform = `scale(${1-sc},1)`;
      } else {
        node.style.transform = `scale(${sc},1)`;
      }
      character.appendChild(node);
      character.style.left = px+"px";
      character.style.top = py+"px";
      py += charH;
    }
    if (py >= window.innerHeight-300) {
      px += charW;
      py = 300;
    }
    container.appendChild(character);
  }

  fetch("https://annaylin.com/100-days/sunmoonsky/radicals.json").then((r) => r.json()).then((r) => {
    for (let _ = 0; _ < 48; _++) {
      makeCharacter(r);
    }
  })
});