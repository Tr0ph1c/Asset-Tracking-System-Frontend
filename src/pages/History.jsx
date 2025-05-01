import { historyEndPoint } from '@/utilities/Helper';
import { Card, Container, Flex, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react'

const History = () => {
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(true);

    let [history, setHistory] = useState(null);

    useEffect(() => {
        fetch(historyEndPoint, { method: "GET" })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unexpected Error, error code: " + response.status);
                }
                return response.json();
            })
            .then((data) => {
                setHistory(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <Flex w="100%" h="100%" justifyContent="center" alignItems="center"><div>Loading history...</div></Flex>;
    if (error) return <Flex w="100%" h="100%" justifyContent="center" alignItems="center"><div>Error: {error}</div></Flex>;

    return (
        <>
            <Container height="80vh" overflow="scroll" mt="4em" w="100%">
                <VStack>
                    <Card.Root w="100%">
                        <Card.Body gap="1em" flexDirection="row" justifyContent="flex-start" color="orange.400">
                            <Card.Title w="10em">Staff ID</Card.Title>
                            <Card.Title w="10em">Staff Name</Card.Title>
                            <Card.Title w="10em">Asset ID</Card.Title>
                            <Card.Title w="10em">Asset Name</Card.Title>
                            <Card.Title w="10em">Assigned Date</Card.Title>
                            <Card.Title w="10em">Return Date</Card.Title>
                        </Card.Body>
                    </Card.Root>

                    {history && history.map((assignment) => (
                        <Card.Root key={assignment.id} w="100%">
                            <Card.Body gap="1em" flexDirection="row" justifyContent="flex-start">
                                <Card.Title w="10em">{assignment.employee.id}</Card.Title>
                                <Card.Title w="10em">{assignment.employee.name}</Card.Title>
                                <Card.Title w="10em">{assignment.asset.id}</Card.Title>
                                <Card.Title w="10em">{assignment.asset.name}</Card.Title>
                                <Card.Title w="10em">{assignment.assignedDate}</Card.Title>
                                <Card.Title w="10em">{assignment.returnDate ? assignment.returnDate : "-------------"}</Card.Title>
                            </Card.Body>
                        </Card.Root>
                    ))}
                </VStack>
            </Container>
        </>
    )
}

export default History