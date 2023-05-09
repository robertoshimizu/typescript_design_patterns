import { Duck } from './duck.protocol'

export class RubberDuck extends Duck {
  constructor () {
    super()
  }

  quack = () => {
    return 'Squeak'
  }

  swim = () => {
    return 'Float'
  }

  display = () => {
    return 'I am a Rubber Duck'
  }
}
