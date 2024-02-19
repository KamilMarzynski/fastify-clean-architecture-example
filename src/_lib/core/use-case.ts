export type UseCaseInput<T> = {
    data: T,
    context?: any
}

export type UseCaseSuccessOutput<R> = {
    result: R
}

export type UseCaseExceptionOutput = {
    code: string,
    message: string
}

export type UseCaseOutput<R> = UseCaseSuccessOutput<R> | UseCaseExceptionOutput

export const isUseCaseError = (output: UseCaseOutput<any>): output is UseCaseExceptionOutput => {
    return 'code' in output && 'message' in output
}

export type UseCase<T extends UseCaseInput<any>, R extends UseCaseOutput<any>> = {
    execute: (input: T) => Promise<R>
}
