import {Item} from "@/item";
import {BaseItemStrategy} from "@/base-item";

export class ConjuredItemStrategy extends BaseItemStrategy {
  public updateQuality(item: Item): void {
    this.decreaseQuality(item);
    this.decreaseQuality(item);
  }
}
