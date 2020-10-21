/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled, { createGlobalStyle } from 'styled-components';
import { NavLink } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
html, body, #root {
  font-size: 16px;
  line-height: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
}

pre {
  font-size: 12px !important;
  background: #fafafa !important;
  padding: 20px !important;
  border-radius: 10px;
}

.MuiInput-root, .MuiFormControl-root {
  width: 100%;
}

@media only screen and (min-width: 1024px) {
  #menu-bar {
    display: none;
  }
}

@media only screen and (min-width: 0px) and (max-width: 1023px) {
  #header {
    padding: 0 20px;
  }

  #menu-wrapper {
    display: none;
  }

  #wrapper.menu-open #menu-wrapper {
    display: flex;
    flex: 1;
    overflow-y: auto;
  }

  #wrapper.menu-open #example-wrapper {
    display: none;
  }

  #example-container {
    padding: 20px;
  }

  #example-inner {
    max-width: unset;
  }

  #wrapper-inner {
    flex-direction: column;
  }
}

@media only screen and (max-width: 450px) {
  #logo-text {
    display: none;
  }
}
`;

export const Root = styled.div`
  margin-bottom: 60px;
`;

export const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin: 40px 0;
`;

export const MainElement = styled.div`
  vertical-align: top;
  min-width: 260px;
  flex: 1;
  position: relative;
  overflow-y: auto;
  background: #fafafa;
  border-radius: 20px;
  padding: 20px;
`;

export const MainElementLarge = styled(MainElement)`
  flex-basis: 100%;
`;

export const SectionTitle = styled.h4`
  margin-top: 0;
`;

export const P = styled.p`
  font-size: 16px;
  line-height: 24px;
`;

export const Text = styled.div`
  font-size: 16px;
  line-height: 24px;
`;

export const H3 = styled.h3`
  font-weight: 400;
`;

export const FormFooter = styled.div`
  gap: 15px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e5e5e5;
  padding-top: 20px;
`;

const RootElement = styled.div`
  margin: -8px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
`;

const Header = styled.div`
  display: flex;
  background: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
  color: #fff;
  font-weight: bold;
  height: 50px;
  min-height: 50px;
  padding: 0 50px;
  line-height: 50px;
`;

const Logo = styled.img`
  width: 30px;
  margin-top: 10px;
  margin-right: 15px;
`;

const LogoText = styled.div`
  display: inline-block;
  position: relative;
  top: -10px;
  font-weight: 500;
  color: #24292e;
`;

const HeaderLinks = styled.div`
  flex: 1;
  text-align: end;
`;

const InternalLink = styled(NavLink)`
  cursor: pointer;
  display: inline-block;
  margin-right: 20px;
  font-weight: 100;
  color: #fff;
  text-decoration: none;
  &.${props => props.activeClassName} { 
    font-weight: 600;
  }
`;
InternalLink.defaultProps = {
  activeClassName: 'active',
};

const ExternalLink = styled.a`
  cursor: pointer;
  display: inline-block;
  margin-right: 20px;
  font-weight: 100;
  text-decoration: none;
  color: rgba(36, 41, 46, 0.7);
  &:hover {
    color: #3fcee6;
  }
`;

const DemoLink = styled(NavLink)`
  color: #3fcee6;
  margin-right: 10px;
  cursor: pointer;
  text-decoration: none;
  &.${props => props.activeClassName} { 
    text-decoration: underline;
  }
`;
DemoLink.defaultProps = {
  activeClassName: 'active',
};

const A = styled.a`
  color: #3fcee6;
  margin-right: 10px;
  cursor: pointer;
  text-decoration: none;
`;

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const WrapperInner = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
  min-width: 300px;
`;

const MenuBar = styled.div`
  background: #f1f1f1;
  border-bottom: 1px solid #ddd;
  padding: 12px 20px 4px 20px;
`;

const MenuListWrapper = styled.div`
  overflow-y:auto;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 20px 40px;
  overflow-y: auto;
`;

const ExampleWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  overflow-y: auto;
`;

const ExampleContainer = styled.div`
  flex: 1;
  overflow-x: hidden;
  padding: 60px;
`;

const ExampleInner = styled.div`
  max-width: 800px;
`;

const ExampleHtml = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const H2 = styled.h2`
  font-weight: 400;
  margin-top: 0px;
`;

const DemoWrapper = styled.div`
  position: relative;
`;

const Code = styled.div`
  flex: 1;
  overflow-x: auto;
`;

export default {
  Root,
  Main,
  MainElement,
  MainElementLarge,
  SectionTitle,
  P,
  Text,
  FormFooter,
  H3,
  GlobalStyle,
  RootElement,
  Header,
  HeaderLinks,
  Logo,
  LogoText,
  InternalLink,
  ExternalLink,
  DemoLink,
  A,
  Wrapper,
  WrapperInner,
  MenuWrapper,
  MenuBar,
  MenuListWrapper,
  ExampleWrapper,
  ExampleContainer,
  ExampleInner,
  ExampleHtml,
  MainWrapper,
  HomeWrapper,
  H2,
  DemoWrapper,
  Code,
};
