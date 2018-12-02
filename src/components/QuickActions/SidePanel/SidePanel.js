import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'reflexbox'
import PreviousOrder from '../PreviousOrder'
import Comments from '../Comments/CommentsContainer'

export default class SidePanel extends React.Component {

  render() {
    return (
      <PanelContainer className='side-panel' panels={this.props.panels}>
        <Panel> <Comments /></Panel>
        <Panel> <PreviousOrder /> </Panel>
      </PanelContainer>
    )
  }
}

const Panel = styled(Box)`
      width:100%;
      height:100%;
      position:absolute;
      transition:transform 0.3s;
      padding:14px;
      box-sizing: border-box;

      & nav li span
      {
        text-overflow: ellipsis;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
      }

`

const PanelContainer = styled(Flex)`
      background:#eee;
      overflow:hidden;
      height:100%;
      position:relative;
      min-height:390px;
    
  ${Panel}:nth-child(1)
  {
          transform: translateX(${props => props.panels[0].position}px);
  }
    
  ${Panel}:nth-child(2)
  {
          transform: translateX(${props => props.panels[1].position}px);
  }

    `
