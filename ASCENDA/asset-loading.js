Art.load = async function (onProgress = () => {}) {
  const entries = [
    ['right', 'sprites/player/player-right.webp', 'sprites/player/player-right.png'],
    ['vertical', 'sprites/player/player-vertical.webp', 'sprites/player/player-vertical.png'],
    ['idle', 'sprites/player/player-idle.webp', 'sprites/player/player-idle.png'],
    ['hair', 'sprites/hair/hair-fixed.webp', 'sprites/hair/hair-fixed.png'],
    ['heads', 'base/head-base.png'],
    ...['recepcao', 'rh', 'financeiro', 'comercial', 'soc', 'intel', 'infra', 'grc', 'appsec', 'red', 'cloud', 'direcao', 'mentor']
      .map(id => [`npc-${id}`, `sprites/npc/${id}.png`])
  ];
  this.total = entries.length + MAPS.length;
  this.loaded = 0;
  this.mapPromises = new Map();
  await Promise.all([
    ...entries.map(async entry => {
      const [id, preferred, fallback] = entry;
      try {
        this.images[id] = await loadImage(preferred);
      } catch (error) {
        if (!fallback) throw error;
        console.warn(`WebP indisponível para ${id}; usando o PNG de fallback.`, error);
        this.images[id] = await loadImage(fallback);
      }
      onProgress(++this.loaded, this.total);
    }),
    ...MAPS.map((map, floor) => this.loadMap(floor).then(() => onProgress(++this.loaded, this.total)))
  ]);
  this.ready = true;
};

Art.loadMap = function (floor) {
  const map = MAPS[floor];
  if (!map) return Promise.reject(new RangeError('Andar inválido: ' + floor));
  if (this.images[map.asset]) return Promise.resolve(this.images[map.asset]);
  this.mapPromises ??= new Map();
  if (!this.mapPromises.has(map.asset)) {
    const promise = loadImage(`mapas/${map.asset}.webp`)
      .catch(error => {
        console.warn(`WebP indisponível para ${map.asset}; usando o PNG de fallback.`, error);
        return loadImage(`mapas/${map.asset}.png`);
      })
      .then(image => {
        this.images[map.asset] = image;
        this.mapPromises.delete(map.asset);
        return image;
      }, error => {
        this.mapPromises.delete(map.asset);
        throw error;
      });
    this.mapPromises.set(map.asset, promise);
  }
  return this.mapPromises.get(map.asset);
};
