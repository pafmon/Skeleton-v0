<script>
  import { zones, activeZone, editMode, muscles } from './stores.js';
  import * as painter from './painter.js';
  import * as muscleData from './muscleData.js';

  // --- Muscle editor ---
  let form = $state({ name: '', origin: '', insertion: '', action: '', innervation: '' });
  let formError = $state('');
  let muscleSearch = $state('');

  let filteredMuscles = $derived(
    $muscles.filter(m => m.name.toLowerCase().includes(muscleSearch.toLowerCase()))
  );

  function addMuscle() {
    if (!form.name.trim())       { formError = 'Muscle name required'; return; }
    if (!form.origin.trim())     { formError = 'Origin zone name required'; return; }
    if (!form.insertion.trim())  { formError = 'Insertion zone name required'; return; }
    if (form.origin.trim() === form.insertion.trim()) { formError = 'Origin and insertion must differ'; return; }
    formError = '';

    // auto-create zones if they don't exist yet
    painter.addZone(form.origin.trim());
    painter.addZone(form.insertion.trim());

    muscleData.addMuscle({
      name: form.name.trim(),
      origin: form.origin.trim(),
      insertion: form.insertion.trim(),
      action: form.action.trim(),
      innervation: form.innervation.trim(),
    });

    form = { name: '', origin: '', insertion: '', action: '', innervation: '' };
  }

  async function importMuscles() {
    const el = document.createElement('input');
    el.type = 'file'; el.accept = '.json';
    el.onchange = async () => {
      const data = JSON.parse(await el.files[0].text());
      muscleData.loadMuscles(data);
      // auto-create all zones referenced by muscles
      data.forEach(m => {
        painter.addZone(m.origin);
        painter.addZone(m.insertion);
      });
    };
    el.click();
  }

  // --- Zone editor ---
  let zoneSearch = $state('');

  let filteredZones = $derived(
    Object.entries($zones).filter(([name]) =>
      name.toLowerCase().includes(zoneSearch.toLowerCase())
    )
  );

  $effect(() => {
    const hasPainted = Object.values($zones).some(z => z.faceCount > 0);
    painter.setOverlayVisible($editMode || hasPainted);
  });

  async function importAreas() {
    const el = document.createElement('input');
    el.type = 'file'; el.accept = '.json';
    el.onchange = async () => painter.loadZones(JSON.parse(await el.files[0].text()));
    el.click();
  }

  function statusIcon(name) {
    if (!$zones[name] || $zones[name].faceCount === 0) return '○';
    return name === $activeZone ? '◉' : '✓';
  }

  function statusColor(name) {
    if (!$zones[name] || $zones[name].faceCount === 0) return '#555';
    return name === $activeZone ? '#fff' : '#4c4';
  }

  function saveAll() {
    painter.saveToStorage();
    muscleData.saveMuscles();
    painter.exportZones();
    muscleData.exportMuscles();
  }
</script>

