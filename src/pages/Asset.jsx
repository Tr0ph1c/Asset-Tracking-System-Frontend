import { useRef, useState } from 'react'

// Chakra
import { Text, Container, Field, Input, Stack, Flex, Button } from "@chakra-ui/react"
import { toaster } from "@/components/ui/toaster"

// Helper functions
import { assetEndPoint, validateRequiredField } from '@/utilities/Helper';

const Asset = () => {
    // Main Data In The Form
    // -----------------------
    // We use a Ref here because
    // we don't want to cause
    // re-renders when entering
    // data into the form
    let formData = useRef({
        icon_index: 0,
        serial_number: '',
        name: '',
        type: ''
    });

    // Error states for showing errors in UI
    let [errors, setErrors] = useState({
        serial_number: '',
        name: ''
    });

    // Submitting state for disabling button
    let [isSubmitting, setIsSubmitting] = useState(false);

    // Logic of submission
    const isFormValid = () => {
        let SNError = validateRequiredField('serial number', formData.current.serial_number);
        let nameError = validateRequiredField('name', formData.current.name);

        setErrors({
            serial_number: SNError,
            name: nameError,
        });

        // Check for errors
        if (SNError || nameError) {
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

        try {
            const response = await fetch(assetEndPoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData.current)
            });

            if (!response.ok) throw new Error('Failed to submit form');

            toaster.create({
                title: "Asset added successfully",
                type: "success",
            });

            // Reset form
            formData.current = {
                icon_index: 0,
                serial_number: '',
                name: '',
                type: ''
            };

            setErrors({
                serial_number: '',
                name: ''
            });

        } catch (error) {
            toaster.create({
                title: "Connection Error Occurred",
                type: "error",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrors(prev => ({
            ...prev,
            [name]: validateRequiredField(name, value)
        }));

        formData.current[name] = value;

        console.log(formData.current);
    };

    // UI
    return (
        <>
            <Flex w="100%" h="100%" justify="center" align="center">
                <Container maxWidth="30em" background="blue.900" rounded="2xl">
                    <Stack gap="5" py="4em" as="form" onSubmit={handleSubmit}>
                        <Text>Add New Asset</Text>
                        <Field.Root
                            required
                            invalid={!!errors.serial_number}
                        >
                            <Field.Label>Serial Number</Field.Label>
                            <Input
                                name="serial_number"
                                value={formData.current.serial_number}
                                onChange={handleInputChange}
                                placeholder="Serial Number"
                                color="black"
                                background="whiteAlpha.800"
                                variant="solid" />
                            <Field.ErrorText>{errors.serial_number}</Field.ErrorText>
                        </Field.Root>
                        <Field.Root
                            required
                            invalid={!!errors.name}
                        >
                            <Field.Label>Name</Field.Label>
                            <Input
                                type="name"
                                name="name"
                                value={formData.current.name}
                                onChange={handleInputChange}
                                placeholder="Asset Name"
                                color="black"
                                background="whiteAlpha.800"
                                variant="solid" />
                            <Field.ErrorText>{errors.name}</Field.ErrorText>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Type</Field.Label>
                            <Input
                                name="type"
                                value={formData.current.type}
                                onChange={handleInputChange}
                                placeholder="Type"
                                color="black"
                                background="whiteAlpha.800"
                                variant="solid"
                            />
                            <Field.ErrorText>{errors.type}</Field.ErrorText>
                        </Field.Root>

                        <Button
                            background="whiteAlpha.800"
                            variant="solid"
                            mt="2em"
                            type="button"
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            loadingText="Adding..."
                        >
                            Add Asset
                        </Button>
                    </Stack>
                </Container>
            </Flex>
        </>
    )
}

export default Asset