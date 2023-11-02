import React, {useState, useEffect, useRef} from "react";
import Countdown, {formatTimeDelta} from "react-countdown";

function Timer() {
    const [showCountdown, setShowCountdown] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [endTime, setEndTime] = useState(null);
    const [hasCompleted, setHasCompleted] = useState(false);
    const countdownApiRef = useRef(null);
    const timeoutRef = useRef(null);

    const resetCountdown = () => {
        setEndTime(Date.now() + 25 * 60 * 1000);
        setShowCountdown(false);
        setHasCompleted(false);
      };

    function handleResetClick() {
        setEndTime(Date.now() + 10000);
        // setEndTime(Date.now() + 25 * 60 * 1000);

    }

    function handleStartPauseClick() {
        if (hasCompleted || !showCountdown) {
            // Reset the state for a new countdown
            setShowCountdown(true);
            // setEndTime(Date.now() + 25 * 60 * 1000);
            setEndTime(Date.now() + 5000);
            setHasCompleted(false);
          } else {
            setIsPaused(!isPaused); // Toggle pause state
            if (countdownApiRef.current) {
              isPaused ? countdownApiRef.current.start() : countdownApiRef.current.pause();
            }
          }
        }

        useEffect(() => {
            // Component will unmount
            return () => {
              // Clear the timeout if it exists
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
            };
          }, []);

    return (
        <div>
            <div>{showCountdown ? (
                <Countdown 
                date={endTime} 
                paused={isPaused}
                          onComplete={() => {
            // Wait for one second before resetting the countdown
            timeoutRef.current = setTimeout(resetCountdown, 2000);
          }}
                renderer={({ hours, minutes, seconds, completed, api }) => {
                    countdownApiRef.current = api;
                    if (completed) {
                        return <span>00:00</span>;
                    } else {
                        // Sum hours into minutes for durations that exceed 60 minutes.
                        const totalMinutes = hours * 60 + minutes;
                        return <span>{String(totalMinutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>;
                    }
                }}
                    
                />
                ) : "25:00"}</div>
            <button onClick={handleResetClick}>Reset</button>
            <button onClick={handleStartPauseClick} id="startButton">{isPaused || !showCountdown || hasCompleted ? 'Start' : 'Pause'}</button>
        </div>
    );
}


export default Timer;