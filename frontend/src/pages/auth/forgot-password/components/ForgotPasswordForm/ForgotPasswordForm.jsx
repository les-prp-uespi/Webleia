import { Box, Button } from '@mui/material';
import { Theme } from 'app/shared/utils';
import { TextInput } from 'pages/auth/components';
import { ButtonWhite } from 'pages/auth/styles';
import { ButtonBlue } from 'pages/auth/styles';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ConfirmPasswordStep, ConfirmEmailStep } from '../StepsForm';
import { useParams } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const { handleSubmit, control } = useForm();
  const [step, setStep] = useState(0);
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      setStep(1);
    }
  }, []);

  return (
    <>
      {step === 0 && <ConfirmEmailStep setStep={setStep} />}
      {step === 1 && <ConfirmPasswordStep setStep={setStep} />}
    </>
  );
};

export default ForgotPasswordForm;
