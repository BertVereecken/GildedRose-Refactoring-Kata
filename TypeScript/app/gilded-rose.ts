import {Item, SpecialItems} from "@/item";
import {BaseItemStrategy} from "@/strategies/base-item";
import {AgedBrieStrategy} from "@/strategies/aged-brie-strategy";
import {BackstagePassesStrategy} from "@/strategies/backstage-passes-strategy";
import {ConjuredItemStrategy} from "@/strategies/conjured-item-strategy";
import {NonSpecialItemStrategy} from "@/strategies/non-special-item-strategy";
import {SulfurasItemStrategy} from "@/strategies/sulfuras-item-strategy";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private specialItemStrategies: Record<string, BaseItemStrategy> = {
    [SpecialItems.AGED_BRIE]: new AgedBrieStrategy(),
    [SpecialItems.BACKSTAGE_PASSES]: new BackstagePassesStrategy(),
    [SpecialItems.CONJURED_MANA_CAKE]: new ConjuredItemStrategy(),
    [SpecialItems.SULFURAS]: new SulfurasItemStrategy(),
  };

  updateQuality() {
    this.items.forEach(item => {
      const specialItemStrategy = this.specialItemStrategies[item.name as unknown as string];

      if (specialItemStrategy) {
        specialItemStrategy.update(item);
      } else {
        const defaultStrategy = new NonSpecialItemStrategy();
        defaultStrategy.update(item);
      }
    });

    return this.items;
  }
}
