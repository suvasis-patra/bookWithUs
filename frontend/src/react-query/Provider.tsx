import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

interface ProviderPropes {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const QueryProvider = ({ children }: ProviderPropes) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
