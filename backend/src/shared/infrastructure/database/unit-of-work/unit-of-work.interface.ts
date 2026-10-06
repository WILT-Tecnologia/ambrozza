import { IApprovalRequestRepository } from 'src/modules/approval-superAdmin/domain/repositories/approval-request.repository.interface';
import { IShopkeeperRepository } from 'src/modules/auth-onboarding/domain/providers/repositories/shopkeeper.repository.interface';
import { IStoreOnboardingConsentRepository } from 'src/modules/created-shop/domain/repositories/store-onboarding-consent.repository.interface';
import { IStoreRepository } from 'src/modules/created-shop/domain/repositories/store.repository.interface';

export interface IUnitOfWork {
  execute<T>(
    callback: (
      shopkeeperRepository: IShopkeeperRepository,
      approvalRequestRepository: IApprovalRequestRepository,
      storeRepository: IStoreRepository,
      storeOnboardingConsentRepository: IStoreOnboardingConsentRepository,
    ) => Promise<T>,
  ): Promise<T>;
}

export const IUnitOfWorkToken = Symbol('IUnitOfWork');
