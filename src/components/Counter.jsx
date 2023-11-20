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
    const newCount = parseInt(event.target.value, 10);
    if (!isNaN(newCount) && newCount >= 1 && newCount <= 1000) {
        setCount(newCount);
    }
  }

  return (
    <div className="">
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
            disabled={count <= 1}
        >
          -
        </Button>
        <Button
            className="durationSettingButton"
            onClick={add}
            disabled={count >= 1000}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default Counter;