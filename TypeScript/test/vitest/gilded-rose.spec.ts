import {GildedRose} from '@/gilded-rose';
import {Item, SpecialItems} from "@/item";
import Spec = Mocha.reporters.Spec;

describe('Gilded Rose', () => {
  it('should drop in quality after one day', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);

    const items = gildedRose.updateQuality();

    expect(items[0]).toEqual<Item>(new Item('foo', -1, 0));
  });

  test('stock should be correct after 30 days', () => {
    const items: Array<Item> = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item(SpecialItems.AGED_BRIE, 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item(SpecialItems.SULFURAS, 0, 80),
      new Item(SpecialItems.SULFURAS, -1, 80),
      new Item(SpecialItems.BACKSTAGE_PASSES, 15, 20),
      new Item(SpecialItems.BACKSTAGE_PASSES, 10, 49),
      new Item(SpecialItems.BACKSTAGE_PASSES, 5, 49),
      new Item(SpecialItems.CONJURED_MANA_CAKE, 3, 6)
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
      new Item(SpecialItems.AGED_BRIE, 10, 48),
    ]);

    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();

    expect(gildedRose.items).toEqual<Array<Item>>([
      new Item(SpecialItems.AGED_BRIE, 6, 50),
    ])
  })

  describe('Special items', () => {
    test('Sulfuras never decreases in quality nor sellIn', () => {
      const sulfuras = new Item(SpecialItems.SULFURAS, 0, 80);

      const gildedRose = new GildedRose([sulfuras]);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();

      expect(gildedRose.items).toEqual<Array<Item>>([
        sulfuras
      ])
    })

    describe('Special item: Aged Brie', () => {
      test('"Aged Brie" increases in quality as it ages', () => {
        const gildedRose = new GildedRose([
          new Item(SpecialItems.AGED_BRIE, 10, 10),
        ]);

        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();

        expect(gildedRose.items).toEqual<Array<Item>>([
          new Item(SpecialItems.AGED_BRIE, 6, 14),
        ])
      })

      test('Once the sell date has passed, quality increases twice as fast only for "Aged Brie"', () => {
        const gildedRose = new GildedRose([
          new Item(SpecialItems.AGED_BRIE, 2, 10),
        ]);

        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();

        expect(gildedRose.items).toEqual<Array<Item>>([
          new Item(SpecialItems.AGED_BRIE, -2, 16),
        ])
      })
    })


    describe('Special item: Backstage passes', () => {
      test('"Backstage passes" increase in quality twice as fast when the sellIn is 10 or less', () => {
        const gildedRose = new GildedRose([
          new Item(SpecialItems.BACKSTAGE_PASSES, 10, 10),
        ]);

        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();

        expect(gildedRose.items).toEqual<Array<Item>>([
          new Item(SpecialItems.BACKSTAGE_PASSES, 6, 18),
        ])
      })

      test('"Backstage passes" increase in quality three times as fast when the sellIn is 5 or less', () => {
        const gildedRose = new GildedRose([
          new Item(SpecialItems.BACKSTAGE_PASSES, 5, 10),
        ]);

        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();

        expect(gildedRose.items).toEqual<Array<Item>>([
          new Item(SpecialItems.BACKSTAGE_PASSES, 1, 22),
        ])
      })

      test('Quality of backstage passes drops to zero after the concert', () => {
        const gildedRose = new GildedRose([
          new Item(SpecialItems.BACKSTAGE_PASSES, 2, 10),
        ]);

        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();

        expect(gildedRose.items).toEqual<Array<Item>>([
          new Item(SpecialItems.BACKSTAGE_PASSES, -2, 0),
        ])
      })
    })

    describe('Special item: Conjured items', () => {
      test('Conjured items degrade twice as fast in quality than other items', () => {
        const gildedRose = new GildedRose([
          new Item('some-item', 5, 10),
          new Item(SpecialItems.CONJURED_MANA_CAKE, 5, 10)
        ]);

        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();

        expect(gildedRose.items).toEqual<Array<Item>>([
          new Item('some-item', 2, 7),
          new Item(SpecialItems.CONJURED_MANA_CAKE, 2, 4)
        ])
      })

      test('Conjured items quality can also not drop below zero', () => {
        const gildedRose = new GildedRose([
          new Item(SpecialItems.CONJURED_MANA_CAKE, 5, 4)
        ]);

        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();

        expect(gildedRose.items).toEqual<Array<Item>>([
          new Item(SpecialItems.CONJURED_MANA_CAKE, 2, 0)
        ])
      })
    });
  })
});
