import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'reflexbox'
import NominatedSurgery from './NominatedSurgery'

export default class SidePanel extends React.Component {

  render() {
    console.log(this.props)
    return (
      <PanelContainer panels={this.props.panels}>
        <Panel> <h1>Panel 1</h1></Panel>
        <Panel> <NominatedSurgery /></Panel>
        <Panel> <h1>Panel 3</h1></Panel>
      </PanelContainer>
    )
  }
}

const Panel = styled(Box)`
      width:100%;
      height:100%;
      position:absolute;
      transition:transform 0.3s;
      padding:16px;
    `

const PanelContainer = styled(Flex)`
      background:#eee;
      overflow:hidden;
      height:100%;
      position:relative;
    
  ${Panel}:nth-child(1)
  {
          transform: translateX(${props => props.panels[0].position}px);
      }
    
  ${Panel}:nth-child(2)
  {
          transform: translateX(${props => props.panels[1].position}px);
      }
    
  ${Panel}:nth-child(3)
  {
          transform: translateX(${props => props.panels[2].position}px);
      }
    `
