import {Item} from "@/item";
import {BaseItemStrategy} from "@/base-item";

export class BackstagePassesStrategy extends BaseItemStrategy {
  public updateQuality(item: Item): void {
    if (this.hasSellDatePassed(item)) {
      item.quality = this.MIN_QUALITY;
      return;
    }

    this.increaseQuality(item);

    if (item.sellIn < this.BACKSTAGE_PASS_SELLIN_THRESHOLD1) {
      this.increaseQuality(item)
    }
    if (item.sellIn < this.BACKSTAGE_PASS_SELLIN_THRESHOLD2) {
      this.increaseQuality(item)
    }
  }
}
