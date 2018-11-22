import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { Flex, Box } from 'reflexbox'
import { withRouter } from "react-router"
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

class Search extends Component {

  state = {
    searchField: false
  }

  componentDidMount() {
    this.props.getRepeats()
  }

  handleBlur = () => {
    this.setState({ searchField: false })
  }

  handleChange = (e) => {
    //this.props.searchRepeats(e.target.value)
  }

  handleTabChange = (e, value) => {
    this.setState({ searchField: value === 0 ? true : false })
    this.props.history.push(`${process.env.PUBLIC_URL}/`)
    this.props.toggleRepeats(value)
  }

  render() {
    const showQuickReview = this.props.history.location.pathname === '/'
    return (
      <Container>
        <Flex>
          <BoxContainer auto align='center'>
            <Tabs value={this.props.repeatsFilter} indicatorColor='primary' onChange={this.handleTabChange.bind(this)}>
              <IconTab icon={<SearchIcon />} />
              {!this.state.searchField && <Tab label={`Active (${this.props.activeRepeats})`} />}
              {!this.state.searchField && <Tab label="Archive" />}
            </Tabs>

            {/* SEARCHBOX */}
            {this.state.searchField &&
              <SearchBox
                onBlur={this.handleBlur}
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={this.handleChange.bind(this)}
                placeholder='SEARCH PATIENTS'
                autoFocus={this.state.searchField}
              />}
          </BoxContainer>
          {!this.state.searchField && showQuickReview && <Box align='center' justify='center' w='127px'>
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

const IconTab = styled(Tab)`
&&
{
  min-width:45px;
}
`

const BoxContainer = styled(Box)`
&&
{
  display:flex;
}

& > div > div > div > span
{
  background-color:#2f84b0;
}
`

const SearchBox = styled(TextField)`
  &&
  {
    flex:1
    width:auto;
    height:100%;
    & > div
    {
      height:100%;
    }
  }
`

