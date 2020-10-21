export default {
  formatName: {
    func: ({ value = '' }) => value === 'Rachel' ? 'Emily' : value,
  },
  parseName: {
    func: ({ value = '' }) => value === 'Emily' ? 'Rachel' : value,
  },
};
