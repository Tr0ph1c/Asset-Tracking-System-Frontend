import { useRef, useState, useEffect } from "react";
import { Input, Grid, Card, Button, Tag, Flex, Select, Portal, createListCollection } from "@chakra-ui/react";

const STATUS_CODES = createListCollection({
  items: [
    { label: "All", color: "white", value: "ALL" },
    { label: "Available", color: "green", value: "AVAILABLE" },
    { label: "In Use", color: "yellow", value: "INUSE" },
    { label: "Under Maintenance", color: "red", value: "MAINTENANCE" },
  ],
})

const Home = () => {
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(true);

  let searchTerm = useRef("");
  let filterValue = useRef("");

  let [jsonAssets, setJsonAssets] = useState(null);
  let [assets, setAssets] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/asset", { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setJsonAssets(data);
        setAssets(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Flex w="100%" h="100%" justifyContent="center" alignItems="center"><div>Loading assets...</div></Flex>;
  if (error) return <Flex w="100%" h="100%" justifyContent="center" alignItems="center"><div>Error: {error}</div></Flex>;

  const searchList = (e) => {
    searchTerm.current = e.target.value.toLowerCase();
    applyFiltersToList();
  }

  const filterList = (e) => {
    filterValue.current = e.target.value;
    console.log(filterValue);
    //applyFiltersToList();
  }

  const applyFiltersToList = () => {
    let filtered = jsonAssets.filter((asset) => asset.name.toLowerCase().includes(searchTerm.current));
    //filtered = filtered.filter((asset) => asset.status == filterValue.current);

    setAssets(filtered);
  }

  return (
    <>
      <Flex justifyContent="flex-start" alignItems="center" gap="3em">
        <Input
          my="2em"
          onChange={searchList}
          variant="solid"
          color="black"
          background="whiteAlpha.800"
          placeholder="Search" />

        <Select.Root collection={STATUS_CODES} size="md" width="320px" variant="subtle" onChange={filterList}>
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger background="whiteAlpha.800" color="black">
              <Select.ValueText placeholder="Filter" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {STATUS_CODES.items.map((status) => (
                  <Select.Item item={status} key={status.value}>
                    {status.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Flex>

      <Grid templateColumns="repeat(4, 1fr)" gap="6">
        {assets && assets.map((asset) => (
          <Card.Root key={asset.id}>
            <Card.Header>
              <Card.Title>{asset.name}</Card.Title>
            </Card.Header>
            <Card.Body>
            </Card.Body>
            <Card.Footer justifyContent="space-between">
              <Tag.Root size="lg" colorPalette="green">
                <Tag.Label>{asset.status}</Tag.Label>
              </Tag.Root>
              <Button>View</Button>
            </Card.Footer>
          </Card.Root>
        ))}
      </Grid>
    </>
  )
}

export default Home