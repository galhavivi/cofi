/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Section from '../Section';
import Button from '../Button';
import Popover from '../Popover';
import Options from '../Options';
import Style from './Styled';

export default class ItemView extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    tabs: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
      })).isRequired,
      value: PropTypes.string,
      onChange: PropTypes.func,
    }),
    sections: PropTypes.array,
    footer: PropTypes.shape({
      actions: PropTypes.array,
    }),
    options: PropTypes.shape({
      actions: PropTypes.array,
    }),
    size: PropTypes.number,
  };

  static defaultProps = {
    size: 4,
    sections: [],
  }

  render() {
    const Styled = Style(this.props.size, this.props.tabs !== undefined);

    return (<Styled.Wrapper>
      {
        (this.props.title || this.props.tabs || this.props.options) && <Styled.Header>
          {
            this.props.title
            && <Styled.Title>{this.props.title}</Styled.Title>
          }
          {
            (this.props.options || this.props.tabs) && <Styled.Row>
              {
                this.props.tabs && <Styled.TabsWrapper>
                  <Tabs
                    aria-label="Tabs"
                    value={this.props.tabs.value}
                    onChange={this.props.tabs.onChange}
                    indicatorColor="primary"
                    textColor="primary">
                    { this.props.tabs.items.map(item => (<Tab key={item.value} value={item.value} label={item.label}
                      disabled={item.disabled} />)) }
                  </Tabs>
                </Styled.TabsWrapper>
              }
              {
                this.props.options
                && <Options options={this.props.options.actions} />
              }
            </Styled.Row>
          }
        </Styled.Header>
      }
      <Styled.Sections aria-label="Sections" ref={this.props.sectionsRef}>
        {
          this.props.sections.map((section) => (<Section key={section.id} size={this.props.size} {...section} />))
        }
      </Styled.Sections>
      {
        this.props.footer && <Styled.Footer aria-label="Footer">
          <Styled.Buttons>
            {
              this.props.footer.actions.map((action, index) => (<Styled.ButtonWrapper key={index}>
                <Button {...action} />
                { action.popover ? <Popover { ...action.popover } /> : null }
              </Styled.ButtonWrapper>))
            }
          </Styled.Buttons>
        </Styled.Footer>
      }
    </Styled.Wrapper>);
  }
}
