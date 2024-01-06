const ITEM_STORE: { id: string; name: string; price: number }[] = [
  { id: "red-set", name: "Red set", price: 50 },
  { id: "green-set", name: "Green set", price: 40 },
  { id: "blue-set", name: "Blue set", price: 30 },
  { id: "yellow-set", name: "Yellow set", price: 50 },
  { id: "pink-set", name: "Pink set", price: 80 },
  { id: "purple-set", name: "Purple set", price: 90 },
  { id: "orange-set", name: "Orange set", price: 120 },
];

const MEMBER_DISCOUNT = 0.1;

const ITEM_DISCOUNTS: Record<string, number> = {
  "green-set": 0.05,
  "pink-set": 0.05,
  "orange-set": 0.05,
};

type CalculatorItem = { id: string; quantity: number };

export class Calculator {
  private items: CalculatorItem[] = [];

  constructor(items: CalculatorItem[]) {
    this.items = items.filter((i) => this.isItemInStore(i));
  }

  isItemInStore(item: CalculatorItem) {
    return ITEM_STORE.some((storeItem) => storeItem.id === item.id);
  }

  addItem(item: CalculatorItem) {
    if (this.isItemInStore(item)) {
      let existing = false;

      this.items = this.items.map((i) => {
        if (i.id === item.id) {
          existing = true;
          i.quantity += item.quantity;
        }
        return i;
      });

      if (!existing) {
        this.items.push(item);
      }
    }
  }

  getItems() {
    return this.items;
  }

  getTotal(hasMemberCard = false) {
    let sum = this.items
      .map(({ id, quantity }) => {
        const { price = 0 } =
          ITEM_STORE.find((storeItem) => storeItem.id === id) ?? {};

        // Get optional item discount
        const discount = 1 - (ITEM_DISCOUNTS[id] ?? 0);

        return quantity > 1
          ? // Always 2 items are discounted. If there is an odd number of
            // items, just add the last one without discount.
            (quantity - (quantity % 2)) * price * discount +
              (quantity % 2) * price
          : quantity * price;
      })
      .reduce((sum, price) => (sum += price), 0);

    if (hasMemberCard) {
      sum *= 1 - MEMBER_DISCOUNT;
    }

    return sum;
  }
}
