/**
 * 8. Build a One-Time Password Generator
 */
const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(5);
    const [isActive, setIsActive] = useState(false);

    const otpTimerRef = useRef(null);

    const generateOtp = () => {
        const otp = Math.floor(100000 + Math.random() * 800000);
        setOtp(otp);
    }
    const startTimer = () => {
        setTimer(5);
        setIsActive(true);
    };

    useEffect(() => {
        let timerId = null;

        if (timer > 0 && isActive) {
            timerId = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000);
        } else if (timer === 0) {
            setIsActive(false);
            otpTimerRef.current.textContent = "OTP expired. Click the button to generate a new OTP.";
        }

        return () => clearInterval(timerId);

    }, [isActive, timer]);

    const handleClick = () => {
        generateOtp();
        startTimer();
    }

    return (
        <div className="container">
            <h1 id="otp-title">OTP Generator</h1>
            <h2 id="otp-display">
                {otp ? otp : "Click 'Generate OTP' to get a code"}
            </h2>
            <p id="otp-timer" aria-live="polite" ref={otpTimerRef}>
                {isActive ? `Expires in: ${timer} seconds` : ""}
            </p>
            <button id="generate-otp-button" onClick={handleClick} disabled={isActive}>Generate OTP</button>
        </div>
    );
};
