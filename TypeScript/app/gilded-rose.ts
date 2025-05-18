import {Item, SpecialItems} from "@/item";
import {BaseItemStrategy} from "@/base-item";
import {AgedBrieStrategy} from "@/aged-brie-strategy";
import {BackstagePassesStrategy} from "@/backstage-passes-strategy";
import {ConjuredItemStrategy} from "@/conjured-item-strategy";
import {NonSpecialItemStrategy} from "@/non-special-item-strategy";

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
      const specialItemStrategy = this.strategies[item.name as unknown as string];

      if (specialItemStrategy) {
        specialItemStrategy.updateQuality(item);
      } else {
        const defaultStrategy = new NonSpecialItemStrategy();
        defaultStrategy.updateQuality(item);
      }
    });

    return this.items;
  }

  private isSulfurasItem(item: Item): boolean {
    return item.name === SpecialItems.SULFURAS;
  }

  private decreaseSellin(item: Item): void {
    item.sellIn -= 1;
  }
}
