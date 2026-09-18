export class SuperAdmin {
  private readonly _id: string;
  private readonly _email: string;
  private readonly _passwordHash: string;
  private readonly _createdAt: Date;

  constructor(props: {
    id: string;
    email: string;
    passwordHash: string;
    createdAt?: Date;
  }) {
    this._id = props.id;
    this._email = props.email;
    this._passwordHash = props.passwordHash;
    this._createdAt = props.createdAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
