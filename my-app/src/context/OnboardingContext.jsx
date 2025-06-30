import React, { createContext, useState, useContext } from "react";

const OnboardingContext = createContext();

export const useOnboarding = () => useContext(OnboardingContext);

export function OnboardingProvider({ children }) {
  const [data, setData] = useState({
    account: {},       // signup → email / password / token
    userDetails: {},   // name / age / phone / …
    medical: {},       // blood group / allergies / …
    guardian: {},      // guardian name / phone / …
  });

  const update = (section, values) =>
    setData((prev) => ({ ...prev, [section]: values }));

  return (
    <OnboardingContext.Provider value={{ data, update }}>
      {children}
    </OnboardingContext.Provider>
  );
}
