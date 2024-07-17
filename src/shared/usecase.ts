export interface UseCase<Dto, Result> {
  execute(data: Dto): Promise<Result>;
}
