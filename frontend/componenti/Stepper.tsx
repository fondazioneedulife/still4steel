import './Stepper.css';

interface StepperProps {
  steps: number[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="stepper">
      {steps.map((_step, index) => (
        <div
          key={index}
          className={`step ${index + 1 <= currentStep ? 'active' : ''}`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Stepper;