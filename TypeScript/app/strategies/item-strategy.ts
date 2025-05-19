import {Item} from "@/item";

export interface ItemStrategy {
  update(item: Item): void;
}
