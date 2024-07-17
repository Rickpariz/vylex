import "reflect-metadata";
import { ZodSchema } from "zod";
import { PreconditionFailedError } from "../http";
import { ERRORS } from "../enums/errors.enum";

function Validate(schema: ZodSchema<any>) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const result = schema.safeParse(args[0]);

      if (!result.success) {
        throw PreconditionFailedError({
          message: ERRORS.VALIDATION_ERROR,
          errors: result.error.issues,
        });
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

export { Validate };
