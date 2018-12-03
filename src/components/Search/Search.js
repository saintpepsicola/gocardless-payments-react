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
    if (this.props) {
      this.props.getRepeats(this.props.repeatsFilter === 1 ? true : false, this.props.rowsPerPage)
      this.interval = setInterval(() => this.props.getRepeats(this.props.repeatsFilter === 1 ? true : false, this.props.rowsPerPage), 300000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleBlur = () => {
    //Need to work on this
    setTimeout(() => { this.props.toggleSearch(false) }, 400)
  }

  handleChange = (e) => {
    this.props.searchRepeats(e.target.value)
  }

  handleTabChange = (e, value) => {
    this.props.changeTab(value)
    this.props.history.push(`${process.env.PUBLIC_URL}/`)
    this.props.resetPagination()
    this.props.getRepeats(value === 1 ? true : false, 10)
  }

  // This very simple logic can be removed once we have Profile Setting side nav
  handleSupport() {
    alert('For Healthera support please call 01223 422018. We are open every Monday to Friday, from 9.30 AM to 6 PM.');
  }

  render() {
    const { searchField } = this.props
    return (
      <Container>
        <Flex>
          <BoxContainer auto align='center'>
            <Tabs value={this.props.repeatsFilter} indicatorColor='primary' onChange={this.handleTabChange.bind(this)}>
              <IconTab icon={<SearchIcon />} />
              {!searchField && <Tab label='Active' />}
              {!searchField && <Tab label='Archive' />}
            </Tabs>
            {/* SEARCHBOX */}
            {searchField &&
              <SearchBox
                onBlur={this.handleBlur}
                InputProps={{ disableUnderline: true }}
                onChange={this.handleChange.bind(this)}
                placeholder='SEARCH PATIENTS'
                autoFocus={searchField}
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