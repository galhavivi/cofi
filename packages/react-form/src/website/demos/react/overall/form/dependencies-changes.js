export default {
  hobbiesDependenciesChange: ({ dependencies, state }) => {
    if (dependencies.name.value === 'Monica') {
      return {
        value: ['COOK'],
        state: {
          ...state,
          search: { ...state.search, value: '' },
        },
      };
    }

    return undefined; // no changes needed
  },
};
