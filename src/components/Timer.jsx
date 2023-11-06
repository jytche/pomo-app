import React, {useState, useEffect, useRef} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import alarm from '../sounds/alarm.mp3';
import click from '../sounds/click.mp3';

function Timer() {
    const pomodoroTime = 25 * 60;
    const shortBreakTime = 5 * 60;
    const longBreakTime = 15 * 60;
  
    const [timeLeft, setTimeLeft] = useState(pomodoroTime);
    const [timerRunning, setTimerRunning] = useState(false);
    const [sessionCount, setSessionCount] = useState(0);
    const [currentMode, setCurrentMode] = useState('pomodoro');

    const intervalRef = useRef(null);

    function playSound(mp3) {
        new Audio(mp3).play()
    }

    useEffect(() => {
        if (timerRunning) {
          intervalRef.current = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
          }, 1000);
        } else {
          clearInterval(intervalRef.current);
        }
    
        return () => clearInterval(intervalRef.current);
      }, [timerRunning]);

    useEffect(() => {
      if (timeLeft === 0) {
        playSound(alarm);
        clearInterval(intervalRef.current);
        setTimerRunning(false);
    
        // Check if it was a Pomodoro session
        if (currentMode === 'pomodoro') {
          // Check if 4 Pomodoro sessions have been completed
          if (sessionCount === 3) {
            setTimeLeft(longBreakTime); // Set time for a long break
            setCurrentMode('longBreak'); // Update the mode to long break
            setSessionCount(0); // Reset session count for a new set of Pomodoro sessions
          } else {
            setTimeLeft(shortBreakTime); // Set time for a short break
            setCurrentMode('shortBreak'); // Update the mode to short break
            setSessionCount((prevCount) => prevCount + 1); // Increment session count for a completed Pomodoro
          }
        } else {
          // If it was a break that ended, start a new Pomodoro session
          setTimeLeft(pomodoroTime);
          setCurrentMode('pomodoro'); // Update the mode to Pomodoro for the next session
        }
        console.log(sessionCount);
        console.log(currentMode);
      }
    }, [timeLeft, sessionCount, currentMode]);
    
    const startPauseTimer = () => {
        playSound(click);
        setTimerRunning((running) => !running);
    };
    
    const resetTimer = (time) => {
        clearInterval(intervalRef.current);
        setTimeLeft(time);
        setTimerRunning(false);
        // Reset session count if Pomodoro is selected
        if (time === pomodoroTime) {
          setSessionCount(0);
        }
    };
    
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <Container className="timerBox">
            <Button className="pomoButton" onClick={() => resetTimer(pomodoroTime)}>Pomodoro</Button>
            <Button className="breakButton" onClick={() => resetTimer(shortBreakTime)}>Short Break</Button>
            <Button className="breakButton" onClick={() => resetTimer(longBreakTime)}>Long Break</Button>
            <div className="timer">{formatTime(timeLeft)}</div>
            <Button className="startPauseButton" onClick={startPauseTimer}>{timerRunning ? 'Pause' : 'Start'}</Button>
        </Container>
      );
    }

export default Timer;