import sample from "lodash/sample";
import { TChar } from "../../types";

type TMap = Entity[][];

type IPosition = [number, number];
type IPositionFunction = (entity: Entity) => IPosition;

class Entity {
  static EMPTY: Entity = new Entity("-");
  public representor: TChar;
  constructor(representor: TChar) {
    this.representor = representor;
  }
}

class Map {
  private map: TMap = [];
  constructor(columns: number, rows: number) {
    for (let i = 0; i < rows; i++) {
      const row: Entity[] = [];
      for (let j = 0; j < columns; j++) {
        row.push(Entity.EMPTY);
      }
      this.map.push(row);
    }
  }
  applyEntity(
    entity: Entity | Entity[],
    position: IPosition | IPositionFunction
  ) {
    const selectedEntity = Array.isArray(entity)
      ? sample(entity) || entity[0]
      : entity;
    const [x, y] =
      typeof position === "function" ? position(selectedEntity) : position;
    this.map[y][x] = selectedEntity;
  }
  applyEntities(
    entity: Entity | Entity[],
    count: number,
    position: IPositionFunction
  ) {
    for (let i = 0; i < count; i++) {
      this.applyEntity(entity, position);
    }
  }
  isEmpty(x: number, y: number): boolean {
    return this.get(x, y) === Entity.EMPTY;
  }
  get(x: number, y: number): Entity {
    return this.map[y][x];
  }
  set(x: number, y: number, value: Entity) {
    this.map[y][x] = value;
  }
  getArray() {
    const map = this.map.map(row => row.map(entity => entity.representor));
    return map;
  }
}

export { Map, Entity };
