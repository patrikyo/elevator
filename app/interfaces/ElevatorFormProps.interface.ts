export default interface ElevatorFormProps {
  requestedFloor: number | null;
  setRequestedFloor: React.Dispatch<React.SetStateAction<number | null>>;
  requestElevator: () => void;
}
