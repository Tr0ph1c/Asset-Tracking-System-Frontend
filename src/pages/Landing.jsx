import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router";

const Landing = () => {
    return (
        <>
        <Flex direction="column" gap="5em" justify="center" align="center" h="100%">
            <Box fontSize="5xl">
                Welcome To{" "}
                <Text color="blue.400" fontWeight="bold" as="span"> 
                    Assetly
                </Text>
            </Box>
            <Flex gap="2em" direction={{base: "column", md: "row"}}>
                <Link to="/sign-in">
                    <Button w="15em" variant="solid">
                        Sign In
                    </Button>
                </Link>
                <Link to="/sign-up">
                    <Button w="15em" variant="outline">
                        Sign Up
                    </Button>
                </Link>
            </Flex>
        </Flex>
        </>
    );
};

export default Landing;
