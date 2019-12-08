import { Map } from "./utils/Map";

import random from "lodash/random";
import sample from "lodash/sample";

const map = new Map(10, 10);

for (let i = 0; i < 4; i++) {
  map.applyEntity(sample(["u", "d", "l", "r"]), [random(10), random(10)]);
}

console.log(map.get());
