import JSZip from 'jszip';

export default (demoName, demos) => {
  const rootFolder = new JSZip();

  demos.forEach(({ title, demoMarkup, form }) => {
    // add demo folder
    const folderName = title ? form.formFolder : demoName;
    const demoFolder = rootFolder.folder(folderName); 
    
    // add form folder
    const formFolder = demoFolder.folder('form');
    formFolder.file('index.js', form.index);
    formFolder.file('fields.js', form.fields);
    formFolder.file('components.js', form.components);
    if (form.data) formFolder.file('data.js', form.data);
    if (form.context) formFolder.file('data.js', form.context);
    if (form.conversions) formFolder.file('conversions.js', form.conversions);
    if (form.validators) formFolder.file('validators.js', form.validators);
    if (form.terms) formFolder.file('terms.js', form.terms);
    if (form.dependenciesChanges) formFolder.file('dependenciesChanges.js', form.dependenciesChanges);
    if (form.hooks) formFolder.file('hooks.js', form.hooks);
    if (form.mockService) {
      const mocksFolder = formFolder.folder('mocks');
      mocksFolder.file('service.js', form.mockService);
    }
    if (form.extraComponents) {
      form.extraComponents.forEach((component) => {
        let file = component.filePath;
        let containerFolder = demoFolder;
        if (component.filePath.includes('/')) {
          const arr = component.filePath.split('/');
          file = arr[1];
          containerFolder = demoFolder.folder(arr[0]);
        }
        containerFolder.file(`${file}.jsx`, component.content);
      });
    }

    // add demo file
    demoFolder.file('demo.jsx', demoMarkup);
  });


  rootFolder.generateAsync({ type:'blob' }).then((content) => {
    const href = window.URL.createObjectURL(content);
    const link = document.createElement('a');
    link.setAttribute('href', href);
    link.setAttribute('download', `${demoName}.zip`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
