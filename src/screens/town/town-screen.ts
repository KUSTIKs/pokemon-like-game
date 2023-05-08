import { Game } from '@pokemon-game/models/game';
import { Sprite } from '@pokemon-game/models/sprite';
import { Screen } from '@pokemon-game/utils/screen/screen';
import { CollisionMap } from '@pokemon-game/models/collision-map';

import townMapImg from '@pokemon-game/assets/images/town-map.png';
import townMapForegroundImg from '@pokemon-game/assets/images/town-map-foreground.png';
import rawBoundaries from '@pokemon-game/data/boundaries.json';
import rawBattleZones from '@pokemon-game/data/battle-zones.json';
import { CollisionDetector } from '@pokemon-game/utils/collision-detector';
import { ScreenName } from '@pokemon-game/enums/screen-name';
import { appAudio } from '@pokemon-game/utils/app-audio';

const mapImage = new Image();
mapImage.src = townMapImg;

const mapForegroundImage = new Image();
mapForegroundImage.src = townMapForegroundImg;

class TownScreen implements Screen {
  map: Sprite;
  mapForeground: Sprite;
  bounderies: CollisionMap;
  battleZones: CollisionMap;

  constructor(public game: Game) {
    this.map = new Sprite({
      spritesheet: mapImage,
    });
    this.mapForeground = new Sprite({
      spritesheet: mapForegroundImage,
    });
    this.bounderies = new CollisionMap({
      rawCollisions: rawBoundaries,
      map: this.map,
    });
    this.battleZones = new CollisionMap({
      rawCollisions: rawBattleZones,
      map: this.map,
    });

    this.init();
  }

  private init() {
    this.game.player.shouldMoveHooks.push(this.shouldPlayerMove);
    appAudio.map.play();
  }

  destroy() {
    this.game.player.shouldMoveHooks.splice(
      this.game.player.shouldMoveHooks.indexOf(this.shouldPlayerMove),
      1
    );
    appAudio.map.stop();
  }

  render() {
    const { context } = this.game;

    this.map.draw(context);
    this.game.player.draw(context);

    this.bounderies.draw(context);
    this.battleZones.draw(context);

    this.mapForeground.draw(context);
  }

  update(deltaTime: number) {
    const { player } = this.game;

    player.update(deltaTime);

    // move map, center to player
    this.updateMap();

    this.bounderies.update(deltaTime);
    this.battleZones.update(deltaTime);
  }

  updateMap() {
    const { player, height, width } = this.game;

    const newX = player.mapX - width / 2;
    const newY = player.mapY - height / 2;

    this.map.x = newX;
    this.map.y = newY;
    this.mapForeground.x = newX;
    this.mapForeground.y = newY;
  }

  private shouldPlayerMove = (playerMapX: number, playerMapY: number) => {
    const isBoundaryCollision = this.checkBoundaryCollision(
      playerMapX,
      playerMapY
    );
    const isBattleZoneCollision = this.checkBattleZoneCollision(
      playerMapX,
      playerMapY
    );

    if (isBattleZoneCollision) {
      this.game.setScreen(ScreenName.BATTLE);
    }

    return !isBoundaryCollision;
  };

  private checkBoundaryCollision(playerMapX: number, playerMapY: number) {
    const { player } = this.game;

    const deltaX = playerMapX - player.mapX;
    const deltaY = playerMapY - player.mapY;

    const isCollision = this.bounderies.collisions.some((boundary) => {
      return CollisionDetector.circleRect(
        player.collisionX,
        player.collisionY,
        player.collisionRadius,
        boundary.mapX + deltaX,
        boundary.mapY + deltaY,
        boundary.width,
        boundary.height
      );
    });

    return isCollision;
  }

  private checkBattleZoneCollision(playerMapX: number, playerMapY: number) {
    const { player } = this.game;

    const deltaX = playerMapX - player.mapX;
    const deltaY = playerMapY - player.mapY;

    const isCollision = this.battleZones.collisions.some((zone) => {
      return CollisionDetector.circleRect(
        player.collisionX,
        player.collisionY,
        player.collisionRadius * 0.5,
        zone.mapX + deltaX,
        zone.mapY + deltaY,
        zone.width,
        zone.height
      );
    });

    return isCollision;
  }
}

export { TownScreen };
