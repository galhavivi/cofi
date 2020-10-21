export default (exampleName, props) => {
  const formFolder = props.formFolder || 'form';
  return {
    formFolder,
    index: getFile(exampleName, formFolder, 'index'),
    fields: getFile(exampleName, formFolder, 'fields'),
    components: getFile(exampleName, formFolder, 'components'),
    data: props.data ? getFile(exampleName, formFolder, 'data') : undefined,
    context: props.context ? getFile(exampleName, formFolder, 'context') : undefined,
    conversions: props.conversions ? getFile(exampleName, formFolder, 'conversions') : undefined,
    validators: props.validators ? getFile(exampleName, formFolder, 'validators') : undefined,
    terms: props.terms ? getFile(exampleName, formFolder, 'terms') : undefined,
    dependenciesChanges: props.dependenciesChanges ? getFile(exampleName, formFolder, 'dependencies-changes') : undefined,
    hooks: props.hooks ? getFile(exampleName, formFolder, 'hooks') : undefined,
    mockService: props.mockService ? getFile(exampleName, formFolder, 'mocks/service') : undefined,
    extraComponents: props.extraComponents ? props.extraComponents
      .map(filePath => ({ filePath, content: getFileByFullRelativePath(exampleName, filePath) })) : undefined,
  };
};

const getFile = (exampleName, formFolder, fileName) => {
  return require(`!!raw-loader!../demos/react/${exampleName}/${formFolder}/${fileName}.js`).default;
};

const getFileByFullRelativePath = (exampleName, filePath) => {
  return require(`!!raw-loader!../demos/react/${exampleName}/${filePath}.jsx`).default;
};
