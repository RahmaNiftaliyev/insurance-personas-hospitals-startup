import React from 'react';
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { regexObject } from '../../regex';

const ForgotPassword = () => {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const { emailRegex } = regexObject;
  const isDisabled = emailRegex.test(email);

  const handleSubmit = () => {
    if (isDisabled) {
      alert('Form Submitted');
    } else if (!emailRegex.test(email)) {
      setError('Invalid Email');
    }
    setEmail('');
    setTimeout(() => setError(''), 3000);
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
          Forgot your password?
        </Heading>
        <Text fontSize={{ base: 'sm', sm: 'md' }} color={useColorModeValue('gray.800', 'gray.400')}>
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            placeholder={error && error.length > 0 ? error : 'your-email@example.com'}
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ForgotPassword;
