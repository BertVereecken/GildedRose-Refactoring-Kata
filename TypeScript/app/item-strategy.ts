import {Item} from "@/item";

export interface ItemStrategy {
  updateQuality(item: Item): void;
}
