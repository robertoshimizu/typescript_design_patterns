import { MallardDuck, RubberDuck } from './duck.protocol'

describe('Mallard Duck behaviors', () => {
  const sut = new MallardDuck()
  test('Mallard duck should quack', () => {
    expect(sut.quack()).toBe('Quack')
  })
  test('Mallard duck should swim', () => {
    expect(sut.swim()).toBe('Swim')
  })
  test('Mallard duck should display', () => {
    expect(sut.display()).toBe('I am a Mallard Duck')
  })
})

describe('Rubber Duck behaviors', () => {
  const sut = new RubberDuck()
  test('Rubber duck should not Squeak', () => {
    expect(sut.quack()).toBe('Squeak')
  })
  test('Rubber duck should float', () => {
    expect(sut.swim()).toBe('Float')
  })
  test('Rubber duck should display', () => {
    expect(sut.display()).toBe('I am a Rubber Duck')
  })
})
