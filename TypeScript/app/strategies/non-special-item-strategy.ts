import {Item} from "@/item";
import {BaseItemStrategy} from "@/strategies/base-item";

export class NonSpecialItemStrategy extends BaseItemStrategy {
  public update(item: Item): void {
    this.decreaseSellin(item);

    if (this.hasSellDatePassed(item)) {
      this.decreaseQuality(item, 2);
      return;
    }

    this.decreaseQuality(item);
  }
}
