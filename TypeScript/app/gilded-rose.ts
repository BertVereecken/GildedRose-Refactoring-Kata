import {Item, SpecialItems} from "@/item";
import {BaseItemStrategy} from "@/base-item";
import {AgedBrieStrategy} from "@/aged-brie-strategy";
import {BackstagePassesStrategy} from "@/backstage-passes-strategy";
import {ConjuredItemStrategy} from "@/conjured-item-strategy";

const MIN_QUALITY = 0;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private strategies: Record<string, BaseItemStrategy> = {
    [SpecialItems.AGED_BRIE]: new AgedBrieStrategy(),
    [SpecialItems.BACKSTAGE_PASSES]: new BackstagePassesStrategy(),
    [SpecialItems.CONJURED_MANA_CAKE]: new ConjuredItemStrategy(),
  };

  updateQuality() {
    this.items.forEach(item => {
      if (this.isSulfurasItem(item)) {
        return;
      }
      this.decreaseSellin(item);

      // TODO: improve type here // do not cast
      const strategy = this.strategies[item.name as unknown as string];

      if (strategy) {
        strategy.updateQuality(item);
      } else {
        this.updateQualityOfNonSpecialItem(item);
      }

    });

    return this.items;
  }

  private isSulfurasItem(item: Item): boolean {
    return item.name === SpecialItems.SULFURAS;
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


  private updateQualityOfNonSpecialItem(item: Item): void {
    this.decreaseQuality(item);

    if (this.hasSellDatePassed(item)) {
      this.decreaseQuality(item)
    }
  }
}
