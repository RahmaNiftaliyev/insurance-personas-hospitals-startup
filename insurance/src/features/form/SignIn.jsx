import React, { useState } from 'react';
import { regexObject } from '../../regex';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { auth, googleAuthProvider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  const { emailRegex, passwordRegex } = regexObject;

  const isDisabled =
    [email, password].every(Boolean) && emailRegex.test(email) && passwordRegex.test(password);

  const handleSubmit = () => {
    if (isDisabled) {
      alert('Form Submitted');
    } else if (!emailRegex.test(email) && !passwordRegex.test(password)) {
      setError({ email: 'Invalid Email', password: 'Invalid Password' });
    } else if (!emailRegex.test(email)) {
      setError({ email: 'Invalid Email' });
    } else if (!passwordRegex.test(password)) {
      setError({ password: 'Invalid Password' });
    }

    setEmail('');
    setPassword('');
    setTimeout(() => setError({}), 3000);
  };

  auth.useDeviceLanguage();

  // firebase login with google
  const continueWithGoogle = () => {
    return signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = googleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = googleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'} href="/forgotpassword">
                  Forgot password?
                </Link>
              </Stack>
              <Button
                disabled={!isDisabled}
                onClick={handleSubmit}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
              <Button
                onClick={continueWithGoogle}
                bg={'white'}
                color={'black'}
                _hover={{
                  bg: 'white.800',
                }}
              >
                Continue with Google &nbsp;
                <FcGoogle size="1.5rem" />
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                New user? &nbsp;
                <Link color={'blue.400'} href="/signup">
                  Create an account
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignIn;
