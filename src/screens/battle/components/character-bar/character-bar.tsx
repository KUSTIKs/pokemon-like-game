import { CSSProperties, FC } from 'react';

import classes from './character-bar.module.css';

type Props = {
  name: string;
  maxHealth: number;
  health: number;
  style: CSSProperties;
};

const CharacterBar: FC<Props> = ({ name, health, maxHealth, style }) => {
  return (
    <div className={classes.wrapper} style={style}>
      <p className={classes.name}>{name}</p>
      <div className={classes.healthBar}>
        <div
          className={classes.healthValue}
          style={{ width: `${(health / maxHealth) * 100}%` }}
        />
      </div>
    </div>
  );
};

export { CharacterBar };
