import { useState } from "react";
import "./App.css";

import { Flex } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Slider } from "@chakra-ui/react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Flex gap="20" direction="column" align="center">
                <Heading size="5xl">React + Vite + Chakra</Heading>
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <Slider.Root width="350px" defaultValue={[40]}>
                    <Slider.Control>
                        <Slider.Track>
                            <Slider.Range />
                        </Slider.Track>
                        <Slider.Thumbs />
                    </Slider.Control>
                </Slider.Root>
            </Flex>
        </>
    );
}

export default App;
