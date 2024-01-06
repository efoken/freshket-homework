import { Calculator } from "./Calculator";

test("getTotal()", () => {
  const calculator = new Calculator([
    { id: "red-set", quantity: 1 },
    { id: "green-set", quantity: 1 },
  ]);
  expect(calculator.getTotal()).toBe(90);
  expect(calculator.getTotal(true)).toBe(81);
  // Price should be reduced by 4 THB (5% of 40)
  calculator.addItem({ id: "green-set", quantity: 1 });
  expect(calculator.getTotal()).toBe(126);
  // Should add 40 THB more, because quantity is 3
  calculator.addItem({ id: "green-set", quantity: 1 });
  expect(calculator.getTotal()).toBe(166);
});

test("addItem()", () => {
  const calculator = new Calculator([
    { id: "red-set", quantity: 1 },
    { id: "green-set", quantity: 1 },
  ]);
  calculator.addItem({ id: "red-set", quantity: 2 });
  expect(calculator.getItems()).toStrictEqual([
    { id: "red-set", quantity: 3 },
    { id: "green-set", quantity: 1 },
  ]);
});
