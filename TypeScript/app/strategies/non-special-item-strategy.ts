import {Item} from "@/item";
import {BaseItemStrategy} from "@/strategies/base-item";

export class NonSpecialItemStrategy extends BaseItemStrategy {
  public update(item: Item): void {
    this.decreaseSellin(item);

    this.decreaseQuality(item);

    if (this.hasSellDatePassed(item)) {
      this.decreaseQuality(item)
    }
  }
}
