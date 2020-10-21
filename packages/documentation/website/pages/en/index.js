/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;
    const { baseUrl, docsUrl, users } = siteConfig;
    const pageUrl = page => `${baseUrl}${page}`;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href}>{props.children}</a>
      </div>
    );

    const HomeSplash = () => (<SplashContainer>
      <div className="inner">
        <ProjectTitle siteConfig={siteConfig} />
        <PromoSection>
          <Button href={docUrl('introduction.html')}>Get Started</Button>
          <a className="link" href={pageUrl('demo-react-form.html')}>Demos</a>
        </PromoSection>
      </div>
    </SplashContainer>);

    const Highlight = ({ image, title, children }) => (<div className="highlight" >
      <img src={`${baseUrl}img/${image}`} />
      <div>
        <h2>{title}</h2>
        <div>{children}</div>
      </div>
    </div>);

    const Link = ({ href, target, trimEnd, children }) => (<a className={`link${ trimEnd ? ' trim-end' : ''}`}
      href={href} target={target}>{children}</a>);

    const Feature = ({ title, children }) => (<div>
      <div className="feature-header">{title}</div>
      <div>
        { children }
      </div>
    </div>);

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <HomeSplash />
        <div className="mainContainer" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="mainInner">
            <div className="features">
              <Feature title="Form & Field">
                  Form & Field 
                  <Link href="https://reactjs.org" target="_blank">React</Link>
                  components based on a core JavaScript
                  <Link href={docUrl('form-overview.html')}>Form class</Link>
                  which handles all form manipulations
                  and can integrate with any UI library such as 
                  <Link href="https://reactjs.org" target="_blank" trimEnd={true}>React</Link>,
                  <Link href="https://angular.io" target="_blank">Angular</Link>
                  and 
                  <Link href="https://vuejs.org" target="_blank" trimEnd={true}>Vue</Link>.
              </Feature>
              <Feature title="Common Components">
                  Set of common
                  <Link href="https://reactjs.org" target="_blank">React</Link>
                  components for usage such as Select, TextInput and more.
                  Components maps their generic Cofi's props to actual UI components props,
                  which are based on 
                  <Link href="https://material-ui.com/" target="_blank">Material UI</Link>
                  components.
              </Feature>
              <Feature title="Layouts">
                  Set of layout   
                  <Link href="https://reactjs.org" target="_blank">React</Link>
                  components for usage such as Sections, Item and more - to get unified form pages experience.
              </Feature>
            </div>
          </div>
          <div className="highlights">
            <Highlight image="manage-complicated.svg" title="Manage Complicated Form">
              Configure a simple json which tells Cofi how to manage your Form's fields in terms of - dependencies, validations,
              exclude / disable / require terms, hooks and more.
            </Highlight>
            <Highlight image="framework-agnostic.svg" title="UI Framework Agnostic">
              Cofi is based on a vanilla JavaScript Form class which can be integrated with any UI library.
              When time comes, replace to a different UI library in no time.
            </Highlight>
            <Highlight image="money.svg" title="Save Time And Money">
              Use Cofi to gain fast delivery and easy maintenance - 
              which will save a massive development time. We all know that company time equals money!
            </Highlight>
            <Highlight image="form-persistency.svg" title="Form Persistency">
              Save Cofi's Form model object on the browser's local storage after each user action, and consume it
              after page reloads to go back to the last state of the form.
            </Highlight>
            <Highlight image="server-side-validation.svg" title="Server Validation">
              Expose an endpoint on a Node.js server and use Cofi to validates the same form config that used 
              by the client to reduce code duplications
            </Highlight>
            <Highlight image="grid-usage.svg" title="Grid Usage">
              Using Cofi's Form and Field components in each row of a grid allows each row to be both viewable and editable easily.
            </Highlight>
            <Highlight image="log.svg" title="Full Lifecycle Log">
              Form's actions calculations are fully reflected in the debug log, allowing
              transparency for easy debug and understanding Cofi's logic.
            </Highlight>
            <Highlight image="high-performance.svg" title="High Performance">
              Cofi is based on a simple JavaScript Form class which allows it to process each user action
              fast. It updates UI components only when needed.
            </Highlight>
            <Highlight image="track-actions.svg" title="Track Actions">
              Use Cofi's hooks to track user actions, maintain actions history and replay or undo actions when 
              needed.
            </Highlight>
            <Highlight image="high-test-coverage.svg" title="High Test Coverage">
              Cofi has high unit tests coverage and covers each Form demo with e2e tests.
            </Highlight>
            <Highlight image="simple-code-tests.svg" title="Simplify Code & Tests">
              Cofi's structure makes developers split a massive form logic into small parts which
              reduce code duplications and simplifies unit tests.
            </Highlight>
            <div>
              <Link href={docUrl('introduction.html#highlights')}>View more highlights...</Link>
            </div>
          </div>
          <div className="demo">
            <a href={pageUrl('demo-react-form.html')}>
              <img className="large" src={`${baseUrl}img/overall-demo.png`} /> 
              <img className="medium" src={`${baseUrl}img/overall-demo-medium.png`} />
              <img className="small" src={`${baseUrl}img/overall-demo-small.png`} />
            </a>
          </div>
          <div className="quote">
            <i><q>Rome was not built in a day, but your complex form just might be</q></i>
          </div>
          <div className="users">
            <a href={`${baseUrl}users`}>Who uses cofi?</a>
            <div>
              {
                users
                .filter(user => user.pinned)
                .map((user, index) => <a key={index} href={user.infoLink}>
                  <img alt={user.caption} src={user.image} />
                </a>)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Index;
