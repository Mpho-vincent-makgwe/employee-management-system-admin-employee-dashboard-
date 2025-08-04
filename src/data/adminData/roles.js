export const roles = [
  {
    id: 1,
    name: 'Admin',
    description: 'Admin has access to all functions of the dashboard',
    members: 2,
    action: 'View',
  },
  {
    id: 2,
    name: 'Team Lead',
    description: 'Team lead does not have access to all functions of the dashboard',
    members: 1,
    action: 'View',
  },
];
