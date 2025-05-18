import {ItemStrategy} from "@/item-strategy";
import { Item } from "./item";

export abstract class BaseItemStrategy implements ItemStrategy {

  protected MAX_QUALITY = 50;
  protected MIN_QUALITY = 0;
  protected BACKSTAGE_PASS_SELLIN_THRESHOLD1 = 11;
  protected BACKSTAGE_PASS_SELLIN_THRESHOLD2 = 6;

  protected increaseQuality(item: Item): void {
    if (item.quality < this.MAX_QUALITY) {
      item.quality += 1;
    }
  }

  protected decreaseQuality(item: Item): void {
    if (item.quality > this.MIN_QUALITY) {
      item.quality -= 1;
    }
  }

  protected hasSellDatePassed(item: Item): boolean {
    return item.sellIn < 0;
  }

  abstract updateQuality(item: Item): void;
}
