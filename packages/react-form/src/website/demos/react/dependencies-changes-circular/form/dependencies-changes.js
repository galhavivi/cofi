export default {
  firstDependenciesChange: {
    func: ({ value = '' }) => ({ value: `${value}a` }),
  },
  secondDependenciesChange: {
    func: ({ value = '' }) => ({ value: `${value}b` }),
  },
};
