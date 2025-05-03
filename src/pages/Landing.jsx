import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router";

const Landing = () => {
    return (
        <>
            <Flex direction="column" gap="1em" justify="center" align="center" h="100%">
                <Box fontSize="5xl" animation="fade-down 1.5s">
                    Welcome To{" "}
                    <Text color="blue.400" fontWeight="bold" as="span">
                        Assetly
                    </Text>
                </Box>
                <Text color="gray.300" as="span" fontSize="2xl" animation="fade-down 1s">
                    All your asset managing needs in one place
                </Text>
                <Link to="/sign-in">
                    <Button w="20em" variant="solid" mt="5em" animation="fade-down 0.5s">
                        Get Started
                    </Button>
                </Link>
            </Flex>
        </>
    );
};

export default Landing;
