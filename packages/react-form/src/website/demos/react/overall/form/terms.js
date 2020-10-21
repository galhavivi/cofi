export default {
  hasPermission: {
    func: ({ args, context }) => context.userRole === args.role,
  },
};
