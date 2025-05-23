import { useRef, useState, useEffect } from "react";
import { Input, Grid, Card, Button, Tag, Flex, Select, Portal, createListCollection } from "@chakra-ui/react";
import { assetEndPoint, assignAssetEndPoint, leaveAssetEndPoint, maintainAssetEndPoint } from "@/utilities/Helper";
import { toaster } from "@/components/ui/toaster";
import { isConnected } from "@/utilities/Fallback";

const FALLBACK_DATA = [{ "id": 3, "name": "Projector", "type": "device", "serialNumber": null, "status": "AVAILABLE", "usedBy": null }, { "id": 5, "name": "Printer", "type": "device", "serialNumber": null, "status": "INUSE", "usedBy": 1 }, { "id": 7, "name": "Office", "type": "space", "serialNumber": null, "status": "INUSE", "usedBy": 1 }, { "id": 10, "name": "Desk", "type": "tool", "serialNumber": null, "status": "AVAILABLE", "usedBy": null }, { "id": 11, "name": "LaserJet", "type": "device", "serialNumber": null, "status": "MAINTENANCE", "usedBy": null }, { "id": 12, "name": "Office 2", "type": "space", "serialNumber": null, "status": "AVAILABLE", "usedBy": null }];

const STATUS_CODES = createListCollection({
  items: [
    { label: "All", color: "white", value: "ALL" },
    { label: "Available", color: "green", value: "AVAILABLE" },
    { label: "In Use", color: "yellow", value: "INUSE" },
    { label: "Under Maintenance", color: "red", value: "MAINTENANCE" },
  ],
})

const Home = () => {
  let isManager = (sessionStorage.getItem("role") == "MANAGER");
  let isConnected = (sessionStorage.getItem("connected") == "true");

  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(true);

  let searchTerm = useRef("");
  let filterValue = useRef("ALL");

  let [jsonAssets, setJsonAssets] = useState(null);
  let [assets, setAssets] = useState(null);

  useEffect(() => {
    console.log(isConnected);
    // Fallback
    if (!isConnected) {
      setJsonAssets(FALLBACK_DATA);
      setAssets(FALLBACK_DATA);
      setLoading(false);
    } else {
      fetch(assetEndPoint, { method: "GET" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Unexpected Error, error code: " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          if (!isManager) data = data.filter((asset) => asset.usedBy == sessionStorage.getItem("id"));
          setJsonAssets(data);
          setAssets(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, []);

  if (loading) return <Flex w="100%" h="100%" justifyContent="center" alignItems="center"><div>Loading assets...</div></Flex>;
  if (error) return <Flex w="100%" h="100%" justifyContent="center" alignItems="center"><div>Error: {error}</div></Flex>;

  const searchList = (e) => {
    searchTerm.current = e.target.value.toLowerCase();
    applyFiltersToList();
  }

  const filterList = (e) => {
    filterValue.current = e.target.value;
    applyFiltersToList();
  }

  const applyFiltersToList = () => {
    let filtered = jsonAssets.filter((asset) => asset.name.toLowerCase().includes(searchTerm.current));
    if (filterValue.current != "ALL")
      filtered = filtered.filter((asset) => asset.status == filterValue.current);

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

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)"
        }} gap="6" overflowY="scroll" h="75svh">
        {assets && assets.map((asset) => (
          <Card.Root key={asset.id} h="fit">
            <Card.Header>
              <Card.Title>{asset.name}</Card.Title>
              <Card.Description>{asset.type}</Card.Description>
            </Card.Header>
            <Card.Body gap="1em">
              <AssetButtons _isManager={isManager} _asset={asset} />
            </Card.Body>
            <Card.Footer justifyContent="space-between">
              <Tag.Root size="lg" colorPalette={STATUS_CODES.items.find((item) => item.value == asset.status).color}>
                <Tag.Label>{asset.status}</Tag.Label>
              </Tag.Root>
            </Card.Footer>
          </Card.Root>
        ))}
      </Grid>
    </>
  )
}

function AssetButtons({ _isManager, _asset }) {
  if (_isManager) {
    return (
      <>
        <Button size="xs" fontSize="sm" colorPalette="green"
          name={_asset.id} onClick={isConnected && assignAsset}>Assign</Button>
        <Button size="xs" fontSize="sm" colorPalette="teal"
          name={_asset.id} onClick={isConnected && maintainAsset}>Maintain</Button>
        <Button size="xs" fontSize="sm" colorPalette="red" variant="subtle"
          name={_asset.id} onClick={isConnected && deleteAsset}>Delete</Button>
      </>
    );
  } else {
    return <Button colorPalette="red" name={_asset.id} onClick={returnAsset}>Return</Button>;
  }
}

function returnAsset(e) {
  fetch(leaveAssetEndPoint + "?" + new URLSearchParams(
    { staffID: sessionStorage.getItem("id"), assetID: e.target.name }
  ), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((response) => {
    if (!response.ok) throw new Error("Network Error");

    return response.json();
  }).then((data) => {
    toaster.create({
      title: `Returned ${data.name} successfully`,
      type: "success",
    });
    // DIRTY HACK..
    window.location.reload();
    // a better way would probably be updating the
    // array on local and using a react effect hook
    // to update the UI.
  }).catch((error) => {
    console.log(error);
    toaster.create({
      title: error.message,
      type: "error",
    });
  })
}

function maintainAsset(e) {
  fetch(maintainAssetEndPoint + "?" + new URLSearchParams(
    { managerID: sessionStorage.getItem("id"), assetID: e.target.name }
  ), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((response) => {
    if (!response.ok) throw new Error("Network Error");

    return response.json();
  }).then((data) => {
    toaster.create({
      title: `${data.name} put into maintenance`,
      type: "success",
    });
    // DIRTY HACK..
    window.location.reload();
  }).catch((error) => {
    console.log(error);
    toaster.create({
      title: error.message,
      type: "error",
    });
  })
}

function deleteAsset(e) {
  fetch(assetEndPoint + "/" + e.target.name, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((response) => {
    if (!response.ok) throw new Error("Network Error");

    toaster.create({
      title: `Deleted successfully`,
      type: "success",
    });

    // DIRTY HACK..
    window.location.reload();
  }).catch((error) => {
    console.log(error);
    toaster.create({
      title: error.message,
      type: "error",
    });
  })
}

function assignAsset(e) {
  let _staffID = prompt("Enter staff member ID to assign to:");

  fetch(assignAssetEndPoint + "?" + new URLSearchParams(
    { staffID: _staffID, assetID: e.target.name }
  ), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((response) => {
    if (!response.ok) throw new Error("Network Error");

    return response.json();
  }).then((data) => {
    toaster.create({
      title: `Assigned ${data.name} successfully`,
      type: "success",
    });
    // DIRTY HACK
    window.location.reload();
  }).catch((error) => {
    console.log(error);
    toaster.create({
      title: error.message,
      type: "error",
    });
  })
}

export default Home