const papers = [
  {
    title: 'POLAR-Bench: A Diagnostic Benchmark for Privacy-Utility Trade-offs in LLM Agents',
    authors: 'Qiaoyuan Zheng, Yiqu Yang, Qi Gao, Imanol Schlag',
    status: 'Preprint, 2026. Under review at NeurIPS 2026 E&D Track.',
    summary: 'A diagnostic benchmark with 7,852 samples across 10 domains for evaluating the trade-off between task utility and user-defined privacy constraints in LLM agents.',
    url: 'https://arxiv.org/abs/2605.19127',
  },
  {
    title: 'Are Near-Tied LLM Rankings Robust to Family-DIF-Guided Benchmark Recomposition?',
    authors: 'Qiaoyuan Zheng, Yiqu Yang',
    status: 'Preprint, 2026. Under review at ICLR 2027 and the NeurIPS TAE Workshop.',
    summary: 'We study the robustness of near-tied LLM rankings across five benchmarks using item response theory and differential item functioning, with owner-disjoint evaluation folds and matched-random controls.',
    url: 'https://arxiv.org/abs/2609.00482',
  },
  {
    title: 'SkillEval: Learning Interpretable Ability Profiles of LLMs via Cognitive Diagnosis Models',
    authors: 'Berke Arda, Peng Cui, Qiaoyuan Zheng, Rudolf Debelak, Mubashara Akhtar, Mrinmaya Sachan',
    status: '2026. Under review at NeurIPS 2026 E&D Track.',
    summary: 'Combining LLM-based skill discovery with neural cognitive diagnosis to construct interpretable ability profiles for 3,811 LLMs across 9,523 items from five benchmarks.',
  },
  {
    title: 'Last Translation Benchmark',
    authors: 'Vilém Zouhar, Niyati Bafna, Mukund Choudhary, …, Qiaoyuan Zheng, …',
    status: 'Preprint, 2026.',
    summary: 'I contributed translation test cases and reviewed English, Chinese, and French benchmark submissions.',
    url: 'https://arxiv.org/abs/2609.04173',
  },
];

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <main id="main" className="page">
        <header className="profile">
          <div className="intro">
            <h1>Qiaoyuan Zheng</h1>
            <p>I am a Master’s student in Data Science at ETH Zürich and a Research Assistant at the ETH AI Center. My research focuses on <strong>LLM evaluation</strong>, <strong>interpretable capability assessment</strong>, and <strong>privacy in language agents</strong>.</p>
            <p>Previously, I studied Computer Science and Mathematics at Sorbonne University. I also worked on time-series forecasting at ESIEE Paris, supervised by Dr. You Jiang.</p>
            <p className="profile-links"><a href="mailto:zqiaoyuan@ethz.ch">Email</a><span> / </span><a href="/Qiaoyuan-Zheng-CV.pdf" download>CV</a><span> / </span><a href="https://scholar.google.com/citations?user=xZJlHW8AAAAJ&hl=en">Google Scholar</a><span> / </span><a href="https://github.com/qiaoyuan667">GitHub</a><span> / </span><a href="https://www.linkedin.com/in/qiaoyuan-zheng">LinkedIn</a></p>
          </div>
          <img className="portrait" src="/portrait-snow-v2.png" alt="Qiaoyuan Zheng in front of snowy mountains" width="210" height="210" />
        </header>

        <nav className="section-nav" aria-label="Sections"><a href="#research">Research</a><a href="#experience">Experience</a><a href="#education">Education</a><a href="#projects">Projects</a><a href="#about">About</a></nav>

        <section id="research">
          <h2>Research</h2>
          <p>I work on evaluating language models beyond aggregate benchmark scores, including privacy–utility trade-offs, ranking robustness, and interpretable skill profiles.</p>
          <div className="publications">
            {papers.map(p => <article className="publication" key={p.title}>
              <h3>{p.url ? <a href={p.url}>{p.title}</a> : p.title}</h3>
              <p className="authors">{p.authors.split('Qiaoyuan Zheng').map((part, i) => <span key={i}>{i > 0 && <strong>Qiaoyuan Zheng</strong>}{part}</span>)}</p>
              <p className="venue">{p.status}</p>
              {p.url && <p className="paper-links"><a href={p.url}>arXiv</a></p>}
              <p className="summary">{p.summary}</p>
            </article>)}
          </div>
        </section>

        <section id="experience">
          <h2>Research Experience</h2>
          <article className="entry"><div className="entry-heading"><h3>ETH AI Center</h3><span>2026–present</span></div><p className="position">Research Assistant · Zurich, Switzerland</p><p>Developing a multilingual benchmark for legal compliance in LLMs, including reproducible scenario-generation, review, and evaluation pipelines. Collaborating with legal experts and investigating applications for LLM post-training.</p></article>
          <article className="entry"><div className="entry-heading"><h3>ESIEE Paris</h3><span>2023</span></div><p className="position">Research Assistant · Paris, France</p><p>Implemented Transformer-based models and PatchTST for time-series forecasting under Dr. You Jiang, adapting training pipelines and comparing model performance and computational efficiency on synthetic datasets. <a href="https://github.com/qiaoyuan667/DEC_ENC_Transformer">[code]</a></p></article>
        </section>

        <section id="education">
          <h2>Education</h2>
          <div className="entry"><div className="entry-heading"><h3>ETH Zürich</h3><span>2025–present</span></div><p>MSc in Data Science</p></div>
          <div className="entry"><div className="entry-heading"><h3>Sorbonne University</h3><span>2022–2025</span></div><p>BSc in Computer Science / Mathematics</p></div>
        </section>

        <section id="projects">
          <h2>Selected Projects</h2>
          <div className="entry"><div className="entry-heading"><h3>Aperiodic Tiling Generation</h3><span>2024</span></div><p>Implemented Penrose, Wang, and Hat tiling algorithms in Python; optimized generation with duplicate detection and spatial pruning.</p></div>
          <div className="entry"><div className="entry-heading"><h3>Q-Learning and SARSA in Grid Worlds</h3><span>2023</span></div><p>Compared Q-learning and SARSA across 15 custom environments. Built a map editor and environments adopted for master’s-level teaching at UPEC.</p></div>
        </section>

        <section id="about">
          <h2>A little more about me</h2>
          <p>I speak Chinese, English, and French. Outside research, I enjoy playing drums and saxophone, cooking, reading, and calligraphy.</p>
          <p>You can reach me at <a href="mailto:zqiaoyuan@ethz.ch">zqiaoyuan@ethz.ch</a>.</p>
        </section>
        <footer><span>Last updated: September 2026</span><span>Layout inspired by <a href="https://github.com/jonbarron/jonbarron.github.io">Jon Barron’s academic website</a>.</span></footer>
      </main>
    </>
  );
}
