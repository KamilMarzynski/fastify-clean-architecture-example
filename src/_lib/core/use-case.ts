export type UseCaseInput<T> = {
    payload: T
}

export type UseCaseSuccessOutput<R> = {
    result: R
}

export type UseCaseErrorOutput = {
    code: string,
    message: string
}

export type UseCaseOutput<R> = UseCaseSuccessOutput<R> | UseCaseErrorOutput


export type UseCase<T extends UseCaseInput<any>, R extends UseCaseOutput<any>> = {
    execute: (input: T) => Promise<R>
}
