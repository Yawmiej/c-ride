
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model DriverProfile
 * 
 */
export type DriverProfile = $Result.DefaultSelection<Prisma.$DriverProfilePayload>
/**
 * Model Vehicle
 * 
 */
export type Vehicle = $Result.DefaultSelection<Prisma.$VehiclePayload>
/**
 * Model Ride
 * 
 */
export type Ride = $Result.DefaultSelection<Prisma.$RidePayload>
/**
 * Model RideEvent
 * 
 */
export type RideEvent = $Result.DefaultSelection<Prisma.$RideEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  RIDER: 'RIDER',
  DRIVER: 'DRIVER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const UserStatus: {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  DISABLED: 'DISABLED'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]


export const DriverStatus: {
  PENDING_ONBOARDING: 'PENDING_ONBOARDING',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED'
};

export type DriverStatus = (typeof DriverStatus)[keyof typeof DriverStatus]


export const VehicleType: {
  SEDAN: 'SEDAN',
  SUV: 'SUV',
  HATCHBACK: 'HATCHBACK'
};

export type VehicleType = (typeof VehicleType)[keyof typeof VehicleType]


export const RideStatus: {
  REQUESTED: 'REQUESTED',
  ACCEPTED: 'ACCEPTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type RideStatus = (typeof RideStatus)[keyof typeof RideStatus]


export const RideEventType: {
  REQUESTED: 'REQUESTED',
  ACCEPTED: 'ACCEPTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type RideEventType = (typeof RideEventType)[keyof typeof RideEventType]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

export type DriverStatus = $Enums.DriverStatus

export const DriverStatus: typeof $Enums.DriverStatus

export type VehicleType = $Enums.VehicleType

export const VehicleType: typeof $Enums.VehicleType

export type RideStatus = $Enums.RideStatus

export const RideStatus: typeof $Enums.RideStatus

export type RideEventType = $Enums.RideEventType

export const RideEventType: typeof $Enums.RideEventType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.driverProfile`: Exposes CRUD operations for the **DriverProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DriverProfiles
    * const driverProfiles = await prisma.driverProfile.findMany()
    * ```
    */
  get driverProfile(): Prisma.DriverProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicle`: Exposes CRUD operations for the **Vehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vehicles
    * const vehicles = await prisma.vehicle.findMany()
    * ```
    */
  get vehicle(): Prisma.VehicleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ride`: Exposes CRUD operations for the **Ride** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rides
    * const rides = await prisma.ride.findMany()
    * ```
    */
  get ride(): Prisma.RideDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rideEvent`: Exposes CRUD operations for the **RideEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RideEvents
    * const rideEvents = await prisma.rideEvent.findMany()
    * ```
    */
  get rideEvent(): Prisma.RideEventDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.0
   * Query Engine version: 0edf323efd1d98336f3f0a68684b56f689b900d3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    DriverProfile: 'DriverProfile',
    Vehicle: 'Vehicle',
    Ride: 'Ride',
    RideEvent: 'RideEvent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "driverProfile" | "vehicle" | "ride" | "rideEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      DriverProfile: {
        payload: Prisma.$DriverProfilePayload<ExtArgs>
        fields: Prisma.DriverProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DriverProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DriverProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>
          }
          findFirst: {
            args: Prisma.DriverProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DriverProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>
          }
          findMany: {
            args: Prisma.DriverProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>[]
          }
          create: {
            args: Prisma.DriverProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>
          }
          createMany: {
            args: Prisma.DriverProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DriverProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>[]
          }
          delete: {
            args: Prisma.DriverProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>
          }
          update: {
            args: Prisma.DriverProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>
          }
          deleteMany: {
            args: Prisma.DriverProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DriverProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DriverProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>[]
          }
          upsert: {
            args: Prisma.DriverProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverProfilePayload>
          }
          aggregate: {
            args: Prisma.DriverProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDriverProfile>
          }
          groupBy: {
            args: Prisma.DriverProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<DriverProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.DriverProfileCountArgs<ExtArgs>
            result: $Utils.Optional<DriverProfileCountAggregateOutputType> | number
          }
        }
      }
      Vehicle: {
        payload: Prisma.$VehiclePayload<ExtArgs>
        fields: Prisma.VehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findFirst: {
            args: Prisma.VehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findMany: {
            args: Prisma.VehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          create: {
            args: Prisma.VehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          createMany: {
            args: Prisma.VehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          delete: {
            args: Prisma.VehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          update: {
            args: Prisma.VehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          deleteMany: {
            args: Prisma.VehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          upsert: {
            args: Prisma.VehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          aggregate: {
            args: Prisma.VehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicle>
          }
          groupBy: {
            args: Prisma.VehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleCountAggregateOutputType> | number
          }
        }
      }
      Ride: {
        payload: Prisma.$RidePayload<ExtArgs>
        fields: Prisma.RideFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RideFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RideFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>
          }
          findFirst: {
            args: Prisma.RideFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RideFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>
          }
          findMany: {
            args: Prisma.RideFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>[]
          }
          create: {
            args: Prisma.RideCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>
          }
          createMany: {
            args: Prisma.RideCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RideCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>[]
          }
          delete: {
            args: Prisma.RideDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>
          }
          update: {
            args: Prisma.RideUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>
          }
          deleteMany: {
            args: Prisma.RideDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RideUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RideUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>[]
          }
          upsert: {
            args: Prisma.RideUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidePayload>
          }
          aggregate: {
            args: Prisma.RideAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRide>
          }
          groupBy: {
            args: Prisma.RideGroupByArgs<ExtArgs>
            result: $Utils.Optional<RideGroupByOutputType>[]
          }
          count: {
            args: Prisma.RideCountArgs<ExtArgs>
            result: $Utils.Optional<RideCountAggregateOutputType> | number
          }
        }
      }
      RideEvent: {
        payload: Prisma.$RideEventPayload<ExtArgs>
        fields: Prisma.RideEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RideEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RideEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideEventPayload>
          }
          findFirst: {
            args: Prisma.RideEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RideEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideEventPayload>
          }
          findMany: {
            args: Prisma.RideEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideEventPayload>[]
          }
          create: {
            args: Prisma.RideEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideEventPayload>
          }
          createMany: {
            args: Prisma.RideEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RideEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideEventPayload>[]
          }
          delete: {
            args: Prisma.RideEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideEventPayload>
          }
          update: {
            args: Prisma.RideEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideEventPayload>
          }
          deleteMany: {
            args: Prisma.RideEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RideEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RideEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideEventPayload>[]
          }
          upsert: {
            args: Prisma.RideEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RideEventPayload>
          }
          aggregate: {
            args: Prisma.RideEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRideEvent>
          }
          groupBy: {
            args: Prisma.RideEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<RideEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.RideEventCountArgs<ExtArgs>
            result: $Utils.Optional<RideEventCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    driverProfile?: DriverProfileOmit
    vehicle?: VehicleOmit
    ride?: RideOmit
    rideEvent?: RideEventOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    ridesByRider: number
    ridesByDriver: number
    rideEvents: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ridesByRider?: boolean | UserCountOutputTypeCountRidesByRiderArgs
    ridesByDriver?: boolean | UserCountOutputTypeCountRidesByDriverArgs
    rideEvents?: boolean | UserCountOutputTypeCountRideEventsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRidesByRiderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RideWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRidesByDriverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RideWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRideEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RideEventWhereInput
  }


  /**
   * Count Type RideCountOutputType
   */

  export type RideCountOutputType = {
    rideEvents: number
  }

  export type RideCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rideEvents?: boolean | RideCountOutputTypeCountRideEventsArgs
  }

  // Custom InputTypes
  /**
   * RideCountOutputType without action
   */
  export type RideCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideCountOutputType
     */
    select?: RideCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RideCountOutputType without action
   */
  export type RideCountOutputTypeCountRideEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RideEventWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    status: $Enums.UserStatus | null
    firstName: string | null
    lastName: string | null
    phoneNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    status: $Enums.UserStatus | null
    firstName: string | null
    lastName: string | null
    phoneNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    role: number
    status: number
    firstName: number
    lastName: number
    phoneNumber: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    status?: true
    firstName?: true
    lastName?: true
    phoneNumber?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    status?: true
    firstName?: true
    lastName?: true
    phoneNumber?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    status?: true
    firstName?: true
    lastName?: true
    phoneNumber?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    status: $Enums.UserStatus
    firstName: string
    lastName: string
    phoneNumber: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    status?: boolean
    firstName?: boolean
    lastName?: boolean
    phoneNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    driverProfile?: boolean | User$driverProfileArgs<ExtArgs>
    ridesByRider?: boolean | User$ridesByRiderArgs<ExtArgs>
    ridesByDriver?: boolean | User$ridesByDriverArgs<ExtArgs>
    rideEvents?: boolean | User$rideEventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    status?: boolean
    firstName?: boolean
    lastName?: boolean
    phoneNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    status?: boolean
    firstName?: boolean
    lastName?: boolean
    phoneNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    status?: boolean
    firstName?: boolean
    lastName?: boolean
    phoneNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "role" | "status" | "firstName" | "lastName" | "phoneNumber" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driverProfile?: boolean | User$driverProfileArgs<ExtArgs>
    ridesByRider?: boolean | User$ridesByRiderArgs<ExtArgs>
    ridesByDriver?: boolean | User$ridesByDriverArgs<ExtArgs>
    rideEvents?: boolean | User$rideEventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      driverProfile: Prisma.$DriverProfilePayload<ExtArgs> | null
      ridesByRider: Prisma.$RidePayload<ExtArgs>[]
      ridesByDriver: Prisma.$RidePayload<ExtArgs>[]
      rideEvents: Prisma.$RideEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      role: $Enums.UserRole
      status: $Enums.UserStatus
      firstName: string
      lastName: string
      phoneNumber: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    driverProfile<T extends User$driverProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$driverProfileArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ridesByRider<T extends User$ridesByRiderArgs<ExtArgs> = {}>(args?: Subset<T, User$ridesByRiderArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ridesByDriver<T extends User$ridesByDriverArgs<ExtArgs> = {}>(args?: Subset<T, User$ridesByDriverArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rideEvents<T extends User$rideEventsArgs<ExtArgs> = {}>(args?: Subset<T, User$rideEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RideEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly status: FieldRef<"User", 'UserStatus'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.driverProfile
   */
  export type User$driverProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    where?: DriverProfileWhereInput
  }

  /**
   * User.ridesByRider
   */
  export type User$ridesByRiderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    where?: RideWhereInput
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[]
    cursor?: RideWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RideScalarFieldEnum | RideScalarFieldEnum[]
  }

  /**
   * User.ridesByDriver
   */
  export type User$ridesByDriverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    where?: RideWhereInput
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[]
    cursor?: RideWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RideScalarFieldEnum | RideScalarFieldEnum[]
  }

  /**
   * User.rideEvents
   */
  export type User$rideEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideEvent
     */
    select?: RideEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideEvent
     */
    omit?: RideEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideEventInclude<ExtArgs> | null
    where?: RideEventWhereInput
    orderBy?: RideEventOrderByWithRelationInput | RideEventOrderByWithRelationInput[]
    cursor?: RideEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RideEventScalarFieldEnum | RideEventScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model DriverProfile
   */

  export type AggregateDriverProfile = {
    _count: DriverProfileCountAggregateOutputType | null
    _min: DriverProfileMinAggregateOutputType | null
    _max: DriverProfileMaxAggregateOutputType | null
  }

  export type DriverProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    isAvailable: boolean | null
    status: $Enums.DriverStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DriverProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    isAvailable: boolean | null
    status: $Enums.DriverStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DriverProfileCountAggregateOutputType = {
    id: number
    userId: number
    isAvailable: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DriverProfileMinAggregateInputType = {
    id?: true
    userId?: true
    isAvailable?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DriverProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    isAvailable?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DriverProfileCountAggregateInputType = {
    id?: true
    userId?: true
    isAvailable?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DriverProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DriverProfile to aggregate.
     */
    where?: DriverProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriverProfiles to fetch.
     */
    orderBy?: DriverProfileOrderByWithRelationInput | DriverProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DriverProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriverProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriverProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DriverProfiles
    **/
    _count?: true | DriverProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriverProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriverProfileMaxAggregateInputType
  }

  export type GetDriverProfileAggregateType<T extends DriverProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateDriverProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDriverProfile[P]>
      : GetScalarType<T[P], AggregateDriverProfile[P]>
  }




  export type DriverProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriverProfileWhereInput
    orderBy?: DriverProfileOrderByWithAggregationInput | DriverProfileOrderByWithAggregationInput[]
    by: DriverProfileScalarFieldEnum[] | DriverProfileScalarFieldEnum
    having?: DriverProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriverProfileCountAggregateInputType | true
    _min?: DriverProfileMinAggregateInputType
    _max?: DriverProfileMaxAggregateInputType
  }

  export type DriverProfileGroupByOutputType = {
    id: string
    userId: string
    isAvailable: boolean
    status: $Enums.DriverStatus
    createdAt: Date
    updatedAt: Date
    _count: DriverProfileCountAggregateOutputType | null
    _min: DriverProfileMinAggregateOutputType | null
    _max: DriverProfileMaxAggregateOutputType | null
  }

  type GetDriverProfileGroupByPayload<T extends DriverProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DriverProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriverProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriverProfileGroupByOutputType[P]>
            : GetScalarType<T[P], DriverProfileGroupByOutputType[P]>
        }
      >
    >


  export type DriverProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    isAvailable?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | DriverProfile$vehicleArgs<ExtArgs>
  }, ExtArgs["result"]["driverProfile"]>

  export type DriverProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    isAvailable?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["driverProfile"]>

  export type DriverProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    isAvailable?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["driverProfile"]>

  export type DriverProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    isAvailable?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DriverProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "isAvailable" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["driverProfile"]>
  export type DriverProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vehicle?: boolean | DriverProfile$vehicleArgs<ExtArgs>
  }
  export type DriverProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DriverProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DriverProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DriverProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      vehicle: Prisma.$VehiclePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      isAvailable: boolean
      status: $Enums.DriverStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["driverProfile"]>
    composites: {}
  }

  type DriverProfileGetPayload<S extends boolean | null | undefined | DriverProfileDefaultArgs> = $Result.GetResult<Prisma.$DriverProfilePayload, S>

  type DriverProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DriverProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DriverProfileCountAggregateInputType | true
    }

  export interface DriverProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DriverProfile'], meta: { name: 'DriverProfile' } }
    /**
     * Find zero or one DriverProfile that matches the filter.
     * @param {DriverProfileFindUniqueArgs} args - Arguments to find a DriverProfile
     * @example
     * // Get one DriverProfile
     * const driverProfile = await prisma.driverProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DriverProfileFindUniqueArgs>(args: SelectSubset<T, DriverProfileFindUniqueArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DriverProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DriverProfileFindUniqueOrThrowArgs} args - Arguments to find a DriverProfile
     * @example
     * // Get one DriverProfile
     * const driverProfile = await prisma.driverProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DriverProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, DriverProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DriverProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverProfileFindFirstArgs} args - Arguments to find a DriverProfile
     * @example
     * // Get one DriverProfile
     * const driverProfile = await prisma.driverProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DriverProfileFindFirstArgs>(args?: SelectSubset<T, DriverProfileFindFirstArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DriverProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverProfileFindFirstOrThrowArgs} args - Arguments to find a DriverProfile
     * @example
     * // Get one DriverProfile
     * const driverProfile = await prisma.driverProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DriverProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, DriverProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DriverProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DriverProfiles
     * const driverProfiles = await prisma.driverProfile.findMany()
     * 
     * // Get first 10 DriverProfiles
     * const driverProfiles = await prisma.driverProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driverProfileWithIdOnly = await prisma.driverProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DriverProfileFindManyArgs>(args?: SelectSubset<T, DriverProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DriverProfile.
     * @param {DriverProfileCreateArgs} args - Arguments to create a DriverProfile.
     * @example
     * // Create one DriverProfile
     * const DriverProfile = await prisma.driverProfile.create({
     *   data: {
     *     // ... data to create a DriverProfile
     *   }
     * })
     * 
     */
    create<T extends DriverProfileCreateArgs>(args: SelectSubset<T, DriverProfileCreateArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DriverProfiles.
     * @param {DriverProfileCreateManyArgs} args - Arguments to create many DriverProfiles.
     * @example
     * // Create many DriverProfiles
     * const driverProfile = await prisma.driverProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DriverProfileCreateManyArgs>(args?: SelectSubset<T, DriverProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DriverProfiles and returns the data saved in the database.
     * @param {DriverProfileCreateManyAndReturnArgs} args - Arguments to create many DriverProfiles.
     * @example
     * // Create many DriverProfiles
     * const driverProfile = await prisma.driverProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DriverProfiles and only return the `id`
     * const driverProfileWithIdOnly = await prisma.driverProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DriverProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, DriverProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DriverProfile.
     * @param {DriverProfileDeleteArgs} args - Arguments to delete one DriverProfile.
     * @example
     * // Delete one DriverProfile
     * const DriverProfile = await prisma.driverProfile.delete({
     *   where: {
     *     // ... filter to delete one DriverProfile
     *   }
     * })
     * 
     */
    delete<T extends DriverProfileDeleteArgs>(args: SelectSubset<T, DriverProfileDeleteArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DriverProfile.
     * @param {DriverProfileUpdateArgs} args - Arguments to update one DriverProfile.
     * @example
     * // Update one DriverProfile
     * const driverProfile = await prisma.driverProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DriverProfileUpdateArgs>(args: SelectSubset<T, DriverProfileUpdateArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DriverProfiles.
     * @param {DriverProfileDeleteManyArgs} args - Arguments to filter DriverProfiles to delete.
     * @example
     * // Delete a few DriverProfiles
     * const { count } = await prisma.driverProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DriverProfileDeleteManyArgs>(args?: SelectSubset<T, DriverProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DriverProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DriverProfiles
     * const driverProfile = await prisma.driverProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DriverProfileUpdateManyArgs>(args: SelectSubset<T, DriverProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DriverProfiles and returns the data updated in the database.
     * @param {DriverProfileUpdateManyAndReturnArgs} args - Arguments to update many DriverProfiles.
     * @example
     * // Update many DriverProfiles
     * const driverProfile = await prisma.driverProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DriverProfiles and only return the `id`
     * const driverProfileWithIdOnly = await prisma.driverProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DriverProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, DriverProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DriverProfile.
     * @param {DriverProfileUpsertArgs} args - Arguments to update or create a DriverProfile.
     * @example
     * // Update or create a DriverProfile
     * const driverProfile = await prisma.driverProfile.upsert({
     *   create: {
     *     // ... data to create a DriverProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DriverProfile we want to update
     *   }
     * })
     */
    upsert<T extends DriverProfileUpsertArgs>(args: SelectSubset<T, DriverProfileUpsertArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DriverProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverProfileCountArgs} args - Arguments to filter DriverProfiles to count.
     * @example
     * // Count the number of DriverProfiles
     * const count = await prisma.driverProfile.count({
     *   where: {
     *     // ... the filter for the DriverProfiles we want to count
     *   }
     * })
    **/
    count<T extends DriverProfileCountArgs>(
      args?: Subset<T, DriverProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriverProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DriverProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DriverProfileAggregateArgs>(args: Subset<T, DriverProfileAggregateArgs>): Prisma.PrismaPromise<GetDriverProfileAggregateType<T>>

    /**
     * Group by DriverProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DriverProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DriverProfileGroupByArgs['orderBy'] }
        : { orderBy?: DriverProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DriverProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriverProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DriverProfile model
   */
  readonly fields: DriverProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DriverProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DriverProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vehicle<T extends DriverProfile$vehicleArgs<ExtArgs> = {}>(args?: Subset<T, DriverProfile$vehicleArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DriverProfile model
   */
  interface DriverProfileFieldRefs {
    readonly id: FieldRef<"DriverProfile", 'String'>
    readonly userId: FieldRef<"DriverProfile", 'String'>
    readonly isAvailable: FieldRef<"DriverProfile", 'Boolean'>
    readonly status: FieldRef<"DriverProfile", 'DriverStatus'>
    readonly createdAt: FieldRef<"DriverProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"DriverProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DriverProfile findUnique
   */
  export type DriverProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * Filter, which DriverProfile to fetch.
     */
    where: DriverProfileWhereUniqueInput
  }

  /**
   * DriverProfile findUniqueOrThrow
   */
  export type DriverProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * Filter, which DriverProfile to fetch.
     */
    where: DriverProfileWhereUniqueInput
  }

  /**
   * DriverProfile findFirst
   */
  export type DriverProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * Filter, which DriverProfile to fetch.
     */
    where?: DriverProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriverProfiles to fetch.
     */
    orderBy?: DriverProfileOrderByWithRelationInput | DriverProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DriverProfiles.
     */
    cursor?: DriverProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriverProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriverProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DriverProfiles.
     */
    distinct?: DriverProfileScalarFieldEnum | DriverProfileScalarFieldEnum[]
  }

  /**
   * DriverProfile findFirstOrThrow
   */
  export type DriverProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * Filter, which DriverProfile to fetch.
     */
    where?: DriverProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriverProfiles to fetch.
     */
    orderBy?: DriverProfileOrderByWithRelationInput | DriverProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DriverProfiles.
     */
    cursor?: DriverProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriverProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriverProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DriverProfiles.
     */
    distinct?: DriverProfileScalarFieldEnum | DriverProfileScalarFieldEnum[]
  }

  /**
   * DriverProfile findMany
   */
  export type DriverProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * Filter, which DriverProfiles to fetch.
     */
    where?: DriverProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DriverProfiles to fetch.
     */
    orderBy?: DriverProfileOrderByWithRelationInput | DriverProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DriverProfiles.
     */
    cursor?: DriverProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DriverProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DriverProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DriverProfiles.
     */
    distinct?: DriverProfileScalarFieldEnum | DriverProfileScalarFieldEnum[]
  }

  /**
   * DriverProfile create
   */
  export type DriverProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a DriverProfile.
     */
    data: XOR<DriverProfileCreateInput, DriverProfileUncheckedCreateInput>
  }

  /**
   * DriverProfile createMany
   */
  export type DriverProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DriverProfiles.
     */
    data: DriverProfileCreateManyInput | DriverProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DriverProfile createManyAndReturn
   */
  export type DriverProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * The data used to create many DriverProfiles.
     */
    data: DriverProfileCreateManyInput | DriverProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DriverProfile update
   */
  export type DriverProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a DriverProfile.
     */
    data: XOR<DriverProfileUpdateInput, DriverProfileUncheckedUpdateInput>
    /**
     * Choose, which DriverProfile to update.
     */
    where: DriverProfileWhereUniqueInput
  }

  /**
   * DriverProfile updateMany
   */
  export type DriverProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DriverProfiles.
     */
    data: XOR<DriverProfileUpdateManyMutationInput, DriverProfileUncheckedUpdateManyInput>
    /**
     * Filter which DriverProfiles to update
     */
    where?: DriverProfileWhereInput
    /**
     * Limit how many DriverProfiles to update.
     */
    limit?: number
  }

  /**
   * DriverProfile updateManyAndReturn
   */
  export type DriverProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * The data used to update DriverProfiles.
     */
    data: XOR<DriverProfileUpdateManyMutationInput, DriverProfileUncheckedUpdateManyInput>
    /**
     * Filter which DriverProfiles to update
     */
    where?: DriverProfileWhereInput
    /**
     * Limit how many DriverProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DriverProfile upsert
   */
  export type DriverProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the DriverProfile to update in case it exists.
     */
    where: DriverProfileWhereUniqueInput
    /**
     * In case the DriverProfile found by the `where` argument doesn't exist, create a new DriverProfile with this data.
     */
    create: XOR<DriverProfileCreateInput, DriverProfileUncheckedCreateInput>
    /**
     * In case the DriverProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DriverProfileUpdateInput, DriverProfileUncheckedUpdateInput>
  }

  /**
   * DriverProfile delete
   */
  export type DriverProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
    /**
     * Filter which DriverProfile to delete.
     */
    where: DriverProfileWhereUniqueInput
  }

  /**
   * DriverProfile deleteMany
   */
  export type DriverProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DriverProfiles to delete
     */
    where?: DriverProfileWhereInput
    /**
     * Limit how many DriverProfiles to delete.
     */
    limit?: number
  }

  /**
   * DriverProfile.vehicle
   */
  export type DriverProfile$vehicleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    where?: VehicleWhereInput
  }

  /**
   * DriverProfile without action
   */
  export type DriverProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriverProfile
     */
    select?: DriverProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DriverProfile
     */
    omit?: DriverProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverProfileInclude<ExtArgs> | null
  }


  /**
   * Model Vehicle
   */

  export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  export type VehicleAvgAggregateOutputType = {
    year: number | null
  }

  export type VehicleSumAggregateOutputType = {
    year: number | null
  }

  export type VehicleMinAggregateOutputType = {
    id: string | null
    driverProfileId: string | null
    type: $Enums.VehicleType | null
    make: string | null
    model: string | null
    color: string | null
    year: number | null
    licensePlate: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehicleMaxAggregateOutputType = {
    id: string | null
    driverProfileId: string | null
    type: $Enums.VehicleType | null
    make: string | null
    model: string | null
    color: string | null
    year: number | null
    licensePlate: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehicleCountAggregateOutputType = {
    id: number
    driverProfileId: number
    type: number
    make: number
    model: number
    color: number
    year: number
    licensePlate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VehicleAvgAggregateInputType = {
    year?: true
  }

  export type VehicleSumAggregateInputType = {
    year?: true
  }

  export type VehicleMinAggregateInputType = {
    id?: true
    driverProfileId?: true
    type?: true
    make?: true
    model?: true
    color?: true
    year?: true
    licensePlate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehicleMaxAggregateInputType = {
    id?: true
    driverProfileId?: true
    type?: true
    make?: true
    model?: true
    color?: true
    year?: true
    licensePlate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehicleCountAggregateInputType = {
    id?: true
    driverProfileId?: true
    type?: true
    make?: true
    model?: true
    color?: true
    year?: true
    licensePlate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicle to aggregate.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vehicles
    **/
    _count?: true | VehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleMaxAggregateInputType
  }

  export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicle[P]>
      : GetScalarType<T[P], AggregateVehicle[P]>
  }




  export type VehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithAggregationInput | VehicleOrderByWithAggregationInput[]
    by: VehicleScalarFieldEnum[] | VehicleScalarFieldEnum
    having?: VehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleCountAggregateInputType | true
    _avg?: VehicleAvgAggregateInputType
    _sum?: VehicleSumAggregateInputType
    _min?: VehicleMinAggregateInputType
    _max?: VehicleMaxAggregateInputType
  }

  export type VehicleGroupByOutputType = {
    id: string
    driverProfileId: string
    type: $Enums.VehicleType
    make: string
    model: string
    color: string
    year: number | null
    licensePlate: string
    createdAt: Date
    updatedAt: Date
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleGroupByOutputType[P]>
        }
      >
    >


  export type VehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driverProfileId?: boolean
    type?: boolean
    make?: boolean
    model?: boolean
    color?: boolean
    year?: boolean
    licensePlate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    driverProfile?: boolean | DriverProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driverProfileId?: boolean
    type?: boolean
    make?: boolean
    model?: boolean
    color?: boolean
    year?: boolean
    licensePlate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    driverProfile?: boolean | DriverProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driverProfileId?: boolean
    type?: boolean
    make?: boolean
    model?: boolean
    color?: boolean
    year?: boolean
    licensePlate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    driverProfile?: boolean | DriverProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectScalar = {
    id?: boolean
    driverProfileId?: boolean
    type?: boolean
    make?: boolean
    model?: boolean
    color?: boolean
    year?: boolean
    licensePlate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VehicleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "driverProfileId" | "type" | "make" | "model" | "color" | "year" | "licensePlate" | "createdAt" | "updatedAt", ExtArgs["result"]["vehicle"]>
  export type VehicleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driverProfile?: boolean | DriverProfileDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driverProfile?: boolean | DriverProfileDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driverProfile?: boolean | DriverProfileDefaultArgs<ExtArgs>
  }

  export type $VehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vehicle"
    objects: {
      driverProfile: Prisma.$DriverProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      driverProfileId: string
      type: $Enums.VehicleType
      make: string
      model: string
      color: string
      year: number | null
      licensePlate: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vehicle"]>
    composites: {}
  }

  type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = $Result.GetResult<Prisma.$VehiclePayload, S>

  type VehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleCountAggregateInputType | true
    }

  export interface VehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'], meta: { name: 'Vehicle' } }
    /**
     * Find zero or one Vehicle that matches the filter.
     * @param {VehicleFindUniqueArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleFindUniqueArgs>(args: SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vehicle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleFindUniqueOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleFindFirstArgs>(args?: SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vehicles
     * const vehicles = await prisma.vehicle.findMany()
     * 
     * // Get first 10 Vehicles
     * const vehicles = await prisma.vehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleFindManyArgs>(args?: SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vehicle.
     * @param {VehicleCreateArgs} args - Arguments to create a Vehicle.
     * @example
     * // Create one Vehicle
     * const Vehicle = await prisma.vehicle.create({
     *   data: {
     *     // ... data to create a Vehicle
     *   }
     * })
     * 
     */
    create<T extends VehicleCreateArgs>(args: SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vehicles.
     * @param {VehicleCreateManyArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleCreateManyArgs>(args?: SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vehicles and returns the data saved in the database.
     * @param {VehicleCreateManyAndReturnArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vehicle.
     * @param {VehicleDeleteArgs} args - Arguments to delete one Vehicle.
     * @example
     * // Delete one Vehicle
     * const Vehicle = await prisma.vehicle.delete({
     *   where: {
     *     // ... filter to delete one Vehicle
     *   }
     * })
     * 
     */
    delete<T extends VehicleDeleteArgs>(args: SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vehicle.
     * @param {VehicleUpdateArgs} args - Arguments to update one Vehicle.
     * @example
     * // Update one Vehicle
     * const vehicle = await prisma.vehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleUpdateArgs>(args: SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vehicles.
     * @param {VehicleDeleteManyArgs} args - Arguments to filter Vehicles to delete.
     * @example
     * // Delete a few Vehicles
     * const { count } = await prisma.vehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleDeleteManyArgs>(args?: SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleUpdateManyArgs>(args: SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles and returns the data updated in the database.
     * @param {VehicleUpdateManyAndReturnArgs} args - Arguments to update many Vehicles.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VehicleUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vehicle.
     * @param {VehicleUpsertArgs} args - Arguments to update or create a Vehicle.
     * @example
     * // Update or create a Vehicle
     * const vehicle = await prisma.vehicle.upsert({
     *   create: {
     *     // ... data to create a Vehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vehicle we want to update
     *   }
     * })
     */
    upsert<T extends VehicleUpsertArgs>(args: SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleCountArgs} args - Arguments to filter Vehicles to count.
     * @example
     * // Count the number of Vehicles
     * const count = await prisma.vehicle.count({
     *   where: {
     *     // ... the filter for the Vehicles we want to count
     *   }
     * })
    **/
    count<T extends VehicleCountArgs>(
      args?: Subset<T, VehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleAggregateArgs>(args: Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>

    /**
     * Group by Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleGroupByArgs['orderBy'] }
        : { orderBy?: VehicleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vehicle model
   */
  readonly fields: VehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    driverProfile<T extends DriverProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DriverProfileDefaultArgs<ExtArgs>>): Prisma__DriverProfileClient<$Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vehicle model
   */
  interface VehicleFieldRefs {
    readonly id: FieldRef<"Vehicle", 'String'>
    readonly driverProfileId: FieldRef<"Vehicle", 'String'>
    readonly type: FieldRef<"Vehicle", 'VehicleType'>
    readonly make: FieldRef<"Vehicle", 'String'>
    readonly model: FieldRef<"Vehicle", 'String'>
    readonly color: FieldRef<"Vehicle", 'String'>
    readonly year: FieldRef<"Vehicle", 'Int'>
    readonly licensePlate: FieldRef<"Vehicle", 'String'>
    readonly createdAt: FieldRef<"Vehicle", 'DateTime'>
    readonly updatedAt: FieldRef<"Vehicle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vehicle findUnique
   */
  export type VehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findUniqueOrThrow
   */
  export type VehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findFirst
   */
  export type VehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findFirstOrThrow
   */
  export type VehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findMany
   */
  export type VehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicles to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle create
   */
  export type VehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to create a Vehicle.
     */
    data: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
  }

  /**
   * Vehicle createMany
   */
  export type VehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle createManyAndReturn
   */
  export type VehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vehicle update
   */
  export type VehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to update a Vehicle.
     */
    data: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
    /**
     * Choose, which Vehicle to update.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle updateMany
   */
  export type VehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle updateManyAndReturn
   */
  export type VehicleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vehicle upsert
   */
  export type VehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The filter to search for the Vehicle to update in case it exists.
     */
    where: VehicleWhereUniqueInput
    /**
     * In case the Vehicle found by the `where` argument doesn't exist, create a new Vehicle with this data.
     */
    create: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
    /**
     * In case the Vehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
  }

  /**
   * Vehicle delete
   */
  export type VehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter which Vehicle to delete.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle deleteMany
   */
  export type VehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicles to delete
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to delete.
     */
    limit?: number
  }

  /**
   * Vehicle without action
   */
  export type VehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
  }


  /**
   * Model Ride
   */

  export type AggregateRide = {
    _count: RideCountAggregateOutputType | null
    _avg: RideAvgAggregateOutputType | null
    _sum: RideSumAggregateOutputType | null
    _min: RideMinAggregateOutputType | null
    _max: RideMaxAggregateOutputType | null
  }

  export type RideAvgAggregateOutputType = {
    pickupLat: number | null
    pickupLng: number | null
    dropoffLat: number | null
    dropoffLng: number | null
    fare: Decimal | null
  }

  export type RideSumAggregateOutputType = {
    pickupLat: number | null
    pickupLng: number | null
    dropoffLat: number | null
    dropoffLng: number | null
    fare: Decimal | null
  }

  export type RideMinAggregateOutputType = {
    id: string | null
    riderId: string | null
    driverId: string | null
    status: $Enums.RideStatus | null
    pickupLat: number | null
    pickupLng: number | null
    dropoffLat: number | null
    dropoffLng: number | null
    fare: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RideMaxAggregateOutputType = {
    id: string | null
    riderId: string | null
    driverId: string | null
    status: $Enums.RideStatus | null
    pickupLat: number | null
    pickupLng: number | null
    dropoffLat: number | null
    dropoffLng: number | null
    fare: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RideCountAggregateOutputType = {
    id: number
    riderId: number
    driverId: number
    status: number
    pickupLat: number
    pickupLng: number
    dropoffLat: number
    dropoffLng: number
    fare: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RideAvgAggregateInputType = {
    pickupLat?: true
    pickupLng?: true
    dropoffLat?: true
    dropoffLng?: true
    fare?: true
  }

  export type RideSumAggregateInputType = {
    pickupLat?: true
    pickupLng?: true
    dropoffLat?: true
    dropoffLng?: true
    fare?: true
  }

  export type RideMinAggregateInputType = {
    id?: true
    riderId?: true
    driverId?: true
    status?: true
    pickupLat?: true
    pickupLng?: true
    dropoffLat?: true
    dropoffLng?: true
    fare?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RideMaxAggregateInputType = {
    id?: true
    riderId?: true
    driverId?: true
    status?: true
    pickupLat?: true
    pickupLng?: true
    dropoffLat?: true
    dropoffLng?: true
    fare?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RideCountAggregateInputType = {
    id?: true
    riderId?: true
    driverId?: true
    status?: true
    pickupLat?: true
    pickupLng?: true
    dropoffLat?: true
    dropoffLng?: true
    fare?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RideAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ride to aggregate.
     */
    where?: RideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rides to fetch.
     */
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rides
    **/
    _count?: true | RideCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RideAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RideSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RideMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RideMaxAggregateInputType
  }

  export type GetRideAggregateType<T extends RideAggregateArgs> = {
        [P in keyof T & keyof AggregateRide]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRide[P]>
      : GetScalarType<T[P], AggregateRide[P]>
  }




  export type RideGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RideWhereInput
    orderBy?: RideOrderByWithAggregationInput | RideOrderByWithAggregationInput[]
    by: RideScalarFieldEnum[] | RideScalarFieldEnum
    having?: RideScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RideCountAggregateInputType | true
    _avg?: RideAvgAggregateInputType
    _sum?: RideSumAggregateInputType
    _min?: RideMinAggregateInputType
    _max?: RideMaxAggregateInputType
  }

  export type RideGroupByOutputType = {
    id: string
    riderId: string
    driverId: string | null
    status: $Enums.RideStatus
    pickupLat: number
    pickupLng: number
    dropoffLat: number
    dropoffLng: number
    fare: Decimal
    createdAt: Date
    updatedAt: Date
    _count: RideCountAggregateOutputType | null
    _avg: RideAvgAggregateOutputType | null
    _sum: RideSumAggregateOutputType | null
    _min: RideMinAggregateOutputType | null
    _max: RideMaxAggregateOutputType | null
  }

  type GetRideGroupByPayload<T extends RideGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RideGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RideGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RideGroupByOutputType[P]>
            : GetScalarType<T[P], RideGroupByOutputType[P]>
        }
      >
    >


  export type RideSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    riderId?: boolean
    driverId?: boolean
    status?: boolean
    pickupLat?: boolean
    pickupLng?: boolean
    dropoffLat?: boolean
    dropoffLng?: boolean
    fare?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rider?: boolean | UserDefaultArgs<ExtArgs>
    driver?: boolean | Ride$driverArgs<ExtArgs>
    rideEvents?: boolean | Ride$rideEventsArgs<ExtArgs>
    _count?: boolean | RideCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ride"]>

  export type RideSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    riderId?: boolean
    driverId?: boolean
    status?: boolean
    pickupLat?: boolean
    pickupLng?: boolean
    dropoffLat?: boolean
    dropoffLng?: boolean
    fare?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rider?: boolean | UserDefaultArgs<ExtArgs>
    driver?: boolean | Ride$driverArgs<ExtArgs>
  }, ExtArgs["result"]["ride"]>

  export type RideSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    riderId?: boolean
    driverId?: boolean
    status?: boolean
    pickupLat?: boolean
    pickupLng?: boolean
    dropoffLat?: boolean
    dropoffLng?: boolean
    fare?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rider?: boolean | UserDefaultArgs<ExtArgs>
    driver?: boolean | Ride$driverArgs<ExtArgs>
  }, ExtArgs["result"]["ride"]>

  export type RideSelectScalar = {
    id?: boolean
    riderId?: boolean
    driverId?: boolean
    status?: boolean
    pickupLat?: boolean
    pickupLng?: boolean
    dropoffLat?: boolean
    dropoffLng?: boolean
    fare?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RideOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "riderId" | "driverId" | "status" | "pickupLat" | "pickupLng" | "dropoffLat" | "dropoffLng" | "fare" | "createdAt" | "updatedAt", ExtArgs["result"]["ride"]>
  export type RideInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rider?: boolean | UserDefaultArgs<ExtArgs>
    driver?: boolean | Ride$driverArgs<ExtArgs>
    rideEvents?: boolean | Ride$rideEventsArgs<ExtArgs>
    _count?: boolean | RideCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RideIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rider?: boolean | UserDefaultArgs<ExtArgs>
    driver?: boolean | Ride$driverArgs<ExtArgs>
  }
  export type RideIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rider?: boolean | UserDefaultArgs<ExtArgs>
    driver?: boolean | Ride$driverArgs<ExtArgs>
  }

  export type $RidePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ride"
    objects: {
      rider: Prisma.$UserPayload<ExtArgs>
      driver: Prisma.$UserPayload<ExtArgs> | null
      rideEvents: Prisma.$RideEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      riderId: string
      driverId: string | null
      status: $Enums.RideStatus
      pickupLat: number
      pickupLng: number
      dropoffLat: number
      dropoffLng: number
      fare: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ride"]>
    composites: {}
  }

  type RideGetPayload<S extends boolean | null | undefined | RideDefaultArgs> = $Result.GetResult<Prisma.$RidePayload, S>

  type RideCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RideFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RideCountAggregateInputType | true
    }

  export interface RideDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ride'], meta: { name: 'Ride' } }
    /**
     * Find zero or one Ride that matches the filter.
     * @param {RideFindUniqueArgs} args - Arguments to find a Ride
     * @example
     * // Get one Ride
     * const ride = await prisma.ride.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RideFindUniqueArgs>(args: SelectSubset<T, RideFindUniqueArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ride that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RideFindUniqueOrThrowArgs} args - Arguments to find a Ride
     * @example
     * // Get one Ride
     * const ride = await prisma.ride.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RideFindUniqueOrThrowArgs>(args: SelectSubset<T, RideFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ride that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideFindFirstArgs} args - Arguments to find a Ride
     * @example
     * // Get one Ride
     * const ride = await prisma.ride.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RideFindFirstArgs>(args?: SelectSubset<T, RideFindFirstArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ride that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideFindFirstOrThrowArgs} args - Arguments to find a Ride
     * @example
     * // Get one Ride
     * const ride = await prisma.ride.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RideFindFirstOrThrowArgs>(args?: SelectSubset<T, RideFindFirstOrThrowArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rides that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rides
     * const rides = await prisma.ride.findMany()
     * 
     * // Get first 10 Rides
     * const rides = await prisma.ride.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rideWithIdOnly = await prisma.ride.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RideFindManyArgs>(args?: SelectSubset<T, RideFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ride.
     * @param {RideCreateArgs} args - Arguments to create a Ride.
     * @example
     * // Create one Ride
     * const Ride = await prisma.ride.create({
     *   data: {
     *     // ... data to create a Ride
     *   }
     * })
     * 
     */
    create<T extends RideCreateArgs>(args: SelectSubset<T, RideCreateArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rides.
     * @param {RideCreateManyArgs} args - Arguments to create many Rides.
     * @example
     * // Create many Rides
     * const ride = await prisma.ride.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RideCreateManyArgs>(args?: SelectSubset<T, RideCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rides and returns the data saved in the database.
     * @param {RideCreateManyAndReturnArgs} args - Arguments to create many Rides.
     * @example
     * // Create many Rides
     * const ride = await prisma.ride.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rides and only return the `id`
     * const rideWithIdOnly = await prisma.ride.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RideCreateManyAndReturnArgs>(args?: SelectSubset<T, RideCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ride.
     * @param {RideDeleteArgs} args - Arguments to delete one Ride.
     * @example
     * // Delete one Ride
     * const Ride = await prisma.ride.delete({
     *   where: {
     *     // ... filter to delete one Ride
     *   }
     * })
     * 
     */
    delete<T extends RideDeleteArgs>(args: SelectSubset<T, RideDeleteArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ride.
     * @param {RideUpdateArgs} args - Arguments to update one Ride.
     * @example
     * // Update one Ride
     * const ride = await prisma.ride.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RideUpdateArgs>(args: SelectSubset<T, RideUpdateArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rides.
     * @param {RideDeleteManyArgs} args - Arguments to filter Rides to delete.
     * @example
     * // Delete a few Rides
     * const { count } = await prisma.ride.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RideDeleteManyArgs>(args?: SelectSubset<T, RideDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rides
     * const ride = await prisma.ride.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RideUpdateManyArgs>(args: SelectSubset<T, RideUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rides and returns the data updated in the database.
     * @param {RideUpdateManyAndReturnArgs} args - Arguments to update many Rides.
     * @example
     * // Update many Rides
     * const ride = await prisma.ride.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rides and only return the `id`
     * const rideWithIdOnly = await prisma.ride.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RideUpdateManyAndReturnArgs>(args: SelectSubset<T, RideUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ride.
     * @param {RideUpsertArgs} args - Arguments to update or create a Ride.
     * @example
     * // Update or create a Ride
     * const ride = await prisma.ride.upsert({
     *   create: {
     *     // ... data to create a Ride
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ride we want to update
     *   }
     * })
     */
    upsert<T extends RideUpsertArgs>(args: SelectSubset<T, RideUpsertArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideCountArgs} args - Arguments to filter Rides to count.
     * @example
     * // Count the number of Rides
     * const count = await prisma.ride.count({
     *   where: {
     *     // ... the filter for the Rides we want to count
     *   }
     * })
    **/
    count<T extends RideCountArgs>(
      args?: Subset<T, RideCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RideCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ride.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RideAggregateArgs>(args: Subset<T, RideAggregateArgs>): Prisma.PrismaPromise<GetRideAggregateType<T>>

    /**
     * Group by Ride.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RideGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RideGroupByArgs['orderBy'] }
        : { orderBy?: RideGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RideGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRideGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ride model
   */
  readonly fields: RideFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ride.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RideClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rider<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    driver<T extends Ride$driverArgs<ExtArgs> = {}>(args?: Subset<T, Ride$driverArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    rideEvents<T extends Ride$rideEventsArgs<ExtArgs> = {}>(args?: Subset<T, Ride$rideEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RideEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ride model
   */
  interface RideFieldRefs {
    readonly id: FieldRef<"Ride", 'String'>
    readonly riderId: FieldRef<"Ride", 'String'>
    readonly driverId: FieldRef<"Ride", 'String'>
    readonly status: FieldRef<"Ride", 'RideStatus'>
    readonly pickupLat: FieldRef<"Ride", 'Float'>
    readonly pickupLng: FieldRef<"Ride", 'Float'>
    readonly dropoffLat: FieldRef<"Ride", 'Float'>
    readonly dropoffLng: FieldRef<"Ride", 'Float'>
    readonly fare: FieldRef<"Ride", 'Decimal'>
    readonly createdAt: FieldRef<"Ride", 'DateTime'>
    readonly updatedAt: FieldRef<"Ride", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ride findUnique
   */
  export type RideFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * Filter, which Ride to fetch.
     */
    where: RideWhereUniqueInput
  }

  /**
   * Ride findUniqueOrThrow
   */
  export type RideFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * Filter, which Ride to fetch.
     */
    where: RideWhereUniqueInput
  }

  /**
   * Ride findFirst
   */
  export type RideFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * Filter, which Ride to fetch.
     */
    where?: RideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rides to fetch.
     */
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rides.
     */
    cursor?: RideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rides.
     */
    distinct?: RideScalarFieldEnum | RideScalarFieldEnum[]
  }

  /**
   * Ride findFirstOrThrow
   */
  export type RideFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * Filter, which Ride to fetch.
     */
    where?: RideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rides to fetch.
     */
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rides.
     */
    cursor?: RideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rides.
     */
    distinct?: RideScalarFieldEnum | RideScalarFieldEnum[]
  }

  /**
   * Ride findMany
   */
  export type RideFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * Filter, which Rides to fetch.
     */
    where?: RideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rides to fetch.
     */
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rides.
     */
    cursor?: RideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rides.
     */
    distinct?: RideScalarFieldEnum | RideScalarFieldEnum[]
  }

  /**
   * Ride create
   */
  export type RideCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * The data needed to create a Ride.
     */
    data: XOR<RideCreateInput, RideUncheckedCreateInput>
  }

  /**
   * Ride createMany
   */
  export type RideCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rides.
     */
    data: RideCreateManyInput | RideCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ride createManyAndReturn
   */
  export type RideCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * The data used to create many Rides.
     */
    data: RideCreateManyInput | RideCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ride update
   */
  export type RideUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * The data needed to update a Ride.
     */
    data: XOR<RideUpdateInput, RideUncheckedUpdateInput>
    /**
     * Choose, which Ride to update.
     */
    where: RideWhereUniqueInput
  }

  /**
   * Ride updateMany
   */
  export type RideUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rides.
     */
    data: XOR<RideUpdateManyMutationInput, RideUncheckedUpdateManyInput>
    /**
     * Filter which Rides to update
     */
    where?: RideWhereInput
    /**
     * Limit how many Rides to update.
     */
    limit?: number
  }

  /**
   * Ride updateManyAndReturn
   */
  export type RideUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * The data used to update Rides.
     */
    data: XOR<RideUpdateManyMutationInput, RideUncheckedUpdateManyInput>
    /**
     * Filter which Rides to update
     */
    where?: RideWhereInput
    /**
     * Limit how many Rides to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ride upsert
   */
  export type RideUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * The filter to search for the Ride to update in case it exists.
     */
    where: RideWhereUniqueInput
    /**
     * In case the Ride found by the `where` argument doesn't exist, create a new Ride with this data.
     */
    create: XOR<RideCreateInput, RideUncheckedCreateInput>
    /**
     * In case the Ride was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RideUpdateInput, RideUncheckedUpdateInput>
  }

  /**
   * Ride delete
   */
  export type RideDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
    /**
     * Filter which Ride to delete.
     */
    where: RideWhereUniqueInput
  }

  /**
   * Ride deleteMany
   */
  export type RideDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rides to delete
     */
    where?: RideWhereInput
    /**
     * Limit how many Rides to delete.
     */
    limit?: number
  }

  /**
   * Ride.driver
   */
  export type Ride$driverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Ride.rideEvents
   */
  export type Ride$rideEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideEvent
     */
    select?: RideEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideEvent
     */
    omit?: RideEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideEventInclude<ExtArgs> | null
    where?: RideEventWhereInput
    orderBy?: RideEventOrderByWithRelationInput | RideEventOrderByWithRelationInput[]
    cursor?: RideEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RideEventScalarFieldEnum | RideEventScalarFieldEnum[]
  }

  /**
   * Ride without action
   */
  export type RideDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null
  }


  /**
   * Model RideEvent
   */

  export type AggregateRideEvent = {
    _count: RideEventCountAggregateOutputType | null
    _min: RideEventMinAggregateOutputType | null
    _max: RideEventMaxAggregateOutputType | null
  }

  export type RideEventMinAggregateOutputType = {
    id: string | null
    rideId: string | null
    type: $Enums.RideEventType | null
    actorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RideEventMaxAggregateOutputType = {
    id: string | null
    rideId: string | null
    type: $Enums.RideEventType | null
    actorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RideEventCountAggregateOutputType = {
    id: number
    rideId: number
    type: number
    payload: number
    actorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RideEventMinAggregateInputType = {
    id?: true
    rideId?: true
    type?: true
    actorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RideEventMaxAggregateInputType = {
    id?: true
    rideId?: true
    type?: true
    actorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RideEventCountAggregateInputType = {
    id?: true
    rideId?: true
    type?: true
    payload?: true
    actorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RideEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RideEvent to aggregate.
     */
    where?: RideEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RideEvents to fetch.
     */
    orderBy?: RideEventOrderByWithRelationInput | RideEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RideEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RideEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RideEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RideEvents
    **/
    _count?: true | RideEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RideEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RideEventMaxAggregateInputType
  }

  export type GetRideEventAggregateType<T extends RideEventAggregateArgs> = {
        [P in keyof T & keyof AggregateRideEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRideEvent[P]>
      : GetScalarType<T[P], AggregateRideEvent[P]>
  }




  export type RideEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RideEventWhereInput
    orderBy?: RideEventOrderByWithAggregationInput | RideEventOrderByWithAggregationInput[]
    by: RideEventScalarFieldEnum[] | RideEventScalarFieldEnum
    having?: RideEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RideEventCountAggregateInputType | true
    _min?: RideEventMinAggregateInputType
    _max?: RideEventMaxAggregateInputType
  }

  export type RideEventGroupByOutputType = {
    id: string
    rideId: string
    type: $Enums.RideEventType
    payload: JsonValue | null
    actorId: string
    createdAt: Date
    updatedAt: Date
    _count: RideEventCountAggregateOutputType | null
    _min: RideEventMinAggregateOutputType | null
    _max: RideEventMaxAggregateOutputType | null
  }

  type GetRideEventGroupByPayload<T extends RideEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RideEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RideEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RideEventGroupByOutputType[P]>
            : GetScalarType<T[P], RideEventGroupByOutputType[P]>
        }
      >
    >


  export type RideEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rideId?: boolean
    type?: boolean
    payload?: boolean
    actorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ride?: boolean | RideDefaultArgs<ExtArgs>
    actor?: boolean | RideEvent$actorArgs<ExtArgs>
  }, ExtArgs["result"]["rideEvent"]>

  export type RideEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rideId?: boolean
    type?: boolean
    payload?: boolean
    actorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ride?: boolean | RideDefaultArgs<ExtArgs>
    actor?: boolean | RideEvent$actorArgs<ExtArgs>
  }, ExtArgs["result"]["rideEvent"]>

  export type RideEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rideId?: boolean
    type?: boolean
    payload?: boolean
    actorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ride?: boolean | RideDefaultArgs<ExtArgs>
    actor?: boolean | RideEvent$actorArgs<ExtArgs>
  }, ExtArgs["result"]["rideEvent"]>

  export type RideEventSelectScalar = {
    id?: boolean
    rideId?: boolean
    type?: boolean
    payload?: boolean
    actorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RideEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rideId" | "type" | "payload" | "actorId" | "createdAt" | "updatedAt", ExtArgs["result"]["rideEvent"]>
  export type RideEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ride?: boolean | RideDefaultArgs<ExtArgs>
    actor?: boolean | RideEvent$actorArgs<ExtArgs>
  }
  export type RideEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ride?: boolean | RideDefaultArgs<ExtArgs>
    actor?: boolean | RideEvent$actorArgs<ExtArgs>
  }
  export type RideEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ride?: boolean | RideDefaultArgs<ExtArgs>
    actor?: boolean | RideEvent$actorArgs<ExtArgs>
  }

  export type $RideEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RideEvent"
    objects: {
      ride: Prisma.$RidePayload<ExtArgs>
      actor: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rideId: string
      type: $Enums.RideEventType
      payload: Prisma.JsonValue | null
      actorId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rideEvent"]>
    composites: {}
  }

  type RideEventGetPayload<S extends boolean | null | undefined | RideEventDefaultArgs> = $Result.GetResult<Prisma.$RideEventPayload, S>

  type RideEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RideEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RideEventCountAggregateInputType | true
    }

  export interface RideEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RideEvent'], meta: { name: 'RideEvent' } }
    /**
     * Find zero or one RideEvent that matches the filter.
     * @param {RideEventFindUniqueArgs} args - Arguments to find a RideEvent
     * @example
     * // Get one RideEvent
     * const rideEvent = await prisma.rideEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RideEventFindUniqueArgs>(args: SelectSubset<T, RideEventFindUniqueArgs<ExtArgs>>): Prisma__RideEventClient<$Result.GetResult<Prisma.$RideEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RideEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RideEventFindUniqueOrThrowArgs} args - Arguments to find a RideEvent
     * @example
     * // Get one RideEvent
     * const rideEvent = await prisma.rideEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RideEventFindUniqueOrThrowArgs>(args: SelectSubset<T, RideEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RideEventClient<$Result.GetResult<Prisma.$RideEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RideEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideEventFindFirstArgs} args - Arguments to find a RideEvent
     * @example
     * // Get one RideEvent
     * const rideEvent = await prisma.rideEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RideEventFindFirstArgs>(args?: SelectSubset<T, RideEventFindFirstArgs<ExtArgs>>): Prisma__RideEventClient<$Result.GetResult<Prisma.$RideEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RideEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideEventFindFirstOrThrowArgs} args - Arguments to find a RideEvent
     * @example
     * // Get one RideEvent
     * const rideEvent = await prisma.rideEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RideEventFindFirstOrThrowArgs>(args?: SelectSubset<T, RideEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__RideEventClient<$Result.GetResult<Prisma.$RideEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RideEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RideEvents
     * const rideEvents = await prisma.rideEvent.findMany()
     * 
     * // Get first 10 RideEvents
     * const rideEvents = await prisma.rideEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rideEventWithIdOnly = await prisma.rideEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RideEventFindManyArgs>(args?: SelectSubset<T, RideEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RideEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RideEvent.
     * @param {RideEventCreateArgs} args - Arguments to create a RideEvent.
     * @example
     * // Create one RideEvent
     * const RideEvent = await prisma.rideEvent.create({
     *   data: {
     *     // ... data to create a RideEvent
     *   }
     * })
     * 
     */
    create<T extends RideEventCreateArgs>(args: SelectSubset<T, RideEventCreateArgs<ExtArgs>>): Prisma__RideEventClient<$Result.GetResult<Prisma.$RideEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RideEvents.
     * @param {RideEventCreateManyArgs} args - Arguments to create many RideEvents.
     * @example
     * // Create many RideEvents
     * const rideEvent = await prisma.rideEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RideEventCreateManyArgs>(args?: SelectSubset<T, RideEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RideEvents and returns the data saved in the database.
     * @param {RideEventCreateManyAndReturnArgs} args - Arguments to create many RideEvents.
     * @example
     * // Create many RideEvents
     * const rideEvent = await prisma.rideEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RideEvents and only return the `id`
     * const rideEventWithIdOnly = await prisma.rideEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RideEventCreateManyAndReturnArgs>(args?: SelectSubset<T, RideEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RideEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RideEvent.
     * @param {RideEventDeleteArgs} args - Arguments to delete one RideEvent.
     * @example
     * // Delete one RideEvent
     * const RideEvent = await prisma.rideEvent.delete({
     *   where: {
     *     // ... filter to delete one RideEvent
     *   }
     * })
     * 
     */
    delete<T extends RideEventDeleteArgs>(args: SelectSubset<T, RideEventDeleteArgs<ExtArgs>>): Prisma__RideEventClient<$Result.GetResult<Prisma.$RideEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RideEvent.
     * @param {RideEventUpdateArgs} args - Arguments to update one RideEvent.
     * @example
     * // Update one RideEvent
     * const rideEvent = await prisma.rideEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RideEventUpdateArgs>(args: SelectSubset<T, RideEventUpdateArgs<ExtArgs>>): Prisma__RideEventClient<$Result.GetResult<Prisma.$RideEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RideEvents.
     * @param {RideEventDeleteManyArgs} args - Arguments to filter RideEvents to delete.
     * @example
     * // Delete a few RideEvents
     * const { count } = await prisma.rideEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RideEventDeleteManyArgs>(args?: SelectSubset<T, RideEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RideEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RideEvents
     * const rideEvent = await prisma.rideEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RideEventUpdateManyArgs>(args: SelectSubset<T, RideEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RideEvents and returns the data updated in the database.
     * @param {RideEventUpdateManyAndReturnArgs} args - Arguments to update many RideEvents.
     * @example
     * // Update many RideEvents
     * const rideEvent = await prisma.rideEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RideEvents and only return the `id`
     * const rideEventWithIdOnly = await prisma.rideEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RideEventUpdateManyAndReturnArgs>(args: SelectSubset<T, RideEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RideEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RideEvent.
     * @param {RideEventUpsertArgs} args - Arguments to update or create a RideEvent.
     * @example
     * // Update or create a RideEvent
     * const rideEvent = await prisma.rideEvent.upsert({
     *   create: {
     *     // ... data to create a RideEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RideEvent we want to update
     *   }
     * })
     */
    upsert<T extends RideEventUpsertArgs>(args: SelectSubset<T, RideEventUpsertArgs<ExtArgs>>): Prisma__RideEventClient<$Result.GetResult<Prisma.$RideEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RideEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideEventCountArgs} args - Arguments to filter RideEvents to count.
     * @example
     * // Count the number of RideEvents
     * const count = await prisma.rideEvent.count({
     *   where: {
     *     // ... the filter for the RideEvents we want to count
     *   }
     * })
    **/
    count<T extends RideEventCountArgs>(
      args?: Subset<T, RideEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RideEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RideEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RideEventAggregateArgs>(args: Subset<T, RideEventAggregateArgs>): Prisma.PrismaPromise<GetRideEventAggregateType<T>>

    /**
     * Group by RideEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RideEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RideEventGroupByArgs['orderBy'] }
        : { orderBy?: RideEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RideEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRideEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RideEvent model
   */
  readonly fields: RideEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RideEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RideEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ride<T extends RideDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RideDefaultArgs<ExtArgs>>): Prisma__RideClient<$Result.GetResult<Prisma.$RidePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    actor<T extends RideEvent$actorArgs<ExtArgs> = {}>(args?: Subset<T, RideEvent$actorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RideEvent model
   */
  interface RideEventFieldRefs {
    readonly id: FieldRef<"RideEvent", 'String'>
    readonly rideId: FieldRef<"RideEvent", 'String'>
    readonly type: FieldRef<"RideEvent", 'RideEventType'>
    readonly payload: FieldRef<"RideEvent", 'Json'>
    readonly actorId: FieldRef<"RideEvent", 'String'>
    readonly createdAt: FieldRef<"RideEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"RideEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RideEvent findUnique
   */
  export type RideEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideEvent
     */
    select?: RideEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideEvent
     */
    omit?: RideEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideEventInclude<ExtArgs> | null
    /**
     * Filter, which RideEvent to fetch.
     */
    where: RideEventWhereUniqueInput
  }

  /**
   * RideEvent findUniqueOrThrow
   */
  export type RideEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideEvent
     */
    select?: RideEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideEvent
     */
    omit?: RideEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideEventInclude<ExtArgs> | null
    /**
     * Filter, which RideEvent to fetch.
     */
    where: RideEventWhereUniqueInput
  }

  /**
   * RideEvent findFirst
   */
  export type RideEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideEvent
     */
    select?: RideEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideEvent
     */
    omit?: RideEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideEventInclude<ExtArgs> | null
    /**
     * Filter, which RideEvent to fetch.
     */
    where?: RideEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RideEvents to fetch.
     */
    orderBy?: RideEventOrderByWithRelationInput | RideEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RideEvents.
     */
    cursor?: RideEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RideEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RideEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RideEvents.
     */
    distinct?: RideEventScalarFieldEnum | RideEventScalarFieldEnum[]
  }

  /**
   * RideEvent findFirstOrThrow
   */
  export type RideEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideEvent
     */
    select?: RideEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideEvent
     */
    omit?: RideEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideEventInclude<ExtArgs> | null
    /**
     * Filter, which RideEvent to fetch.
     */
    where?: RideEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RideEvents to fetch.
     */
    orderBy?: RideEventOrderByWithRelationInput | RideEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RideEvents.
     */
    cursor?: RideEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RideEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RideEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RideEvents.
     */
    distinct?: RideEventScalarFieldEnum | RideEventScalarFieldEnum[]
  }

  /**
   * RideEvent findMany
   */
  export type RideEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideEvent
     */
    select?: RideEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideEvent
     */
    omit?: RideEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideEventInclude<ExtArgs> | null
    /**
     * Filter, which RideEvents to fetch.
     */
    where?: RideEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RideEvents to fetch.
     */
    orderBy?: RideEventOrderByWithRelationInput | RideEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RideEvents.
     */
    cursor?: RideEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RideEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RideEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RideEvents.
     */
    distinct?: RideEventScalarFieldEnum | RideEventScalarFieldEnum[]
  }

  /**
   * RideEvent create
   */
  export type RideEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideEvent
     */
    select?: RideEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideEvent
     */
    omit?: RideEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideEventInclude<ExtArgs> | null
    /**
     * The data needed to create a RideEvent.
     */
    data: XOR<RideEventCreateInput, RideEventUncheckedCreateInput>
  }

  /**
   * RideEvent createMany
   */
  export type RideEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RideEvents.
     */
    data: RideEventCreateManyInput | RideEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RideEvent createManyAndReturn
   */
  export type RideEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideEvent
     */
    select?: RideEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RideEvent
     */
    omit?: RideEventOmit<ExtArgs> | null
    /**
     * The data used to create many RideEvents.
     */
    data: RideEventCreateManyInput | RideEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RideEvent update
   */
  export type RideEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideEvent
     */
    select?: RideEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideEvent
     */
    omit?: RideEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideEventInclude<ExtArgs> | null
    /**
     * The data needed to update a RideEvent.
     */
    data: XOR<RideEventUpdateInput, RideEventUncheckedUpdateInput>
    /**
     * Choose, which RideEvent to update.
     */
    where: RideEventWhereUniqueInput
  }

  /**
   * RideEvent updateMany
   */
  export type RideEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RideEvents.
     */
    data: XOR<RideEventUpdateManyMutationInput, RideEventUncheckedUpdateManyInput>
    /**
     * Filter which RideEvents to update
     */
    where?: RideEventWhereInput
    /**
     * Limit how many RideEvents to update.
     */
    limit?: number
  }

  /**
   * RideEvent updateManyAndReturn
   */
  export type RideEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideEvent
     */
    select?: RideEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RideEvent
     */
    omit?: RideEventOmit<ExtArgs> | null
    /**
     * The data used to update RideEvents.
     */
    data: XOR<RideEventUpdateManyMutationInput, RideEventUncheckedUpdateManyInput>
    /**
     * Filter which RideEvents to update
     */
    where?: RideEventWhereInput
    /**
     * Limit how many RideEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RideEvent upsert
   */
  export type RideEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideEvent
     */
    select?: RideEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideEvent
     */
    omit?: RideEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideEventInclude<ExtArgs> | null
    /**
     * The filter to search for the RideEvent to update in case it exists.
     */
    where: RideEventWhereUniqueInput
    /**
     * In case the RideEvent found by the `where` argument doesn't exist, create a new RideEvent with this data.
     */
    create: XOR<RideEventCreateInput, RideEventUncheckedCreateInput>
    /**
     * In case the RideEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RideEventUpdateInput, RideEventUncheckedUpdateInput>
  }

  /**
   * RideEvent delete
   */
  export type RideEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideEvent
     */
    select?: RideEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideEvent
     */
    omit?: RideEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideEventInclude<ExtArgs> | null
    /**
     * Filter which RideEvent to delete.
     */
    where: RideEventWhereUniqueInput
  }

  /**
   * RideEvent deleteMany
   */
  export type RideEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RideEvents to delete
     */
    where?: RideEventWhereInput
    /**
     * Limit how many RideEvents to delete.
     */
    limit?: number
  }

  /**
   * RideEvent.actor
   */
  export type RideEvent$actorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * RideEvent without action
   */
  export type RideEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideEvent
     */
    select?: RideEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RideEvent
     */
    omit?: RideEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideEventInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    status: 'status',
    firstName: 'firstName',
    lastName: 'lastName',
    phoneNumber: 'phoneNumber',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DriverProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    isAvailable: 'isAvailable',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DriverProfileScalarFieldEnum = (typeof DriverProfileScalarFieldEnum)[keyof typeof DriverProfileScalarFieldEnum]


  export const VehicleScalarFieldEnum: {
    id: 'id',
    driverProfileId: 'driverProfileId',
    type: 'type',
    make: 'make',
    model: 'model',
    color: 'color',
    year: 'year',
    licensePlate: 'licensePlate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum]


  export const RideScalarFieldEnum: {
    id: 'id',
    riderId: 'riderId',
    driverId: 'driverId',
    status: 'status',
    pickupLat: 'pickupLat',
    pickupLng: 'pickupLng',
    dropoffLat: 'dropoffLat',
    dropoffLng: 'dropoffLng',
    fare: 'fare',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RideScalarFieldEnum = (typeof RideScalarFieldEnum)[keyof typeof RideScalarFieldEnum]


  export const RideEventScalarFieldEnum: {
    id: 'id',
    rideId: 'rideId',
    type: 'type',
    payload: 'payload',
    actorId: 'actorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RideEventScalarFieldEnum = (typeof RideEventScalarFieldEnum)[keyof typeof RideEventScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'UserStatus'
   */
  export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>
    


  /**
   * Reference to a field of type 'UserStatus[]'
   */
  export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DriverStatus'
   */
  export type EnumDriverStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DriverStatus'>
    


  /**
   * Reference to a field of type 'DriverStatus[]'
   */
  export type ListEnumDriverStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DriverStatus[]'>
    


  /**
   * Reference to a field of type 'VehicleType'
   */
  export type EnumVehicleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleType'>
    


  /**
   * Reference to a field of type 'VehicleType[]'
   */
  export type ListEnumVehicleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'RideStatus'
   */
  export type EnumRideStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RideStatus'>
    


  /**
   * Reference to a field of type 'RideStatus[]'
   */
  export type ListEnumRideStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RideStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'RideEventType'
   */
  export type EnumRideEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RideEventType'>
    


  /**
   * Reference to a field of type 'RideEventType[]'
   */
  export type ListEnumRideEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RideEventType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    phoneNumber?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    driverProfile?: XOR<DriverProfileNullableScalarRelationFilter, DriverProfileWhereInput> | null
    ridesByRider?: RideListRelationFilter
    ridesByDriver?: RideListRelationFilter
    rideEvents?: RideEventListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    driverProfile?: DriverProfileOrderByWithRelationInput
    ridesByRider?: RideOrderByRelationAggregateInput
    ridesByDriver?: RideOrderByRelationAggregateInput
    rideEvents?: RideEventOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phoneNumber?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    driverProfile?: XOR<DriverProfileNullableScalarRelationFilter, DriverProfileWhereInput> | null
    ridesByRider?: RideListRelationFilter
    ridesByDriver?: RideListRelationFilter
    rideEvents?: RideEventListRelationFilter
  }, "id" | "email" | "phoneNumber">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    status?: EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DriverProfileWhereInput = {
    AND?: DriverProfileWhereInput | DriverProfileWhereInput[]
    OR?: DriverProfileWhereInput[]
    NOT?: DriverProfileWhereInput | DriverProfileWhereInput[]
    id?: UuidFilter<"DriverProfile"> | string
    userId?: UuidFilter<"DriverProfile"> | string
    isAvailable?: BoolFilter<"DriverProfile"> | boolean
    status?: EnumDriverStatusFilter<"DriverProfile"> | $Enums.DriverStatus
    createdAt?: DateTimeFilter<"DriverProfile"> | Date | string
    updatedAt?: DateTimeFilter<"DriverProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vehicle?: XOR<VehicleNullableScalarRelationFilter, VehicleWhereInput> | null
  }

  export type DriverProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    isAvailable?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    vehicle?: VehicleOrderByWithRelationInput
  }

  export type DriverProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: DriverProfileWhereInput | DriverProfileWhereInput[]
    OR?: DriverProfileWhereInput[]
    NOT?: DriverProfileWhereInput | DriverProfileWhereInput[]
    isAvailable?: BoolFilter<"DriverProfile"> | boolean
    status?: EnumDriverStatusFilter<"DriverProfile"> | $Enums.DriverStatus
    createdAt?: DateTimeFilter<"DriverProfile"> | Date | string
    updatedAt?: DateTimeFilter<"DriverProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vehicle?: XOR<VehicleNullableScalarRelationFilter, VehicleWhereInput> | null
  }, "id" | "userId">

  export type DriverProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    isAvailable?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DriverProfileCountOrderByAggregateInput
    _max?: DriverProfileMaxOrderByAggregateInput
    _min?: DriverProfileMinOrderByAggregateInput
  }

  export type DriverProfileScalarWhereWithAggregatesInput = {
    AND?: DriverProfileScalarWhereWithAggregatesInput | DriverProfileScalarWhereWithAggregatesInput[]
    OR?: DriverProfileScalarWhereWithAggregatesInput[]
    NOT?: DriverProfileScalarWhereWithAggregatesInput | DriverProfileScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"DriverProfile"> | string
    userId?: UuidWithAggregatesFilter<"DriverProfile"> | string
    isAvailable?: BoolWithAggregatesFilter<"DriverProfile"> | boolean
    status?: EnumDriverStatusWithAggregatesFilter<"DriverProfile"> | $Enums.DriverStatus
    createdAt?: DateTimeWithAggregatesFilter<"DriverProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DriverProfile"> | Date | string
  }

  export type VehicleWhereInput = {
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    id?: UuidFilter<"Vehicle"> | string
    driverProfileId?: UuidFilter<"Vehicle"> | string
    type?: EnumVehicleTypeFilter<"Vehicle"> | $Enums.VehicleType
    make?: StringFilter<"Vehicle"> | string
    model?: StringFilter<"Vehicle"> | string
    color?: StringFilter<"Vehicle"> | string
    year?: IntNullableFilter<"Vehicle"> | number | null
    licensePlate?: StringFilter<"Vehicle"> | string
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    driverProfile?: XOR<DriverProfileScalarRelationFilter, DriverProfileWhereInput>
  }

  export type VehicleOrderByWithRelationInput = {
    id?: SortOrder
    driverProfileId?: SortOrder
    type?: SortOrder
    make?: SortOrder
    model?: SortOrder
    color?: SortOrder
    year?: SortOrderInput | SortOrder
    licensePlate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    driverProfile?: DriverProfileOrderByWithRelationInput
  }

  export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    driverProfileId?: string
    licensePlate?: string
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    type?: EnumVehicleTypeFilter<"Vehicle"> | $Enums.VehicleType
    make?: StringFilter<"Vehicle"> | string
    model?: StringFilter<"Vehicle"> | string
    color?: StringFilter<"Vehicle"> | string
    year?: IntNullableFilter<"Vehicle"> | number | null
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    driverProfile?: XOR<DriverProfileScalarRelationFilter, DriverProfileWhereInput>
  }, "id" | "driverProfileId" | "licensePlate">

  export type VehicleOrderByWithAggregationInput = {
    id?: SortOrder
    driverProfileId?: SortOrder
    type?: SortOrder
    make?: SortOrder
    model?: SortOrder
    color?: SortOrder
    year?: SortOrderInput | SortOrder
    licensePlate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VehicleCountOrderByAggregateInput
    _avg?: VehicleAvgOrderByAggregateInput
    _max?: VehicleMaxOrderByAggregateInput
    _min?: VehicleMinOrderByAggregateInput
    _sum?: VehicleSumOrderByAggregateInput
  }

  export type VehicleScalarWhereWithAggregatesInput = {
    AND?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    OR?: VehicleScalarWhereWithAggregatesInput[]
    NOT?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Vehicle"> | string
    driverProfileId?: UuidWithAggregatesFilter<"Vehicle"> | string
    type?: EnumVehicleTypeWithAggregatesFilter<"Vehicle"> | $Enums.VehicleType
    make?: StringWithAggregatesFilter<"Vehicle"> | string
    model?: StringWithAggregatesFilter<"Vehicle"> | string
    color?: StringWithAggregatesFilter<"Vehicle"> | string
    year?: IntNullableWithAggregatesFilter<"Vehicle"> | number | null
    licensePlate?: StringWithAggregatesFilter<"Vehicle"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
  }

  export type RideWhereInput = {
    AND?: RideWhereInput | RideWhereInput[]
    OR?: RideWhereInput[]
    NOT?: RideWhereInput | RideWhereInput[]
    id?: UuidFilter<"Ride"> | string
    riderId?: UuidFilter<"Ride"> | string
    driverId?: UuidNullableFilter<"Ride"> | string | null
    status?: EnumRideStatusFilter<"Ride"> | $Enums.RideStatus
    pickupLat?: FloatFilter<"Ride"> | number
    pickupLng?: FloatFilter<"Ride"> | number
    dropoffLat?: FloatFilter<"Ride"> | number
    dropoffLng?: FloatFilter<"Ride"> | number
    fare?: DecimalFilter<"Ride"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Ride"> | Date | string
    updatedAt?: DateTimeFilter<"Ride"> | Date | string
    rider?: XOR<UserScalarRelationFilter, UserWhereInput>
    driver?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    rideEvents?: RideEventListRelationFilter
  }

  export type RideOrderByWithRelationInput = {
    id?: SortOrder
    riderId?: SortOrder
    driverId?: SortOrderInput | SortOrder
    status?: SortOrder
    pickupLat?: SortOrder
    pickupLng?: SortOrder
    dropoffLat?: SortOrder
    dropoffLng?: SortOrder
    fare?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rider?: UserOrderByWithRelationInput
    driver?: UserOrderByWithRelationInput
    rideEvents?: RideEventOrderByRelationAggregateInput
  }

  export type RideWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RideWhereInput | RideWhereInput[]
    OR?: RideWhereInput[]
    NOT?: RideWhereInput | RideWhereInput[]
    riderId?: UuidFilter<"Ride"> | string
    driverId?: UuidNullableFilter<"Ride"> | string | null
    status?: EnumRideStatusFilter<"Ride"> | $Enums.RideStatus
    pickupLat?: FloatFilter<"Ride"> | number
    pickupLng?: FloatFilter<"Ride"> | number
    dropoffLat?: FloatFilter<"Ride"> | number
    dropoffLng?: FloatFilter<"Ride"> | number
    fare?: DecimalFilter<"Ride"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Ride"> | Date | string
    updatedAt?: DateTimeFilter<"Ride"> | Date | string
    rider?: XOR<UserScalarRelationFilter, UserWhereInput>
    driver?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    rideEvents?: RideEventListRelationFilter
  }, "id">

  export type RideOrderByWithAggregationInput = {
    id?: SortOrder
    riderId?: SortOrder
    driverId?: SortOrderInput | SortOrder
    status?: SortOrder
    pickupLat?: SortOrder
    pickupLng?: SortOrder
    dropoffLat?: SortOrder
    dropoffLng?: SortOrder
    fare?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RideCountOrderByAggregateInput
    _avg?: RideAvgOrderByAggregateInput
    _max?: RideMaxOrderByAggregateInput
    _min?: RideMinOrderByAggregateInput
    _sum?: RideSumOrderByAggregateInput
  }

  export type RideScalarWhereWithAggregatesInput = {
    AND?: RideScalarWhereWithAggregatesInput | RideScalarWhereWithAggregatesInput[]
    OR?: RideScalarWhereWithAggregatesInput[]
    NOT?: RideScalarWhereWithAggregatesInput | RideScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Ride"> | string
    riderId?: UuidWithAggregatesFilter<"Ride"> | string
    driverId?: UuidNullableWithAggregatesFilter<"Ride"> | string | null
    status?: EnumRideStatusWithAggregatesFilter<"Ride"> | $Enums.RideStatus
    pickupLat?: FloatWithAggregatesFilter<"Ride"> | number
    pickupLng?: FloatWithAggregatesFilter<"Ride"> | number
    dropoffLat?: FloatWithAggregatesFilter<"Ride"> | number
    dropoffLng?: FloatWithAggregatesFilter<"Ride"> | number
    fare?: DecimalWithAggregatesFilter<"Ride"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"Ride"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ride"> | Date | string
  }

  export type RideEventWhereInput = {
    AND?: RideEventWhereInput | RideEventWhereInput[]
    OR?: RideEventWhereInput[]
    NOT?: RideEventWhereInput | RideEventWhereInput[]
    id?: UuidFilter<"RideEvent"> | string
    rideId?: UuidFilter<"RideEvent"> | string
    type?: EnumRideEventTypeFilter<"RideEvent"> | $Enums.RideEventType
    payload?: JsonNullableFilter<"RideEvent">
    actorId?: UuidFilter<"RideEvent"> | string
    createdAt?: DateTimeFilter<"RideEvent"> | Date | string
    updatedAt?: DateTimeFilter<"RideEvent"> | Date | string
    ride?: XOR<RideScalarRelationFilter, RideWhereInput>
    actor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type RideEventOrderByWithRelationInput = {
    id?: SortOrder
    rideId?: SortOrder
    type?: SortOrder
    payload?: SortOrderInput | SortOrder
    actorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ride?: RideOrderByWithRelationInput
    actor?: UserOrderByWithRelationInput
  }

  export type RideEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RideEventWhereInput | RideEventWhereInput[]
    OR?: RideEventWhereInput[]
    NOT?: RideEventWhereInput | RideEventWhereInput[]
    rideId?: UuidFilter<"RideEvent"> | string
    type?: EnumRideEventTypeFilter<"RideEvent"> | $Enums.RideEventType
    payload?: JsonNullableFilter<"RideEvent">
    actorId?: UuidFilter<"RideEvent"> | string
    createdAt?: DateTimeFilter<"RideEvent"> | Date | string
    updatedAt?: DateTimeFilter<"RideEvent"> | Date | string
    ride?: XOR<RideScalarRelationFilter, RideWhereInput>
    actor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type RideEventOrderByWithAggregationInput = {
    id?: SortOrder
    rideId?: SortOrder
    type?: SortOrder
    payload?: SortOrderInput | SortOrder
    actorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RideEventCountOrderByAggregateInput
    _max?: RideEventMaxOrderByAggregateInput
    _min?: RideEventMinOrderByAggregateInput
  }

  export type RideEventScalarWhereWithAggregatesInput = {
    AND?: RideEventScalarWhereWithAggregatesInput | RideEventScalarWhereWithAggregatesInput[]
    OR?: RideEventScalarWhereWithAggregatesInput[]
    NOT?: RideEventScalarWhereWithAggregatesInput | RideEventScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"RideEvent"> | string
    rideId?: UuidWithAggregatesFilter<"RideEvent"> | string
    type?: EnumRideEventTypeWithAggregatesFilter<"RideEvent"> | $Enums.RideEventType
    payload?: JsonNullableWithAggregatesFilter<"RideEvent">
    actorId?: UuidWithAggregatesFilter<"RideEvent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RideEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RideEvent"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    firstName: string
    lastName: string
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    driverProfile?: DriverProfileCreateNestedOneWithoutUserInput
    ridesByRider?: RideCreateNestedManyWithoutRiderInput
    ridesByDriver?: RideCreateNestedManyWithoutDriverInput
    rideEvents?: RideEventCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    firstName: string
    lastName: string
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    driverProfile?: DriverProfileUncheckedCreateNestedOneWithoutUserInput
    ridesByRider?: RideUncheckedCreateNestedManyWithoutRiderInput
    ridesByDriver?: RideUncheckedCreateNestedManyWithoutDriverInput
    rideEvents?: RideEventUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driverProfile?: DriverProfileUpdateOneWithoutUserNestedInput
    ridesByRider?: RideUpdateManyWithoutRiderNestedInput
    ridesByDriver?: RideUpdateManyWithoutDriverNestedInput
    rideEvents?: RideEventUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driverProfile?: DriverProfileUncheckedUpdateOneWithoutUserNestedInput
    ridesByRider?: RideUncheckedUpdateManyWithoutRiderNestedInput
    ridesByDriver?: RideUncheckedUpdateManyWithoutDriverNestedInput
    rideEvents?: RideEventUncheckedUpdateManyWithoutActorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    firstName: string
    lastName: string
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverProfileCreateInput = {
    id?: string
    isAvailable?: boolean
    status?: $Enums.DriverStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDriverProfileInput
    vehicle?: VehicleCreateNestedOneWithoutDriverProfileInput
  }

  export type DriverProfileUncheckedCreateInput = {
    id?: string
    userId: string
    isAvailable?: boolean
    status?: $Enums.DriverStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicle?: VehicleUncheckedCreateNestedOneWithoutDriverProfileInput
  }

  export type DriverProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDriverProfileNestedInput
    vehicle?: VehicleUpdateOneWithoutDriverProfileNestedInput
  }

  export type DriverProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUncheckedUpdateOneWithoutDriverProfileNestedInput
  }

  export type DriverProfileCreateManyInput = {
    id?: string
    userId: string
    isAvailable?: boolean
    status?: $Enums.DriverStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleCreateInput = {
    id?: string
    type: $Enums.VehicleType
    make: string
    model: string
    color: string
    year?: number | null
    licensePlate: string
    createdAt?: Date | string
    updatedAt?: Date | string
    driverProfile: DriverProfileCreateNestedOneWithoutVehicleInput
  }

  export type VehicleUncheckedCreateInput = {
    id?: string
    driverProfileId: string
    type: $Enums.VehicleType
    make: string
    model: string
    color: string
    year?: number | null
    licensePlate: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    year?: NullableIntFieldUpdateOperationsInput | number | null
    licensePlate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driverProfile?: DriverProfileUpdateOneRequiredWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverProfileId?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    year?: NullableIntFieldUpdateOperationsInput | number | null
    licensePlate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleCreateManyInput = {
    id?: string
    driverProfileId: string
    type: $Enums.VehicleType
    make: string
    model: string
    color: string
    year?: number | null
    licensePlate: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    year?: NullableIntFieldUpdateOperationsInput | number | null
    licensePlate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverProfileId?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    year?: NullableIntFieldUpdateOperationsInput | number | null
    licensePlate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideCreateInput = {
    id?: string
    status?: $Enums.RideStatus
    pickupLat: number
    pickupLng: number
    dropoffLat: number
    dropoffLng: number
    fare: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    rider: UserCreateNestedOneWithoutRidesByRiderInput
    driver?: UserCreateNestedOneWithoutRidesByDriverInput
    rideEvents?: RideEventCreateNestedManyWithoutRideInput
  }

  export type RideUncheckedCreateInput = {
    id?: string
    riderId: string
    driverId?: string | null
    status?: $Enums.RideStatus
    pickupLat: number
    pickupLng: number
    dropoffLat: number
    dropoffLng: number
    fare: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    rideEvents?: RideEventUncheckedCreateNestedManyWithoutRideInput
  }

  export type RideUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    pickupLat?: FloatFieldUpdateOperationsInput | number
    pickupLng?: FloatFieldUpdateOperationsInput | number
    dropoffLat?: FloatFieldUpdateOperationsInput | number
    dropoffLng?: FloatFieldUpdateOperationsInput | number
    fare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rider?: UserUpdateOneRequiredWithoutRidesByRiderNestedInput
    driver?: UserUpdateOneWithoutRidesByDriverNestedInput
    rideEvents?: RideEventUpdateManyWithoutRideNestedInput
  }

  export type RideUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    riderId?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    pickupLat?: FloatFieldUpdateOperationsInput | number
    pickupLng?: FloatFieldUpdateOperationsInput | number
    dropoffLat?: FloatFieldUpdateOperationsInput | number
    dropoffLng?: FloatFieldUpdateOperationsInput | number
    fare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rideEvents?: RideEventUncheckedUpdateManyWithoutRideNestedInput
  }

  export type RideCreateManyInput = {
    id?: string
    riderId: string
    driverId?: string | null
    status?: $Enums.RideStatus
    pickupLat: number
    pickupLng: number
    dropoffLat: number
    dropoffLng: number
    fare: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RideUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    pickupLat?: FloatFieldUpdateOperationsInput | number
    pickupLng?: FloatFieldUpdateOperationsInput | number
    dropoffLat?: FloatFieldUpdateOperationsInput | number
    dropoffLng?: FloatFieldUpdateOperationsInput | number
    fare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    riderId?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    pickupLat?: FloatFieldUpdateOperationsInput | number
    pickupLng?: FloatFieldUpdateOperationsInput | number
    dropoffLat?: FloatFieldUpdateOperationsInput | number
    dropoffLng?: FloatFieldUpdateOperationsInput | number
    fare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideEventCreateInput = {
    id?: string
    type: $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ride: RideCreateNestedOneWithoutRideEventsInput
    actor?: UserCreateNestedOneWithoutRideEventsInput
  }

  export type RideEventUncheckedCreateInput = {
    id?: string
    rideId: string
    type: $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    actorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RideEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumRideEventTypeFieldUpdateOperationsInput | $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ride?: RideUpdateOneRequiredWithoutRideEventsNestedInput
    actor?: UserUpdateOneWithoutRideEventsNestedInput
  }

  export type RideEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rideId?: StringFieldUpdateOperationsInput | string
    type?: EnumRideEventTypeFieldUpdateOperationsInput | $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    actorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideEventCreateManyInput = {
    id?: string
    rideId: string
    type: $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    actorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RideEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumRideEventTypeFieldUpdateOperationsInput | $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rideId?: StringFieldUpdateOperationsInput | string
    type?: EnumRideEventTypeFieldUpdateOperationsInput | $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    actorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DriverProfileNullableScalarRelationFilter = {
    is?: DriverProfileWhereInput | null
    isNot?: DriverProfileWhereInput | null
  }

  export type RideListRelationFilter = {
    every?: RideWhereInput
    some?: RideWhereInput
    none?: RideWhereInput
  }

  export type RideEventListRelationFilter = {
    every?: RideEventWhereInput
    some?: RideEventWhereInput
    none?: RideEventWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RideOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RideEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumDriverStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DriverStatus | EnumDriverStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DriverStatus[] | ListEnumDriverStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DriverStatus[] | ListEnumDriverStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDriverStatusFilter<$PrismaModel> | $Enums.DriverStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type VehicleNullableScalarRelationFilter = {
    is?: VehicleWhereInput | null
    isNot?: VehicleWhereInput | null
  }

  export type DriverProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    isAvailable?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    isAvailable?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    isAvailable?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumDriverStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DriverStatus | EnumDriverStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DriverStatus[] | ListEnumDriverStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DriverStatus[] | ListEnumDriverStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDriverStatusWithAggregatesFilter<$PrismaModel> | $Enums.DriverStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDriverStatusFilter<$PrismaModel>
    _max?: NestedEnumDriverStatusFilter<$PrismaModel>
  }

  export type EnumVehicleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleType | EnumVehicleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleTypeFilter<$PrismaModel> | $Enums.VehicleType
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DriverProfileScalarRelationFilter = {
    is?: DriverProfileWhereInput
    isNot?: DriverProfileWhereInput
  }

  export type VehicleCountOrderByAggregateInput = {
    id?: SortOrder
    driverProfileId?: SortOrder
    type?: SortOrder
    make?: SortOrder
    model?: SortOrder
    color?: SortOrder
    year?: SortOrder
    licensePlate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type VehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    driverProfileId?: SortOrder
    type?: SortOrder
    make?: SortOrder
    model?: SortOrder
    color?: SortOrder
    year?: SortOrder
    licensePlate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleMinOrderByAggregateInput = {
    id?: SortOrder
    driverProfileId?: SortOrder
    type?: SortOrder
    make?: SortOrder
    model?: SortOrder
    color?: SortOrder
    year?: SortOrder
    licensePlate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleSumOrderByAggregateInput = {
    year?: SortOrder
  }

  export type EnumVehicleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleType | EnumVehicleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleTypeWithAggregatesFilter<$PrismaModel> | $Enums.VehicleType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVehicleTypeFilter<$PrismaModel>
    _max?: NestedEnumVehicleTypeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRideStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RideStatus | EnumRideStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRideStatusFilter<$PrismaModel> | $Enums.RideStatus
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type RideCountOrderByAggregateInput = {
    id?: SortOrder
    riderId?: SortOrder
    driverId?: SortOrder
    status?: SortOrder
    pickupLat?: SortOrder
    pickupLng?: SortOrder
    dropoffLat?: SortOrder
    dropoffLng?: SortOrder
    fare?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RideAvgOrderByAggregateInput = {
    pickupLat?: SortOrder
    pickupLng?: SortOrder
    dropoffLat?: SortOrder
    dropoffLng?: SortOrder
    fare?: SortOrder
  }

  export type RideMaxOrderByAggregateInput = {
    id?: SortOrder
    riderId?: SortOrder
    driverId?: SortOrder
    status?: SortOrder
    pickupLat?: SortOrder
    pickupLng?: SortOrder
    dropoffLat?: SortOrder
    dropoffLng?: SortOrder
    fare?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RideMinOrderByAggregateInput = {
    id?: SortOrder
    riderId?: SortOrder
    driverId?: SortOrder
    status?: SortOrder
    pickupLat?: SortOrder
    pickupLng?: SortOrder
    dropoffLat?: SortOrder
    dropoffLng?: SortOrder
    fare?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RideSumOrderByAggregateInput = {
    pickupLat?: SortOrder
    pickupLng?: SortOrder
    dropoffLat?: SortOrder
    dropoffLng?: SortOrder
    fare?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRideStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RideStatus | EnumRideStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRideStatusWithAggregatesFilter<$PrismaModel> | $Enums.RideStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRideStatusFilter<$PrismaModel>
    _max?: NestedEnumRideStatusFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumRideEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RideEventType | EnumRideEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RideEventType[] | ListEnumRideEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RideEventType[] | ListEnumRideEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRideEventTypeFilter<$PrismaModel> | $Enums.RideEventType
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type RideScalarRelationFilter = {
    is?: RideWhereInput
    isNot?: RideWhereInput
  }

  export type RideEventCountOrderByAggregateInput = {
    id?: SortOrder
    rideId?: SortOrder
    type?: SortOrder
    payload?: SortOrder
    actorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RideEventMaxOrderByAggregateInput = {
    id?: SortOrder
    rideId?: SortOrder
    type?: SortOrder
    actorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RideEventMinOrderByAggregateInput = {
    id?: SortOrder
    rideId?: SortOrder
    type?: SortOrder
    actorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRideEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RideEventType | EnumRideEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RideEventType[] | ListEnumRideEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RideEventType[] | ListEnumRideEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRideEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.RideEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRideEventTypeFilter<$PrismaModel>
    _max?: NestedEnumRideEventTypeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DriverProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<DriverProfileCreateWithoutUserInput, DriverProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutUserInput
    connect?: DriverProfileWhereUniqueInput
  }

  export type RideCreateNestedManyWithoutRiderInput = {
    create?: XOR<RideCreateWithoutRiderInput, RideUncheckedCreateWithoutRiderInput> | RideCreateWithoutRiderInput[] | RideUncheckedCreateWithoutRiderInput[]
    connectOrCreate?: RideCreateOrConnectWithoutRiderInput | RideCreateOrConnectWithoutRiderInput[]
    createMany?: RideCreateManyRiderInputEnvelope
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
  }

  export type RideCreateNestedManyWithoutDriverInput = {
    create?: XOR<RideCreateWithoutDriverInput, RideUncheckedCreateWithoutDriverInput> | RideCreateWithoutDriverInput[] | RideUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: RideCreateOrConnectWithoutDriverInput | RideCreateOrConnectWithoutDriverInput[]
    createMany?: RideCreateManyDriverInputEnvelope
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
  }

  export type RideEventCreateNestedManyWithoutActorInput = {
    create?: XOR<RideEventCreateWithoutActorInput, RideEventUncheckedCreateWithoutActorInput> | RideEventCreateWithoutActorInput[] | RideEventUncheckedCreateWithoutActorInput[]
    connectOrCreate?: RideEventCreateOrConnectWithoutActorInput | RideEventCreateOrConnectWithoutActorInput[]
    createMany?: RideEventCreateManyActorInputEnvelope
    connect?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
  }

  export type DriverProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<DriverProfileCreateWithoutUserInput, DriverProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutUserInput
    connect?: DriverProfileWhereUniqueInput
  }

  export type RideUncheckedCreateNestedManyWithoutRiderInput = {
    create?: XOR<RideCreateWithoutRiderInput, RideUncheckedCreateWithoutRiderInput> | RideCreateWithoutRiderInput[] | RideUncheckedCreateWithoutRiderInput[]
    connectOrCreate?: RideCreateOrConnectWithoutRiderInput | RideCreateOrConnectWithoutRiderInput[]
    createMany?: RideCreateManyRiderInputEnvelope
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
  }

  export type RideUncheckedCreateNestedManyWithoutDriverInput = {
    create?: XOR<RideCreateWithoutDriverInput, RideUncheckedCreateWithoutDriverInput> | RideCreateWithoutDriverInput[] | RideUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: RideCreateOrConnectWithoutDriverInput | RideCreateOrConnectWithoutDriverInput[]
    createMany?: RideCreateManyDriverInputEnvelope
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
  }

  export type RideEventUncheckedCreateNestedManyWithoutActorInput = {
    create?: XOR<RideEventCreateWithoutActorInput, RideEventUncheckedCreateWithoutActorInput> | RideEventCreateWithoutActorInput[] | RideEventUncheckedCreateWithoutActorInput[]
    connectOrCreate?: RideEventCreateOrConnectWithoutActorInput | RideEventCreateOrConnectWithoutActorInput[]
    createMany?: RideEventCreateManyActorInputEnvelope
    connect?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DriverProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<DriverProfileCreateWithoutUserInput, DriverProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutUserInput
    upsert?: DriverProfileUpsertWithoutUserInput
    disconnect?: DriverProfileWhereInput | boolean
    delete?: DriverProfileWhereInput | boolean
    connect?: DriverProfileWhereUniqueInput
    update?: XOR<XOR<DriverProfileUpdateToOneWithWhereWithoutUserInput, DriverProfileUpdateWithoutUserInput>, DriverProfileUncheckedUpdateWithoutUserInput>
  }

  export type RideUpdateManyWithoutRiderNestedInput = {
    create?: XOR<RideCreateWithoutRiderInput, RideUncheckedCreateWithoutRiderInput> | RideCreateWithoutRiderInput[] | RideUncheckedCreateWithoutRiderInput[]
    connectOrCreate?: RideCreateOrConnectWithoutRiderInput | RideCreateOrConnectWithoutRiderInput[]
    upsert?: RideUpsertWithWhereUniqueWithoutRiderInput | RideUpsertWithWhereUniqueWithoutRiderInput[]
    createMany?: RideCreateManyRiderInputEnvelope
    set?: RideWhereUniqueInput | RideWhereUniqueInput[]
    disconnect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    delete?: RideWhereUniqueInput | RideWhereUniqueInput[]
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    update?: RideUpdateWithWhereUniqueWithoutRiderInput | RideUpdateWithWhereUniqueWithoutRiderInput[]
    updateMany?: RideUpdateManyWithWhereWithoutRiderInput | RideUpdateManyWithWhereWithoutRiderInput[]
    deleteMany?: RideScalarWhereInput | RideScalarWhereInput[]
  }

  export type RideUpdateManyWithoutDriverNestedInput = {
    create?: XOR<RideCreateWithoutDriverInput, RideUncheckedCreateWithoutDriverInput> | RideCreateWithoutDriverInput[] | RideUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: RideCreateOrConnectWithoutDriverInput | RideCreateOrConnectWithoutDriverInput[]
    upsert?: RideUpsertWithWhereUniqueWithoutDriverInput | RideUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: RideCreateManyDriverInputEnvelope
    set?: RideWhereUniqueInput | RideWhereUniqueInput[]
    disconnect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    delete?: RideWhereUniqueInput | RideWhereUniqueInput[]
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    update?: RideUpdateWithWhereUniqueWithoutDriverInput | RideUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: RideUpdateManyWithWhereWithoutDriverInput | RideUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: RideScalarWhereInput | RideScalarWhereInput[]
  }

  export type RideEventUpdateManyWithoutActorNestedInput = {
    create?: XOR<RideEventCreateWithoutActorInput, RideEventUncheckedCreateWithoutActorInput> | RideEventCreateWithoutActorInput[] | RideEventUncheckedCreateWithoutActorInput[]
    connectOrCreate?: RideEventCreateOrConnectWithoutActorInput | RideEventCreateOrConnectWithoutActorInput[]
    upsert?: RideEventUpsertWithWhereUniqueWithoutActorInput | RideEventUpsertWithWhereUniqueWithoutActorInput[]
    createMany?: RideEventCreateManyActorInputEnvelope
    set?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
    disconnect?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
    delete?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
    connect?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
    update?: RideEventUpdateWithWhereUniqueWithoutActorInput | RideEventUpdateWithWhereUniqueWithoutActorInput[]
    updateMany?: RideEventUpdateManyWithWhereWithoutActorInput | RideEventUpdateManyWithWhereWithoutActorInput[]
    deleteMany?: RideEventScalarWhereInput | RideEventScalarWhereInput[]
  }

  export type DriverProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<DriverProfileCreateWithoutUserInput, DriverProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutUserInput
    upsert?: DriverProfileUpsertWithoutUserInput
    disconnect?: DriverProfileWhereInput | boolean
    delete?: DriverProfileWhereInput | boolean
    connect?: DriverProfileWhereUniqueInput
    update?: XOR<XOR<DriverProfileUpdateToOneWithWhereWithoutUserInput, DriverProfileUpdateWithoutUserInput>, DriverProfileUncheckedUpdateWithoutUserInput>
  }

  export type RideUncheckedUpdateManyWithoutRiderNestedInput = {
    create?: XOR<RideCreateWithoutRiderInput, RideUncheckedCreateWithoutRiderInput> | RideCreateWithoutRiderInput[] | RideUncheckedCreateWithoutRiderInput[]
    connectOrCreate?: RideCreateOrConnectWithoutRiderInput | RideCreateOrConnectWithoutRiderInput[]
    upsert?: RideUpsertWithWhereUniqueWithoutRiderInput | RideUpsertWithWhereUniqueWithoutRiderInput[]
    createMany?: RideCreateManyRiderInputEnvelope
    set?: RideWhereUniqueInput | RideWhereUniqueInput[]
    disconnect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    delete?: RideWhereUniqueInput | RideWhereUniqueInput[]
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    update?: RideUpdateWithWhereUniqueWithoutRiderInput | RideUpdateWithWhereUniqueWithoutRiderInput[]
    updateMany?: RideUpdateManyWithWhereWithoutRiderInput | RideUpdateManyWithWhereWithoutRiderInput[]
    deleteMany?: RideScalarWhereInput | RideScalarWhereInput[]
  }

  export type RideUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: XOR<RideCreateWithoutDriverInput, RideUncheckedCreateWithoutDriverInput> | RideCreateWithoutDriverInput[] | RideUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: RideCreateOrConnectWithoutDriverInput | RideCreateOrConnectWithoutDriverInput[]
    upsert?: RideUpsertWithWhereUniqueWithoutDriverInput | RideUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: RideCreateManyDriverInputEnvelope
    set?: RideWhereUniqueInput | RideWhereUniqueInput[]
    disconnect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    delete?: RideWhereUniqueInput | RideWhereUniqueInput[]
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[]
    update?: RideUpdateWithWhereUniqueWithoutDriverInput | RideUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: RideUpdateManyWithWhereWithoutDriverInput | RideUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: RideScalarWhereInput | RideScalarWhereInput[]
  }

  export type RideEventUncheckedUpdateManyWithoutActorNestedInput = {
    create?: XOR<RideEventCreateWithoutActorInput, RideEventUncheckedCreateWithoutActorInput> | RideEventCreateWithoutActorInput[] | RideEventUncheckedCreateWithoutActorInput[]
    connectOrCreate?: RideEventCreateOrConnectWithoutActorInput | RideEventCreateOrConnectWithoutActorInput[]
    upsert?: RideEventUpsertWithWhereUniqueWithoutActorInput | RideEventUpsertWithWhereUniqueWithoutActorInput[]
    createMany?: RideEventCreateManyActorInputEnvelope
    set?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
    disconnect?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
    delete?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
    connect?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
    update?: RideEventUpdateWithWhereUniqueWithoutActorInput | RideEventUpdateWithWhereUniqueWithoutActorInput[]
    updateMany?: RideEventUpdateManyWithWhereWithoutActorInput | RideEventUpdateManyWithWhereWithoutActorInput[]
    deleteMany?: RideEventScalarWhereInput | RideEventScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDriverProfileInput = {
    create?: XOR<UserCreateWithoutDriverProfileInput, UserUncheckedCreateWithoutDriverProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutDriverProfileInput
    connect?: UserWhereUniqueInput
  }

  export type VehicleCreateNestedOneWithoutDriverProfileInput = {
    create?: XOR<VehicleCreateWithoutDriverProfileInput, VehicleUncheckedCreateWithoutDriverProfileInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverProfileInput
    connect?: VehicleWhereUniqueInput
  }

  export type VehicleUncheckedCreateNestedOneWithoutDriverProfileInput = {
    create?: XOR<VehicleCreateWithoutDriverProfileInput, VehicleUncheckedCreateWithoutDriverProfileInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverProfileInput
    connect?: VehicleWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumDriverStatusFieldUpdateOperationsInput = {
    set?: $Enums.DriverStatus
  }

  export type UserUpdateOneRequiredWithoutDriverProfileNestedInput = {
    create?: XOR<UserCreateWithoutDriverProfileInput, UserUncheckedCreateWithoutDriverProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutDriverProfileInput
    upsert?: UserUpsertWithoutDriverProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDriverProfileInput, UserUpdateWithoutDriverProfileInput>, UserUncheckedUpdateWithoutDriverProfileInput>
  }

  export type VehicleUpdateOneWithoutDriverProfileNestedInput = {
    create?: XOR<VehicleCreateWithoutDriverProfileInput, VehicleUncheckedCreateWithoutDriverProfileInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverProfileInput
    upsert?: VehicleUpsertWithoutDriverProfileInput
    disconnect?: VehicleWhereInput | boolean
    delete?: VehicleWhereInput | boolean
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutDriverProfileInput, VehicleUpdateWithoutDriverProfileInput>, VehicleUncheckedUpdateWithoutDriverProfileInput>
  }

  export type VehicleUncheckedUpdateOneWithoutDriverProfileNestedInput = {
    create?: XOR<VehicleCreateWithoutDriverProfileInput, VehicleUncheckedCreateWithoutDriverProfileInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverProfileInput
    upsert?: VehicleUpsertWithoutDriverProfileInput
    disconnect?: VehicleWhereInput | boolean
    delete?: VehicleWhereInput | boolean
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutDriverProfileInput, VehicleUpdateWithoutDriverProfileInput>, VehicleUncheckedUpdateWithoutDriverProfileInput>
  }

  export type DriverProfileCreateNestedOneWithoutVehicleInput = {
    create?: XOR<DriverProfileCreateWithoutVehicleInput, DriverProfileUncheckedCreateWithoutVehicleInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutVehicleInput
    connect?: DriverProfileWhereUniqueInput
  }

  export type EnumVehicleTypeFieldUpdateOperationsInput = {
    set?: $Enums.VehicleType
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DriverProfileUpdateOneRequiredWithoutVehicleNestedInput = {
    create?: XOR<DriverProfileCreateWithoutVehicleInput, DriverProfileUncheckedCreateWithoutVehicleInput>
    connectOrCreate?: DriverProfileCreateOrConnectWithoutVehicleInput
    upsert?: DriverProfileUpsertWithoutVehicleInput
    connect?: DriverProfileWhereUniqueInput
    update?: XOR<XOR<DriverProfileUpdateToOneWithWhereWithoutVehicleInput, DriverProfileUpdateWithoutVehicleInput>, DriverProfileUncheckedUpdateWithoutVehicleInput>
  }

  export type UserCreateNestedOneWithoutRidesByRiderInput = {
    create?: XOR<UserCreateWithoutRidesByRiderInput, UserUncheckedCreateWithoutRidesByRiderInput>
    connectOrCreate?: UserCreateOrConnectWithoutRidesByRiderInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRidesByDriverInput = {
    create?: XOR<UserCreateWithoutRidesByDriverInput, UserUncheckedCreateWithoutRidesByDriverInput>
    connectOrCreate?: UserCreateOrConnectWithoutRidesByDriverInput
    connect?: UserWhereUniqueInput
  }

  export type RideEventCreateNestedManyWithoutRideInput = {
    create?: XOR<RideEventCreateWithoutRideInput, RideEventUncheckedCreateWithoutRideInput> | RideEventCreateWithoutRideInput[] | RideEventUncheckedCreateWithoutRideInput[]
    connectOrCreate?: RideEventCreateOrConnectWithoutRideInput | RideEventCreateOrConnectWithoutRideInput[]
    createMany?: RideEventCreateManyRideInputEnvelope
    connect?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
  }

  export type RideEventUncheckedCreateNestedManyWithoutRideInput = {
    create?: XOR<RideEventCreateWithoutRideInput, RideEventUncheckedCreateWithoutRideInput> | RideEventCreateWithoutRideInput[] | RideEventUncheckedCreateWithoutRideInput[]
    connectOrCreate?: RideEventCreateOrConnectWithoutRideInput | RideEventCreateOrConnectWithoutRideInput[]
    createMany?: RideEventCreateManyRideInputEnvelope
    connect?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
  }

  export type EnumRideStatusFieldUpdateOperationsInput = {
    set?: $Enums.RideStatus
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutRidesByRiderNestedInput = {
    create?: XOR<UserCreateWithoutRidesByRiderInput, UserUncheckedCreateWithoutRidesByRiderInput>
    connectOrCreate?: UserCreateOrConnectWithoutRidesByRiderInput
    upsert?: UserUpsertWithoutRidesByRiderInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRidesByRiderInput, UserUpdateWithoutRidesByRiderInput>, UserUncheckedUpdateWithoutRidesByRiderInput>
  }

  export type UserUpdateOneWithoutRidesByDriverNestedInput = {
    create?: XOR<UserCreateWithoutRidesByDriverInput, UserUncheckedCreateWithoutRidesByDriverInput>
    connectOrCreate?: UserCreateOrConnectWithoutRidesByDriverInput
    upsert?: UserUpsertWithoutRidesByDriverInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRidesByDriverInput, UserUpdateWithoutRidesByDriverInput>, UserUncheckedUpdateWithoutRidesByDriverInput>
  }

  export type RideEventUpdateManyWithoutRideNestedInput = {
    create?: XOR<RideEventCreateWithoutRideInput, RideEventUncheckedCreateWithoutRideInput> | RideEventCreateWithoutRideInput[] | RideEventUncheckedCreateWithoutRideInput[]
    connectOrCreate?: RideEventCreateOrConnectWithoutRideInput | RideEventCreateOrConnectWithoutRideInput[]
    upsert?: RideEventUpsertWithWhereUniqueWithoutRideInput | RideEventUpsertWithWhereUniqueWithoutRideInput[]
    createMany?: RideEventCreateManyRideInputEnvelope
    set?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
    disconnect?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
    delete?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
    connect?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
    update?: RideEventUpdateWithWhereUniqueWithoutRideInput | RideEventUpdateWithWhereUniqueWithoutRideInput[]
    updateMany?: RideEventUpdateManyWithWhereWithoutRideInput | RideEventUpdateManyWithWhereWithoutRideInput[]
    deleteMany?: RideEventScalarWhereInput | RideEventScalarWhereInput[]
  }

  export type RideEventUncheckedUpdateManyWithoutRideNestedInput = {
    create?: XOR<RideEventCreateWithoutRideInput, RideEventUncheckedCreateWithoutRideInput> | RideEventCreateWithoutRideInput[] | RideEventUncheckedCreateWithoutRideInput[]
    connectOrCreate?: RideEventCreateOrConnectWithoutRideInput | RideEventCreateOrConnectWithoutRideInput[]
    upsert?: RideEventUpsertWithWhereUniqueWithoutRideInput | RideEventUpsertWithWhereUniqueWithoutRideInput[]
    createMany?: RideEventCreateManyRideInputEnvelope
    set?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
    disconnect?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
    delete?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
    connect?: RideEventWhereUniqueInput | RideEventWhereUniqueInput[]
    update?: RideEventUpdateWithWhereUniqueWithoutRideInput | RideEventUpdateWithWhereUniqueWithoutRideInput[]
    updateMany?: RideEventUpdateManyWithWhereWithoutRideInput | RideEventUpdateManyWithWhereWithoutRideInput[]
    deleteMany?: RideEventScalarWhereInput | RideEventScalarWhereInput[]
  }

  export type RideCreateNestedOneWithoutRideEventsInput = {
    create?: XOR<RideCreateWithoutRideEventsInput, RideUncheckedCreateWithoutRideEventsInput>
    connectOrCreate?: RideCreateOrConnectWithoutRideEventsInput
    connect?: RideWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRideEventsInput = {
    create?: XOR<UserCreateWithoutRideEventsInput, UserUncheckedCreateWithoutRideEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRideEventsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumRideEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.RideEventType
  }

  export type RideUpdateOneRequiredWithoutRideEventsNestedInput = {
    create?: XOR<RideCreateWithoutRideEventsInput, RideUncheckedCreateWithoutRideEventsInput>
    connectOrCreate?: RideCreateOrConnectWithoutRideEventsInput
    upsert?: RideUpsertWithoutRideEventsInput
    connect?: RideWhereUniqueInput
    update?: XOR<XOR<RideUpdateToOneWithWhereWithoutRideEventsInput, RideUpdateWithoutRideEventsInput>, RideUncheckedUpdateWithoutRideEventsInput>
  }

  export type UserUpdateOneWithoutRideEventsNestedInput = {
    create?: XOR<UserCreateWithoutRideEventsInput, UserUncheckedCreateWithoutRideEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRideEventsInput
    upsert?: UserUpsertWithoutRideEventsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRideEventsInput, UserUpdateWithoutRideEventsInput>, UserUncheckedUpdateWithoutRideEventsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumDriverStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DriverStatus | EnumDriverStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DriverStatus[] | ListEnumDriverStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DriverStatus[] | ListEnumDriverStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDriverStatusFilter<$PrismaModel> | $Enums.DriverStatus
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumDriverStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DriverStatus | EnumDriverStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DriverStatus[] | ListEnumDriverStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DriverStatus[] | ListEnumDriverStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDriverStatusWithAggregatesFilter<$PrismaModel> | $Enums.DriverStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDriverStatusFilter<$PrismaModel>
    _max?: NestedEnumDriverStatusFilter<$PrismaModel>
  }

  export type NestedEnumVehicleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleType | EnumVehicleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleTypeFilter<$PrismaModel> | $Enums.VehicleType
  }

  export type NestedEnumVehicleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleType | EnumVehicleTypeFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleType[] | ListEnumVehicleTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleTypeWithAggregatesFilter<$PrismaModel> | $Enums.VehicleType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVehicleTypeFilter<$PrismaModel>
    _max?: NestedEnumVehicleTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRideStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RideStatus | EnumRideStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRideStatusFilter<$PrismaModel> | $Enums.RideStatus
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumRideStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RideStatus | EnumRideStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRideStatusWithAggregatesFilter<$PrismaModel> | $Enums.RideStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRideStatusFilter<$PrismaModel>
    _max?: NestedEnumRideStatusFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumRideEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RideEventType | EnumRideEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RideEventType[] | ListEnumRideEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RideEventType[] | ListEnumRideEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRideEventTypeFilter<$PrismaModel> | $Enums.RideEventType
  }

  export type NestedEnumRideEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RideEventType | EnumRideEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RideEventType[] | ListEnumRideEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RideEventType[] | ListEnumRideEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRideEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.RideEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRideEventTypeFilter<$PrismaModel>
    _max?: NestedEnumRideEventTypeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DriverProfileCreateWithoutUserInput = {
    id?: string
    isAvailable?: boolean
    status?: $Enums.DriverStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicle?: VehicleCreateNestedOneWithoutDriverProfileInput
  }

  export type DriverProfileUncheckedCreateWithoutUserInput = {
    id?: string
    isAvailable?: boolean
    status?: $Enums.DriverStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicle?: VehicleUncheckedCreateNestedOneWithoutDriverProfileInput
  }

  export type DriverProfileCreateOrConnectWithoutUserInput = {
    where: DriverProfileWhereUniqueInput
    create: XOR<DriverProfileCreateWithoutUserInput, DriverProfileUncheckedCreateWithoutUserInput>
  }

  export type RideCreateWithoutRiderInput = {
    id?: string
    status?: $Enums.RideStatus
    pickupLat: number
    pickupLng: number
    dropoffLat: number
    dropoffLng: number
    fare: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    driver?: UserCreateNestedOneWithoutRidesByDriverInput
    rideEvents?: RideEventCreateNestedManyWithoutRideInput
  }

  export type RideUncheckedCreateWithoutRiderInput = {
    id?: string
    driverId?: string | null
    status?: $Enums.RideStatus
    pickupLat: number
    pickupLng: number
    dropoffLat: number
    dropoffLng: number
    fare: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    rideEvents?: RideEventUncheckedCreateNestedManyWithoutRideInput
  }

  export type RideCreateOrConnectWithoutRiderInput = {
    where: RideWhereUniqueInput
    create: XOR<RideCreateWithoutRiderInput, RideUncheckedCreateWithoutRiderInput>
  }

  export type RideCreateManyRiderInputEnvelope = {
    data: RideCreateManyRiderInput | RideCreateManyRiderInput[]
    skipDuplicates?: boolean
  }

  export type RideCreateWithoutDriverInput = {
    id?: string
    status?: $Enums.RideStatus
    pickupLat: number
    pickupLng: number
    dropoffLat: number
    dropoffLng: number
    fare: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    rider: UserCreateNestedOneWithoutRidesByRiderInput
    rideEvents?: RideEventCreateNestedManyWithoutRideInput
  }

  export type RideUncheckedCreateWithoutDriverInput = {
    id?: string
    riderId: string
    status?: $Enums.RideStatus
    pickupLat: number
    pickupLng: number
    dropoffLat: number
    dropoffLng: number
    fare: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    rideEvents?: RideEventUncheckedCreateNestedManyWithoutRideInput
  }

  export type RideCreateOrConnectWithoutDriverInput = {
    where: RideWhereUniqueInput
    create: XOR<RideCreateWithoutDriverInput, RideUncheckedCreateWithoutDriverInput>
  }

  export type RideCreateManyDriverInputEnvelope = {
    data: RideCreateManyDriverInput | RideCreateManyDriverInput[]
    skipDuplicates?: boolean
  }

  export type RideEventCreateWithoutActorInput = {
    id?: string
    type: $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ride: RideCreateNestedOneWithoutRideEventsInput
  }

  export type RideEventUncheckedCreateWithoutActorInput = {
    id?: string
    rideId: string
    type: $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RideEventCreateOrConnectWithoutActorInput = {
    where: RideEventWhereUniqueInput
    create: XOR<RideEventCreateWithoutActorInput, RideEventUncheckedCreateWithoutActorInput>
  }

  export type RideEventCreateManyActorInputEnvelope = {
    data: RideEventCreateManyActorInput | RideEventCreateManyActorInput[]
    skipDuplicates?: boolean
  }

  export type DriverProfileUpsertWithoutUserInput = {
    update: XOR<DriverProfileUpdateWithoutUserInput, DriverProfileUncheckedUpdateWithoutUserInput>
    create: XOR<DriverProfileCreateWithoutUserInput, DriverProfileUncheckedCreateWithoutUserInput>
    where?: DriverProfileWhereInput
  }

  export type DriverProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: DriverProfileWhereInput
    data: XOR<DriverProfileUpdateWithoutUserInput, DriverProfileUncheckedUpdateWithoutUserInput>
  }

  export type DriverProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneWithoutDriverProfileNestedInput
  }

  export type DriverProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUncheckedUpdateOneWithoutDriverProfileNestedInput
  }

  export type RideUpsertWithWhereUniqueWithoutRiderInput = {
    where: RideWhereUniqueInput
    update: XOR<RideUpdateWithoutRiderInput, RideUncheckedUpdateWithoutRiderInput>
    create: XOR<RideCreateWithoutRiderInput, RideUncheckedCreateWithoutRiderInput>
  }

  export type RideUpdateWithWhereUniqueWithoutRiderInput = {
    where: RideWhereUniqueInput
    data: XOR<RideUpdateWithoutRiderInput, RideUncheckedUpdateWithoutRiderInput>
  }

  export type RideUpdateManyWithWhereWithoutRiderInput = {
    where: RideScalarWhereInput
    data: XOR<RideUpdateManyMutationInput, RideUncheckedUpdateManyWithoutRiderInput>
  }

  export type RideScalarWhereInput = {
    AND?: RideScalarWhereInput | RideScalarWhereInput[]
    OR?: RideScalarWhereInput[]
    NOT?: RideScalarWhereInput | RideScalarWhereInput[]
    id?: UuidFilter<"Ride"> | string
    riderId?: UuidFilter<"Ride"> | string
    driverId?: UuidNullableFilter<"Ride"> | string | null
    status?: EnumRideStatusFilter<"Ride"> | $Enums.RideStatus
    pickupLat?: FloatFilter<"Ride"> | number
    pickupLng?: FloatFilter<"Ride"> | number
    dropoffLat?: FloatFilter<"Ride"> | number
    dropoffLng?: FloatFilter<"Ride"> | number
    fare?: DecimalFilter<"Ride"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Ride"> | Date | string
    updatedAt?: DateTimeFilter<"Ride"> | Date | string
  }

  export type RideUpsertWithWhereUniqueWithoutDriverInput = {
    where: RideWhereUniqueInput
    update: XOR<RideUpdateWithoutDriverInput, RideUncheckedUpdateWithoutDriverInput>
    create: XOR<RideCreateWithoutDriverInput, RideUncheckedCreateWithoutDriverInput>
  }

  export type RideUpdateWithWhereUniqueWithoutDriverInput = {
    where: RideWhereUniqueInput
    data: XOR<RideUpdateWithoutDriverInput, RideUncheckedUpdateWithoutDriverInput>
  }

  export type RideUpdateManyWithWhereWithoutDriverInput = {
    where: RideScalarWhereInput
    data: XOR<RideUpdateManyMutationInput, RideUncheckedUpdateManyWithoutDriverInput>
  }

  export type RideEventUpsertWithWhereUniqueWithoutActorInput = {
    where: RideEventWhereUniqueInput
    update: XOR<RideEventUpdateWithoutActorInput, RideEventUncheckedUpdateWithoutActorInput>
    create: XOR<RideEventCreateWithoutActorInput, RideEventUncheckedCreateWithoutActorInput>
  }

  export type RideEventUpdateWithWhereUniqueWithoutActorInput = {
    where: RideEventWhereUniqueInput
    data: XOR<RideEventUpdateWithoutActorInput, RideEventUncheckedUpdateWithoutActorInput>
  }

  export type RideEventUpdateManyWithWhereWithoutActorInput = {
    where: RideEventScalarWhereInput
    data: XOR<RideEventUpdateManyMutationInput, RideEventUncheckedUpdateManyWithoutActorInput>
  }

  export type RideEventScalarWhereInput = {
    AND?: RideEventScalarWhereInput | RideEventScalarWhereInput[]
    OR?: RideEventScalarWhereInput[]
    NOT?: RideEventScalarWhereInput | RideEventScalarWhereInput[]
    id?: UuidFilter<"RideEvent"> | string
    rideId?: UuidFilter<"RideEvent"> | string
    type?: EnumRideEventTypeFilter<"RideEvent"> | $Enums.RideEventType
    payload?: JsonNullableFilter<"RideEvent">
    actorId?: UuidFilter<"RideEvent"> | string
    createdAt?: DateTimeFilter<"RideEvent"> | Date | string
    updatedAt?: DateTimeFilter<"RideEvent"> | Date | string
  }

  export type UserCreateWithoutDriverProfileInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    firstName: string
    lastName: string
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ridesByRider?: RideCreateNestedManyWithoutRiderInput
    ridesByDriver?: RideCreateNestedManyWithoutDriverInput
    rideEvents?: RideEventCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutDriverProfileInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    firstName: string
    lastName: string
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ridesByRider?: RideUncheckedCreateNestedManyWithoutRiderInput
    ridesByDriver?: RideUncheckedCreateNestedManyWithoutDriverInput
    rideEvents?: RideEventUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutDriverProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDriverProfileInput, UserUncheckedCreateWithoutDriverProfileInput>
  }

  export type VehicleCreateWithoutDriverProfileInput = {
    id?: string
    type: $Enums.VehicleType
    make: string
    model: string
    color: string
    year?: number | null
    licensePlate: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleUncheckedCreateWithoutDriverProfileInput = {
    id?: string
    type: $Enums.VehicleType
    make: string
    model: string
    color: string
    year?: number | null
    licensePlate: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleCreateOrConnectWithoutDriverProfileInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutDriverProfileInput, VehicleUncheckedCreateWithoutDriverProfileInput>
  }

  export type UserUpsertWithoutDriverProfileInput = {
    update: XOR<UserUpdateWithoutDriverProfileInput, UserUncheckedUpdateWithoutDriverProfileInput>
    create: XOR<UserCreateWithoutDriverProfileInput, UserUncheckedCreateWithoutDriverProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDriverProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDriverProfileInput, UserUncheckedUpdateWithoutDriverProfileInput>
  }

  export type UserUpdateWithoutDriverProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ridesByRider?: RideUpdateManyWithoutRiderNestedInput
    ridesByDriver?: RideUpdateManyWithoutDriverNestedInput
    rideEvents?: RideEventUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutDriverProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ridesByRider?: RideUncheckedUpdateManyWithoutRiderNestedInput
    ridesByDriver?: RideUncheckedUpdateManyWithoutDriverNestedInput
    rideEvents?: RideEventUncheckedUpdateManyWithoutActorNestedInput
  }

  export type VehicleUpsertWithoutDriverProfileInput = {
    update: XOR<VehicleUpdateWithoutDriverProfileInput, VehicleUncheckedUpdateWithoutDriverProfileInput>
    create: XOR<VehicleCreateWithoutDriverProfileInput, VehicleUncheckedCreateWithoutDriverProfileInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutDriverProfileInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutDriverProfileInput, VehicleUncheckedUpdateWithoutDriverProfileInput>
  }

  export type VehicleUpdateWithoutDriverProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    year?: NullableIntFieldUpdateOperationsInput | number | null
    licensePlate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUncheckedUpdateWithoutDriverProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType
    make?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    year?: NullableIntFieldUpdateOperationsInput | number | null
    licensePlate?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverProfileCreateWithoutVehicleInput = {
    id?: string
    isAvailable?: boolean
    status?: $Enums.DriverStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDriverProfileInput
  }

  export type DriverProfileUncheckedCreateWithoutVehicleInput = {
    id?: string
    userId: string
    isAvailable?: boolean
    status?: $Enums.DriverStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverProfileCreateOrConnectWithoutVehicleInput = {
    where: DriverProfileWhereUniqueInput
    create: XOR<DriverProfileCreateWithoutVehicleInput, DriverProfileUncheckedCreateWithoutVehicleInput>
  }

  export type DriverProfileUpsertWithoutVehicleInput = {
    update: XOR<DriverProfileUpdateWithoutVehicleInput, DriverProfileUncheckedUpdateWithoutVehicleInput>
    create: XOR<DriverProfileCreateWithoutVehicleInput, DriverProfileUncheckedCreateWithoutVehicleInput>
    where?: DriverProfileWhereInput
  }

  export type DriverProfileUpdateToOneWithWhereWithoutVehicleInput = {
    where?: DriverProfileWhereInput
    data: XOR<DriverProfileUpdateWithoutVehicleInput, DriverProfileUncheckedUpdateWithoutVehicleInput>
  }

  export type DriverProfileUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDriverProfileNestedInput
  }

  export type DriverProfileUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumDriverStatusFieldUpdateOperationsInput | $Enums.DriverStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutRidesByRiderInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    firstName: string
    lastName: string
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    driverProfile?: DriverProfileCreateNestedOneWithoutUserInput
    ridesByDriver?: RideCreateNestedManyWithoutDriverInput
    rideEvents?: RideEventCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutRidesByRiderInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    firstName: string
    lastName: string
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    driverProfile?: DriverProfileUncheckedCreateNestedOneWithoutUserInput
    ridesByDriver?: RideUncheckedCreateNestedManyWithoutDriverInput
    rideEvents?: RideEventUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutRidesByRiderInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRidesByRiderInput, UserUncheckedCreateWithoutRidesByRiderInput>
  }

  export type UserCreateWithoutRidesByDriverInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    firstName: string
    lastName: string
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    driverProfile?: DriverProfileCreateNestedOneWithoutUserInput
    ridesByRider?: RideCreateNestedManyWithoutRiderInput
    rideEvents?: RideEventCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutRidesByDriverInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    firstName: string
    lastName: string
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    driverProfile?: DriverProfileUncheckedCreateNestedOneWithoutUserInput
    ridesByRider?: RideUncheckedCreateNestedManyWithoutRiderInput
    rideEvents?: RideEventUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutRidesByDriverInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRidesByDriverInput, UserUncheckedCreateWithoutRidesByDriverInput>
  }

  export type RideEventCreateWithoutRideInput = {
    id?: string
    type: $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    actor?: UserCreateNestedOneWithoutRideEventsInput
  }

  export type RideEventUncheckedCreateWithoutRideInput = {
    id?: string
    type: $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    actorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RideEventCreateOrConnectWithoutRideInput = {
    where: RideEventWhereUniqueInput
    create: XOR<RideEventCreateWithoutRideInput, RideEventUncheckedCreateWithoutRideInput>
  }

  export type RideEventCreateManyRideInputEnvelope = {
    data: RideEventCreateManyRideInput | RideEventCreateManyRideInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutRidesByRiderInput = {
    update: XOR<UserUpdateWithoutRidesByRiderInput, UserUncheckedUpdateWithoutRidesByRiderInput>
    create: XOR<UserCreateWithoutRidesByRiderInput, UserUncheckedCreateWithoutRidesByRiderInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRidesByRiderInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRidesByRiderInput, UserUncheckedUpdateWithoutRidesByRiderInput>
  }

  export type UserUpdateWithoutRidesByRiderInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driverProfile?: DriverProfileUpdateOneWithoutUserNestedInput
    ridesByDriver?: RideUpdateManyWithoutDriverNestedInput
    rideEvents?: RideEventUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutRidesByRiderInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driverProfile?: DriverProfileUncheckedUpdateOneWithoutUserNestedInput
    ridesByDriver?: RideUncheckedUpdateManyWithoutDriverNestedInput
    rideEvents?: RideEventUncheckedUpdateManyWithoutActorNestedInput
  }

  export type UserUpsertWithoutRidesByDriverInput = {
    update: XOR<UserUpdateWithoutRidesByDriverInput, UserUncheckedUpdateWithoutRidesByDriverInput>
    create: XOR<UserCreateWithoutRidesByDriverInput, UserUncheckedCreateWithoutRidesByDriverInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRidesByDriverInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRidesByDriverInput, UserUncheckedUpdateWithoutRidesByDriverInput>
  }

  export type UserUpdateWithoutRidesByDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driverProfile?: DriverProfileUpdateOneWithoutUserNestedInput
    ridesByRider?: RideUpdateManyWithoutRiderNestedInput
    rideEvents?: RideEventUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutRidesByDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driverProfile?: DriverProfileUncheckedUpdateOneWithoutUserNestedInput
    ridesByRider?: RideUncheckedUpdateManyWithoutRiderNestedInput
    rideEvents?: RideEventUncheckedUpdateManyWithoutActorNestedInput
  }

  export type RideEventUpsertWithWhereUniqueWithoutRideInput = {
    where: RideEventWhereUniqueInput
    update: XOR<RideEventUpdateWithoutRideInput, RideEventUncheckedUpdateWithoutRideInput>
    create: XOR<RideEventCreateWithoutRideInput, RideEventUncheckedCreateWithoutRideInput>
  }

  export type RideEventUpdateWithWhereUniqueWithoutRideInput = {
    where: RideEventWhereUniqueInput
    data: XOR<RideEventUpdateWithoutRideInput, RideEventUncheckedUpdateWithoutRideInput>
  }

  export type RideEventUpdateManyWithWhereWithoutRideInput = {
    where: RideEventScalarWhereInput
    data: XOR<RideEventUpdateManyMutationInput, RideEventUncheckedUpdateManyWithoutRideInput>
  }

  export type RideCreateWithoutRideEventsInput = {
    id?: string
    status?: $Enums.RideStatus
    pickupLat: number
    pickupLng: number
    dropoffLat: number
    dropoffLng: number
    fare: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    rider: UserCreateNestedOneWithoutRidesByRiderInput
    driver?: UserCreateNestedOneWithoutRidesByDriverInput
  }

  export type RideUncheckedCreateWithoutRideEventsInput = {
    id?: string
    riderId: string
    driverId?: string | null
    status?: $Enums.RideStatus
    pickupLat: number
    pickupLng: number
    dropoffLat: number
    dropoffLng: number
    fare: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RideCreateOrConnectWithoutRideEventsInput = {
    where: RideWhereUniqueInput
    create: XOR<RideCreateWithoutRideEventsInput, RideUncheckedCreateWithoutRideEventsInput>
  }

  export type UserCreateWithoutRideEventsInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    firstName: string
    lastName: string
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    driverProfile?: DriverProfileCreateNestedOneWithoutUserInput
    ridesByRider?: RideCreateNestedManyWithoutRiderInput
    ridesByDriver?: RideCreateNestedManyWithoutDriverInput
  }

  export type UserUncheckedCreateWithoutRideEventsInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    status?: $Enums.UserStatus
    firstName: string
    lastName: string
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    driverProfile?: DriverProfileUncheckedCreateNestedOneWithoutUserInput
    ridesByRider?: RideUncheckedCreateNestedManyWithoutRiderInput
    ridesByDriver?: RideUncheckedCreateNestedManyWithoutDriverInput
  }

  export type UserCreateOrConnectWithoutRideEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRideEventsInput, UserUncheckedCreateWithoutRideEventsInput>
  }

  export type RideUpsertWithoutRideEventsInput = {
    update: XOR<RideUpdateWithoutRideEventsInput, RideUncheckedUpdateWithoutRideEventsInput>
    create: XOR<RideCreateWithoutRideEventsInput, RideUncheckedCreateWithoutRideEventsInput>
    where?: RideWhereInput
  }

  export type RideUpdateToOneWithWhereWithoutRideEventsInput = {
    where?: RideWhereInput
    data: XOR<RideUpdateWithoutRideEventsInput, RideUncheckedUpdateWithoutRideEventsInput>
  }

  export type RideUpdateWithoutRideEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    pickupLat?: FloatFieldUpdateOperationsInput | number
    pickupLng?: FloatFieldUpdateOperationsInput | number
    dropoffLat?: FloatFieldUpdateOperationsInput | number
    dropoffLng?: FloatFieldUpdateOperationsInput | number
    fare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rider?: UserUpdateOneRequiredWithoutRidesByRiderNestedInput
    driver?: UserUpdateOneWithoutRidesByDriverNestedInput
  }

  export type RideUncheckedUpdateWithoutRideEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    riderId?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    pickupLat?: FloatFieldUpdateOperationsInput | number
    pickupLng?: FloatFieldUpdateOperationsInput | number
    dropoffLat?: FloatFieldUpdateOperationsInput | number
    dropoffLng?: FloatFieldUpdateOperationsInput | number
    fare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutRideEventsInput = {
    update: XOR<UserUpdateWithoutRideEventsInput, UserUncheckedUpdateWithoutRideEventsInput>
    create: XOR<UserCreateWithoutRideEventsInput, UserUncheckedCreateWithoutRideEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRideEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRideEventsInput, UserUncheckedUpdateWithoutRideEventsInput>
  }

  export type UserUpdateWithoutRideEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driverProfile?: DriverProfileUpdateOneWithoutUserNestedInput
    ridesByRider?: RideUpdateManyWithoutRiderNestedInput
    ridesByDriver?: RideUpdateManyWithoutDriverNestedInput
  }

  export type UserUncheckedUpdateWithoutRideEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driverProfile?: DriverProfileUncheckedUpdateOneWithoutUserNestedInput
    ridesByRider?: RideUncheckedUpdateManyWithoutRiderNestedInput
    ridesByDriver?: RideUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type RideCreateManyRiderInput = {
    id?: string
    driverId?: string | null
    status?: $Enums.RideStatus
    pickupLat: number
    pickupLng: number
    dropoffLat: number
    dropoffLng: number
    fare: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RideCreateManyDriverInput = {
    id?: string
    riderId: string
    status?: $Enums.RideStatus
    pickupLat: number
    pickupLng: number
    dropoffLat: number
    dropoffLng: number
    fare: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RideEventCreateManyActorInput = {
    id?: string
    rideId: string
    type: $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RideUpdateWithoutRiderInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    pickupLat?: FloatFieldUpdateOperationsInput | number
    pickupLng?: FloatFieldUpdateOperationsInput | number
    dropoffLat?: FloatFieldUpdateOperationsInput | number
    dropoffLng?: FloatFieldUpdateOperationsInput | number
    fare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: UserUpdateOneWithoutRidesByDriverNestedInput
    rideEvents?: RideEventUpdateManyWithoutRideNestedInput
  }

  export type RideUncheckedUpdateWithoutRiderInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    pickupLat?: FloatFieldUpdateOperationsInput | number
    pickupLng?: FloatFieldUpdateOperationsInput | number
    dropoffLat?: FloatFieldUpdateOperationsInput | number
    dropoffLng?: FloatFieldUpdateOperationsInput | number
    fare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rideEvents?: RideEventUncheckedUpdateManyWithoutRideNestedInput
  }

  export type RideUncheckedUpdateManyWithoutRiderInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    pickupLat?: FloatFieldUpdateOperationsInput | number
    pickupLng?: FloatFieldUpdateOperationsInput | number
    dropoffLat?: FloatFieldUpdateOperationsInput | number
    dropoffLng?: FloatFieldUpdateOperationsInput | number
    fare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    pickupLat?: FloatFieldUpdateOperationsInput | number
    pickupLng?: FloatFieldUpdateOperationsInput | number
    dropoffLat?: FloatFieldUpdateOperationsInput | number
    dropoffLng?: FloatFieldUpdateOperationsInput | number
    fare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rider?: UserUpdateOneRequiredWithoutRidesByRiderNestedInput
    rideEvents?: RideEventUpdateManyWithoutRideNestedInput
  }

  export type RideUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    riderId?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    pickupLat?: FloatFieldUpdateOperationsInput | number
    pickupLng?: FloatFieldUpdateOperationsInput | number
    dropoffLat?: FloatFieldUpdateOperationsInput | number
    dropoffLng?: FloatFieldUpdateOperationsInput | number
    fare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rideEvents?: RideEventUncheckedUpdateManyWithoutRideNestedInput
  }

  export type RideUncheckedUpdateManyWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    riderId?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus
    pickupLat?: FloatFieldUpdateOperationsInput | number
    pickupLng?: FloatFieldUpdateOperationsInput | number
    dropoffLat?: FloatFieldUpdateOperationsInput | number
    dropoffLng?: FloatFieldUpdateOperationsInput | number
    fare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideEventUpdateWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumRideEventTypeFieldUpdateOperationsInput | $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ride?: RideUpdateOneRequiredWithoutRideEventsNestedInput
  }

  export type RideEventUncheckedUpdateWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    rideId?: StringFieldUpdateOperationsInput | string
    type?: EnumRideEventTypeFieldUpdateOperationsInput | $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideEventUncheckedUpdateManyWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    rideId?: StringFieldUpdateOperationsInput | string
    type?: EnumRideEventTypeFieldUpdateOperationsInput | $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideEventCreateManyRideInput = {
    id?: string
    type: $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    actorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RideEventUpdateWithoutRideInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumRideEventTypeFieldUpdateOperationsInput | $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actor?: UserUpdateOneWithoutRideEventsNestedInput
  }

  export type RideEventUncheckedUpdateWithoutRideInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumRideEventTypeFieldUpdateOperationsInput | $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    actorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RideEventUncheckedUpdateManyWithoutRideInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumRideEventTypeFieldUpdateOperationsInput | $Enums.RideEventType
    payload?: NullableJsonNullValueInput | InputJsonValue
    actorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}