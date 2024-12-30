import { createContext, useState, useEffect } from "react";
import { masdrDevApi } from "shared/axios";
import { useFetch } from "shared/hooks/useFetch";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [selectedTenant, setSelectedTenant] = useState("");
  const [currentState, setCurrentState] = useState([]);

  const { data, isLoading, error } = useFetch(
    masdrDevApi,
    `/currentstate/getcurrentstate?paramTenantId=${selectedTenant}`
  );

  useEffect(() => {
    if (data?.data?.graphList) {
      setCurrentState(data.data.graphList);
    }
  }, [data]);

  return (
    <GlobalContext.Provider
      value={{
        currentState,
        setCurrentState,
        selectedTenant,
        setSelectedTenant,
        isLoading,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
