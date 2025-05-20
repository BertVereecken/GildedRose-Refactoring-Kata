import {Item} from "@/item";
import {BaseItemStrategy} from "@/strategies/base-item";

export class BackstagePassesStrategy extends BaseItemStrategy {
  public update(item: Item): void {
    this.decreaseSellin(item);

    if (this.hasSellDatePassed(item)) {
      item.quality = this.MIN_QUALITY;
      return;
    }

    if (item.sellIn < this.BACKSTAGE_PASS_SELLIN_THRESHOLD2) {
      this.increaseQuality(item, 3);
      return;
    }

    if (item.sellIn < this.BACKSTAGE_PASS_SELLIN_THRESHOLD1) {
      this.increaseQuality(item, 2);
      return;
    }

    this.increaseQuality(item);
  }
}
