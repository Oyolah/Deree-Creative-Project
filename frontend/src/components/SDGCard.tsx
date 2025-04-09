// components/SDGCard.tsx
import { Box, Heading, Text, Flex, Badge } from "@chakra-ui/react";

interface SDGCardProps {
    goal: {
        id: number;
        title: string;
        color: string;
        description: string;
        example: string;
    };
}

const SDGCard = ({ goal }: SDGCardProps) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}
            bg={`${goal.color}10`} // 10% opacity of the SDG color
            borderTopWidth="4px"
            borderTopColor={goal.color}
            height="100%"
            transition="all 0.2s"
            _hover={{ transform: "translateY(-4px)", shadow: "md" }}
        >
            <Flex alignItems="center" mb={3}>
                <Badge
                    bg={goal.color}
                    color="white"
                    fontSize="xl"
                    px={3}
                    py={1}
                    borderRadius="full"
                >
                    {goal.id}
                </Badge>
                <Heading size="md" ml={3} color={goal.color}>
                    {goal.title}
                </Heading>
            </Flex>

            <Text mb={4}>{goal.description}</Text>

            <Box bg="white" p={3} borderRadius="md">
                <Text fontSize="sm" fontWeight="bold" mb={1}>
                    Campus Example:
                </Text>
                <Text fontSize="sm">{goal.example}</Text>
            </Box>
        </Box>
    );
};

export default SDGCard;
