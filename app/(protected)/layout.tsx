"use client";

// import modules
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

// import files
import useCurrentUser from "@/hooks/useCurrentUser";
import { useUserStore } from "@/stores/useUserStore";
import ChatsSidebar from "@/components/custom/ChatsSidebar/ChatsSidebar";
import "./layout.scss";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const user = useCurrentUser();
  const fetchUser = useUserStore((s) => s.fetchUser);

  useEffect(() => {
    fetchUser(user?.email as string);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="main-container">
          <div className="main-sidebar">
            <ChatsSidebar />
          </div>

          {children}
        </div>
      </QueryClientProvider>
    </>
  );
};

export default ProtectedLayout;
