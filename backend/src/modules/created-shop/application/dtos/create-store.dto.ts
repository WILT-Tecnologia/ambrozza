export interface CreateStoreInputDto {
  name: string;
  slug: string;
  description: string;

  document: string;
  phone: string;

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

  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

export interface CreateStoreOutputDto {
  id: string;
  name: string;
  slug: string;
}
