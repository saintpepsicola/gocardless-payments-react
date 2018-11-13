import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Flex, Box } from 'reflexbox'

export default class Search extends Component {
    state = {
      value: 0,
    };

    handleChange = (event, value) => {
      this.setState({
        value
      });
    };

  render() {
    const { value } = this.state;
      
    return (
      <Container>
        <FlexContainer p={2} pb={0} pl={0} align='center'>
          <Box w={9/10}>
          <SearchBox
            id='standard-full-width'
            fullWidth
            margin='normal'
            InputProps={{
              startAdornment: (
                <InputAdornment>
                <Tabs value={value} onChange={this.handleChange} indicatorColor='primary'>
                  <SearchTab label={<SearchGlass />} />
                  <Tab label='ACTIVE (3)' />
                  <Tab label='ARCHIVE' />
                </Tabs>
                </InputAdornment>
                ),
                disableUnderline: (true)
              }}
            />
          </Box>
          <QuickReviewBox w={1/10}>{<QuickReviewButton disableFocusRipple={true} disableRipple={true}>QUICK REVIEW</QuickReviewButton>}</QuickReviewBox>
        </FlexContainer>
      </Container>
    )
  }
}

const Container = styled.div`
  border-bottom: solid 1px grey; 
  margin-bottom: 10px;
`

const SearchGlass = styled(SearchIcon)`
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

