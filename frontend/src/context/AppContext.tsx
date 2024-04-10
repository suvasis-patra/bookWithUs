import { useCurrentUser } from "../react-query/queries";
import React, { useEffect, useMemo, useState } from "react";

type AppContextType = {
  isLoggedIn: boolean;
  setLoggedIn: (isLoggedIn: boolean) => void;
};

export const AppContext = React.createContext<AppContextType>({
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data } = useCurrentUser();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    console.log("hi from useEffect");
  }, [data]);

  const contextValue = useMemo(() => {
    const setLoggedIn = (loggedIn: boolean) => {
      setIsLoggedIn(loggedIn);
    };

    return { isLoggedIn, setLoggedIn };
  }, [isLoggedIn]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
