import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styled, { keyframes } from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import commentIcon from '../../resources/comment.png'
import TablePagination from '@material-ui/core/TablePagination'
import Chip from '@material-ui/core/Chip'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import KeyboardArrowRightRight from '@material-ui/icons/KeyboardArrowRight'
import RepeatsLoader from '../../resources/container_loader.png'
import RepeatsFilter from '../RepeatsFilter/RepeatsFilter'

class RepeatsList extends Component {

    componentDidMount() {
        this.setState({ page: this.props.page - 1 })
    }

    handleSelect(repeatID) {
        this.props.lockRepeat(repeatID)
        this.props.history.push(`${process.env.PUBLIC_URL}/order/${repeatID}`)
    }

    handleChangePage = (event, page) => {
        this.props.resetPagination(page)
        if (this.props.searchTerm) {
            this.props.searchRepeats(this.props.searchTerm, this.props.rowsPerPage, page)
        }
        else {
            this.props.getRepeats(this.props.repeatsFilter === 0 ? true : false, this.props.rowsPerPage, page, this.props.toggleDate ? 'date_created:desc' : 'date_created:asc')
        }
    }

    toggleOrderDate() {
        this.props.getRepeats(this.props.repeatsFilter === 0 ? true : false, this.props.rowsPerPage, this.props.page, !this.props.toggleDate ? 'date_created:desc' : 'date_created:asc')
    }

    render() {
        let { rowsPerPage } = this.props
        return (
            <div>
                {this.props.fetching && <RepeatsListLoader />}
                {this.props.showSearchFilters && <RepeatsFilter {...this.props} />}
                {this.props.repeats.length === 0 && <NoRepeatsMessage />}
                {this.props.repeats.length !== 0 && <Table>
                    <TableHead>
                        <TableRow>
                            <Header>Patient Name</Header>
                            <Header>Details</Header>
                            {!this.props.searchTerm && <DateCreatedHeader onClick={this.toggleOrderDate.bind(this)}>Order Date
                                {!this.props.toggleDate && <ExpandLessIcon />}
                                {this.props.toggleDate && <ExpandMoreIcon />}
                            </DateCreatedHeader>}
                            {this.props.searchTerm && <DateCreatedSearchHeader>Order Date</DateCreatedSearchHeader>}
                            <Header>Status</Header>
                            <Header></Header>
                        </TableRow>
                    </TableHead>
                    {/* PENDING ORDERS */}
                    <PendingOrders>
                        {this.props.repeats && this.props.repeats.filter(repeat => repeat.gp_status === 'delivered')
                            .map((row, index) => {
                                return (
                                    <OrderRow locked={row.lock ? 1 : 0} pending='true' onClick={this.handleSelect.bind(this, row.repeat_id)} key={index}>
                                        <PatientName>{row.patient_forename} {row.patient_surname}</PatientName>
                                        <TableCell>{row.number_of_medicines} medication{row.number_of_medicines === 1 ? '' : 's'}</TableCell>
                                        <TableCell><FormattedDate date={row.date_created} /></TableCell>
                                        <Status>New Order</Status>
                                        <TableCell>{row.comment && <CommentFlag alt='repeat comment' src={commentIcon} />}</TableCell>
                                        <LastColumn>
                                            {row.lock && <span>
                                                <UnderReview label="Under Review" variant="outlined" />
                                                <ReviewAuthor label={`By ${row.viewer}`} variant="outlined" /></span>}
                                        </LastColumn>
                                        <TableCell>{<ArrowRight />}</TableCell>
                                    </OrderRow>
                                )
                            })}
                    </PendingOrders>
                    {/* OTHER ORDERS */}
                    <CompletedOrders>
                        {this.props.repeats && this.props.repeats.filter(repeat => repeat.gp_status !== 'delivered').map((row, index) => {
                            return (
                                <OrderRow onClick={this.handleSelect.bind(this, row.repeat_id)} key={index}>
                                    <PatientName>{row.patient_forename} {row.patient_surname}</PatientName>
                                    <TableCell>{row.number_of_medicines} medication{row.number_of_medicines === 1 ? '' : 's'}</TableCell>
                                    <TableCell><FormattedDate date={row.date_created} /></TableCell>
                                    <Status>{row.gp_status}</Status>
                                    <TableCell>
                                        {row.comment && <CommentFlag alt='repeat comment' src={commentIcon} />}
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{<ArrowRight />}</TableCell>
                                </OrderRow>
                            )
                        })}
                    </CompletedOrders>
                </Table>}
                {/* <Pagination */}
                {this.props.repeats.length !== 0 && <TablePagination
                    component='div'
                    count={Number(this.props.totalCount)}
                    rowsPerPage={rowsPerPage}
                    page={this.props.page}
                    rowsPerPageOptions={[5]}
                    backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                    nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                    onChangePage={this.handleChangePage.bind(this)}
                />}
            </div>
        )
    }
}

