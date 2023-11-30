import React, { useState } from 'react';
import ElevatorFormProps from '../../interfaces/ElevatorFormProps.interface';
import Error from '../error/Error';
import styles from './ElevatorForm.module.css'; 

const ElevatorForm: React.FC<ElevatorFormProps> = ({ requestedFloor, setRequestedFloor, requestElevator }) => {
  const [invalidRangeError, setInvalidRangeError] = useState<boolean>(false);

  const handleFloorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let userRequestedFloor = parseInt(e.target.value, 10);

    if (userRequestedFloor < 1 || userRequestedFloor > 20) {
      setInvalidRangeError(true);
    } else {
      setInvalidRangeError(false);
      setRequestedFloor(userRequestedFloor);
    }
  };

  const handleRequestElevator = () => {
    if (!invalidRangeError && requestedFloor) {
      requestElevator();
    } else if (!requestedFloor) {
      setInvalidRangeError(true);
    }
  };

  return (
    <form className={styles['elevator-form-container']} onSubmit={(e) => e.preventDefault()}>

      <label>
        Välj våning(1-20):
        <input
          className={styles['elevator-number-input']}
          type="number"
          onChange={handleFloorChange}
          aria-invalid={invalidRangeError ? 'true' : 'false'}
          aria-describedby={invalidRangeError ? 'error-message' : undefined}
        />
      </label>
      <button onClick={handleRequestElevator} className={styles['elevator-request-button']}>
        Hämta Hiss
      </button>

      {invalidRangeError && (
        <Error errorId="rangeError" errorMsg="Ange gärna ett värde mellan 1 and 20" />
      )}
    </form>
  );
};

export default ElevatorForm;