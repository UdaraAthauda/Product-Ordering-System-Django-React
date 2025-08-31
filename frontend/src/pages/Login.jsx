import { PasswordInput } from "@/components/ui/password-input";
import {
  Box,
  Container,
  Heading,
  Stack,
  Field,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { toaster } from "@/components/ui/toaster";
import GoogleAuth from "@/components/GoogleAuth/GoogleAuth";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from "@/constants";
import { AuthContext } from "@/components/AuthContext";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])


  const handleFormChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('auth/login/', formData);

      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      localStorage.setItem(USER, res.data.user?.email)
      setIsAuthenticated(true)

      toaster.create({
        title: "Login Successful",
        description: "You have been logged in with Email.",
        type: "success",
        closable: true,
        duration: 5000,
      })

      navigate('/');

    } catch (error) {
      console.error("Login error:", error); 
      setErrors(error.response?.data || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Container maxW="sm" centerContent>
        <Stack textAlign="center" mb={10} mt={5} gap={3}>
          <Heading size="3xl" fontWeight="bold" color="blue.600">
             Login
          </Heading>

          <Box
            as="form"
            onSubmit={handleSubmit}
            bg="white"
            p={8}
            borderRadius="2xl"
            boxShadow="lg"
            minW="sm"
            maxW="sm"
            border="1px solid"
            borderColor="gray.200"
          >
            <Stack gap={5}>
              <Field.Root invalid={!!errors.email || !!errors.non_field_errors} required>
                <Field.Label fontWeight="medium">Email <Field.RequiredIndicator /></Field.Label>
                <Input
                  placeholder="me@example.com"
                  size="lg"
                  colorPalette={"blue"}
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  type="email"
                />
                <Field.ErrorText>{errors.email || errors.non_field_errors}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.non_field_errors} required>
                <Field.Label fontWeight="medium">Password <Field.RequiredIndicator /></Field.Label>
                <PasswordInput
                  placeholder="Enter password"
                  size="lg"
                  colorPalette={"blue"}
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                />
                <Field.ErrorText>{errors.non_field_errors}</Field.ErrorText>
              </Field.Root>

              <Button
                type="submit"
                colorPalette={"blue"}
                size="md"
                w="full"
                boxShadow="md"
                _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
                transition="all 0.2s ease"
                loading={loading}
                loadingText="Logging..."
              >
                Log in
              </Button>
              <Text textAlign="center" color="gray.500">or continue with</Text>
              <GoogleAuth />
            </Stack>

            <Link to='/signup'><Text mt={3} fontSize="sm" color="blue.500">If not a user? Signup</Text></Link>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
