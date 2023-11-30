import { useEffect, useState, useCallback } from "react";
import Elevator from "../interfaces/Elevator.interface";

const useUpdateElevators = (elevator: Elevator) => {
  const [floorCount, setFloorCount] = useState(
    elevator ? elevator.currentFloor : 1
  );
  const [error, setError] = useState<string | null>(null);

  const updateElevatorOnDestination = useCallback(async () => {
    if (!elevator || floorCount !== elevator.destination) {
      return;
    }

    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: elevator.id }),
      };

      const response = await fetch(
        "http://localhost:3001/api/updateElevators",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`Förfrågan misslyckades: ${response.status}`);
      }
    } catch (error: any) {
      setError(error.message);
    }
  }, [elevator, floorCount]);

  useEffect(() => {
    let myInterval: NodeJS.Timeout;

    if (elevator) {
      myInterval = setInterval(() => {
        if (floorCount < elevator.destination) {
          setFloorCount((prevCount) => prevCount + 1);
        } else if (floorCount > elevator.destination) {
          setFloorCount((prevCount) => prevCount - 1);
        }
      }, 2000);
    }

    return () => {
      clearInterval(myInterval);
    };
  }, [elevator, floorCount]);

  useEffect(() => {
    if (elevator) {
      setFloorCount(elevator.currentFloor);
    }
  }, [elevator]);

  useEffect(() => {
    updateElevatorOnDestination();
  }, [updateElevatorOnDestination]);

  return {
    floorCount,
    elevatorDirection: elevator ? elevator.direction : null,
    isAtDestination: elevator ? floorCount === elevator.destination : false,
    error,
    updateElevatorOnDestination,
  };
};

export default useUpdateElevators;
