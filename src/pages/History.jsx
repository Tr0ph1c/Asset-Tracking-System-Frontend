import { historyEndPoint } from '@/utilities/Helper';
import { Card, Container, Flex, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react'

const FALLBACK_DATA = [{ "id": 1, "assignedDate": "2025-05-01", "returnDate": "2025-05-01", "employee": { "id": 1, "name": "Ahmed", "role": "STAFF", "email": "ahmedstaffmember@gmail.com", "password": "1234" }, "asset": { "id": 3, "name": "Projector", "type": "device", "serialNumber": null, "status": "AVAILABLE", "usedBy": null } }, { "id": 2, "assignedDate": "2025-05-01", "returnDate": "2025-05-01", "employee": { "id": 1, "name": "Ahmed", "role": "STAFF", "email": "ahmedstaffmember@gmail.com", "password": "1234" }, "asset": { "id": 5, "name": "Printer", "type": "device", "serialNumber": null, "status": "INUSE", "usedBy": 1 } }, { "id": 3, "assignedDate": "2025-05-01", "returnDate": "2025-05-01", "employee": { "id": 1, "name": "Ahmed", "role": "STAFF", "email": "ahmedstaffmember@gmail.com", "password": "1234" }, "asset": { "id": 3, "name": "Projector", "type": "device", "serialNumber": null, "status": "AVAILABLE", "usedBy": null } }, { "id": 4, "assignedDate": "2025-05-01", "returnDate": "2025-05-01", "employee": { "id": 1, "name": "Ahmed", "role": "STAFF", "email": "ahmedstaffmember@gmail.com", "password": "1234" }, "asset": { "id": 5, "name": "Printer", "type": "device", "serialNumber": null, "status": "INUSE", "usedBy": 1 } }, { "id": 5, "assignedDate": "2025-05-01", "returnDate": null, "employee": { "id": 1, "name": "Ahmed", "role": "STAFF", "email": "ahmedstaffmember@gmail.com", "password": "1234" }, "asset": { "id": 5, "name": "Printer", "type": "device", "serialNumber": null, "status": "INUSE", "usedBy": 1 } }, { "id": 6, "assignedDate": "2025-05-02", "returnDate": "2025-05-02", "employee": { "id": 1, "name": "Ahmed", "role": "STAFF", "email": "ahmedstaffmember@gmail.com", "password": "1234" }, "asset": { "id": 3, "name": "Projector", "type": "device", "serialNumber": null, "status": "AVAILABLE", "usedBy": null } }, { "id": 7, "assignedDate": "2025-05-03", "returnDate": null, "employee": { "id": 1, "name": "Ahmed", "role": "STAFF", "email": "ahmedstaffmember@gmail.com", "password": "1234" }, "asset": { "id": 7, "name": "Office", "type": "space", "serialNumber": null, "status": "INUSE", "usedBy": 1 } }];

const History = () => {
    let isConnected = (sessionStorage.getItem("connected") == "true");

    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(true);

    let [history, setHistory] = useState(null);

    useEffect(() => {
        if (!isConnected) {
            setHistory(FALLBACK_DATA);
            setLoading(false);
        } else {
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
        }
    }, []);

    if (loading) return <Flex w="100%" h="100%" justifyContent="center" alignItems="center"><div>Loading history...</div></Flex>;
    if (error) return <Flex w="100%" h="100%" justifyContent="center" alignItems="center"><div>Error: {error}</div></Flex>;

    return (
        <>
            <Container overflowY="scroll" h="75svh" mt="4em" p="0" w="100%">
                <VStack>
                    <Card.Root w="75svw" size={{ base: "xsm", md: "md" }} fontSize={{ base: "10px", md: "20px" }}>
                        <Card.Body gap="1em" flexDirection="row" justifyContent="center" color="orange.400">
                            <Card.Title w="2em">ID</Card.Title>
                            <Card.Title w="10em">Staff Name</Card.Title>
                            <Card.Title w="2em">ID</Card.Title>
                            <Card.Title w="10em">Asset Name</Card.Title>
                            <Card.Title w="10em">Assigned Date</Card.Title>
                            <Card.Title w="10em">Return Date</Card.Title>
                        </Card.Body>
                    </Card.Root>

                    {history && history.map((assignment) => (
                        <Card.Root key={assignment.id} w="75svw" size={{ base: "xsm", md: "md" }} fontSize={{ base: "10px", md: "20px" }}>
                            <Card.Body gap="1em" flexDirection="row" justifyContent="center">
                                <Card.Title w="2em">{assignment.employee.id}</Card.Title>
                                <Card.Title w="10em">{assignment.employee.name}</Card.Title>
                                <Card.Title w="2em">{assignment.asset.id}</Card.Title>
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