import {Item} from "@/item";
import {BaseItemStrategy} from "@/base-item";

export class NonSpecialItemStrategy extends BaseItemStrategy {
  public updateQuality(item: Item): void {
    this.decreaseQuality(item);

    if (this.hasSellDatePassed(item)) {
      this.decreaseQuality(item)
    }
  }
}
