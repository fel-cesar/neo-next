export type Cnpj = {
  id: string;
  value: string;
  blocked: boolean;
  createdAt: Date;
};

export class CnpjEntity {
  private readonly id: string;
  private readonly value: string;
  private readonly blocked: boolean;
  private readonly createdAt: Date;

  constructor({
    id,
    value,
    blocked,
    createdAt,
  }: {
    id: string;
    value: string;
    blocked: boolean;
    createdAt: Date;
  }) {
    this.id = id;
    this.value = value;
    this.blocked = blocked;
    this.createdAt = createdAt;
  }

  getId(): string {
    return this.id;
  }

  getValue(): string {
    return this.value;
  }

  isBlocked(): boolean {
    return this.blocked;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  toJsonObject(): Cnpj {
    return {
      id: this.id,
      value: this.value,
      blocked: this.blocked,
      createdAt: this.createdAt,
    };
  }
}
