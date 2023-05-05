class CollisionDetector {
  // reference: https://www.jeffreythompson.org/collision-detection/circle-rect.php
  static circleRect(
    cx: number,
    cy: number,
    radius: number,
    rx: number,
    ry: number,
    rw: number,
    rh: number
  ) {
    // temporary variables to set edges for testing
    let testX = cx;
    let testY = cy;

    // which edge is closest?
    if (cx < rx) {
      testX = rx;
    } else if (cx > rx + rw) {
      testX = rx + rw;
    }

    if (cy < ry) {
      testY = ry;
    } else if (cy > ry + rh) {
      testY = ry + rh;
    }

    // get distance from closest edges
    let distX = cx - testX;
    let distY = cy - testY;
    let distance = Math.sqrt(distX ** 2 + distY ** 2);

    // if the distance is less than the radius, collision!
    const isCollision = distance <= radius;

    return isCollision;
  }
}

export { CollisionDetector };
