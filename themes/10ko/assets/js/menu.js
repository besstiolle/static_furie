// Mobile m
const h = "hidden";
const d = document;
const mt = d.querySelector(".menu-trigger");
const m = d.querySelector(".menu");
const mq = getComputedStyle(d.body).getPropertyValue(
  "--phoneWidth"
);
const im = () => window.matchMedia(mq).matches;
const imm = () => {
  mt && mt.classList.toggle(h, !im());
  m && m.classList.toggle(h, im());
};

imm();

mt &&
  mt.addEventListener(
    "click",
    () => m && m.classList.toggle(h)
  );

window.addEventListener("resize", imm);
