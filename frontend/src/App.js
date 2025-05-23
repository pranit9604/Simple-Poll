import React from "react";
import RegistrationForm from "./components/RegistrationForm";

const App = () => {
  const handleRegistrationSubmit = (formData) => {
    console.log("Registration submitted:", formData);
    // Add logic to handle registration data (e.g., save to backend or state)
  };

  return (
    <div>
      <RegistrationForm onSubmit={handleRegistrationSubmit} />
    </div>
  );
};

export default App;
