import {GildedRose} from '@/gilded-rose';
import {Item} from "@/item";

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);

    const items = gildedRose.updateQuality();

    expect(items[0]).toEqual<Item>(new Item('foo', -1, 0));
  });

  test('stock should be correct after 30 days', () => {
    const items: Array<Item> = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      // this conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6)
    ];
    
    const gildedRose = new GildedRose(items);

    let results: Array<Item> = [];

    const days = 30;

    for (let i = 0; i < days; i++) {
      results = gildedRose.updateQuality()
    }

    expect(results).toMatchInlineSnapshot(`
      [
        Item {
          "name": "+5 Dexterity Vest",
          "quality": 0,
          "sellIn": -20,
        },
        Item {
          "name": "Aged Brie",
          "quality": 50,
          "sellIn": -28,
        },
        Item {
          "name": "Elixir of the Mongoose",
          "quality": 0,
          "sellIn": -25,
        },
        Item {
          "name": "Sulfuras, Hand of Ragnaros",
          "quality": 80,
          "sellIn": 0,
        },
        Item {
          "name": "Sulfuras, Hand of Ragnaros",
          "quality": 80,
          "sellIn": -1,
        },
        Item {
          "name": "Backstage passes to a TAFKAL80ETC concert",
          "quality": 0,
          "sellIn": -15,
        },
        Item {
          "name": "Backstage passes to a TAFKAL80ETC concert",
          "quality": 0,
          "sellIn": -20,
        },
        Item {
          "name": "Backstage passes to a TAFKAL80ETC concert",
          "quality": 0,
          "sellIn": -25,
        },
        Item {
          "name": "Conjured Mana Cake",
          "quality": 0,
          "sellIn": -27,
        },
      ]
    `);
  });
});
