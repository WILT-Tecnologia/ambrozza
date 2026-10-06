export interface IStoreOnboardingConsentRepository {
  create(data: {
    storeId: string;
    termsAccepted: boolean;
    privacyAccepted: boolean;
  }): Promise<void>;
}

export const IStoreOnboardingConsentRepositoryToken = Symbol(
  'IStoreOnboardingConsentRepository',
);
