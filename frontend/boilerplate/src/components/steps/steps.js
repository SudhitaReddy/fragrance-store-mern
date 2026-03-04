import UilArrowLeft from '@iconscout/react-unicons/icons/uil-arrow-left';
import UilArrowRight from '@iconscout/react-unicons/icons/uil-arrow-right';
import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';
import { ActionWrapper, StepsStyle } from './style';

const { Step } = StepsStyle;

function Steps({
  isvertical,
  size,
  current,
  direction,
  status,
  progressDot,
  steps,
  isswitch,
  navigation,
  onNext,
  onPrev,
  onDone,
  onChange,
  children,
  height,
  isfinished,
}) {
  const [state, setState] = useState({
    currents: steps ? Math.max(0, Math.min(current || 0, steps.length - 1)) : (current || 0),
  });

  const next = () => {
    const currents = Math.min(state.currents + 1, steps ? steps.length - 1 : 0);
    setState({ currents });
    onNext(currents);
  };

  const prev = () => {
    const currents = Math.max(state.currents - 1, 0);
    setState({ currents });
    onPrev(currents);
  };

  const { currents } = state;

  const stepStyle = {
    marginBottom: 60,
    boxShadow: '0px -1px 0 0 #e8e8e8 inset',
  };

  // console.log(steps);
  const onChanges = (curr) => {
    // console.log('onChange:', current);
    const boundedCurr = steps ? Math.max(0, Math.min(curr, steps.length - 1)) : curr;
    setState({ currents: boundedCurr });
    if (onChange) onChange(boundedCurr);
  };

  return !isswitch ? (
    <StepsStyle
      type={navigation && 'navigation'}
      style={navigation && stepStyle}
      size={size}
      current={navigation ? currents : current}
      direction={direction}
      status={status}
      progressDot={progressDot}
      onChange={onChanges}
    >
      {children}
    </StepsStyle>
  ) : (
    <>
      <StepsStyle current={currents} direction={direction} status={status} progressDot={progressDot} size={size}>
        {steps !== undefined &&
          steps.map((item) => (
            <Step
              className={item.className && item.className}
              icon={item.icon && item.icon}
              key={item.title}
              title={item.title}
            />
          ))}
      </StepsStyle>
      {isvertical ? (
        <div className="steps-wrapper">
          <div
            className="steps-content"
            style={{ minHeight: height, display: 'flex', justifyContent: 'center', marginTop: 100 }}
          >
            {steps && steps[state.currents] && steps[state.currents].content ? steps[state.currents].content : ''}
          </div>

          {!isfinished && (
            <ActionWrapper>
              <div className="step-action-wrap">
                <div className="step-action-inner">
                  <Row>
                    <Col xs={24}>
                      <div className="steps-action">
                        {state.currents > 0 && (
                          <Button className="btn-prev" type="light" onClick={() => prev()}>
                            <UilArrowLeft />
                            Previous
                          </Button>
                        )}

                        {state.currents < steps.length - 1 && (
                          <Button className="btn-next" type="primary" onClick={() => next()}>
                            Save & Next
                            <UilArrowRight />
                          </Button>
                        )}

                        {state.currents === steps.length - 1 && (
                          <Button type="primary" onClick={onDone}>
                            Done
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </ActionWrapper>
          )}
        </div>
      ) : (
        <>
          <div
            className="steps-content"
            style={{ minHeight: height, display: 'flex', justifyContent: 'center', marginTop: 100 }}
          >
            {steps && steps[state.currents] && steps[state.currents].content ? steps[state.currents].content : ''}
          </div>

          {!isfinished && (
            <ActionWrapper>
              <div className="step-action-wrap">
                <div className="step-action-inner">
                  <Row>
                    <Col xs={24}>
                      <div className="steps-action">
                        {state.currents > 0 && (
                          <Button className="btn-prev" type="light" onClick={() => prev()}>
                            <UilArrowLeft />
                            Previous
                          </Button>
                        )}

                        {state.currents < steps.length - 1 && (
                          <Button className="btn-next" type="primary" onClick={() => next()}>
                            Save & Next
                            <UilArrowRight />
                          </Button>
                        )}

                        {state.currents === steps.length - 1 && (
                          <Button type="primary" onClick={onDone}>
                            Done
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </ActionWrapper>
          )}
        </>
      )}
    </>
  );
}



export { Step, Steps };
