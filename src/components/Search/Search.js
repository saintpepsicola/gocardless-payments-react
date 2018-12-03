import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import { Flex, Box } from 'reflexbox'
import { withRouter } from "react-router"
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'

class Search extends Component {

  state = {
    searchField: false
  }

  componentDidMount() {
    if (this.props)
      this.props.getRepeats(this.props.repeatsFilter === 1 ? true : false, this.props.rowsPerPage)
  }

  handleBlur = () => {
    this.setState({ searchField: false })
    const rowsPerPage = 10
    this.props.toggleRepeats(1)
    this.props.getRepeats(true, rowsPerPage)
  }

  handleChange = (e) => {
    this.props.searchRepeats(e.target.value)
  }

  handleTabChange = (e, value) => {
    const rowsPerPage = 10
    this.setState({ searchField: value === 0 ? true : false })
    this.props.history.push(`${process.env.PUBLIC_URL}/`)
    this.props.toggleRepeats(value)
    this.props.resetPagination()
    this.props.getRepeats(value === 1 ? true : false, rowsPerPage)
  }

  // This very simple logic can be removed once we have Profile Setting side nav
  handleSupport() {
    alert('For Healthera support please call 01223 422018. We are open every Monday to Friday, from 9.30 AM to 6 PM.');
  }

  render() {
    return (
      <Container>
        <Flex>
          <BoxContainer auto align='center'>
            <Tabs value={this.props.repeatsFilter} indicatorColor='primary' onChange={this.handleTabChange.bind(this)}>
              <IconTab icon={<SearchIcon />} />
              {!this.state.searchField && <Tab label='Active' />}
              {!this.state.searchField && <Tab label='Archive' />}
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
              <Box w={ 1 / 2 }></Box>
              <Button onClick={this.handleSupport.bind(this)}>Support</Button>
          </BoxContainer>
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