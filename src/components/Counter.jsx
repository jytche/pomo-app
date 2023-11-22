import React, { useState, useEffect} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Counter = (props) => {
  const [count, setCount] = useState(props.time);

  useEffect(() =>{
    if(props.onCountChange) {
        props.onCountChange(count);
    }
  }, [count, props.onCountChange]);

  const add = () => setCount((prev) => prev + 1);
  const subtract = () => setCount((prev) => prev - 1);

  const handleChange = (event) => {
    const inputValue = event.target.value;

    if (inputValue === "") {
      setCount(1);
      return;
    }

    const newCount = parseInt(inputValue, 10);

    if (!isNaN(newCount) && newCount >= props.minTime && newCount <= props.maxTime) {
        setCount(newCount);
    }
  }

  return (
    <div className="counterBox">
      <h1 className="settingsTitle">
        {props.title}
      </h1>
      <Form>
      <Form.Group className="mb-3" controlID="formBasicDuration">
        <Form.Control 
            className="settingsCount" 
            type="text" 
            value={count} 
            onChange={handleChange}
            />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      </Form>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <Button
            className="durationSettingButton"
            onClick={subtract}
            disabled={count <= props.minTime}
        >
          -
        </Button>
        <Button
            className="durationSettingButton"
            onClick={add}
            disabled={count >= props.maxTime}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default Counter;