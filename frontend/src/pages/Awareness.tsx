// pages/Awareness.tsx
import { SimpleGrid, Heading, Container } from "@chakra-ui/react";
import SDGCard from "../components/SDGCard";
import { SDG_DATA } from "../data/sdgs";

const AwarenessPage = () => {
    return (
        <Container maxW="container.xl" py={8}>
            <Heading mb={8} textAlign="center" color="green.700">
                The 17 Sustainable Development Goals
            </Heading>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
                {SDG_DATA.map((goal) => (
                    <SDGCard key={goal.id} goal={goal} />
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default AwarenessPage;
