import { useState } from "react";

const useElevatorRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeElevatorRequest = async (
    requestedFloor: number,
    setElevator: Function
  ) => {
    setLoading(true);

    try {
      const requestedFloorParam = new URLSearchParams({
        requestedFloor: requestedFloor.toString(),
      });

      const response = await fetch(
        `http://localhost:3001/api/requestElevator?${requestedFloorParam}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Förfrågan misslyckades: ${response.status}`);
      }

      const data = await response.json();
      setError(null);
      setElevator(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, makeElevatorRequest };
};

export default useElevatorRequest;
