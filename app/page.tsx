'use client'
import React, { useState } from 'react';
import ElevatorForm from './components/elevatorForm/ElevatorForm';
import ElevatorInfo from './components/elevatorInfo/ElevatorInfo';
import Error from './components/error/Error';
import styles from './page.module.css';
import Elevator from './interfaces/Elevator.interface';
import useElevatorRequest from './hooks/useElevatorRequest ';

const Home: React.FC = () => {
  const [requestedFloor, setRequestedFloor] = useState<number | null>(null);
  const [elevator, setElevator] = useState<Elevator | null>(null);

  const { loading, error, makeElevatorRequest } = useElevatorRequest();

  const requestElevator = async () => {
    if (requestedFloor !== null) {
      makeElevatorRequest(requestedFloor, setElevator);
    }
  };

  return (
    <main className={styles['elevator-system-container']}>
      <h1>Hiss system</h1>
      <section className={styles['elevator-system-section']}>
        <h2>Hisskontroll</h2>
        <ElevatorForm
          requestedFloor={requestedFloor}
          setRequestedFloor={setRequestedFloor}
          requestElevator={requestElevator}
        />
      </section>

      <section className={styles['elevator-system-section']} role="status" aria-live="polite">
        <h2>{elevator ? `Hiss ${elevator.name}` : 'Ingen hiss vald'}</h2>
        {elevator && <ElevatorInfo elevator={elevator} />}
        {loading && <p>Laddar...</p>}
        {error && <Error errorId="technicalError" errorMsg={ `Tyvärr inträffade ett tekniskt fel "${error}"`} />}
      </section>
    </main>
  );
};

export default Home;