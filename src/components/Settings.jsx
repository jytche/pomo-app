import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Counter from '../components/Counter';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function MydModalWithGrid(props) {
    const pomoTitle = "Pomodoro";
    const [pomoTime, setPomoTime] = useState(props.pomoDuration);
    const shortBreakTimeTitle = "Short Break";
    const [shortBreakTime, setShortBreakTime] = useState(props.shortBreakDuration);
    const longBreakTimeTitle = "Long Break";
    const [longBreakTime, setLongBreakTime] = useState(props.longBreakDuration);
    const [theme, setTheme] = useState(props.themeStatus);
    const [alarmTime, setAlarmTime] = useState(props.alarmDuration);
  
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

    const handleAlarmTimeChange = (newTime) => {
      setAlarmTime(newTime);
  };

    const renderTooltip = (message) => (props) => (
      <Tooltip id="button-tooltip" {...props} className="settingsTooltip">
        {message}
      </Tooltip>
    );

    function handleSwitchChange() {
      if (theme === 'dark') {
        setTheme('light')
      } else {
        setTheme('dark')
      }
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

    useEffect(() => {
      if(props.onThemeChange) {
        props.onThemeChange(theme);
      }
    }, [theme, props.onThemeChange]);

    useEffect(() => {
      if(props.onAlarmTimeChange) {
          props.onAlarmTimeChange(alarmTime);
      }
  }, [alarmTime, props.onAlarmTimeChange]);

    function Save() {
        return (
            onHide()
        )};

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className="settingsModal" closeButton closeVariant='white'>
        <Modal.Title id="contained-modal-title-vcenter" className="titleRow">
          Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="settingsModal">
        <Container>
          <Row className="alarmRow">
            <Col className="durationRow" xs={12} md={12}>
              <div>Timer Duration (minutes) </div>  
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip("1 to 1000 minutes")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16" style={{ marginLeft: '8px' }}>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                </svg>
                </OverlayTrigger>

            </Col>
          </Row>

          <Row className="settingsRow">
            <Col xs={4} md={4}>
              <Counter title={pomoTitle} time={pomoTime} onCountChange={handlePomoTimeChange} minTime={1} maxTime={1000}/>
            </Col>
            <Col xs={4} md={4}>
              <Counter title={shortBreakTimeTitle} time={shortBreakTime} onCountChange={handleShortBreakTimeChange} minTime={1} maxTime={1000}/>
            </Col>
            <Col xs={4} md={4}>
              <Counter title={longBreakTimeTitle} time={longBreakTime} onCountChange={handleLongBreakTimeChange} minTime={1} maxTime={1000}/>
            </Col>
          </Row>

          <Row className="alarmRow">
            <Col className="alarmDurationRow" xs={12} md={12}>
              <div>Alarm Duration (seconds)  </div>
              <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip("1 to 7 seconds")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16" style={{ marginLeft: '8px' }}>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                </svg>
                </OverlayTrigger>
            </Col>
          </Row>

          <Row className="alarmCounterRow">
            <Col xs={4} md={4}>
              <Counter time={alarmTime} onCountChange={handleAlarmTimeChange} minTime={1} maxTime={7}/>
            </Col>
          </Row>

          <Row className="darkModeRow">
            <Col className="darkRow" xs={8} md={6}>
              Dark Mode
            </Col>
            <Col style={{fontSize: '25px', marginBottom: '10px', alignItems: 'center'}} xs={4} md={6}>
            <Form style={{textAlign: 'right'}}>
              <Form.Check
                type="switch"
                className="darkModeSwitch"
                onChange={()=> {
                  handleSwitchChange();
                  props.onThemeChange();
                }}
                checked={props.themeStatus === 'dark'}
              />
            </Form>
            </Col>
          </Row>

        </Container>
      </Modal.Body>
      <Modal.Footer className="settingsModal">
        <Button className="saveButton" onClick={Save}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
}

export default MydModalWithGrid;