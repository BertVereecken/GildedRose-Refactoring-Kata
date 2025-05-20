import {ItemStrategy} from "@/strategies/item-strategy";
import {Item} from "@/item";

export abstract class BaseItemStrategy implements ItemStrategy {

  protected readonly MAX_QUALITY = 50;
  protected readonly MIN_QUALITY = 0;
  protected readonly BACKSTAGE_PASS_SELLIN_THRESHOLD1 = 11;
  protected readonly BACKSTAGE_PASS_SELLIN_THRESHOLD2 = 6;

  protected increaseQuality(item: Item, amount = 1): void {
    item.quality = Math.min(this.MAX_QUALITY, item.quality + amount);
  }

  protected decreaseQuality(item: Item, amount = 1): void {
    item.quality = Math.max(this.MIN_QUALITY, item.quality - amount);
  }

  protected hasSellDatePassed(item: Item): boolean {
    return item.sellIn < 0;
  }

  protected decreaseSellin(item: Item): void {
    item.sellIn -= 1;
  }

  abstract update(item: Item): void;
}
