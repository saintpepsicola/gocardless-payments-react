import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import { ReactComponent as FilterIcon } from '../../resources/filter.svg'
import CloseIcon from '@material-ui/icons/Close'
import styled from 'styled-components'
import { Flex, Box } from 'reflexbox'
import { withRouter } from "react-router"
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import IconButton from '@material-ui/core/IconButton'

class Search extends Component {

  state = {
    searchField: false
  }

  componentDidMount() {
    if (this.props) {
      this.props.getRepeats(this.props.repeatsFilter === 0 ? true : false)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleBlur = () => {
    setTimeout(() => {
      this.setState({ searchField: false })
      this.props.changeTab(0)
      this.props.getRepeats(true)
    }, 200)
  }

  handleChange = (e) => {
    const searchTerm = e.target.value
    if(searchTerm && searchTerm.length > 2) {
      this.props.history.push(`${process.env.PUBLIC_URL}/`)
      this.props.searchRepeats(searchTerm)
    }
  }

  handleSearch = () => {
    if (this.props.showSearchFilters)
      this.props.toggleSearchFilter()
    this.setState({ searchField: true })
  }

  handleFilter = () => {
    this.props.toggleSearchFilter()
  }

  handleTabChange = (e, value) => {
    this.props.changeTab(value)
    this.props.history.push(`${process.env.PUBLIC_URL}/`)
    this.props.resetPagination()
    if (value <= 1)
      this.props.getRepeats(value === 0 ? true : false)
  }

  render() {
    const { searchField } = this.state
    let { showFilterIcon, showSearchFilters } = this.props
    return (
      <Container>
        <Flex w={`100%`}>
          <BoxContainer w={9 / 10} align='center'>

            {!searchField && <TabsContainer value={this.props.repeatsFilter <= 1 ? this.props.repeatsFilter : false} indicatorColor='primary' onChange={this.handleTabChange.bind(this)}>
              <Tab label='Active' />
              <Tab label='Archive' />
            </TabsContainer>}

            {/* SEARCHBOX */}
            {searchField &&
              <SearchBox>
                <IconButton onClick={this.handleSearch.bind(this)}>
                  <SearchIcon />
                </IconButton>
                <TextField
                  onBlur={this.handleBlur}
                  InputProps={{ disableUnderline: true }}
                  onChange={this.handleChange.bind(this)}
                  placeholder='Search Patients'
                  autoFocus={searchField}
                />
              </SearchBox>}
          </BoxContainer>
          <VerticalAlign w={1 / 10}>
            {!searchField && <span>
              {showFilterIcon && <Filter dot={!showSearchFilters ? 1 : 0} disableRipple onClick={this.handleFilter.bind(this)}>
                <FilterIcon />
              </Filter>}
              <IconButton disableRipple onClick={this.handleSearch.bind(this)}>
                <SearchIcon />
              </IconButton>
            </span>}
            {searchField && <IconButton>
              <CloseIcon />
            </IconButton>}
          </VerticalAlign>
        </Flex>
      </Container >
    )
  }
}

export default withRouter(Search)

// Styled Components
const Filter = styled(IconButton)`
&&:hover {
background:none;
}
&& #dot {
display: ${props => props.dot ? 'none' : 'block'};
}

&& span
{
margin-top:13px;
}
`
const Container = styled.div`
border-top:1px solid #377da0;
height:58px;
display: flex;
align-items: center;
`
const VerticalAlign = styled(Box)`
&&
{
display:flex;
align-items:center;
justify-content: flex-end;
}
&& svg
{
color:white;
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

const TabsContainer = styled(Tabs)`
&& button
{
font-family: Assistant;
font-size: 18px;
font-weight: ${props => props.selected ? 'bold' : '400'};
height:58px;
color:white;
font-family: Assistant;
font-size: 19px;
font-weight: bold;
text-transform:none;
color: #ffffff;
}
`

const SearchBox = styled.div`
&&
{
font-family: Assistant;
align-items:center;
display:flex;
color:white;
}
&& svg, && input::placeholder, && input
{
color:white;
}
`
