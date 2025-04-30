import { useRef, useState } from "react";
import { Container, Field, Input, Stack, Portal, Select, createListCollection, Flex, Button, FieldRequiredIndicator } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input";

// Helping functions
import { validateEmail, validateRequiredField, staffEndPoint } from "/src/utilities/Helper.js";
import { loginEndPoint } from "@/utilities/Helper";
import { useNavigate } from "react-router";
import { toaster } from "@/components/ui/toaster";

const SignIn = () => {
    const navigate = useNavigate();

    // Data

    // Main Data In The Form
    let formData = useRef({
        email: '',
        password: ''
    });

    // Errors
    let [errors, setErrors] = useState({
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

        formData.current[name] = value;
    };

    const isFormValid = () => {
        let emailError = validateEmail(formData.current.email);
        let passwordError = validateRequiredField('password', formData.current.password);
        setErrors({
            email: emailError,
            password: passwordError
        });

        // Check for errors
        if (emailError || passwordError) {
            toaster.create({
                title: "Please fill all required fields correctly",
                type: "error",
            });
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        if (!isFormValid()) return;

        setIsSubmitting(true);

        fetch(loginEndPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData.current)
        }).then((response) => {
            if (response.status == 401) throw new Error('Incorrect username or password');
            if (!response.ok) throw new Error('Failed to submit form');

            return response.json();
        }).then((data) => {
            sessionStorage.setItem("id", data.id);
            sessionStorage.setItem("role", data.role);
            switch (data.role) {
                case "MANAGER":
                    navigate("/manager-home");
                    break;
                case "STAFF":
                    navigate("/staff-home");
                    break;
                default:
                    throw new Error('Account error');
            }
        }).catch((error) => {
            console.log(error);
            toaster.create({
                title: error.message,
                type: "error",
            });
        }).finally(() => { setIsSubmitting(false) });
    }

    //UI
    return (
        <>
            <Flex w="100%" h="100%" justify="center" align="center">
                <Container maxWidth="30em" background="blue.900" rounded="2xl">
                    <Stack gap="5" py="4em" as="form" onSubmit={handleSubmit}>
                        <Field.Root required invalid={!!errors.email} orientation="horizontal">
                            <Field.Label>Email</Field.Label>
                            <FieldRequiredIndicator />
                            <Input
                                onChange={handleInputChange}
                                name="email"
                                value={formData.email}
                                placeholder="Enter Email"
                                color="black"
                                background="whiteAlpha.800"
                                variant="solid" />
                            <Field.ErrorText>Invalid Email</Field.ErrorText>
                        </Field.Root>
                        <Field.Root required invalid={!!errors.password} orientation="horizontal">
                            <Field.Label>Password</Field.Label>
                            <FieldRequiredIndicator />
                            <PasswordInput
                                onChange={handleInputChange}
                                name="password"
                                value={formData.password}
                                placeholder="*****"
                                color="black"
                                background="whiteAlpha.800"
                                variant="solid" />
                            <Field.ErrorText>This is an error text</Field.ErrorText>
                        </Field.Root>
                        <Field.Root required orientation="horizontal">
                            <Field.Label>Type</Field.Label>
                            <FieldRequiredIndicator />
                            <Select.Root collection={staffTypes} variant="subtle">
                                <Select.HiddenSelect />
                                <Select.Control>
                                    <Select.Trigger background="whiteAlpha.800">
                                        <Select.ValueText placeholder="Select Type" color="black" />
                                    </Select.Trigger>
                                    <Select.IndicatorGroup>
                                        <Select.Indicator />
                                    </Select.IndicatorGroup>
                                </Select.Control>
                                <Portal>
                                    <Select.Positioner>
                                        <Select.Content>
                                            {staffTypes.items.map((type) => (
                                                <Select.Item item={type} key={type.value}>
                                                    {type.label}
                                                    <Select.ItemIndicator />
                                                </Select.Item>
                                            ))}
                                        </Select.Content>
                                    </Select.Positioner>
                                </Portal>
                            </Select.Root>
                        </Field.Root>
                        <Button
                            background="whiteAlpha.800"
                            variant="solid"
                            mt="2em"
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            loadingText="Verifying..."
                        >
                            Sign In
                        </Button>
                    </Stack>
                </Container>
            </Flex>
        </>
    )
}

const staffTypes = createListCollection({
    items: [
        { label: "Asset Manager", value: "MANAGER" },
        { label: "Staff", value: "STAFF" }
    ],
})

export default SignIn