import { UseCase, UseCaseInput, UseCaseOutput } from "../../../../_lib/core";

export type DeleteUserInput = UseCaseInput<{
  id: string;
}>;

export type DeleteUserOutput = UseCaseOutput<{
  id: string;
}>;

export type DeleteUserUseCase = UseCase<DeleteUserInput, DeleteUserOutput>;
