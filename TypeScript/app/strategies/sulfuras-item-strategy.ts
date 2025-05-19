import {Item} from "@/item";
import {BaseItemStrategy} from "@/strategies/base-item";

export class SulfurasItemStrategy extends BaseItemStrategy {
  public update(_: Item): void {
    // Sulfured items are special and never increase/decrease in quality nor sellIn
    return;
  }
}
