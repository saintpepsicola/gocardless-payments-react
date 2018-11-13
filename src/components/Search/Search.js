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
    placeholder: '',
    focus: false,
    showClear: 'none'
  };

  handleChange = (event, value) => {
    this.setState({
      value,
      placeholder: '',
      display: ''
    });
  };

  setPlaceholder = (event) => {  
    this.state.form.focus();
    this.setState({
      placeholder: 'SEARCH PATIENTS',
      focus: true,
      display: 'none',
      showClear: ''
    });
  };

  clearSearch = (event) => {
    this.setState({
      placeholder: '',
      display: '',
      showClear: 'none',
      value: false
    });
  };

  render() {
    const { value } = this.state;
      console.log(this.state);
      
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
                  <Tab label='ACTIVE' style={{display: this.state.display}}/>
                  <Tab label='ARCHIVE' style={{display: this.state.display}}/>
                </Tabs>
                </InputAdornment>
                ),
                disableUnderline: (true)
              }}
            />
          </Box>
          <QuickReviewBox w={1/10}>
            {<QuickReviewButton style={{display: this.state.display}} disableFocusRipple={true} disableRipple={true}>
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
