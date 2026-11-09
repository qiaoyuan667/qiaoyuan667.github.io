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

## Check on 9 November 2026

| Publication | Verified citing papers |
| --- | ---: |
| POLAR-Bench | 7 |
| Are Near-Tied LLM Rankings… | 2 |
| What Makes Something Hard(er)? | 1 |
| SkillEval | 0 verified so far |
| TUPLE-Bench | 1 |
| Last Translation Benchmark | 5 |

This is a verified lower bound, not an exhaustive citation index. All evidence links are stored with the corresponding record. The POLAR-Bench list includes CAROB (ACL Findings EMNLP 2026, bibliography on PDF page 12). The work at arXiv:2607.02814 is listed under the checked v2 full-text title, *Faithful Delegates? Benchmarking the Fiduciary Duties of LLM Negotiating Agents*; its abstract page and some indexes use the earlier title *SovereignNegotiation-Bench*.

The 5 November check reconfirmed all 14 previously recorded citation relationships and added one newly verified citing paper for Last Translation Benchmark: [Findings of the WMT26 General Machine Translation Shared Task: Contrastive Dynamic Human Evaluation at Scale](https://aclanthology.org/2026.wmt-main.48/). Its bibliography on [PDF page 37, printed page 909](https://aclanthology.org/2026.wmt-main.48.pdf#page=37) explicitly lists *Last translation benchmark*, Zouhar et al. (2026b), arXiv:2609.04173. This is newly verified here; the citing paper was published in October 2026.

Discovery included public web searches and the Semantic Scholar and OpenAlex citation relationships, followed by full-text checks. The existing citing papers' latest arXiv versions were also reviewed for additional references. Database counts were not substituted for the verified lists.

The 9 November check reconfirmed all 15 existing citation relationships. A subsequent user-supplied Google Scholar lead revealed a paper missed by the initial discovery pass: Pranay Mahendrakar's [A Hard-Task Gain Is Not a Change of Shape](https://zenodo.org/records/23981037), published on 5 November 2026. Its [bibliography on PDF page 15](https://zenodo.org/records/23981037/files/a-hard-task-gain-is-not-a-change-of-shape.pdf#page=15) explicitly identifies Zheng and Yang (2026), the complete Near-Tied Rankings title, arXiv:2609.00482, and DOI:10.48550/arXiv.2609.00482. This raises that paper's verified count from 1 to 2 and the sum across publications from 15 to 16. No references to the other five target publications were found in this PDF. The Zenodo concept ID 23981036 identifies the work across versions; the author-site and Life of Research copies are not additional citing works.

Future discovery passes should explicitly inspect available Google Scholar citing-article lists as leads and include author-hosted and Zenodo papers, without adopting their displayed counts. Preserve the initial audit and record follow-up discoveries separately so an incomplete search is not mistaken for evidence of no new citations.

### Pending candidate (not counted)

SquidAgent (arXiv:2610.08647) may cite POLAR-Bench in its NeurIPS camera-ready version. The public arXiv v1 checked on 5 November does not contain the reference. The [NeurIPS entry](https://neurips.cc/virtual/2026/poster/155478) uses the earlier title *Rethinking Parallel Multi-Agent Systems: A Cost-Aware Framework for Efficient Coordination* and links to [OpenReview 5ISO2WDCul](https://openreview.net/forum?id=5ISO2WDCul). Access to the OpenReview PDF was blocked by browser verification / HTTP 403 during this check. Do not add it until the reference is independently verified in the final full text.
