import React from 'react'
import styled from 'styled-components'
import { withRouter } from "react-router"
import QuickActions from '../QuickActions/QuickActionsContainer'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Flex, Box } from 'reflexbox'
// import BackArrow from '@material-ui/icons/KeyboardArrowLeft'

class OrderDetails extends React.Component {

    constructor(props) {
        super(props)
        // Remove Under Review on route change
        this.unlisten = this.props.history.listen((location) => {
            this.props.unlockRepeat(this.props.repeat.repeat_id)
            if (location.pathname.indexOf('order') > -1) {
                this.props.getRepeat(location.pathname.substring(7))
            }
        })
    }

    componentWillUnmount() {
        this.unlisten()
        this.props.unlockRepeat(this.props.repeat.repeat_id)
    }

    async componentDidMount() {
        // Get a single Repeat
        await this.props.getRepeat(this.props.match.params.orderID)
        this.props.lockRepeat(this.props.repeat.repeat_id)
    }

    render() {
        let dependent = this.props.repeat && this.props.repeat.dependent ? this.props.repeat.dependent : false
        let { repeat, fetching } = this.props
        let patient = repeat ? (repeat.dependent ? repeat.dependent : repeat.patient) : false
        return (
            <div>
                {!fetching && repeat && <div>
                    <Panel defaultExpanded={true}>
                        <Summary expandIcon={<ExpandMoreIcon />}>
                            <div>
                                <PanelTitle>
                                    {dependent && `${dependent.forename} ${dependent.surname}`}
                                    {!dependent && `${repeat.patient_forename} ${repeat.patient_surname}`}
                                </PanelTitle>
                                {dependent && <PanelSubTitle>
                                    {`Ordered by ${repeat.patient_forename} ${repeat.patient_surname}`}
                                </PanelSubTitle>}
                            </div>
                        </Summary>
                        <Content>
                            <PatientDetails pl='24px' pr='24px' pt='8'>
                                <Box w={3 / 12}>
                                    <Title>PATIENT DETAILS</Title>
                                    <Flex m='0'>
                                        <Box w='90px'>
                                            <p>NHS:</p>
                                            <p>Gender:</p>
                                            <p>Birthday:</p>
                                            <p>E-mail:</p>
                                            <p>Tel:</p>
                                        </Box>
                                        <Box w='249px'>
                                            <p>{patient.nhs_number ? patient.nhs_number : '_'}</p>
                                            <p>{patient.gender ? patient.gender : '_'}</p>
                                            <p> {timestampToDate(patient.birthday)}</p>
                                            <p>{repeat.patient && repeat.patient.username ? repeat.patient.username : '_'}</p>
                                            <p>{patient.telephone ? patient.telephone : '_'}</p>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box w={3 / 12} >
                                    <Title>ADDRESS</Title>
                                    <Flex>
                                        <Box>
                                            <Address>
                                                {!dependent && patient && patient.address && <span>{patient.address}<br /></span>}
                                                {!dependent && patient && patient.postcode && <span>{patient.postcode}<br /></span>}
                                                {dependent && dependent.address && dependent.address.address_line_1 && <span>{dependent.address.address_line_1}<br /></span>}
                                                {dependent && dependent.address && dependent.address.address_line_2 && <span>{dependent.address.address_line_2}<br /></span>}
                                                {dependent && dependent.address && dependent.address.city && <span>{dependent.address.city}<br /></span>}
                                                {dependent && dependent.address && dependent.address.postcode && <span>{dependent.address.postcode}<br /></span>}
                                            </Address>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box w={3 / 12} >
                                    <Title>SURGERY</Title>
                                    <Flex>
                                        <Box>
                                            <Address>
                                                {repeat.surgery.address_1}<br />
                                                {repeat.surgery.address_2}<br />
                                                {repeat.surgery.address_3}<br />
                                                {repeat.surgery.postcode}<br />
                                            </Address>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box w={3 / 12} >
                                    <Title>NOMINATED PHARMACY</Title>
                                    <Flex>
                                        <Box>
                                            <Address>
                                                {repeat.pharmacy.pharmacy_name}<br />
                                                {repeat.pharmacy.address}<br />
                                                {repeat.pharmacy.postcode}<br />
                                                {repeat.pharmacy.telephone}<br />
                                            </Address>
                                        </Box>
                                    </Flex>
                                </Box>
                            </PatientDetails>
                        </Content>
                    </Panel>
                    <QuickActions />
                </div>}
            </div>
        )
    }
}

const timestampToDate = (date) => {
    let dob = new Date(date * 1000)
    return dob.toLocaleString().split(',')[0]
}

export default withRouter(OrderDetails)

const Summary = styled(ExpansionPanelSummary)`
&& > div
{
margin: 12px 0;
}
`

const PanelTitle = styled.h3`
width:100%;
font-size:22px;
font-weight: 800;
color: #4a4a4a;
margin:0;
`

const PanelSubTitle = styled.h5`
float: left;
width:100%;
font-size: 15px;
font-weight: normal;
letter-spacing: normal;
color: #7a7a7a;
margin: 5px 0px 0px 0px;
`

const Title = styled.h4`
color: #575757;
margin-bottom: 8px;
`

const Address = styled.p`
&&
{
white-space:pre-line;
text-transform:uppercase;
}
`

const PatientDetails = styled(Flex)`
width:100%;
position:relative;
& p
{
font-size: 14px;
margin:0;
line-height:1.5;
color: #575757;
}
&& > div
{
position:relative;
padding: 0 20px;
}
&& > div:first-child
{
padding-left:0;
}
&& > div:last-child:after
{
display:none;
}
&& > div:after
{
content: '';
height: 110px;
width: 1px;
right: 0;
bottom: 0;
position: absolute;
background-color: #d3d3d3;
}
`

const Content = styled(ExpansionPanelDetails)`
border-top: solid 1px #e4e3e3;
&&
{
padding: 0;
}
`

const Panel = styled(ExpansionPanel)`
&&
{
background: none;
box-shadow:none;
}
`
