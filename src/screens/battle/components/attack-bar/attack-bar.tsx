import { FC, ReactNode } from 'react';

import classes from './attack-bar.module.css';

type Props = {
  buttons: ReactNode;
};

const AttackBar: FC<Props> = ({ buttons }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <p className={classes.title}>Boss Fight</p>
      </div>
      <div className={classes.buttons}>{buttons}</div>
    </div>
  );
};

export { AttackBar };
