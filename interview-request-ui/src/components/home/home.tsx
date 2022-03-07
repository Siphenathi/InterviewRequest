import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/esm/Table';
import CandidateJsonData from "../../data/interviewRequests.json";
import { CandidateModel } from "../model/candidateModel";
import Image from 'react-bootstrap/Image'
import moment from "moment";
import './home.css'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

function Home () {
    const [candidateData, setCandidateData] = useState(CandidateJsonData as unknown as CandidateModel[]);
    const [searchValue, setSearchValue] = useState('');
    const [showArchiveCandidate, setShowArchiveCandidate] = useState(false);

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

    const setArchiveCandidate = (candidateObject: CandidateModel) => {
        const updateCandidateList = candidateData.map((item) => {
            if (item.candidate === candidateObject.candidate) {
              const updatedItem = {
                ...item,
                archived: !item.archived,
              };      
              return updatedItem;
            }      
            return item;
          });
          setCandidateData(updateCandidateList);
    }

    const findCandidate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value;
        setSearchValue(enteredName);
        var newCandidateList = searchCandidate(enteredName);
        setCandidateData(newCandidateList);
    }

    const searchCandidate = (candidateName: string): CandidateModel[] => {
        var candidateList = CandidateJsonData as unknown as CandidateModel[];
        if(candidateName === "" || candidateName === undefined)
            return candidateList;
        var newCandidateList = candidateList.filter(item => item.candidate.toLowerCase().includes(candidateName.toLowerCase()))
        return newCandidateList;
    }

    const handleChkShowArchiveChange = () => {
        setShowArchiveCandidate(!showArchiveCandidate);
    }

    return (
        <div className="body-content">
            <div className='sub-navigation'>
                <Container>
                    <Row>
                        <Col>
                            <div className="search-panel">
                                <input type="text" placeholder="   Search" name="txtSearch" className="txtSearch" 
                                onChange={findCandidate} value={searchValue}/>
                                <button type="submit" className="btnSearch"><i className="fa fa-search"></i></button>
                            </div>
                        </Col>
                        <Col>
                            <div className="show-archived">
                                Show archived <input type="checkbox" id="vehicle3" name="chkShowArchive" value="Boat" onChange={() => {
                                    handleChkShowArchiveChange()
                                }}></input>
                            </div>
                        </Col>
                    </Row>
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
                            {showArchiveCandidate && <th></th>}
                        </tr>
                    </thead>
                    <tbody>     
                        {
                            candidateData.map((item: CandidateModel) => (
                                <tr key={item.candidate} style={{backgroundColor: showArchiveCandidate && !item.archived ? "#F9FAFB" : "#FFFFFF"}}>
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
                                    {showArchiveCandidate && 
                                    
                                    <td>
                                        {item.archived ? (
                                            <a href="#" onClick={() => setArchiveCandidate(item)} className="archive-link">Archived</a>
                                        ) : (
                                            <a href="#" onClick={() => setArchiveCandidate(item)}  className="archive-link">Unarchived</a>
                                        )}
                                    </td>}                      
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default Home;