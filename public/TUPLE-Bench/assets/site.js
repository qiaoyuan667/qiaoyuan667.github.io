'use strict';
(() => {
  const data = window.TUPLE_RESULTS;
  if (!data) return;
  const views = [
    ['public_only', 'No output', 'Public context, authorized category, registered hypotheses, and call status; no prediction fields.', '#7b8795'],
    ['choice', 'Choice', 'The selected coarse category, without scores or confidence.', '#19786e'],
    ['choice_confidence', 'Choice + confidence', 'The selected coarse category and native confidence.', '#aa772e'],
    ['full_probabilities', 'Full probabilities', 'The selected coarse category and the complete probability vector.', '#327bb1'],
    ['full_native', 'Full native', 'Selected category, complete probability vector, and native confidence.', '#173b75'],
  ];
  const percent = n => (n * 100).toFixed(2);
  const lookup = (model, release) => data.primary.find(r => r.model === model && r.release === release).recovery;
  const chart = document.querySelector('#recovery-chart');
  const position = n => ((n * 100 - 45) / 40) * 100;
  function draw(release) {
    const view = views.find(v => v[0] === release);
    chart.style.color = view[3];
    chart.setAttribute('aria-label', view[1] + ': conditional secret recovery by model with 95% intervals');
    const ticks = [45, 55, 65, 75, 85].map(t => `<span style="left:${(t - 45) / 40 * 100}%">${t}%</span>`).join('');
    chart.innerHTML = `<div class="chart-axis" aria-hidden="true"><span>Model</span><div class="chart-scale">${ticks}</div><span></span></div>` + data.models.map(model => {
      const s = lookup(model.id, release);
      const label = `${model.name}: ${percent(s.mean)} percent recovery, 95% interval ${percent(s.ci[0])} to ${percent(s.ci[1])} percent.`;
      return `<div class="chart-row" tabindex="0" role="img" aria-label="${label}" title="${label}"><span class="chart-model">${model.name}</span><div class="plot-lane" aria-hidden="true"><span class="chance"></span><span class="whisker" style="left:${position(s.ci[0])}%;width:${position(s.ci[1]) - position(s.ci[0])}%"></span><span class="point" style="left:${position(s.mean)}%"></span></div><span class="plot-value">${percent(s.mean)}</span></div>`;
    }).join('') + '<div class="chart-axis-title">Conditional secret recovery (%)</div>';
    document.querySelector('#release-description').textContent = view[2];
    document.querySelectorAll('[data-release]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.release === release)));
  }
  document.querySelectorAll('[data-release]').forEach(b => b.addEventListener('click', () => draw(b.dataset.release)));
  document.querySelector('#primary-table tbody').innerHTML = data.models.map(m => `<tr><th scope="row">${m.name}</th>${views.map(v => `<td>${percent(lookup(m.id, v[0]).mean)}</td>`).join('')}</tr>`).join('');
  const methods = [['native','Native'],['quantized_10','Quantization (0.1)'],['temperature_2','Temperature (τ = 2)'],['gaussian_05','Gaussian (σ = 0.05)'],['strict_expanded','Strict WCPQ']];
  document.querySelector('#defense-table tbody').innerHTML = methods.map(([id, name]) => `<tr${id === 'strict_expanded' ? ' class="ours"' : ''}><th scope="row">${name}</th>${['typesafe', 'openjev', 'clef'].map(model => {
    const s = data.defenses.find(r => r.method === id && r.model === model).recovery;
    return `<td>${percent(s.mean)}<span class="ci">[${percent(s.ci[0])}, ${percent(s.ci[1])}]</span></td>`;
  }).join('')}</tr>`).join('');
  document.querySelector('#show-defense-ci').addEventListener('change', e => document.querySelector('#defense-table').classList.toggle('show-ci', e.target.checked));
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const content = document.getElementById(button.dataset.copy).textContent;
    try {
      button.textContent = 'Copying…';
      await Promise.race([
        navigator.clipboard.writeText(content),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Clipboard unavailable')), 1200)),
      ]);
      button.textContent = 'Copied';
      document.querySelector('#copy-status').textContent = 'Content copied to clipboard.';
      setTimeout(() => { button.textContent = 'Copy'; }, 2200);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(document.getElementById(button.dataset.copy));
      const selection = window.getSelection();
      selection.removeAllRanges(); selection.addRange(range);
      button.textContent = 'Selected';
      button.title = 'Use your browser’s Copy command to copy the selected text.';
      document.querySelector('#copy-status').textContent = 'Code selected. Use your browser’s Copy command.';
    }
  }));
  const navLinks = [...document.querySelectorAll('.section-nav a')];
  const observer = new IntersectionObserver(entries => {
    const active = entries.filter(e => e.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (active) navLinks.forEach(link => {
      const selected = link.hash === '#' + active.target.id;
      link.classList.toggle('active', selected);
      if (selected) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
    });
  }, {rootMargin:'-15% 0px -60% 0px', threshold:0});
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  draw('full_native');
})();
