const Util = {
  direction (pos) {
    var norm = Util.norm(pos);
    return Util.scale(pos, 1 / norm);
  },
  // Find distance between two points.
  distance (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  // Find the length of the vector.
  normal (vec) {
    return Util.dist([0, 0], vec);
  },
  // Return a randomly oriented vector with the given length.
  randomVector (length) {
    var deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  wrap (coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  },
  sleep (milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  },
  addHexColor(c1, c2) {
    c1 = c1.split("");
    c2 = c2.split("");
    endResult = [];
    c1.forEach((it, idx) => {
      let inner = parseInt(it, 16);
      inner -= parseInt(c2[idx], 16);
      endResult.push(Math.abs(inner).toString(16));
    });
    return endResult.join("");
  }
}

module.exports = Util;
