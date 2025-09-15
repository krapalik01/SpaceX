import { Card, Image, Text, Button, Group, Center, Flex } from '@mantine/core';
import '@mantine/core/styles.css';
import '../Modal.css';
import { useState } from 'react';
import Modal from './Modal';
import type { CardItemProps } from '../type';

function CardItem({ missionName, rocketName, image, details }: CardItemProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      {show && (
        <Modal onClose={() => setShow(false)}>
          <Flex direction="column" wrap="nowrap" gap="6px">
            <Text mb="10" size="lg">
              {missionName}
            </Text>

            <Center>
              <Image src={image} w="16em" />
            </Center>

            <Text data-testid="modal-content" mb="-6">
              Mission name:
            </Text>
            <Text c="dimmed">{missionName}</Text>

            <Text mb="-6">Rocket name:</Text>
            <Text c="dimmed">{rocketName}</Text>

            <Text mb="-6">Details:</Text>
            <Text c="dimmed">{details}</Text>
          </Flex>
        </Modal>
      )}

      <Card
        data-testid="card-item"
        shadow="sm"
        padding="lg"
        radius="md"
        w="220"
        withBorder
      >
        <Card.Section>
          <Center>
            <Image src={image} w="6em" alt="Norway" pt="32px" />
          </Center>
        </Card.Section>

        <Group justify="center" mt="md" mb="xs">
          <Text
            data-testid="mission-name"
            fw={500}
            style={{ minHeight: 48, textAlign: 'center' }}
          >
            {missionName}
          </Text>
        </Group>

        <Text data-testid="rocket-name" size="sm" c="dimmed">
          {rocketName}
        </Text>

        <Button
          onClick={() => setShow(true)}
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          aria-label="buttonMore"
        >
          See more
        </Button>
      </Card>
    </>
  );
}

export default CardItem;
