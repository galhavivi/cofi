export default (exampleName, props) => {
  const formFolder = props.formFolder || 'form';
  return {
    form: {
      formFolder,
      index: getFile(exampleName, `${formFolder}/index`),
      fields: getFile(exampleName, `${formFolder}/fields`),
      components: getFile(exampleName, `${formFolder}/components`),
      data: props.data ? getFile(exampleName, `${formFolder}/data`) : undefined,
    },
    item: {
      demo: props.demo,
      sections: getFile(exampleName, 'sections'),
      sectionsMobile: props.sectionsMobile ? getFile(exampleName, 'sections-mobile') : undefined,
    },
  };
};

const getFile = (exampleName, filePath) => {
  return require(`!!raw-loader!../demos/${exampleName}/${filePath}.js`).default;
};
