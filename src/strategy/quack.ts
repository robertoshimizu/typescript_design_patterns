import { type QuackBehavior } from './duck.protocol'

export class Quack implements QuackBehavior {
  quack = () => {
    return 'Quack'
  }
}
