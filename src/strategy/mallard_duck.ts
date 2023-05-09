import { Duck } from './duck.protocol'

export class MallardDuck extends Duck {
  constructor () {
    super()
  }

  quack = () => {
    return 'Quack'
  }

  swim = () => {
    return 'Swim'
  }

  display = () => {
    return 'I am a Mallard Duck'
  }
}
