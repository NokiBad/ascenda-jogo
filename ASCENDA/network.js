(function () {
  let networkRole = 'none';
  let roomCode = '';
  let reconnecting = false;
  let peerReady = false;
  let connectionTimer = null;
  let disconnectTimer = null;

  function clearNetworkTimers() {
    clearTimeout(joiningTimer);
    clearTimeout(connectionTimer);
    clearTimeout(disconnectTimer);
    clearInterval(networkTimer);
    joiningTimer = connectionTimer = disconnectTimer = networkTimer = null;
  }

  function clearRemoteState() {
    connections.forEach(connection => connection.close());
    connections.clear();
    host?.close();
    host = null;
    others.clear();
    remoteVisuals.clear();
    status('● Modo individual');
  }

  function failedConnection(message) {
    clearNetworkTimers();
    clearRemoteState();
    const oldPeer = peer;
    peer = null;
    isHost = false;
    reconnecting = false;
    peerReady = false;
    if (oldPeer && !oldPeer.destroyed) oldPeer.destroy();
    if (networkRole === 'host') {
      roomCode = '';
      roomLink = '';
    }
    networkFail(message);
  }

  function connectToRoom() {
    if (!peer || peer.destroyed || !roomCode || host?.open) return;
    host?.close();
    host = peer.connect(roomCode, { reliable: true });
    const connection = host;
    connectionTimer = setTimeout(() => {
      if (host === connection && !connection.open) {
        connectionTimer = null;
        host = null;
        connection.close();
        networkFail('A sala não respondeu. Tente entrar novamente ou peça ao apresentador para recriá-la.');
      }
    }, 18000);
    connection.on('open', () => {
      if (host !== connection) return;
      clearTimeout(connectionTimer);
      connectionTimer = null;
      status('● Conectado à turma');
      sendState();
      toast('Você entrou na sala da turma!');
    });
    connection.on('data', data => {
      if (host !== connection) return;
      if (ApoloProtocol.isFullPacket(data)) {
        clearTimeout(connectionTimer);
        connectionTimer = null;
        host = null;
        networkFail('Sala cheia. Peça ao apresentador para criar outra sala ou jogue individualmente.');
        connection.close();
        return;
      }
      if (!ApoloProtocol.validWorldPacket(data, validPlayer)) return;
      others.clear();
      data.players.slice(0, 40).filter(player => player.id !== me.id)
        .forEach(player => others.set(player.id, player));
      for (const id of remoteVisuals.keys()) if (!others.has(id)) remoteVisuals.delete(id);
      status('● Conectado à turma');
    });
    connection.on('close', () => {
      if (host !== connection) return;
      clearTimeout(connectionTimer);
      connectionTimer = null;
      host = null;
      others.clear();
      remoteVisuals.clear();
      status('● Sala desconectada');
      networkFail('A conexão com a sala caiu. Tente entrar novamente pelo mesmo link.');
    });
    connection.on('error', () => {
      if (host !== connection) return;
      clearTimeout(connectionTimer);
      connectionTimer = null;
      host = null;
      others.clear();
      remoteVisuals.clear();
      connection.close();
      networkFail('Falha na conexão com a sala. Tente entrar novamente pelo mesmo link.');
    });
  }

  function setupPeer(onOpen) {
    if (location.protocol === 'file:') {
      networkFail('Publique o jogo em HTTPS para criar uma sala. O modo individual funciona aqui.');
      return;
    }
    if (!window.Peer) {
      networkFail('Serviço de sala indisponível. Continue no modo individual.');
      return;
    }

    peer=new Peer(undefined,{debug:0,config:{iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'}]}});
    const instance = peer;
    peerReady = false;
    reconnecting = false;
    joiningTimer = setTimeout(() => {
      if (peer === instance && !peerReady) failedConnection('A conexão demorou. Verifique a rede e tente novamente.');
    }, 18000);

    instance.on('open', id => {
      if (peer !== instance) return;
      clearTimeout(joiningTimer);
      joiningTimer = null;
      if (!peerReady) {
        peerReady = true;
        onOpen(id);
        return;
      }
      reconnecting = false;
      clearTimeout(disconnectTimer);
      disconnectTimer = null;
      status(networkRole === 'host' ? '● Sala ativa · apresentador' : '● Sinalização reconectada');
      if (networkRole === 'guest' && !host?.open) connectToRoom();
      else sendState();
      toast('Conexão com o serviço de sala restabelecida.');
    });
    instance.on('disconnected', () => {
      if (peer !== instance || instance.destroyed) return;
      const message = 'Reconectando ao serviço de sala…';
      status('● ' + message);
      const roomMessage = $('#room-message');
      if (roomMessage) roomMessage.textContent = message;
      if (reconnecting) return;
      reconnecting = true;
      disconnectTimer = setTimeout(() => {
        if (peer === instance && reconnecting) networkFail('O serviço de sala não reconectou. Recrie a sala ou entre novamente pelo link.');
      }, 15000);
      try {
        instance.reconnect();
      } catch (error) {
        console.error('A reconexão PeerJS não pôde ser iniciada.', error);
        networkFail('A sala perdeu a sinalização. Recrie a sala ou entre novamente pelo link.');
      }
    });
    instance.on('error', error => {
      if (peer !== instance) return;
      console.error('Falha na conexão PeerJS.', error);
      failedConnection('A conexão com a sala falhou. O apresentador pode recriar a sala; os demais podem entrar novamente pelo link.');
    });
    instance.on('close', () => {
      if (peer !== instance) return;
      clearNetworkTimers();
      clearRemoteState();
      networkFail('A conexão foi encerrada. Recrie a sala ou entre novamente pelo link.');
    });
  }

  function cleanupNetwork() {
    clearNetworkTimers();
    clearRemoteState();
    const oldPeer = peer;
    peer = null;
    isHost = false;
    networkRole = 'none';
    roomLink = '';
    roomCode = '';
    reconnecting = false;
    peerReady = false;
    if (oldPeer && !oldPeer.destroyed) oldPeer.destroy();
  }

  function createRoom() {
    cleanupNetwork();
    status('● Criando sala…');
    setupPeer(id => {
      isHost = true;
      networkRole = 'host';
      roomCode = id;
      roomLink = `${location.origin}${location.pathname}?sala=${encodeURIComponent(id)}`;
      showRoom();
      peer.on('connection', connection => {
        if (connections.size >= 39) {
          connection.on('open', () => {
            connection.send({ type: 'full' });
            setTimeout(() => connection.close(), 500);
          });
          return;
        }
        connections.set(connection.peer, connection);
        connection.on('open', sendState);
        connection.on('data', data => {
          if (!ApoloProtocol.validPlayerPacket(data, validPlayer)) return;
          const participant = { ...data.player, id: connection.peer };
          others.set(connection.peer, participant);
          status('● Sala ativa · apresentador');
        });
        const removeParticipant = () => {
          if (connections.get(connection.peer) !== connection) return;
          connections.delete(connection.peer);
          others.delete(connection.peer);
          remoteVisuals.delete(connection.peer);
          status('● Sala ativa · apresentador');
          connection.close();
          sendState();
        };
        connection.on('close', removeParticipant);
        connection.on('error', removeParticipant);
      });
      networkTimer = setInterval(sendState, 150);
      status('● Você é o apresentador');
    });
  }

  function joinRoom(id) {
    if (!id || id.length > 150) {
      networkFail('O código da sala não é válido.');
      return;
    }
    cleanupNetwork();
    roomCode = id;
    networkRole = 'guest';
    roomLink = `${location.origin}${location.pathname}?sala=${encodeURIComponent(id)}`;
    status('● Entrando na sala…');
    setupPeer(() => connectToRoom());
  }

  function showRoom() {
    const hostStillOpen = networkRole === 'host' && isHost && peer && !peer.destroyed;
    const reconnectAction = roomCode && networkRole === 'guest'
      ? '<button id="rejoin-room">Tentar entrar novamente no mesmo link</button>'
      : '';
    modal(`<span class="eyebrow">APRENDA COM A SUA TURMA</span><h2>Sala da turma.</h2><p>Veja seus colegas explorando a ASCENDA. Cada pessoa tem seu próprio caderno e responde às perguntas no seu ritmo.</p><div id="room-message" class="feedback">${hostStillOpen ? 'Você é o apresentador. Mantenha esta aba aberta.' : host?.open ? 'Você está conectado à turma.' : 'Sem conexão ativa. Você pode jogar individualmente ou tentar entrar novamente.'}</div>${roomLink ? `<p>Link atual da sala:</p><div class="room-url" id="share-link"></div><button id="copy-link" class="primary">Copiar link da sala ↗</button>` : ''}<div class="room-actions" style="margin-top:18px"><button id="create-room">Criar uma nova sala como apresentador</button><button id="leave-room">Jogar individualmente</button>${reconnectAction}</div><label for="join-link" style="margin-top:22px">OU COLE O LINK / CÓDIGO DE UMA SALA</label><input id="join-link" placeholder="Link enviado pelo apresentador"><button id="join-room">Entrar na sala →</button><p class="fine">Multijogador experimental via WebRTC / PeerJS, até 40 conexões configuradas. Redes institucionais podem bloquear a conexão. Sem chat, áudio ou vídeo. A capacidade para a turma precisa ser testada na rede da apresentação.</p>`);
    if (roomLink) {
      $('#share-link').textContent = roomLink;
      $('#copy-link').onclick = async () => {
        try {
          await navigator.clipboard.writeText(roomLink);
          toast('Link copiado!');
        } catch {
          const range = document.createRange();
          range.selectNodeContents($('#share-link'));
          getSelection().removeAllRanges();
          getSelection().addRange(range);
          toast('Selecione e copie o link exibido.');
        }
      };
    }
    $('#create-room').onclick = createRoom;
    $('#leave-room').onclick = () => {
      cleanupNetwork();
      closeModal();
      toast('Você está no modo individual.');
    };
    $('#join-room').onclick = () => {
      let value = $('#join-link').value.trim();
      try {
        if (value.includes('://')) value = new URL(value).searchParams.get('sala');
      } catch {
        value = '';
      }
      if (value) {
        closeModal();
        joinRoom(value);
      }
    };
    $('#rejoin-room')?.addEventListener('click', () => {
      closeModal();
      joinRoom(roomCode);
    });
  }

  function validPlayer(player) {
    return ApoloProtocol.validPlayer(player, {
      skins,
      hairs,
      walkable,
      width: W,
      height: H,
      floors: MAPS.length
    });
  }

  Object.assign(window, { cleanupNetwork, createRoom, joinRoom, setupPeer, showRoom, validPlayer });
  $('#room-btn').onclick = showRoom;
})();
