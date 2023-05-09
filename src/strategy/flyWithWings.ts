import { type FlyBehavior } from './duck.protocol'

export class FlyWithWings implements FlyBehavior {
  fly = () => {
    return 'Fly'
  }
}
