import { PasswordInput } from "@/components/ui/password-input";
import {
  Box,
  Container,
  Heading,
  Stack,
  Field,
  Input,
  Button,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { toaster } from "@/components/ui/toaster";
import GoogleAuth from "@/components/GoogleAuth/GoogleAuth";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
  });


  const handleFormChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('auth/registration/', formData);

      navigate('/login');

      toaster.create({
        title: res.data.detail || "Success",
        description: "Please check your email and verify your account to log in.",
        type: "success",
        closable: true,
        duration: Infinity,
      })
    } catch (error) {
      console.error("Signup error:", error); 
      setErrors(error.response?.data || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Container maxW="sm" centerContent>
        <Stack textAlign="center" mb={10} mt={12} gap={2}>
          <Heading size="3xl" fontWeight="bold" color="blue.600">
            Sign Up
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
              <Field.Root invalid={!!errors.email} required>
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
                <Field.ErrorText>{errors.email}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.password1} required>
                <Field.Label fontWeight="medium">Password <Field.RequiredIndicator /></Field.Label>
                <PasswordInput
                  placeholder="Enter password"
                  size="lg"
                  colorPalette={"blue"}
                  name="password1"
                  value={formData.password1}
                  onChange={handleFormChange}
                />
                <Field.ErrorText>{errors.password1}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.non_field_errors} required>
                <Field.Label fontWeight="medium">Confirm Password <Field.RequiredIndicator /></Field.Label>
                <PasswordInput
                  placeholder="Re-enter password"
                  size="lg"
                  colorPalette={"blue"}
                  name="password2"
                  value={formData.password2}
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
                loadingText="Signing Up..."
              >
                Sign Up
              </Button>
              <Text textAlign="center" color="gray.500">or continue with</Text>
              <GoogleAuth />
            </Stack>

            <Link to='/login'><Text mt={3} fontSize="sm" color="blue.500">Already a user? Login</Text></Link>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
