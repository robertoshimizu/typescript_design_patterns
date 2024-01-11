import { Duck, type FlyBehavior, type QuackBehavior } from './duck.protocol'

export class MallardDuck extends Duck {
    readonly flyBehavior: FlyBehavior
    readonly quackBehavior: QuackBehavior

    constructor(flyBehavior: FlyBehavior, quackBehavior: QuackBehavior) {
        super(flyBehavior, quackBehavior)
        this.flyBehavior = flyBehavior
        this.quackBehavior = quackBehavior
    }

    performFly = () => {
        return this.flyBehavior.fly()
    }

    performQuack = () => {
        return this.quackBehavior.quack()
    }

    swim = () => {
        return 'Swim'
    }

    display = () => {
        return 'I am a Mallard Duck'
    }
}
