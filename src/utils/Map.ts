type TMapCell = any;
type TMap = TMapCell[][];

type IPosition = [number, number];
type IPositionFunction = (map: TMap) => IPosition;

class Map {
  static EMPTY: TMapCell = null;
  private map: TMap = [];
  constructor(columns: number, rows: number) {
    for (let i = 0; i < rows; i++) {
      const row: TMapCell[] = [];
      for (let j = 0; j < columns; j++) {
        row.push(Map.EMPTY);
      }
      this.map.push(row);
    }
  }
  applyEntity(entity: TMapCell, position: IPosition | IPositionFunction) {
    const [x, y] =
      typeof position === "function" ? position(this.map) : position;
    this.map[y][x] = entity;
  }
  get(): TMap {
    return this.map;
  }
}

export { Map };
