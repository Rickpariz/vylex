const Locator = {
  UserRepository: Symbol.for("UserRepository"),
  CreateUserController: Symbol.for("CreateUserController"),
  CreateUserUseCase: Symbol.for("CreateUserUseCase"),
  UpdateUserUseCase: Symbol.for("UpdateUserUseCase"),
  UpdateUserController: Symbol.for("UpdateUserController"),
};

export { Locator };
