import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
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
      this.props.getRepeats(this.props.repeatsFilter === 0 ? true : false, this.props.rowsPerPage)
      this.interval = setInterval(() => {
        if (!this.props.searchTerm) {
          this.props.getRepeats(this.props.repeatsFilter === 0 ? true : false, this.props.rowsPerPage)
        }
      }, 300000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleBlur = () => {
    setTimeout(() => {
      this.setState({ searchField: false })
      this.props.getRepeats(true, this.props.rowsPerPage)
    }, 200)
  }

  handleChange = (e) => {
    this.props.history.push(`${process.env.PUBLIC_URL}/`)
    this.props.searchRepeats(e.target.value)
  }

  handleSearch = () => {
    this.setState({ searchField: true })
  }

  handleTabChange = (e, value) => {
    this.props.changeTab(value)
    this.props.history.push(`${process.env.PUBLIC_URL}/`)
    this.props.resetPagination()
    if (value <= 1)
      this.props.getRepeats(value === 0 ? true : false, 10)
  }

  render() {
    const { searchField } = this.state
    return (
      <Container>
        <Flex w={`100%`}>
          <BoxContainer w={9 / 10} align='center'>

            <TabsContainer value={this.props.repeatsFilter <= 1 ? this.props.repeatsFilter : false} indicatorColor='primary' onChange={this.handleTabChange.bind(this)}>
              {!searchField && <Tab label='Active' />}
              {!searchField && <Tab label='Archive' />}
            </TabsContainer>

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
            {!searchField && <IconButton onClick={this.handleSearch.bind(this)}>
              <SearchIcon />
            </IconButton>}

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
}
`