{#if $editMode}
  <div class="panel">

    <!-- ── MUSCLES ── -->
    <div class="section-header">
      <span>Muscles <span class="dim">({$muscles.length})</span></span>
      <div class="row-inline">
        <button onclick={importMuscles}>Import</button>
      </div>
    </div>

    <div class="form">
      <input placeholder="Muscle name *" bind:value={form.name}
        onkeydown={(e) => { if (e.key === 'Enter') addMuscle(); }} />
      <div class="zone-row">
        <span class="zone-label origin-label">O</span>
        <input placeholder="Origin zone name *" bind:value={form.origin} />
      </div>
      <div class="zone-row">
        <span class="zone-label insert-label">I</span>
        <input placeholder="Insertion zone name *" bind:value={form.insertion} />
      </div>
{#if formError}<div class="error-msg">{formError}</div>{/if}
      <button class="add-btn" onclick={addMuscle}>+ Add Muscle</button>
    </div>

    <input class="search" placeholder="Search muscles..." bind:value={muscleSearch} />

    <div class="list">
      {#each filteredMuscles as muscle, i}
        <div class="muscle-item">
          <button class="icon-btn del abs-del" onclick={() => muscleData.deleteMuscle(i)}>✕</button>
          <div class="muscle-name">{muscle.name}</div>
          <div class="muscle-detail">
            <span class="tag origin-tag">O</span>
            <span class="zone-ref" onclick={() => activeZone.set(muscle.origin)}>{muscle.origin}</span>
          </div>
          <div class="muscle-detail">
            <span class="tag insert-tag">I</span>
            <span class="zone-ref" onclick={() => activeZone.set(muscle.insertion)}>{muscle.insertion}</span>
          </div>
          {#if muscle.action}<div class="muscle-meta">{muscle.action}</div>{/if}
          {#if muscle.innervation}<div class="muscle-meta nerve">{muscle.innervation}</div>{/if}
        </div>
      {/each}
      {#if filteredMuscles.length === 0}
        <div class="empty">{muscleSearch ? 'No matches' : 'No muscles yet — add one above'}</div>
      {/if}
    </div>

    <div class="divider"></div>

    <!-- ── ZONES ── -->
    <div class="section-header">
      <span>Zones <span class="dim">({Object.keys($zones).length})</span></span>
      <button onclick={importAreas}>Import Areas</button>
    </div>

    <input class="search" placeholder="Search zones..." bind:value={zoneSearch} />

    <div class="list grow">
      {#each filteredZones as [name, z]}
        <div class="zone-item" class:active={name === $activeZone} onclick={() => activeZone.set(name)}>
          <span class="status" style:color={statusColor(name)}>{statusIcon(name)}</span>
          <span class="dot" style:background={painter.getPaletteHex(z.colorIdx)}></span>
          <span class="name">{name}</span>
          <span class="count">{z.faceCount}f</span>
          <button class="icon-btn" onclick={(e) => { e.stopPropagation(); painter.clearZone(name); }}>↺</button>
          <button class="icon-btn del" onclick={(e) => { e.stopPropagation(); painter.deleteZone(name); }}>✕</button>
        </div>
      {/each}
      {#if filteredZones.length === 0}
        <div class="empty">{zoneSearch ? 'No matches' : 'Zones appear here when you add muscles'}</div>
      {/if}
    </div>

    <div class="row">
      <button onclick={saveAll}>Save</button>
    </div>

    <div class="hint">Click a zone → drag over bone to paint · E to toggle</div>
  </div>
{/if}

<style>
  .panel {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    background: rgba(10, 10, 10, 0.93);
    color: #fff;
    padding: 14px;
    width: 290px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 7px;
    overflow-y: auto;
    font-family: monospace;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
  }

  .dim { color: #555; font-weight: normal; }
  .row-inline { display: flex; gap: 4px; }
  .divider { border-top: 1px solid #222; margin: 2px 0; }

  input {
    background: #1a1a1a;
    border: 1px solid #333;
    color: #fff;
    padding: 5px 8px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 11px;
    outline: none;
    box-sizing: border-box;
    width: 100%;
  }

  input:focus { border-color: #555; }
  .search { margin: 0; }

  .row { display: flex; gap: 6px; }

  button {
    background: #1e1e1e;
    border: 1px solid #333;
    color: #aaa;
    padding: 4px 7px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 11px;
    font-family: monospace;
    white-space: nowrap;
  }

  button:hover { background: #2a2a2a; color: #fff; }

  .form { display: flex; flex-direction: column; gap: 5px; }

  .zone-row { display: flex; align-items: center; gap: 6px; }
  .zone-row input { flex: 1; }

  .zone-label {
    font-size: 10px;
    font-weight: bold;
    padding: 2px 5px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  .origin-label { background: #2a3d2a; color: #7c7; }
  .insert-label { background: #2a2a3d; color: #77c; }

  .error-msg { color: #c44; font-size: 11px; }

  .add-btn { width: 100%; padding: 6px; }

  .list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    max-height: 180px;
    overflow-y: auto;
  }

  .list.grow {
    max-height: none;
    flex: 1;
  }

  /* Muscle items */
  .muscle-item {
    position: relative;
    padding: 6px 24px 6px 8px;
    border-radius: 4px;
    background: #141414;
    font-size: 11px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .abs-del { position: absolute; top: 4px; right: 4px; }
  .muscle-name { font-weight: bold; color: #ddd; }
  .muscle-detail { display: flex; align-items: center; gap: 5px; color: #777; }
  .muscle-meta { color: #4a4a4a; font-size: 10px; font-style: italic; }
  .nerve { color: #334; }

  .tag {
    font-size: 9px;
    padding: 1px 4px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .origin-tag { background: #2a3d2a; color: #7c7; }
  .insert-tag { background: #2a2a3d; color: #77c; }

  .zone-ref {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .zone-ref:hover { color: #fff; text-decoration: underline; }

  /* Zone items */
  .zone-item {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 3px 4px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 11px;
  }

  .zone-item:hover { background: #1a1a1a; }
  .zone-item.active { background: #222; }

  .status { width: 12px; flex-shrink: 0; }
  .dot { width: 7px; height: 7px; border-radius: 2px; flex-shrink: 0; }
  .name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #ccc; }
  .count { color: #444; font-size: 10px; flex-shrink: 0; }

  .icon-btn {
    background: none;
    border: none;
    color: #444;
    padding: 0 2px;
    font-size: 11px;
    flex-shrink: 0;
    cursor: pointer;
  }

  .icon-btn:hover { background: none; color: #aaa; }
  .del:hover { color: #c44 !important; }

  .empty { color: #333; font-size: 11px; padding: 6px 4px; }
  .hint { font-size: 10px; color: #333; text-align: center; margin-top: auto; padding-top: 4px; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
  ::-webkit-scrollbar-thumb:hover { background: #555; }
</style>
