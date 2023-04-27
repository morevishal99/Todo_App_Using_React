import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();


  const handleLogin = () => {
    if (email && password) {
      axios.post(`https://curious-crow-miniskirt.cyclic.app/auth/login`, {
        email: email,
        password: password,
      })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("username", (res.data.firstname))
            localStorage.setItem("useremail", (res.data.email))
            localStorage.setItem("login", true)
            localStorage.setItem("token", res.data.token)
            toast({
              title: `Welcome Back ${res.data.firstname.toUpperCase()}`,
              position: "top",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            navigate("/todo");
          } else {
            toast({
              title: `Wrong credentials`,
              position: "top",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          toast({
            title: `${err.response.data.message}`,
            position: "top",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    }
    setEmail("");
    setPassword("");

  };

  return (
    <>
      <Flex
        style={{
          backgroundImage: `url("https://media.istockphoto.com/id/494350434/vector/thin-shopping-retail-line-white-seamless-pattern.jpg?s=612x612&w=0&k=20&c=XZ5G1qrghaNlovv4kw5ZtHKPYYETR-LDqRAGafDs5LA=")`,
        }}
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Box
            rounded={"xl"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Welcome </Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                Login  to enjoy all <Link color={"blue.400"}>features</Link> ✌️
                </Text>
              </Stack>
              <FormControl id="email">

                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"yellow.400"}
                  color={"white"}
                  _hover={{
                    bg: "yellow.500",
                  }}
                  onClick={handleLogin}
                >
                  Log In
                </Button>
                <Link to="/">New User? Signup</Link>

              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}