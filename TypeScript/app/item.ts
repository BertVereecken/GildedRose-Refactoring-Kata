export const SpecialItems = {
  AGED_BRIE: 'Aged Brie',
  BACKSTAGE_PASSES: 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
  CONJURED_MANA_CAKE: 'Conjured Mana Cake'
} as const;

type ItemName = typeof SpecialItems | string;

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
