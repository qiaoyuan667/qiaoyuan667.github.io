'use client';

import { useEffect, useId, useRef, useState } from 'react';

type Citation = {
  checkedOn: string;
  bibtex: string;
  bibtexSource: string;
  citingPapers: {
    id: string;
    title: string;
    url: string;
    evidenceUrl: string;
    referenceLabel: string;
    verifiedOn: string;
  }[];
};

export default function CitationButton({ title, citation }: { title: string; citation: Citation }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const bibtex = useRef<HTMLPreElement>(null);
  const backdropPress = useRef(false);
  const [open, setOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const id = useId();
  const count = citation.citingPapers.length;
  const checkedOn = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(citation.checkedOn + 'T00:00:00Z'));

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  function show() {
    setCopyStatus('');
    dialog.current?.showModal();
    if (dialog.current) dialog.current.scrollTop = 0;
    setOpen(true);
  }

  function close() {
    dialog.current?.close();
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(citation.bibtex);
      setCopyStatus('Copied to clipboard.');
    } catch {
      // Leave the actual citation selected if clipboard access is unavailable.
      const selection = window.getSelection();
      if (bibtex.current && selection) {
        const range = document.createRange();
        range.selectNodeContents(bibtex.current);
        selection.removeAllRanges();
        selection.addRange(range);
        bibtex.current.focus();
      }
      setCopyStatus('Clipboard unavailable. Select and copy the BibTeX below.');
    }
  }

  return <>
    <button ref={trigger} type="button" className="citation-button" onClick={show} aria-haspopup="dialog" aria-controls={id} aria-label={`View BibTeX and ${count} verified ${count === 1 ? 'citation' : 'citations'} for ${title}`} title={`${count} verified citing ${count === 1 ? 'paper' : 'papers'} · BibTeX and reference evidence`}>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 5H4v7h5c0 4-2 6-5 7M21 5h-6v7h5c0 4-2 6-5 7" /></svg>
      <span>Cites</span><span className="citation-count">{count}</span>
    </button>
    <dialog ref={dialog} id={id} className="citation-dialog" aria-labelledby={`${id}-title`} onClose={() => { setOpen(false); trigger.current?.focus(); }} onPointerDown={event => { backdropPress.current = event.target === event.currentTarget; }} onClick={event => {
      if (!backdropPress.current || event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
    }}>
      <div className="citation-dialog-header">
        <div><p className="citation-eyebrow">Citation details</p><h2 id={`${id}-title`}>{title}</h2></div>
        <button className="citation-close" type="button" onClick={close} aria-label="Close citation details" autoFocus>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
      </div>
      <div className="citation-dialog-body">
        <section className="citation-bibtex" aria-labelledby={`${id}-bibtex`}>
          <div className="citation-section-heading"><h3 id={`${id}-bibtex`}>BibTeX</h3><button type="button" className="citation-copy" onClick={copy}>Copy BibTeX</button></div>
          <pre ref={bibtex} tabIndex={0} aria-label={`BibTeX for ${title}`}><code>{citation.bibtex}</code></pre>
          <div className="citation-bibtex-meta"><a href={citation.bibtexSource} target="_blank" rel="noopener noreferrer">Source: arXiv</a><span role="status" aria-live="polite">{copyStatus}</span></div>
        </section>
        <section className="citation-evidence" aria-labelledby={`${id}-citing`}>
          <h3 id={`${id}-citing`}>Citing papers <span className="citation-total">{count}</span></h3>
          <p className="citation-method">Each paper below includes this work in its references. Different versions of the same paper count once. This verified list may not be exhaustive.</p>
          <p className="citation-updated">Last checked: <time dateTime={citation.checkedOn}>{checkedOn}</time></p>
          {count ? <ol className="citation-list">{citation.citingPapers.map(paper => <li key={paper.id}>
            <a className="citing-paper-title" href={paper.url} target="_blank" rel="noopener noreferrer">{paper.title}</a>
            <a className="citation-reference" href={paper.evidenceUrl} target="_blank" rel="noopener noreferrer">{paper.referenceLabel} <span aria-hidden="true">↗</span></a>
          </li>)}</ol> : <p className="citation-empty">No citing papers have been verified yet. This does not imply that no citations exist.</p>}
        </section>
      </div>
    </dialog>
  </>;
}
