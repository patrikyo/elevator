import ErrorProps from "../../interfaces/ErrorProps.interface";
import React, { FC } from "react";
import style from './Error.module.css'

const Error: FC<ErrorProps> = ({ errorId, errorMsg }) => {
  return (
    <>
      <p id={errorId} className={style['error-message']}>
        {errorMsg}
      </p>
    </>
  );
};

export default Error;