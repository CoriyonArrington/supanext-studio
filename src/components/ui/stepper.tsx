'use client';

import {
  Step,
  StepIndicator,
  StepStatus,
  StepNumber,
  Stepper as ChakraStepper,
  type StepperProps,
} from '@chakra-ui/react';

// Omit 'index' and 'children' from the base props, as our component handles them.
interface StepperComponentProps
  extends Omit<StepperProps, 'index' | 'children'> {
  stepCount: number;
  activeStep: number;
}

export function Stepper({
  stepCount,
  activeStep,
  ...props
}: StepperComponentProps) {
  const steps = Array.from({ length: stepCount }, (_, i) => i + 1);

  return (
    <ChakraStepper
      index={activeStep} // Use activeStep to control the index.
      colorScheme="purple"
      size={{ base: 'sm', md: 'md' }}
      {...props}
    >
      {steps.map((step) => (
        <Step key={step}>
          <StepIndicator>
            <StepStatus
              complete={<StepNumber />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
        </Step>
      ))}
    </ChakraStepper>
  );
}