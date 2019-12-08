import { Map, Entity } from "./utils/Map";

import random from "lodash/random";
import sample from "lodash/sample";

const map = new Map(10, 10);

const UP = new Entity("U");
const DOWN = new Entity("D");
const RIGHT = new Entity("R");
const LEFT = new Entity("L");

map.applyEntities([UP, DOWN, RIGHT, LEFT], 10, () => {
  let x, y;
  do {
    x = random(9);
    y = random(9);
  } while (!map.isEmpty(x, y));
  return [x, y];
});

console.log(map.getArray());
