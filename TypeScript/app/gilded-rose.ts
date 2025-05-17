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

      if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
            item.quality = item.quality - 1
        }

      } else if (item.quality < 50) {
        item.quality = item.quality + 1
        if (this.isBackStagePass(item)) {
          if (item.sellIn < 11 && item.quality < 50) {
            item.quality = item.quality + 1
          }
          if (item.sellIn < 6 && item.quality < 50) {
            item.quality = item.quality + 1
          }
        }
      }

      this.decreaseSellin(item);

      if (item.sellIn < 0) {
        if (this.isAgedBrie(item)) {
            this.increaseQuality(item);
        } else if (this.isBackStagePass(item)) {
          item.quality = item.quality - item.quality
        } else {
          if (item.quality > 0) {
            this.decreaseQuality(item)
          }
        }
      }
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
      item.quality -= 1;
  }

  private decreaseSellin(item: Item): void {
    item.sellIn -= 1;
  }
}
