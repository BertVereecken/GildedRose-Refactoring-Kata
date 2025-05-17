import {Item} from "@/item";

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
    if (item.quality < 50) {
      item.quality += 1;
    }
  }

  private decreaseQuality(item: Item): void {
    if (item.quality > 0) {
      item.quality -= 1;
    }
  }

  private decreaseSellin(item: Item): void {
    item.sellIn -= 1;
  }

  private hasSellDatePassed(item: Item): boolean {
    return item.sellIn < 0;
  }

  private updateBackStagePassQuality(item: Item) {
    this.increaseQuality(item);

    if (item.sellIn < 11) {
      this.increaseQuality(item)
    }
    if (item.sellIn < 6) {
      this.increaseQuality(item)
    }

    if (this.hasSellDatePassed(item)) {
      item.quality = 0;
    }
  }

  private updateAgedBrieQuality(item: Item): void {
    this.increaseQuality(item);

    if (this.hasSellDatePassed(item)) {
      this.increaseQuality(item);
    }
  }

  private updateQualityOfNonSpecialItem(item: Item) {
    this.decreaseQuality(item);

    if (this.hasSellDatePassed(item)) {
      this.decreaseQuality(item)
    }
  }
}
