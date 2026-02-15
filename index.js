import { byId, $ } from "./helper.js";

//dom

const $input = byId("input");
const $btn = byId("start-btn");
const $result = byId("result");
const $chances = byId("chances");

//

const MIN_VAL = 1;
const MAX_VAL = 100;
const CHANCES = 5;

let randomNum = generateRandomNum();
let chances = CHANCES;
$chances.textContent = chances;

$btn.addEventListener("click", () => {
  const val = Number($input.value.trim());
  $input.value = "";
  if (!val) return;
  if (val < MIN_VAL || val > MAX_VAL) return setResult("warn");

  // 유효한 값 입력
  chances--;
  $chances.textContent = chances;

  const result = getResult(val);
  console.log(result);
  setResult(result);
});

function generateRandomNum() {
  const result = Math.floor(Math.random() * (MAX_VAL - MIN_VAL + 1) + MIN_VAL);
  console.log(result);
  return result;
}

function setResult(type = "idle") {
  let msg = "";
  switch (type) {
    case "idle":
      msg = "숫자를 아래에 입력하세요..";
      break;
    case "correct":
      msg = "정답입니다!";
      break;
    case "up":
      msg = "숫자가 너무 작아요 ㅠ";
      break;
    case "down":
      msg = "숫자가 너무 커요 ㅠ";
      break;
    case "warn":
      msg = `${MIN_VAL}부터 ${MAX_VAL}까지의 숫자만 입력해주세요`;
      break;
    default:
      break;
  }
  $result.className = "result";
  $result.classList.add(type);
  $result.textContent = msg;
  if (chances === 0) endGame();
}

function getResult(v) {
  if (v === randomNum) {
    endGame();
    return "correct";
  } else if (v > randomNum) return "down";
  else return "up";
}

function endGame() {
  $btn.classList.add("disabled");
}
