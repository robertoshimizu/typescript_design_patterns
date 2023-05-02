
abstract class Duck {
  constructor () {}
  quack!: () => void
  swim!: () => void
  display!: () => void
}

class MallardDuck extends Duck {
  constructor () {
    super()
  }

  quack = () => { console.log('Quack')}
  swim = () => { console.log('Swim') }
  display = () => { console.log('I am a Mallard Duck') }
}

class RubberDuck extends Duck {
  constructor () {
    super()
  }

  quack = () => {     
    console.log('I cannot quack')    
    throw new Error();
    }  
  swim = () => { console.log('Float') }
  display = () => { console.log('I am a Rubber Duck') }
}

describe('Mallard Duck behaviors', () => {
  test('Mallard duck should quack', () => {
    const duck = new MallardDuck()
    const spy = jest.spyOn(duck, 'quack')
    duck.quack()
    expect(duck.quack).toBeCalled()
    spy.mockReset()
    spy.mockRestore()
  })
  test('Mallard duck should swim', () => {
    const duck = new MallardDuck()
    const spy = jest.spyOn(duck, 'swim')
    duck.swim()
    expect(duck.swim).toBeCalled()
    spy.mockReset()
    spy.mockRestore()
  })
  test('Mallard duck should display', () => {
    const duck = new MallardDuck()
    const spy = jest.spyOn(duck, 'display')
    duck.display()
    expect(duck.display).toBeCalled()
    spy.mockReset()
    spy.mockRestore()
  })
})

describe('Rubber Duck behaviors', () => {
  test('Rubber duck should not quack', () => {
    const duck = new RubberDuck()
    expect(duck.quack).toThrow(Error)
  })
  test('Rubber duck should swim', () => {
    const duck = new RubberDuck()
    const spy = jest.spyOn(duck, 'swim')
    duck.swim()
    expect(duck.swim).toBeCalled()
    spy.mockReset()
    spy.mockRestore()
  })
  test('Rubber duck should display', () => {
    const duck = new RubberDuck()
    const spy = jest.spyOn(duck, 'display')
    duck.display()
    expect(duck.display).toBeCalled()
    spy.mockReset()
    spy.mockRestore()
  })
})
