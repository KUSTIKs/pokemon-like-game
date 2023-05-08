import { FC } from 'react';

import classes from './attck-button.module.css';

type Props = {
  label: string;
  onClick?: () => void;
};

const AttackButton: FC<Props> = ({ label, onClick }) => {
  return (
    <button className={classes.button} onClick={onClick}>
      {label}
    </button>
  );
};

export { AttackButton };
