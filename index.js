window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const container = document.getElementById("container");
  function display(r) {
    const node = document.createElement("a");
    node.innerText = r;
    let s = 0;
    let delta = 0.1;
    setInterval(() => {
      if (s > 1.5) delta = -0.05;
      else if (s <= 0.8) delta = 0.05;
      s += delta;
      node.style.transform = `scale(${s}, 2)`;
    }, getRandomInt(30,100));
    node.style.top = getRandomInt(50, window.innerHeight-50)+"px";
    node.style.left = getRandomInt(50, window.innerWidth-50)+"px";
    container.appendChild(node);
  }

  fetch("https://annaylin.com/100-days/sunmoonsky/radicals.json").then((r) => r.json()).then((radicals) => {
    for (let i = 0; i < Math.max(window.innerHeight, window.innerWidth) / 16; i++) {
      display(radicals[getRandomInt(0, radicals.length)]);
    }
  })
});