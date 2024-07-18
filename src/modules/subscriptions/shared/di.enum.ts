const Locator = {
  SubscriptionRepository: Symbol.for("SubscriptionRepository"),
  CreateSubscriptionController: Symbol.for("CreateSubscriptionController"),
  CreateSubscriptionUseCase: Symbol.for("CreateSubscriptionUseCase"),
  PackageRepository: Symbol.for("PackageRepository"),
  UserRepository: Symbol.for("UserRepository"),
};

export { Locator };
