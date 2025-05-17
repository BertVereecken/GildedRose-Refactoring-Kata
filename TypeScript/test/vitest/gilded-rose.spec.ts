import {GildedRose} from '@/gilded-rose';
import {Item} from "@/item";

describe('Gilded Rose', () => {
  it('should drop in quality after one day', () => {
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

  test('Quality can never drop below zero', () => {
    const gildedRose = new GildedRose([new Item('some-item', 0, 1)]);

    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();

    expect(gildedRose.items).toEqual<Array<Item>>([
      new Item('some-item', -3, 0)
    ])
  })

  test('Once the sell date has passed, quality drops twice as fast', () => {
    const gildedRose = new GildedRose([
      new Item('some-item', 2, 10),
    ]);

    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();

    expect(gildedRose.items).toEqual<Array<Item>>([
      new Item('some-item', -2, 4),
    ])
  })

  test('Quality of an item can never be higher than 50', () => {
    const gildedRose = new GildedRose([
      new Item('Aged Brie', 10, 48),
    ]);

    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();

    expect(gildedRose.items).toEqual<Array<Item>>([
      new Item('Aged Brie', 6, 50),
    ])
  })

  describe('Special items' ,() => {
    test('Sulfuras never decreases in quality', () => {
      const sulfuras = new Item('Sulfuras, Hand of Ragnaros', 0, 80);

      const gildedRose = new GildedRose([sulfuras]);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();

      expect(gildedRose.items).toEqual<Array<Item>>([
        sulfuras
      ])
    })

    test('Aged brie increases in quality as it ages', () => {
      const gildedRose = new GildedRose([
        new Item('Aged Brie', 10, 10),
      ]);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();

      expect(gildedRose.items).toEqual<Array<Item>>([
        new Item('Aged Brie', 6, 14),
      ])
    })

    describe('Special item: Backstage passes', () => {
      test('Backstage passes increases in quality twice as fast when the sellIn is 10 or less', () => {
        const gildedRose = new GildedRose([
          new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10),
        ]);

        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();

        expect(gildedRose.items).toEqual<Array<Item>>([
          new Item('Backstage passes to a TAFKAL80ETC concert', 6, 18),
        ])
      })

      test('Backstage passes increases in quality three times as fast when the sellIn is 5 or less', () => {
        const gildedRose = new GildedRose([
          new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10),
        ]);

        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();

        expect(gildedRose.items).toEqual<Array<Item>>([
          new Item('Backstage passes to a TAFKAL80ETC concert', 1, 22),
        ])
      })

      test('Quality of backstage passes drops to zero after the concert', () => {
        const gildedRose = new GildedRose([
          new Item('Backstage passes to a TAFKAL80ETC concert', 2, 10),
        ]);

        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();

        expect(gildedRose.items).toEqual<Array<Item>>([
          new Item('Backstage passes to a TAFKAL80ETC concert', -2, 0),
        ])
      })
    })

    // Does not work properly yet.
    test.skip('Conjured items degrade twice as fast in quality than other items', () => {
      const gildedRose = new GildedRose([
        new Item('some-item', 5, 10),
        new Item('Conjured Mana Cake', 5, 10)
      ]);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();

      expect(gildedRose.items).toEqual<Array<Item>>([
        new Item('some-item', 2, 7),
        new Item('Conjured Mana Cake', 2, 4)
      ])
    })
  })
});
