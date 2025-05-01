import { Link, Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import { useState } from "react";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <NavBarContainer {...props}>
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} />
      </NavBarContainer>
    </>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }) => {
  let isManager = (sessionStorage.getItem("role") == "MANAGER");

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "100%" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between"]}
        direction={["column", "row"]}
        pt="0"
      >
        <MenuItem to="/manager-home">Home</MenuItem>
        {isManager && <MenuItem to="/manager-home/add">Add Asset</MenuItem>}
        {isManager && <MenuItem to="/manager-home/staff">Manage Staff</MenuItem>}
        {isManager && <MenuItem to="/manager-home/history">History</MenuItem>}
        <MenuItem to="/sign-in" isLast>
          <Button
            onClick={clearSession}
            size="sm"
            rounded="md"
            color="blue.800"
            bg="white"
            _hover={{
              bg: "whiteAlpha.700"
            }}
          >
            Sign Out
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={0}
      p={0}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

const clearSession = () => {
  sessionStorage.clear();
}

export default NavBar;