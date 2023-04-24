abstract class Duck {
  constructor() {}
  quack: (() => void) | undefined;
  swim!: () => void;
  display!: () => void;
}

class MallardDuck extends Duck {
  constructor() {
    super();
  }
  quack = () => console.log('Quack');
  swim = () => console.log('Swim');
  display = () => console.log('I am a Mallard Duck');
}

describe('Duck behaviors', () => {
  test('Mallard duck should quack', () => {
    const duck = new MallardDuck();
    const spy = jest.spyOn(duck, 'quack');
    duck.quack();
    expect(duck.quack).toBeCalled();
    spy.mockReset();
    spy.mockRestore();
  });
  test('Mallard duck should swim', () => {
    const duck = new MallardDuck();
    const spy = jest.spyOn(duck, 'swim');
    duck.swim();
    expect(duck.swim).toBeCalled();
    spy.mockReset();
    spy.mockRestore();
  });
  test('Mallard duck should display', () => {
    const duck = new MallardDuck();
    const spy = jest.spyOn(duck, 'display');
    duck.display();
    expect(duck.display).toBeCalled();
    spy.mockReset();
    spy.mockRestore();
  });
});
