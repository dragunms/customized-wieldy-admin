import React, {useState} from 'react';
import {Steps, Button} from 'antd';

const {Step} = Steps;

const StepsBar = ({step, onSubmit}) => {
    const [current, setCurrent] = useState(0);

    function handleNextStepOnClick() {
        setCurrent(current + 1);
    }

    function handlePrevStepOnClick() {
        setCurrent(current - 1);
    }

    return (
        <>
            <Steps current={current}>
                {step.map((currentStep, index) => {
                    return <Step title={currentStep.title} icon={currentStep.icon} key={index.toString()} />;
                })}
            </Steps>
            <div className='steps-content'>{step[current].pages}</div>
            <div className='steps-action'>
                {current < step.length - 1 && (
                    <Button type='primary' onClick={handleNextStepOnClick}>
                        Next
                    </Button>
                )}
                {current === step.length - 1 && (
                    <Button type='primary' onClick={onSubmit}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{marginLeft: 8}} onClick={handlePrevStepOnClick}>
                        Previous
                    </Button>
                )}
            </div>
        </>
    );
};

export default StepsBar;
