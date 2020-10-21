export default {
  id: {
    label: 'Id',
    path: 'id',
    context: ['userRole'],
    component: {
      name: 'label',
    },
    excludeTerm: {
      not: true,
      name: 'hasPermission',
      args: { role: 'ADMIN' },
    },
  },
  name: {
    label: 'Name',
    description: 'Enter user name',
    path: 'name',
    required: true,
    component: {
      name: 'inputText',
    },
    formatter: { name: 'formatName' },
    parser: { name: 'parseName' },
    validators: [{
      name: 'minLength',
      args: { value: 2 },
    }, {
      name: 'uniqueName',
    }],
  },
  hobbies: {
    label: 'Hobbies',
    description: 'Select user hobbies',
    path: 'hobbies',
    dependencies: ['name'],
    dependenciesChange: { name: 'hobbiesDependenciesChange' },
    excludeTerm: {
      name: 'equals',
      args: { fieldId: 'name', value: 'Carol' },
    },
    disableTerm: {
      name: 'equals',
      args: { fieldId: 'name', value: 'Suzan' },
    },
    requireTerm: {
      name: 'equals',
      args: { fieldId: 'name', value: 'Ben' },
    },
    component: {
      name: 'asyncCheckboxCollection',
      state: {
        search: {
          value: '',
          placeholder: 'Search',
        },
        items: [],
      },
      stateChange: { name: 'hobbiesStateChange' },
    },
  },
};
