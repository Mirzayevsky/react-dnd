import { ListItem } from "@chakra-ui/react";
import React from "react";
import { useDrag } from "react-dnd";

const Player = ({ item, type, index, ondropPlayer }) => {
  const [{ isDraggble }, dragRef] = useDrag({
    type: type,
    item: () => ({ ...item, index }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && item) {
        ondropPlayer(item);
      }
    },
    collect: (monitor) =>(
      {
        isDragging:monitor.isDragging()
      }
    )
  });

  return (
    <ListItem
      p={"2"}
      borderRadius="md"
      boxShadow={"md"}
      mb="2"
      textAlign={"center"}
      ref={dragRef}
    >
      {item.name}
    </ListItem>
  );
};

export default Player;
