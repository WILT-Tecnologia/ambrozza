export interface IStoreOnboardingConsentRepository {
  create(data: {
    shopkeeperId: string;
    termsAccepted: boolean;
    privacyAccepted: boolean;
  }): Promise<void>;
}

export const IStoreOnboardingConsentRepositoryToken = Symbol(
  'IStoreOnboardingConsentRepository',
);
