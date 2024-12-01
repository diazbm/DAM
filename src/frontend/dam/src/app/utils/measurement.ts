export class Measurement {
  static getRandom() {
    return Math.round(Math.random() * (100 - 10) + 10).toString()
  }
}
