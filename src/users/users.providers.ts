import { users, roles} from './users.entity';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: users,
  },
];

export const rolesProviders = [
  {
    provide: 'ROLES_REPOSITORY',
    useValue: roles,
  },
];