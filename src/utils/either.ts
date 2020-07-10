const enum EitherType {
  Left = 'Left',
  Right = 'Right'
}

export class Either<L, R, T extends EitherType = EitherType> {
  constructor(
    private readonly _type: T,
    public readonly value: T extends EitherType.Left ? L : R,
  ) {}

  static left<P, R>(val: P): Either<P, R> {
    return new Either<P, R, EitherType.Left>(EitherType.Left, val)
  }

  static right<L, V>(val: V): Either<L, V> {
    return new Either<L, V, EitherType.Right>(EitherType.Right, val)
  }

  isLeft(): this is Either<L, R, EitherType.Left> {
    return this._type === EitherType.Left
  }

  isRight(): this is Either<L, R, EitherType.Right> {
    return this._type === EitherType.Right
  }

  mapRight<V>(func: (r: R) => V): Either<L, V> {
    if (this.isLeft()) {
      return Either.left<L, V>(this.value as L)
    }

    return Either.right<L, V>(func(this.value as R))
  }

  mapLeft<V>(func: (l: L) => V): Either<V, R> {
    if (this.isLeft()) {
      return Either.left<V, R>(func(this.value as L))
    }

    return Either.right<V, R>(this.value as R)
  }

  toJSON() {
    return this.value
  }
}
