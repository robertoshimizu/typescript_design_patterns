import { Duck, type FlyBehavior, type QuackBehavior } from './duck.protocol'

export class RubberDuck extends Duck {
    readonly flyBehavior: FlyBehavior
    readonly quackBehavior: QuackBehavior

    constructor(flyBehavior: FlyBehavior, quackBehavior: QuackBehavior) {
        super(flyBehavior, quackBehavior)
        this.flyBehavior = flyBehavior
        this.quackBehavior = quackBehavior
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
