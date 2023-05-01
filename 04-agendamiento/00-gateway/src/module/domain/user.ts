export interface UserRequired {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserOptional {
  age: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export type UserProperties = UserRequired & Partial<UserOptional>;

export type UserUpdate = Omit<UserRequired, "id email"> &
  Omit<UserOptional, "createdAt updatedAt deletedAt active">;

export class User {
  private readonly id: string;
  private name: string;
  private readonly email: string;
  private password: string;
  private age: number | null;
  private active: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  constructor(properties: UserProperties) {
    Object.assign(this, properties);
    this.active = true;
    this.createdAt = new Date();
  }

  properties(): UserProperties {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      age: this.age,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  delete() {
    this.active = false;
    this.deletedAt = new Date();
  }

  update(fields: UserUpdate) {
    Object.assign(this, fields);
    this.updatedAt = new Date();
  }
}
