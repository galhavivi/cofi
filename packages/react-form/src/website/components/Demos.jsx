/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Log from '@cofi/react-components/form/Log';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { withLog } from '../../lib';
import menu from '../menu';
import { getMenuItemByParams } from '../route.utils';
import readDemoFiles from '../utils/read-demo-files';
import download from '../utils/download';
import Styled from './StyledComponents';
import NestedList from './NestedList/NestedList';
import DemoMarkups from './DemoMarkups';

const CofiLog = withLog(Log);

const DemoHtmlAndCode = (props) => {
  const { match, item } = props;
  const Demo = item.demo;
  const Description = item.description;
  const markup = item.markup;

  return (<React.Fragment>
    {
      match.params && match.params.levelC === 'html' && <Styled.ExampleHtml id="example-html">
        <Styled.Root>
          <Styled.H3>Description</Styled.H3>
          <Description />
          <Styled.H3>Demo</Styled.H3>
          <Styled.Main>
            <Demo />
            <Styled.MainElement>
              <CofiLog />
            </Styled.MainElement>
          </Styled.Main>
          {
            item.docs && <React.Fragment>
              <Styled.H3>Related Docs</Styled.H3>
              <Styled.Text>
                <ul>
                  { item.docs.map(doc => (<li key={doc.href}>
                    <Styled.A href={`${process.env.REACT_APP_COFI_DOCS}${doc.href}`} target="_blank">{doc.label}
                    </Styled.A></li>)) }
                </ul>
              </Styled.Text>
            </React.Fragment>
          }
        </Styled.Root>
      </Styled.ExampleHtml>
    }
    {
      match.params && match.params.levelC === 'code' && <div id="example-code">
        <DemoMarkups markup={markup} />
      </div>
    }
  </React.Fragment>);
};

const DemoPage = (props) => {
  const { item, parent } = getMenuItemByParams(props.match.params, menu);
  const CustomDemo = item.demo;
  const prefix = process.env.REACT_APP_COFI_GIT;
  const exampleSourceUrl = `${prefix}/tree/master/packages/react-form/src/website/demos/react/${item.folder}`;
  const downloadDemo = () => {
    const demos = item.markup.demos.map(args => ({ 
      title: args.title,
      demoMarkup: args.demo,
      form: readDemoFiles(item.markup.exampleName, args),
    }));
    download(item.markup.exampleName, demos);
  };

  return item && item.items ? (<>
    <Styled.H2 id="example-title">{parent.label} - {item.label}</Styled.H2>
    <div>
      <Styled.DemoLink to={`${item.items[0].id}`} id="btn-example-html">Html</Styled.DemoLink>
      <Styled.DemoLink to={`${item.items[1].id}`} id="btn-example-code">Code</Styled.DemoLink>
      <Styled.A target="_blank" href={exampleSourceUrl}>Source</Styled.A>
      <Styled.A onClick={downloadDemo}>Download</Styled.A>
    </div>
    <Route path={'/:levelA/:levelB/:levelC'} render={props => (<DemoHtmlAndCode { ...props } item={item} />)} />
    { shouldRedirect(props.location)}
  </>)
    : (<CustomDemo />);
};

export default (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const smallView = window.innerWidth < 1024;
  
  const { item } = getMenuItemByParams(props.match.params, menu);

  return (item && <Styled.Wrapper id="wrapper" className={ smallView && menuOpen ? 'menu-open' : ''}>
    <Styled.WrapperInner id="wrapper-inner">
      <Styled.MenuBar id="menu-bar">
        { !menuOpen && <MenuIcon onClick={() => setMenuOpen(true)} /> }
        { menuOpen && <CloseIcon onClick={() => setMenuOpen(false)} /> }
      </Styled.MenuBar>
      <Styled.MenuWrapper id="menu-wrapper">
        <Styled.MenuListWrapper>
          <NestedList menu={menu} selected={item} onItemClick={() => setMenuOpen(false)} />
        </Styled.MenuListWrapper>
      </Styled.MenuWrapper>
      { 
        <Styled.ExampleWrapper id="example-wrapper">
          <Styled.ExampleContainer id="example-container">
            <Styled.ExampleInner id="example-inner">
              <Route path={'/:levelA/:levelB'} render={props => <DemoPage {...props} item={item} />} />
            </Styled.ExampleInner>
          </Styled.ExampleContainer>
        </Styled.ExampleWrapper>
      }
    </Styled.WrapperInner>
  </Styled.Wrapper>);
};

const shouldRedirect = (location) => {
  const path = location.pathname;
  if (path.split('/').length === 3) {
    return (<Redirect from={path} to={`${path}/html`} />);
  }
};
