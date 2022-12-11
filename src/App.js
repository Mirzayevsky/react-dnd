import {
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDrop } from "react-dnd";
import "./App.css";
import Player from "./components/player";
function App() {
  const [players, setPlayers] = useState([
    { name: "Player1" },
    { name: "Player2" },
    { name: "Player3" },
    { name: "Player4" },
    { name: "Player5" },
  ]);
  const [team, setTeam] = useState([]);

  const [{ isOver }, addToTeamRef] = useDrop({
    accept: "player",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });
  const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
    accept: "team",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const movePlayerToTeam = (item) => {
    console.log(item);
    setPlayers((prev)=> prev.filter((_,i) => i !== item.index))
    setTeam((prev) => [...prev,item])
  };
  const removePlayerFromTeam = (item) => {
    console.log(item);
    setTeam((prev)=> prev.filter((_,i) => i !== item.index))
    setPlayers((prev) => [...prev,item])
  };
  return (
    <Container maxW={"800px"}>
      <Flex justify={"space-between"} height={"90vh"} align={"center"}>
        <Stack width={"300px"}>
          <Heading fontSize={"3xl"} color={"yellow.800"} textAlign={"center"}>
            Players
          </Heading>
          <List p="4px" minH={"70vh"} boxShadow={"xl"} borderRadius={"md"} ref={removeFromTeamRef}>
            {players.map((item, i) => (
              <Player
                key={item.name}
                item={item}
                type={"player"}
                index={i}
                ondropPlayer={movePlayerToTeam}
              />
            ))}
          </List>
        </Stack>
        <Stack width={"300px"}>
          <Heading fontSize={"3xl"} color={"teal.800"} textAlign={"center"}>
            Players
          </Heading>
          <List p="4px" minH={"70vh"} boxShadow="xl" borderRadius={"md"} ref={addToTeamRef}>
          {team.map((item, i) => (
              <Player
                key={item.name}
                item={item}
                type={"team"}
                index={i}
                ondropPlayer={removePlayerFromTeam}
              />
            ))}
          </List>
        </Stack>
      </Flex>
    </Container>
  );
}

export default App;
