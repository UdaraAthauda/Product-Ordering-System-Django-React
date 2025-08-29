import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Spinner, Flex } from "@chakra-ui/react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, auth } = useContext(AuthContext);

  // Run auth check on mount
  useEffect(() => {
    auth().catch((error) => {
      console.error("ProtectedRoute auth error:", error);
    });
  }, [auth]);

  if (isAuthenticated === null) {
    // fallback UI (instead of blank screen)
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}
