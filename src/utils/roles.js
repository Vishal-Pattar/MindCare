export const Permissions = {
    Root_Access: 'Root_Access',
    Admin_Access: 'Admin_Access',
    User_Access: 'User_Access',
    Free_Access: 'Free_Access',
};

export const rolePermissions = {
    Root: [Permissions.Root_Access, Permissions.Admin_Access, Permissions.User_Access, Permissions.Free_Access],
    Admin: [Permissions.Admin_Access, Permissions.User_Access, Permissions.Free_Access],
    Member: [Permissions.User_Access, Permissions.Free_Access],
    Tester: [Permissions.User_Access, Permissions.Free_Access],
    Guest: [Permissions.Free_Access],
};