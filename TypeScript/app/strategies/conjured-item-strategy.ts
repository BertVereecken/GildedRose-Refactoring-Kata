import {Item} from "@/item";
import {BaseItemStrategy} from "@/strategies/base-item";

export class ConjuredItemStrategy extends BaseItemStrategy {
  public update(item: Item): void {
    this.decreaseSellin(item);

    this.decreaseQuality(item);
    this.decreaseQuality(item);
  }
}
