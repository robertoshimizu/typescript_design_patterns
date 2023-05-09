export abstract class Duck {
  flyBehavior!: FlyBehavior
  quackBehavior!: QuackBehavior
  constructor (
    flyBehavior: FlyBehavior,
    quackBehavior: QuackBehavior
  ) {
    this.flyBehavior = flyBehavior
    this.quackBehavior = quackBehavior
  }

  performFly = () => {
    this.flyBehavior.fly()
  }

  performQuack = () => {
    this.quackBehavior.quack()
  }

  swim!: () => void
  display!: () => void
}

export interface FlyBehavior {
  fly: () => string
}

export interface QuackBehavior {
  quack: () => string
}
