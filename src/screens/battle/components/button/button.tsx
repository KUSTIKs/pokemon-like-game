import { CSSProperties, FC } from 'react';

import classes from './button.module.css';

type Props = {
  children: string;
  onClick?: () => void;
  style?: CSSProperties;
};

const Button: FC<Props> = ({ children, onClick, style }) => {
  return (
    <button className={classes.button} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export { Button };
