import { SetMetadata } from '@nestjs/common';
import { UserPermissions } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserPermissions[]) => SetMetadata(ROLES_KEY, roles);   