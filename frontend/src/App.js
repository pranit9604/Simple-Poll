import React from "react";
import RegistrationForm from "./components/RegistrationForm";

const App = () => {
  const handleRegistrationSubmit = (formData) => {
    console.log("Registration submitted:", formData);
  };

  return (
    <div>
      <RegistrationForm onSubmit={handleRegistrationSubmit} />
    </div>
  );
};

export default App;
