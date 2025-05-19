import {Item} from "@/item";
import {BaseItemStrategy} from "@/strategies/base-item";

export class AgedBrieStrategy extends BaseItemStrategy {
  public update(item: Item): void {
    this.decreaseSellin(item);

    this.increaseQuality(item);

    if (this.hasSellDatePassed(item)) {
      this.increaseQuality(item);
    }
  }
}
