import { SuperAdmin } from '../../entities/super-admin.entity';

export const ISuperUserRepositoryToken = Symbol('ISuperUserRepository');

export interface ISuperUserRepository {
  findByEmail(email: string): Promise<SuperAdmin | null>;
}
