export interface ShopProps {
  id?: string;
  name: string;
  slug: string;
  description: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  allowDelivery: boolean;
  allowPickup: boolean;
  colorPalette: string;
  shopkeeperId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Shop {
  private props: ShopProps;

  constructor(props: ShopProps) {
    this.props = {
      ...props,
      name: props.name.trim(),
      slug: props.slug.trim().toLowerCase(),
      description: props.description.trim(),
      cep: props.cep.trim(),
      state: props.state.trim().toUpperCase(),
      city: props.city.trim(),
      street: props.street.trim(),
      number: props.number.trim(),
      neighborhood: props.neighborhood.trim(),
      complement: props.complement?.trim() || undefined,
      colorPalette: props.colorPalette.trim(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get slug(): string {
    return this.props.slug;
  }

  get description(): string {
    return this.props.description;
  }

  get cep(): string {
    return this.props.cep;
  }

  get state(): string {
    return this.props.state;
  }

  get city(): string {
    return this.props.city;
  }

  get street(): string {
    return this.props.street;
  }

  get number(): string {
    return this.props.number;
  }

  get neighborhood(): string {
    return this.props.neighborhood;
  }

  get complement(): string | undefined {
    return this.props.complement;
  }

  get allowDelivery(): boolean {
    return this.props.allowDelivery;
  }

  get allowPickup(): boolean {
    return this.props.allowPickup;
  }

  get colorPalette(): string {
    return this.props.colorPalette;
  }

  get shopkeeperId(): string {
    return this.props.shopkeeperId;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  get updatedAt(): Date {
    return this.props.updatedAt!;
  }
}
