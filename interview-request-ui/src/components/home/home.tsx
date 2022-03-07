import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/esm/Table';
import CandidateJsonData from "../../data/interviewRequests.json";
import { CandidateModel } from "../model/candidateModel";
import Image from 'react-bootstrap/Image'
import moment from "moment";
import './home.css'

function Home () {
    const [candidateData, setCandidateData] = useState(CandidateJsonData as unknown as CandidateModel[]);

    // useEffect(() => {
    //     candidateData.map((item:any) => {
    //         console.log('console : ', item)
    //     });
    // })

    const getHumanReadableDateTime = (dateTime: Date):string => {
        var today = moment();
        var yesterday = moment().subtract(1, 'day');

        if(moment(dateTime).isSame(today, 'day')){
            return moment(dateTime).format('LT').toLowerCase();
        }        
        if(moment(dateTime).isSame(yesterday, 'day')){
            return "Yesterday";
        }
        return moment(dateTime).format('DD/MM/YYYY');
    }

    return (
        <div className="body-content">
            <div className='sub-navigation'>
                <Container>
                    <div className="search-panel">
                        <input type="text" placeholder="   Search" name="txtSearch" />
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </div>
                </Container>
            </div>
            <Container>
                <div className='row'>
                    <div className="interview-request-counter">
                        {candidateData.length} interview requests
                    </div>
                </div>
                <Table className='candidate-table' hover>
                    <thead>
                        <tr>
                            <th>Candidate</th>
                            <th>Role</th>
                            <th>Last Communication</th>
                            <th>Salary</th>
                            <th>Sent By</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>     
                        {
                            candidateData.map((item: CandidateModel) => (
                                <tr key={item.image}>
                                    <td className="candidate-profile">
                                        <Image rounded={true} src={item.image}  width={50} height={50} className="img-profile"/>
                                        {item.candidate}
                                    </td>
                                    <td>
                                        {item.role ? item.role : '-' }
                                    </td>
                                    <td className='communication'>
                                        {item.last_comms.unread &&
                                            <span className='read-indicator'></span>
                                        }
                                        <span className="communication-description">{item.last_comms.description}</span>
                                        <span className="communication-date">{getHumanReadableDateTime(item.last_comms.date_time)}</span>
                                    </td>
                                    <td>
                                        R{item.salary}
                                    </td>
                                    <td>
                                        {item.sent_by}
                                    </td>
                                </tr>
                            ))
                        }             
                        {/* <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan={2}>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr> */}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default Home;