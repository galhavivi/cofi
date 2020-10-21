const allServerNamesMock = ['Ross'];

export default {
  uniqueName: {
    func: async (props) => !allServerNamesMock.includes((props.value || '')), // can be sync / async
    message: props => `${props.label} already exists`, // can be sync / async
  },
};
