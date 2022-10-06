// @ts-check
import { name } from "./constants.js";
/** @param {string} [a] */
function helloWorld(a) {
  console.log(`Hello ${a ?? "world"}!`);
}

helloWorld();
helloWorld(name);
