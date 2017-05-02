import React from 'react';
import Measure from 'react-measure';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${(props) => !props.isFirst && `margin-top: 10px;`}
`;

const ItemHeader = styled.div`
`;

const ItemContent = styled.div`
  height: ${(props) => props.animation * props.contentHeight}px;
  overflow: hidden;
`;

export default class Expandable extends React.Component {

  static propTypes = {
    /**
     * An array of react elements, these are the tabs.
     */
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    /**
     * An array of functions that returns react elements.
     * The function will be called with an object that has isOpened option.
     */
    headers: PropTypes.arrayOf(PropTypes.func).isRequired,
    /**
     * React motion spring presets.
     */
    springOptions: PropTypes.shape({
      stiffness: PropTypes.number,
      damping: PropTypes.number,
      precision: PropTypes.number,
    }),
    /**
     * Whether you want to enable multiple opens or not.
     */
    enableMultiOpen: React.PropTypes.bool,
  };

  static defaultProps = {
    enableMultiOpen: false,
  };

  componentWillMount() {
    this.setState({
      activeIndexes: [],
      childrenHeights: this.props.children.map(() => 0),
    });
  }

  getDefaultStyle = ({ children }) => {
    const styles = {};

    for (let i = 0; i < children.length; i++) {
      styles[i] = 0;
    }

    return styles;
  }

  calculateStyle = ({ children, springOptions, activeIndexes }) => {
    const styles = {};

    for (let i = 0; i < children.length; i++) {
      styles[i] = spring(activeIndexes.indexOf(i) > -1, springOptions);
    }

    return styles;
  }

  trigger = (index, { enableMultiOpen, activeIndexes }) => {
    const activeIndex = activeIndexes.indexOf(index);
    if(activeIndex > -1) {
      // Close
      this.setState({
        activeIndexes: enableMultiOpen ? [
          ...activeIndexes.slice(0, activeIndex),
          ...activeIndexes.slice(activeIndex + 1),
        ] : [],
      });
    } else {
      // Open
      this.setState({
        activeIndexes: enableMultiOpen ? [...activeIndexes, index] : [index],
      });
    }
  }

  updateChildHeight = (index, height, { childrenHeights }) => {
    // This method is called for all children at the same time
    // if we tried to call setState here the last one called will
    // override the rest..
    // So this is a hack by editing the state itself
    this.state.childrenHeights[index] = height;

    ///// This is the not hacky way
    // this.setState({
    //   childrenHeights: [
    //     ...childrenHeights.slice(0, index),
    //     height,
    //     ...childrenHeights.slice(index + 1),
    //   ],
    // });
  }

  render() {
    const {
      children,
      springOptions,
      enableMultiOpen,
      headers,
      ...props,
    } = this.props;

    const {
      activeIndexes,
      childrenHeights,
    } = this.state;

    return (
      <Motion
        defaultStyle={this.getDefaultStyle({ children })}
        style={this.calculateStyle({ children, springOptions, activeIndexes })}
      >
      {(styles) => (
        <Wrapper {...props}>
          {children.map((child, index) => (
            <ItemWrapper isFirst={index === 0} key={index}>
              <ItemHeader onClick={() => this.trigger(index, { enableMultiOpen, activeIndexes })}>
                {headers[index]({ isOpened: activeIndexes.indexOf(index) > -1 })}
              </ItemHeader>
              <ItemContent contentHeight={childrenHeights[index]} animation={styles[index]}>
                <Measure
                  whitelist={['height']}
                  onMeasure={({ height }) => this.updateChildHeight(index, height, { childrenHeights })}
                >
                  {child}
                </Measure>
              </ItemContent>
            </ItemWrapper>
          ))}
        </Wrapper>
      )}
      </Motion>
    );
  }
}
