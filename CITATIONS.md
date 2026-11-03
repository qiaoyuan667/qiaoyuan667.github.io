# Publication citations

`app/data/citations.json` contains the manually verified citation records and the arXiv-provided BibTeX for each publication. `app/components/CitationButton.tsx` renders the count and dialog. Counts are derived from `citingPapers.length`; there is no separate count to maintain.

## Counting and evidence

- Include a citing paper only after checking that its reference list identifies the target publication (title, authors, and arXiv ID or DOI where available).
- Use one stable ID per citing work. Merge preprint, revised, and published versions; multiple mentions in one paper count once for each target work.
- Link the paper title to its landing page. Link `evidenceUrl` to the checked HTML bibliography entry or the exact PDF page. Pin the arXiv version used as evidence.
- Record `verifiedOn` for each reference check. Update the publication's `checkedOn` only after reviewing its list.
- Do not import citation counts from Google Scholar or another index. Indexes and search results are discovery leads, not evidence.
- A list with no verified entries is not evidence that no citations exist. The dialog states this explicitly.
- Citation relationships are displayed together without an author-overlap classification.

## Updating

Add or revise the appropriate record in `app/data/citations.json`. Get the target paper's BibTeX from its `bibtexSource` (the arXiv BibTeX endpoint), retaining the full author list. The BibTeX currently identifies the arXiv version; publication venue labels on the homepage are maintained separately.

Run `npm run build:pages` and preview the static `out/` directory. Check the affected button, BibTeX copy, evidence links, dialog closing, and narrow-screen layout. A push to `main` triggers the existing GitHub Pages deployment.

## Check on 3 November 2026

| Publication | Verified citing papers |
| --- | ---: |
| POLAR-Bench | 7 |
| Are Near-Tied LLM Rankings… | 1 |
| What Makes Something Hard(er)? | 1 |
| SkillEval | 0 verified so far |
| TUPLE-Bench | 1 |
| Last Translation Benchmark | 4 |

This is a verified lower bound, not an exhaustive citation index. All evidence links are stored with the corresponding record. The POLAR-Bench list includes CAROB (ACL Findings EMNLP 2026, bibliography on PDF page 12). The work at arXiv:2607.02814 is listed under the checked v2 full-text title, *Faithful Delegates? Benchmarking the Fiduciary Duties of LLM Negotiating Agents*; its abstract page and some indexes use the earlier title *SovereignNegotiation-Bench*.
