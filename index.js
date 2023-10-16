window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const ww = window.innerWidth;
  const hh = window.innerHeight;
  let px = 100;
  let py = 300;
  let charW = 40;
  let charH = 18;
  let afterComma = false;
  // hacking the period, as the characters are placed via absolute positioning, and are made to look like they go vertical-rtl but actually it is vertical-ltr
  // hence the period to end the sentence actually comes at the end of the first column rather than the last column of characters
  let firstPeriod = false;

  const container = document.getElementById("container");
  function makeCharacter(radicals, punc = false) {
    let sc = Math.min(Math.max(0.3, Math.random()), 0.6);
    const character = document.createElement("p");
    for (let _ = 0; _ < 2; _++) { // 2 radicals form each character
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
    if (py >= (hh-400)) {
      if (!firstPeriod) { character.innerHTML = "&nbsp;&nbsp;。"; firstPeriod = true; }
      px += charW;
      py = 300;
    }
    if (Math.random() > 0.90 && !afterComma) {character.style.visibility = "hidden"; afterComma = false;}
    else if (!punc && Math.random() > 0.98) {character.innerHTML = "&nbsp;&nbsp;，"; afterComma = true;}
    // else if (last) character.innerHTML = "&nbsp;&nbsp;。";
    else afterComma = false;
    container.appendChild(character);
  }

  fetch("https://annaylin.com/100-days/sunmoonsky/radicals.json").then((r) => r.json()).then((r) => {
    const numChars = Math.floor((((ww-200)/(charW*1.5))*((hh-600)/(charH*1.5))));
    for (let _ = 0; _ < numChars; _++) {
      makeCharacter(r, _==(numChars-1)||_==0);
    }
  })
});