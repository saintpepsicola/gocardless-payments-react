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
      this.interval = setInterval(() => {
        if(!this.props.searchTerm) {
          this.props.getRepeats(this.props.repeatsFilter === 1 ? true : false, this.props.rowsPerPage)
        }
      }, 300000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleBlur = () => {
    //Need to work on this
    setTimeout(() => { this.props.toggleSearch(false) }, 200)
  }

  handleChange = (e) => {
    this.props.searchRepeats(e.target.value)
  }

  handleTabChange = (e, value) => {
    this.props.changeTab(value)
    this.props.history.push(`${process.env.PUBLIC_URL}/`)
    this.props.resetPagination()
    if (value !== 0)
      this.props.getRepeats(value === 1 ? true : false, 10)
  }

  handleSupport() {
    alert('For Healthera support please call 01223 422018. We are open every Monday to Friday, from 9.30 AM to 6 PM.')
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
          </BoxContainer>
          <Box w='92px'>
            <VerticalFlex >
              <Button onClick={this.handleSupport.bind(this)}>Support</Button>
            </VerticalFlex>
          </Box>
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
const VerticalFlex = styled(Flex)`
  height: 100%;
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