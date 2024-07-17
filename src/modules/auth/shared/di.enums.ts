const Locator = {
  UserRepository: Symbol.for("UserRepository"),
  SignInUseCase: Symbol.for("SignInUseCase"),
  SignInController: Symbol.for("SignInController"),
  RequestPasswordResetUseCase: Symbol.for("RequestPasswordResetUseCase"),
  ResetPasswordUseCase: Symbol.for("ResetPasswordUseCase"),
  ResetPasswordController: Symbol.for("ResetPasswordController"),
  RequestPasswordResetController: Symbol.for("RequestPasswordResetController"),
};

export { Locator };
