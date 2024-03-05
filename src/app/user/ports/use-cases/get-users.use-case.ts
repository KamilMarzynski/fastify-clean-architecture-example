import { UseCase, UseCaseInput, UseCaseOutput } from "../../../../_lib/core";

export type GetUsersUserInput = UseCaseInput<{
  orderBy: "firstName" | "lastName" | "email";
  order: "asc" | "desc";
  limit: number;
  offset: number;
}>;

export type GetUsersUserOutput = UseCaseOutput<
  {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }[]
>;

export type GetUsersUserUseCase = UseCase<
  GetUsersUserInput,
  GetUsersUserOutput
>;
