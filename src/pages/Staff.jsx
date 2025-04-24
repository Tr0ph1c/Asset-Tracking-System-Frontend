// react
import { useState } from 'react';

// Chakra UI
import { Text, Container, Field, Input, Stack, Flex, Button, FieldRequiredIndicator } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster"

// Helping functions
import { validateEmail, validateRequiredField, staffEndPoint } from "/src/utilities/Helper.js";

const Staff = () => {

    // Data

    // Main Data In The Form
    let [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // Errors
    let [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    });

    let [isSubmitting, setIsSubmitting] = useState(false);


    // Logic
    const validate = (name, value) => {
        setErrors(prev => ({
            ...prev,
            [name]: validateRequiredField(name, value)
        }));
        
        if (name === 'email') {
            setErrors(prev => ({
                ...prev,
                email: validateEmail(value)
            }));
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        validate(name, value);
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
    };
    
    const handleSubmit = async (e) => {
        
        validate('name', formData.name);
        validate('email', formData.email);  
        validate('password', formData.password);
        
        // Check for errors
        if (errors.name || errors.email || errors.password) {
            toaster.create({
                title: "Please fill all required fields correctly",
                type: "error",
            });
            return;
        }

        setIsSubmitting(true);
        console.log(formData);
        setTimeout(function(){
            //do what you need here
        }, 2000);
        setIsSubmitting(false);
        console.log("errors");

    }

    // UI
    return (
      <Flex w="100%" h="100%" justify="center" align="center">
          <Container maxWidth="30em" background="blue.900" rounded="2xl">
              <Stack gap="5" py="4em" as="form" onSubmit={handleSubmit}>
                <Text>Add Staff Member</Text>
                <Field.Root 
                    required 
                    invalid={!!errors.name}
                >
                    <Field.Label>Name</Field.Label>
                    <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Staff Member Name" 
                        color="black" 
                        background="whiteAlpha.800" 
                        variant="solid" />
                    <Field.ErrorText>{errors.name}</Field.ErrorText>
                </Field.Root>
                <Field.Root 
                    required 
                    invalid={!!errors.email} 
                >
                    <Field.Label>Email</Field.Label>
                    <Input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Staff Member Email" 
                        color="black" 
                        background="whiteAlpha.800" 
                        variant="solid" />
                    <Field.ErrorText>{errors.email}</Field.ErrorText>
                </Field.Root>
                <Field.Root 
                    required 
                    invalid={!!errors.password}
                >
                    <Field.Label>Password</Field.Label>
                    <PasswordInput 
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password" 
                        color="black" 
                        background="whiteAlpha.800" 
                        variant="solid"
                    />
                    <Field.ErrorText>{errors.password}</Field.ErrorText>
                </Field.Root>
                
                <Button 
                    background="whiteAlpha.800" 
                    variant="solid" 
                    mt="2em"
                    type="button"
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
                    onClick={handleSubmit}
                    loadingText="Adding..."
                >
                    Add Member
                </Button>
              </Stack>
          </Container>
          </Flex>
    )
  }
  
  export default Staff