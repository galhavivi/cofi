import React from 'react';
import DemoMarkup from './DemoMarkup';

export default ({ markup }) => markup.demos.map((args, index) => 
  (<React.Fragment key={index}>
    { args.title && <h2>{args.title}</h2> }
    <DemoMarkup exampleName={markup.exampleName} { ...args } />
  </React.Fragment>));
