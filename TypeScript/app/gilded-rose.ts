import {Item} from "@/item";

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const BACKSTAGE_PASS_SELLIN_THRESHOLD1 = 11;
const BACKSTAGE_PASS_SELLIN_THRESHOLD2 = 6;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      if (this.isSulfurasItem(item)) {
        return;
      }

      this.decreaseSellin(item);

      if (this.isConjuredItem(item)) {
        this.decreaseQuality(item);
        this.decreaseQuality(item);
        return
      }

      if (this.isBackStagePass(item)) {
        this.updateBackStagePassQuality(item);
        return;
      }

      if (this.isAgedBrie(item)) {
        this.updateAgedBrieQuality(item);
        return;
      }

      this.updateQualityOfNonSpecialItem(item);
    });

    return this.items;
  }

  private isConjuredItem(item: Item): boolean {
    return item.name === 'Conjured Mana Cake';
  }

  private isBackStagePass(item: Item): boolean {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  private isSulfurasItem(item: Item): boolean {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  private isAgedBrie(item: Item): boolean {
    return item.name === 'Aged Brie';
  }

  private increaseQuality(item: Item): void {
    if (item.quality < MAX_QUALITY) {
      item.quality += 1;
    }
  }

  private decreaseQuality(item: Item): void {
    if (item.quality > MIN_QUALITY) {
      item.quality -= 1;
    }
  }

  private decreaseSellin(item: Item): void {
    item.sellIn -= 1;
  }

  private hasSellDatePassed(item: Item): boolean {
    return item.sellIn < 0;
  }

  private updateBackStagePassQuality(item: Item): void {
    if (this.hasSellDatePassed(item)) {
      item.quality = MIN_QUALITY;
      return;
    }

    this.increaseQuality(item);

    if (item.sellIn < BACKSTAGE_PASS_SELLIN_THRESHOLD1) {
      this.increaseQuality(item)
    }
    if (item.sellIn < BACKSTAGE_PASS_SELLIN_THRESHOLD2) {
      this.increaseQuality(item)
    }
  }

  private updateAgedBrieQuality(item: Item): void {
    this.increaseQuality(item);

    if (this.hasSellDatePassed(item)) {
      this.increaseQuality(item);
    }
  }

  private updateQualityOfNonSpecialItem(item: Item): void {
    this.decreaseQuality(item);

    if (this.hasSellDatePassed(item)) {
      this.decreaseQuality(item)
    }
  }
}
