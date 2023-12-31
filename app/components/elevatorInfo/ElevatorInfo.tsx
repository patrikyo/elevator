import React from 'react';
import ElevatorInfoProps from '../../interfaces/ElevatorInfoProps.interface';
import { DirectionEnum } from '../../constants/direction.enum';
import Image from 'next/image';
import styles from './ElevatorInfo.module.css';
import useUpdateElevators from '../../hooks/useUpdateElevators';
import Error from '../error/Error';

const ElevatorInfo: React.FC<ElevatorInfoProps> = ({ elevator }) => {
  const { floorCount, elevatorDirection, isAtDestination, error } = useUpdateElevators(elevator);

  const altText = elevatorDirection === DirectionEnum.UP ? 'Hissen åker upp' : 'Hissen åker ner';

  return (
    <div className={styles['elevator-info-container']} role="region" aria-live="assertive">
      {!isAtDestination && (
        <>
          <span className={styles['elevator-direction']}>
            <Image src={elevatorDirection === DirectionEnum.UP ? '/north.svg' : '/south.svg'} alt={altText} width={200} height={50} priority />
          </span>
          <span className={styles['elevator-floor']}>
            {floorCount} destination {elevator.destination}
          </span>
        </>
      )}
      {isAtDestination && (
        <>
          <span className={styles['elevator-direction']}>
            <Image src={'/elevator.svg'} alt="Hissen är stillastående" width={200} height={50} priority />
          </span>
          <span className={styles['elevator-floor']}>
            Framme, i våning {elevator.destination}
          </span>
        </>
      )}
      {error && <Error errorId="technicalError" errorMsg={`Tyvärr inträffade ett tekniskt fel "${error}"`} />}
    </div>
  );
};

export default ElevatorInfo;