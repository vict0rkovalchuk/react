import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App () {
  return (
    <div>
      <Steps />
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlePrevious = () => {
    if (step > 1) {
      setStep(s => s - 1);
    }
  }

  const handleNext = () => {
    if (step < messages.length) {
      setStep(s => s + 1);
    }
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen(is => !is)}>&times;</button>

      { isOpen &&
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>

          <StepMessage step={step}>
            {messages[step - 1]}
          </StepMessage>

          <div className="buttons">
            <Button onClick={handlePrevious}>
              <span>👈</span> Previous
            </Button>
            <Button onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      }
    </>
  );
}

function StepMessage({ step, children }) {
  return (
    <p className="message">
      <h3>Step: {step}</h3>
      {children}
    </p>
  );
}

function Button({ onClick, children }) {
  return (
    <button
      style={{backgroundColor: '#7950f2', color: '#fff'}} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}