export default withRouter(RepeatsList)

const NoRepeatsMessage = () => {
    return <BigBox>No Repeats found</BigBox>
}

const FormattedDate = (props) => {
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
    let date = new Date(Number(props.date))
    return date.toDateString() === new Date().toDateString() ? `Today, ${date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric' })}` : date.toLocaleDateString('en-GB', options)
}

const RepeatsListLoader = () => {
    return <Loader><img alt='loading-spinner' src={RepeatsLoader} /></Loader>
}

// Styled Components
const BigBox = styled.section`
&&
{
color: #6E6E6E;
height: 60vh;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
font-size: 22px;
}
`

const shine = keyframes`
10% {
opacity: 1;
top: -30%;
left: -30%;
transition-property: left, top, opacity;
transition-duration: 0.7s, 0.7s, 0.15s;
transition-timing-function: ease;
}
100% {
opacity: 0;
top: -30%;
left: -30%;
transition-property: left, top, opacity;
}
`

const Loader = styled.div`
&&
{
position: relative;
overflow: hidden;
width: 100%;
}

&& img
{
width: 100%;
height: auto;
}

&&:after
{
animation: ${shine} 2s ease-in-out  infinite;
animation-fill-mode: forwards;
content: "";
position: absolute;
top: -110%;
left: -210%;
width: 200%;
height: 200%;
opacity: 0;
transform: rotate(30deg);
background: rgba(255, 255, 255, 0.45);
background: linear-gradient(
to right,
rgba(255, 255, 255, 0.13) 0%,
rgba(255, 255, 255, 0.13) 77%,
rgba(255, 255, 255, 0.5) 92%,
rgba(255, 255, 255, 0.0) 100%
);
}

`

const ArrowRight = styled(KeyboardArrowRightRight)`
&&
{
color: #6E6E6E;
right:14px;
top: 21px;
position: absolute;
}
`

const CommentFlag = styled.img`
&&
{
padding-right: 10px;
top: 5px;
position: relative;
height:20px;
width:auto;
}
`

const LastColumn = styled(TableCell)`
&&
{
text-align: right;
}
&& > span
{
text-align: right;
}
`

const ReviewAuthor = styled(Chip)`
&&
{
display: block;
border:0;
font-family: Assistant;
color: #707070;
font-size: 15px;
font-weight: 300;
&& > span
{
justify-content: flex-end;
}
}
`

const UnderReview = styled(Chip)`
&&
{
border: 0;
font-family: Assistant;
font-size: 16px;
font-weight: 600;
color: #707070;
}
`

const OrderRow = styled(TableRow)`
height:66px !important;
cursor:pointer;
filter: opacity(0.49);
filter: ${props => props.locked ? `opacity(0.50)` : `opacity(1)`};
& > td
{
color: #282828;
font-size: 16px;
font-family: Assistant;
}
`
const PendingOrders = styled(TableBody)`
border-radius: 5px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
background-color: #ffffff;

& tr
{
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
box-shadow:none;
}

& tr:hover
{
background-color: #ebebeb;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
`
const CompletedOrders = styled(TableBody)`
background-color: #f5f5f5;
`

const Header = styled(TableCell)`
&&
{
font-size: 18px;
font-weight: normal;
color: #b0b0b0;
border:0;
position: relative;
font-family: Assistant;
}

&& svg {
position: absolute;
}
`

const DateCreatedHeader = styled(Header)`
cursor: pointer;
`

const DateCreatedSearchHeader = styled(Header)`
cursor: unset;
`

const PatientName = styled(TableCell)`
&&
{
font-weight: bold;
}
`

const Status = styled(TableCell)`
&&
{
font-weight: bold;
text-transform:capitalize;
color: ${props => statusColors[props.children]};
font-size: 16px;
}
`

const statusColors = {
    'Pending': '#f57123',
    'accepted': '#419646',
    'declined': '#d0021b',
    'Processing': '#2f84b0',
}