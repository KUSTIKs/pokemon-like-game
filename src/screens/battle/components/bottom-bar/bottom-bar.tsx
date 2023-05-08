import { FC, ReactNode } from 'react';

import classes from './bottom-bar.module.css';

type Props = {
  children: ReactNode;
};

const BottomBar: FC<Props> = ({ children }) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export { BottomBar };
