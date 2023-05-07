import React, { useContext, createContext, useState } from "react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // STATES
  const [user, setUser] = useState(null);
  const [token, setToken] = useState();
  const [count, setCount] = useState(0);
  const [RouteResidents, setRouteResidents] = useState([]);
  const [storedCredentials, setStoredCredentials] = useState();
  const [route, setRoute] = useState();
  const [appReady, setAppReady] = useState(false);
  const [updatingToken, setUpdatingToken] = useState(false);

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        count,
        setCount,
        RouteResidents,
        setRouteResidents,
        storedCredentials,
        setStoredCredentials,
        route,
        setRoute,
        appReady,
        setAppReady,
        updatingToken,
        setUpdatingToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
