import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { Flex, Box } from 'reflexbox'
import { withRouter } from "react-router"

class Search extends Component {

  state = {
    searchField: false
  }

  componentDidMount() {
    this.props.getRepeats()
  }

  handleClick = (e) => {
    e.preventDefault()
    this.setState({ searchField: false })
    this.props.history.push(`${process.env.PUBLIC_URL}/`)
  }

  handleBlur = () => {
    this.setState({ searchField: false })
  }

  render() {
    const showQuickReview = this.props.history.location.pathname === '/'
    return (
      <Container>
        <Flex>
          <Box auto align='center' justify='center'>
            <IconButton onClick={(e) => { this.setState({ searchField: true }) }} aria-label="Search">
              <SearchIcon />
            </IconButton>
            {!this.state.searchField &&
              <span>
                <Button onClick={this.handleClick.bind(this)}>ACTIVE ({this.props.activeRepeats !== 0 && this.props.activeRepeats})</Button>
                <Button onClick={this.handleClick.bind(this)}>ARCHIVE</Button>
              </span>}

            {this.state.searchField &&
              <SearchBox
                onBlur={this.handleBlur}
                InputProps={{
                  disableUnderline: true,
                }}
                placeholder='SEARCH PATIENTS'
                autoFocus={this.state.searchField}
              />}
          </Box>

          {/* Only show QUICK REVIEW button on homepage */}
          {showQuickReview && <Box align='center' justify='center' w='127px'>
            <VerticalFlex >
              <Button>QUICK REVIEW</Button>
            </VerticalFlex>
          </Box>}
        </Flex>
      </Container >
    )
  }
}

export default withRouter(Search)

// Styled Components
const Container = styled.div`
  border-bottom: solid 1px #d3d3d3; 
`

const VerticalFlex = styled(Flex)`
  height: 100%;
`

const SearchBox = styled(TextField)`
  &&
  {
    height:100%;
    & > div
    {
      height:100%;
    }
  }
`

