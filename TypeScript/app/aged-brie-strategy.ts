import {Item} from "@/item";
import {BaseItemStrategy} from "@/base-item";

export class AgedBrieStrategy extends BaseItemStrategy {
  public updateQuality(item: Item): void {
    this.increaseQuality(item);

    if (this.hasSellDatePassed(item)) {
      this.increaseQuality(item);
    }
  }
}
