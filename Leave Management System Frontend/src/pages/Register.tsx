import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';

const Register: React.FC = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join us to start managing your leave"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;