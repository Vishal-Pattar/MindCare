export const Permissions = {
    Admin_Access: 'Admin_Access',
    User_Access: 'User_Access',
};

export const rolePermissions = {
    Admin: [Permissions.Admin_Access, Permissions.User_Access],
    Member: [Permissions.User_Access],
};