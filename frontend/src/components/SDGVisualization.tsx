import { useState, useEffect } from "react";
import { Box, Heading, SimpleGrid, Select, Text } from "@chakra-ui/react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";

// Register Chart.js components
Chart.register(...registerables);

interface Indicator {
    code: string;
    title: string;
    value: number;
}

interface SDGData {
    indicators: Indicator[];
}

const SDGVisualization = () => {
    const [sdgData, setSdgData] = useState<SDGData | null>(null);
    const [selectedGoal, setSelectedGoal] = useState("1");

    // Mock data fallback
    const mockData: { [key: string]: SDGData } = {
        "1": {
            indicators: [
                { code: "1.1.1", title: "Extreme Poverty (%)", value: 8.4 },
                {
                    code: "1.2.1",
                    title: "Social Protection Coverage (%)",
                    value: 45.3,
                },
            ],
        },
        "3": {
            indicators: [
                {
                    code: "3.1.1",
                    title: "Maternal Mortality (per 100k)",
                    value: 211,
                },
                {
                    code: "3.2.1",
                    title: "Under-5 Mortality (per 1k)",
                    value: 38,
                },
            ],
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Try UN Stats API first
                const response = await axios.get(
                    `https://unstats.un.org/SDGAPI/v1/sdg/Goal/${selectedGoal}/Indicator/List`
                );
                setSdgData(response.data);
            } catch (error) {
                setSdgData(mockData[selectedGoal] || mockData["1"]);
            }
        };
        fetchData();
    }, [selectedGoal]);

    // Prepare chart data
    const chartData = {
        labels: sdgData?.indicators?.map((ind: Indicator) => ind.title) || [],
        datasets: [
            {
                label: "SDG Indicator Value",
                data:
                    sdgData?.indicators?.map((ind: Indicator) => ind.value) ||
                    [],
                backgroundColor: [
                    "#E5243B",
                    "#DDA63A",
                    "#4C9F38",
                    "#C5192D",
                    "#FF3A21",
                    "#26BDE2",
                    "#FCC30B",
                    "#A21942",
                    "#FD6925",
                    "#DD1367",
                    "#FD9D24",
                    "#BF8B2E",
                    "#3F7E44",
                    "#0A97D9",
                    "#56C02B",
                    "#00689D",
                    "#19486A",
                ].slice(0, sdgData?.indicators?.length || 3),
            },
        ],
    };

    return (
        <Box my={10} p={5} bg="white" borderRadius="lg" boxShadow="md">
            <Heading size="lg" mb={5}>
                SDG Progress Dashboard
            </Heading>

            <Select
                placeholder="Select SDG Goal"
                mb={5}
                onChange={(e) => setSelectedGoal(e.target.value)}
                value={selectedGoal}
            >
                {[...Array(17).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>
                        SDG {i + 1}
                    </option>
                ))}
            </Select>

            {!sdgData?.indicators?.length ? (
                <Text>No data available for this goal</Text>
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                    <Box p={3} borderWidth="1px" borderRadius="md">
                        <Heading size="sm" mb={3}>
                            Indicator Comparison
                        </Heading>
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { display: false },
                                },
                            }}
                        />
                    </Box>

                    <Box p={3} borderWidth="1px" borderRadius="md">
                        <Heading size="sm" mb={3}>
                            Progress Distribution
                        </Heading>
                        <Pie
                            data={chartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: "right" },
                                },
                            }}
                        />
                    </Box>
                </SimpleGrid>
            )}
        </Box>
    );
};

export default SDGVisualization;
