type SpecialItemNames = 'Aged Brie'
  | 'Backstage passes to a TAFKAL80ETC concert'
  | 'Sulfuras, Hand of Ragnaros'
  | 'Conjured Mana Cake';

type ItemName = SpecialItemNames | string;

export class Item {
  name: ItemName;
  sellIn: number;
  quality: number;

  constructor(name: ItemName, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
