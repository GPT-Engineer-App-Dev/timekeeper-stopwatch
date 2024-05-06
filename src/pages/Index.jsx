import React, { useState, useEffect } from 'react';
import { Container, VStack, Button, Text } from '@chakra-ui/react';

const Index = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const formatTime = (time) => {
    const milliseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
    const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
    const hours = ("0" + Math.floor(time / 3600000)).slice(-2);
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontFamily="monospace">{formatTime(time)}</Text>
        <Button colorScheme="blue" onClick={() => setTimerOn(!timerOn)}>
          {timerOn ? 'Stop' : 'Start'}
        </Button>
        <Button colorScheme="red" onClick={() => {
          setTime(0);
          setTimerOn(false);
        }}>
          Reset
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;