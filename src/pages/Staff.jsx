import { Text, Container, Field, Input, Stack, Flex, Button, FieldRequiredIndicator } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input";

const Staff = () => {
    return (
      <Flex w="100%" h="100%" justify="center" align="center">
          <Container maxWidth="30em" background="blue.900" rounded="2xl">
              <Stack gap="5" py="4em">
                <Text>Add Staff Member</Text>
                  <Field.Root required orientation="horizontal">
                      <Field.Label>Name</Field.Label>
                      <FieldRequiredIndicator />
                      <Input placeholder="Staff Member Name" color="black" background="whiteAlpha.800" variant="solid" />
                      <Field.ErrorText>Invalid ID</Field.ErrorText>
                  </Field.Root>
                  <Field.Root required orientation="horizontal">
                      <Field.Label>Password</Field.Label>
                      <FieldRequiredIndicator />
                      <PasswordInput placeholder="Password" color="black" background="whiteAlpha.800" variant="solid"/>
                      <Field.ErrorText>Password</Field.ErrorText>
                  </Field.Root>
                  
                  <Button background="whiteAlpha.800" variant="solid" mt="2em">
                      Add Member
                  </Button>
              </Stack>
          </Container>
          </Flex>
    )
  }
  
  export default Staff