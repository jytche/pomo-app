import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Counter from '../components/Counter';

function MydModalWithGrid(props) {
    const pomoTitle = "Pomodoro";
    const [pomoTime, setPomoTime] = useState(props.pomoDuration);
    const shortBreakTimeTitle = "Short Break";
    const [shortBreakTime, setShortBreakTime] = useState(props.shortBreakDuration);
    const longBreakTimeTitle = "Long Break";
    const [longBreakTime, setLongBreakTime] = useState(props.longBreakDuration);
  
    const onHide = props.onHide;

    const handlePomoTimeChange = (newCount) => {
        setPomoTime(newCount)
    };

    const handleShortBreakTimeChange = (newCount) => {
        setShortBreakTime(newCount);
    };

    const handleLongBreakTimeChange = (newCount) => {
        setLongBreakTime(newCount);
    };

    useEffect(() => {
        if(props.onPomoTimeChange) {
            props.onPomoTimeChange(pomoTime);
        }
    }, [pomoTime, props.onPomoTimeChange]);

    useEffect(() => {
        if(props.onShortBreakTimeChange) {
            props.onShortBreakTimeChange(shortBreakTime);
        }
    }, [shortBreakTime, props.onShortBreakTimeChange]);

    useEffect(() => {
        if(props.onLongBreakTimeChange) {
            props.onLongBreakTimeChange(longBreakTime);
        }
    }, [longBreakTime, props.onLongBreakTimeChange]);

    function Save() {
        return (
            onHide()
        )};

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className="settingsModal" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="settingsModal">
        <Container>
          <Row>
            <Col style={{fontSize: '25px', marginBottom: '10px', alignItems: 'center'}} xs={12} md={8}>
              Duration (minutes)
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={4}>
              <Counter title={pomoTitle} time={pomoTime} onCountChange={handlePomoTimeChange} />
            </Col>
            <Col xs={6} md={4}>
              <Counter title={shortBreakTimeTitle} time={shortBreakTime} onCountChange={handleShortBreakTimeChange} />
            </Col>
            <Col xs={6} md={4}>
              <Counter title={longBreakTimeTitle} time={longBreakTime} onCountChange={handleLongBreakTimeChange}/>
            </Col>
          </Row>

        </Container>
      </Modal.Body>
      <Modal.Footer className="settingsModal">
        <Button className="saveButton" onClick={Save}>Save</Button>
      </Modal.Footer>
    </Modal>
    );
}

export default MydModalWithGrid;