(function () {
  const $ = selector => document.querySelector(selector);
  const Progress = window.ApoloProgress;
  let warnedAboutStorage = false;
  let importCandidate = null;

  try {
    const state = Progress.readLocal(localStorage);
    const currentBackup = localStorage.getItem('apolo-v3');
    const legacyBackup = localStorage.getItem('apolo-v2') || localStorage.getItem('apollo-v1');
    if (state) {
      appearance = { ...state.profile };
      me.name = state.profile.name;
      Object.assign(me, appearance);
      visited = new Set(state.visited);
      complete = state.complete;
    } else if (currentBackup !== null || legacyBackup !== null) {
      warnedAboutStorage = true;
      console.warn('O progresso salvo do ASCENDA não pôde ser validado; o jogo iniciou com valores seguros.');
    }
  } catch (error) {
    warnedAboutStorage = true;
    console.error('Não foi possível ler o progresso local do ASCENDA.', error);
  }

  function syncCharacterForm() {
    $('#player-name').value = me.name;
    $('#hair-style').value = String(appearance.style);
    $('#outfit-style').value = String(appearance.outfit);
    $('#accessory-style').value = appearance.accessory;
    for (const [key, colors] of [['skin', skins], ['hair', hairs]]) {
      document.querySelectorAll(`#${key}-options button`).forEach((button, index) => {
        const selected = colors[index] === appearance[key];
        button.classList.toggle('selected', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
    }
    preview();
  }

  function persist() {
    try {
      Progress.writeLocal(localStorage, {
        profile: { ...appearance, name: me.name },
        visited: [...visited],
        complete
      });
      warnedAboutStorage = false;
      return true;
    } catch (error) {
      console.error('Não foi possível salvar o progresso local do ASCENDA.', error);
      if (!warnedAboutStorage) toast('Não foi possível salvar o progresso. Exporte uma cópia para evitar perdê-lo.');
      warnedAboutStorage = true;
      return false;
    }
  }
  window.persist = persist;

  function addBackupControls() {
    const tools = document.createElement('div');
    tools.className = 'progress-tools';
    tools.innerHTML = '<button type="button" id="export-progress">Baixar cópia do progresso</button><button type="button" id="import-progress">Importar cópia</button><input id="progress-file" type="file" accept=".json,application/json" hidden>';
    $('#modal-content').append(tools);

    $('#export-progress').onclick = () => {
      try {
        const backup = Progress.makeBackup({ ...appearance, name: me.name }, [...visited], complete);
        const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ascenda-progresso.json';
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        toast('Cópia do progresso baixada.');
      } catch (error) {
        console.error('Não foi possível exportar o progresso do ASCENDA.', error);
        toast('Não foi possível criar a cópia do progresso.');
      }
    };

    $('#import-progress').onclick = () => $('#progress-file').click();
    $('#progress-file').onchange = async event => {
      const [file] = event.target.files;
      event.target.value = '';
      if (!file) return;
      try {
        if (file.size > Progress.MAX_BACKUP_BYTES) throw new TypeError('O arquivo excede o limite de 16 KiB.');
        importCandidate = Progress.parseBackup(await file.text());
        modal('<span class="eyebrow">SUBSTITUIR PROGRESSO</span><h2>Importar esta cópia?</h2><p id="import-details"></p><p>O nome, a aparência, as descobertas e a conclusão atuais serão substituídos. Esta ação não pode ser desfeita.</p><div class="room-actions"><button id="confirm-import" class="primary">Substituir meu progresso</button><button id="cancel-import">Cancelar</button></div>');
        $('#import-details').textContent = `${importCandidate.profile.name || 'Sem nome'} · ${importCandidate.visited.length}/12 descobertas · ${importCandidate.complete ? 'integração concluída' : 'integração em andamento'}`;
        $('#cancel-import').onclick = () => { importCandidate = null; closeModal(); };
        $('#confirm-import').onclick = () => {
          if (!importCandidate) return;
          appearance = { ...importCandidate.profile };
          me.name = importCandidate.profile.name;
          Object.assign(me, appearance);
          visited = new Set(importCandidate.visited);
          complete = importCandidate.complete;
          importCandidate = null;
          syncCharacterForm();
          const saved = persist();
          updateUI();
          closeModal();
          toast(saved
            ? 'Progresso importado neste navegador.'
            : 'Progresso importado nesta sessão, mas não pôde ser salvo neste navegador.');
        };
      } catch (error) {
        importCandidate = null;
        console.error('O arquivo de progresso do ASCENDA não foi importado.', error);
        modal('<span class="eyebrow">CÓPIA NÃO IMPORTADA</span><h2>Não foi possível validar o arquivo.</h2><p>Use uma cópia JSON exportada pelo ASCENDA e confira se ela não foi alterada ou truncada.</p>');
      }
    };
  }

  const openNotebook = $('#notebook-btn').onclick;
  $('#notebook-btn').onclick = (...args) => {
    openNotebook(...args);
    addBackupControls();
  };

  syncCharacterForm();

  if (warnedAboutStorage) {
    setTimeout(() => toast('O progresso salvo não pôde ser lido. Confira o caderno e exporte uma cópia após jogar.'), 0);
  }
})();
