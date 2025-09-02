import {
  Box,
  Container,
  Heading,
  Stack,
  Field,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { toaster } from "@/components/ui/toaster";
import {COMPANY_NAME} from '../constants'

export default function Company() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [companyID, setCompanyID] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get("company/");

        if (res.data && res.data.length > 0) {
          const company = res.data[0];

          setCompanyID(company.id);
          setFormData({
            name: company.name,
            phone: company.phone,
            city: company?.city || "No city name given.",
            address: company.address,
          });
        }
      } catch (error) {
        console.error("error in fetching company: ", error);
      }
    };

    getData();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (companyID) {
        res = await api.patch(`company/${companyID}/`, formData);
      } else {
        res = await api.post("company/", formData);
      }

      localStorage.setItem(COMPANY_NAME, formData.name)

      navigate("/");

      toaster.create({
        title: "Success",
        description: "Company is successfully registered.",
        type: "success",
        closable: true,
        duration: 5000,
      });
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
        <Stack textAlign="center" mb={10} mt={5} gap={2}>
          <Heading size="3xl" fontWeight="bold" color="blue.600">
            {formData.name || "Company Registration"}
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
              <Field.Root invalid={!!errors.name} required>
                <Field.Label fontWeight="medium" color={"black"}>
                  Company Name <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="enter your company name"
                  size="lg"
                  colorPalette={"blue"}
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  type="text"
                />
                <Field.ErrorText>{errors.name}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.phone} required>
                <Field.Label fontWeight="medium" color={"black"}>
                  Phone Number <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="07xxxxxxxx"
                  size="lg"
                  colorPalette={"blue"}
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  type="tel"
                />
                <Field.ErrorText>{errors.phone}</Field.ErrorText>
              </Field.Root>

              <Field.Root>
                <Field.Label fontWeight="medium" color={"black"}>
                  City
                </Field.Label>
                <Input
                  placeholder="situated city of the company"
                  size="lg"
                  colorPalette={"blue"}
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                  type="text"
                />
                <Field.ErrorText>{errors.non_field_errors}</Field.ErrorText>
              </Field.Root>

              <Field.Root required>
                <Field.Label fontWeight="medium" color={"black"}>
                  Company Adress <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="enter company address"
                  size="lg"
                  colorPalette={"blue"}
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  type="text"
                />
              </Field.Root>

              <Button
                type="submit"
                colorPalette={companyID ? "green" : "blue"}
                size="md"
                w="full"
                boxShadow="md"
                _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
                transition="all 0.2s ease"
                loading={loading}
                loadingText="Submitting..."
              >
                {companyID ? "Update" : "Submit"}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
