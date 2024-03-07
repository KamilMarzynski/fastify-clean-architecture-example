export interface UseCaseInput<T> {
  data: T
  context?: any
}

export interface UseCaseSuccessOutput<R> {
  result: R
}

export interface UseCaseExceptionOutput {
  code: string
  message: string
}

export type UseCaseOutput<R> = UseCaseSuccessOutput<R> | UseCaseExceptionOutput

export const isUseCaseError = (output: UseCaseOutput<any>): output is UseCaseExceptionOutput => {
  return 'code' in output && 'message' in output
}

export interface UseCase<T extends UseCaseInput<any>, R extends UseCaseOutput<any>> {
  execute: (input: T) => Promise<R>
}
