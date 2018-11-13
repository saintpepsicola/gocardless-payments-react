import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Flex, Box } from 'reflexbox'

export default class Search extends Component {
  state = {
    value: false,
    focus: false,
    placeholder: '',
    showClear: 'none'
  };

  handleChange = (event, value) => {
    this.setState({
      value,
      placeholder: '',
      displayTabs: ''
    });
  };

  setPlaceholder = (event) => {  
    this.state.form.focus();
    this.setState({
      placeholder: 'SEARCH PATIENTS',
      focus: true,
      displayTabs: 'none',
      showClear: ''
    });
  };

  clearSearch = (event) => {
    this.setState({
      placeholder: '',
      displayTabs: '',
      showClear: 'none',
      value: false
    });
  };

  render() {
    const { value } = this.state;
      
    return (
      <Container>
        <FlexContainer p={2} pb={0} pl={0} align='center'>
          <Box w={9/10}>
          <SearchBox
            inputRef={e => { this.setState({form: e}) }}
            id='standard-full-width'
            fullWidth
            placeholder={this.state.placeholder}
            autoFocus={this.state.focus}
            margin='normal'
            InputProps={{
              startAdornment: (
                <InputAdornment>
                <Tabs value={value} onChange={this.handleChange} indicatorColor='primary'>
                  <SearchTab onClick={this.setPlaceholder} label={<SearchGlass />} />
                  <Tab label='ACTIVE' style={{display: this.state.displayTabs}}/>
                  <Tab label='ARCHIVE' style={{display: this.state.displayTabs}}/>
                </Tabs>
                </InputAdornment>
                ),
                disableUnderline: (true)
              }}
            />
          </Box>
          <QuickReviewBox w={1/10}>
            {<QuickReviewButton style={{display: this.state.displayTabs}} disableFocusRipple={true} disableRipple={true}>
              QUICK REVIEW
            </QuickReviewButton>}
            {<Clear onClick={this.clearSearch} style={{display: this.state.showClear}}></Clear>}
          </QuickReviewBox>
        </FlexContainer>
      </Container>
    )
  }
}

// Styled Components
const Container = styled.div`
  border-bottom: solid 1px grey; 
  margin-bottom: 10px;
`

const SearchGlass = styled(SearchIcon)`
  color: grey;
`

const Clear = styled(ClearIcon)`
  color: grey;
  cursor:pointer;
`
const SearchBox = styled(TextField)`
  && {
    margin-bottom: 16px;
  }
`

const SearchTab = styled(Tab)`
  && {
    min-width: 0px;
  }
`

const QuickReviewButton = styled(Button)`
  width: 130px;
`

const QuickReviewBox = styled(Box)`
  text-align:right;
`

const FlexContainer = styled(Flex)`
  && {
    max-height: 47px;
  }
`
