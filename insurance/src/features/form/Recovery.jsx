import React, { useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { regexObject } from '../../regex';
import { routingObj } from '../../route';
import { useNavigate } from 'react-router-dom';

const Recovery = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  const { emailRegex, passwordRegex } = regexObject;
  const { dynamicRouting } = routingObj;

  const isDisabled =
    [email, password].every(Boolean) && emailRegex.test(email) && passwordRegex.test(password);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (isDisabled) {
      dynamicRouting(navigate, '/');
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

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Enter new password
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            disabled={!isDisabled}
            onClick={handleSubmit}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Recovery;
