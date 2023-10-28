import {
  type FlyBehavior,
  FlyWithWings,
  MallardDuck,
  type QuackBehavior,
  Quack
} from './duck.protocol'

describe('Mallard Duck behaviors', () => {
  const flyWithWings: FlyBehavior = new FlyWithWings()
  const quack: QuackBehavior = new Quack()
  const sut = new MallardDuck(flyWithWings, quack)
  test('Mallard duck should quack', () => {
    expect(sut.performQuack()).toBe('Quack')
  })
  test('Mallard duck should fly', () => {
    expect(sut.performFly()).toBe('Fly')
  })

  test('Mallard duck should swim', () => {
    expect(sut.swim()).toBe('Swim')
  })
  test('Mallard duck should display', () => {
    expect(sut.display()).toBe('I am a Mallard Duck')
  })
})

// describe('Rubber Duck behaviors', () => {
//   const sut = new RubberDuck()
//   test('Rubber duck should Squeak', () => {
//     expect(sut.performQuack()).toBe('Quack')
//   })
//   test('Rubber duck should not fly', () => {
//     expect(sut.performFly()).toBe("Don't fly")
//   })
//   test('Rubber duck should float', () => {
//     expect(sut.swim()).toBe('Float')
//   })
//   test('Rubber duck should display', () => {
//     expect(sut.display()).toBe('I am a Rubber Duck')
//   })
// })
