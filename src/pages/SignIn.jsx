import { Text, Container, Field, Input, Stack, Portal, Select, createListCollection, Flex, Button, FieldRequiredIndicator } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input";
import { Link } from "react-router";

const SignIn = () => {
  return (
    <>
    <Flex w="100%" h="100%" justify="center" align="center">
    <Container maxWidth="30em" background="blue.900" rounded="2xl">
        <Stack gap="5" py="4em">
            <Field.Root required orientation="horizontal">
                <Field.Label>ID</Field.Label>
                <FieldRequiredIndicator />
                <Input placeholder="#####" color="black" background="whiteAlpha.800" variant="solid" />
                <Field.ErrorText>Invalid ID</Field.ErrorText>
            </Field.Root>
            <Field.Root required orientation="horizontal">
                <Field.Label>Password</Field.Label>
                <FieldRequiredIndicator />
                <PasswordInput placeholder="*****" color="black" background="whiteAlpha.800" variant="solid"/>
                <Field.ErrorText>This is an error text</Field.ErrorText>
            </Field.Root>
            <Field.Root required orientation="horizontal">
                <Field.Label>Type</Field.Label>
                <FieldRequiredIndicator />
                <Select.Root collection={staffTypes} variant="subtle">
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger background="whiteAlpha.800">
                            <Select.ValueText placeholder="Select Type" color="black"/>
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
            <Button background="whiteAlpha.800" variant="solid" mt="2em">
                Sign In
            </Button>
            <Container>
                Don't have an account?{" "}
                <Link to="/sign-up">
                    <Text as="span" color="blue.300" textDecoration="underline">
                        Create Account
                    </Text>
                </Link>
            </Container>
        </Stack>
    </Container>
    </Flex>
    </>
  )
}

const staffTypes = createListCollection({
    items: [
      { label: "Asset Manager", value: "manager" },
      { label: "Staff", value: "staff" }
    ],
})

export default SignIn