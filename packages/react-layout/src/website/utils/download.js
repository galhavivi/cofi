import JSZip from 'jszip';

export default (demoName, demo) => {
  const rootFolder = new JSZip();

  // add form folder
  const formFolder = rootFolder.folder(demo.form.formFolder);
  formFolder.file('index.js', demo.form.index);
  formFolder.file('fields.js', demo.form.fields);
  formFolder.file('components.js', demo.form.components);
  if (demo.form.data) formFolder.file('data.js', demo.form.data);

  // add demo file
  rootFolder.file('demo.jsx', demo.item.demo);

  // add sections files
  rootFolder.file('sections.js', demo.item.sections);
  if (demo.item.sectionsMobile) rootFolder.file('sections-mobile.js', demo.item.sectionsMobile);

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
