export const M5_RESULT_VISUAL_STYLE = String.raw`
/* M5: visual hierarchy only. M4 result/comparison data and scene semantics remain authoritative. */
@media (min-width: 901px) {
  .visual-scene[data-visual-template="crisis"] .visual-canvas {
    align-self: start;
    min-height: 0;
    aspect-ratio: 9 / 5;
  }
  .visual-scene[data-visual-template="crisis"] .crisis-svg {
    height: 100%;
    min-height: 0;
    max-height: none;
  }
}

@media (min-width: 1200px) {
  .scene-main .visual-scene[data-visual-template="crisis"] .visual-dimension-summary {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .scene-main .visual-scene[data-visual-template="crisis"] .visual-dimension {
    min-height: 76px;
    align-items: start;
  }
  .scene-main .visual-scene[data-visual-template="crisis"] .visual-dimension small { display: none; }
}

.scene[class*="result-"] .scene-heading {
  position: relative;
  overflow: hidden;
  align-items: center;
  padding: 10px 14px;
  border: 1px solid #c5cfca;
  border-radius: 12px;
  background: linear-gradient(115deg, #eef3ef 0%, #f9faf8 62%, #edf1ee 100%);
  box-shadow: 0 6px 18px rgba(7,23,38,.07);
}
.scene.result-contained .scene-heading { border-left: 6px solid #4f9139; }
.scene.result-overwhelmed .scene-heading { border-left: 6px solid #b73228; }
.scene[class*="result-"] .scene-heading h2 { font-size: clamp(1.55rem, 2.2vw, 2.15rem); }
.scene[class*="result-"] .scene-state-badge { min-width: 0; background: rgba(255,255,255,.82); }

.scene[class*="result-"] .result-layout {
  grid-template-columns: minmax(230px, .34fr) minmax(0, 1fr);
  gap: 12px;
  margin-top: 0;
}
.scene[class*="result-"] .result-layout > div:first-child {
  padding: 10px;
  border: 1px solid #c8d1cd;
  border-radius: 11px;
  background: linear-gradient(180deg, #f4f7f4, #eef3ef);
}
.scene[class*="result-"] .result-layout > div:first-child > .eyebrow { margin-bottom: 7px; }
.scene[class*="result-"] .visual-scene[data-visual-template="result"] { margin: 0; }
.scene[class*="result-"] .visual-dimension-summary {
  grid-template-columns: 1fr;
  gap: 6px;
}
.scene[class*="result-"] .visual-dimension {
  min-height: 56px;
  gap: 7px;
  padding: 7px 8px;
  border-top: 0;
  border-left: 4px solid currentColor;
  box-shadow: 0 3px 9px rgba(7,23,38,.05);
}
.scene[class*="result-"] .visual-dimension .visual-status-symbol { width: 18px; height: 18px; }
.scene[class*="result-"] .visual-dimension strong { font-size: .74rem; }
.scene[class*="result-"] .visual-dimension-state { font-size: .82rem; }
.scene[class*="result-"] .visual-dimension small { font-size: .66rem; line-height: 1.25; }
.scene[class*="result-"] .visual-dimension.state-favorable { color: #2f6d39; }
.scene[class*="result-"] .visual-dimension.state-conditioned { color: #8b5709; }
.scene[class*="result-"] .visual-dimension.state-critical { color: #9c342d; }
.scene[class*="result-"] .visual-dimension > div { color: #17242d; }

.scene[class*="result-"] .relations {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
}
.scene[class*="result-"] .relation {
  padding: 8px 9px;
  border-radius: 11px;
  box-shadow: 0 3px 9px rgba(7,23,38,.045);
}
.scene[class*="result-"] .relation h3 { margin: 0; font-size: .86rem; line-height: 1.2; }
.scene[class*="result-"] .m4-causal-outcome { margin: 4px 0 0; color: #52666f; font-size: .71rem; line-height: 1.3; }
.scene[class*="result-"] .m4-causal-details { margin: 5px 0 0; }
.scene[class*="result-"] .m4-causal-details summary { width: fit-content; font-size: .7rem; font-weight: 800; }
.scene[class*="result-"] .relation::before { content: none; }
.scene[class*="result-"] .relation.decisive {
  grid-column: 1 / -1;
  border: 2px solid #a95000;
  border-left-width: 5px;
  background: linear-gradient(105deg, #fff6e9, #fffdfa 72%);
}
.scene[class*="result-"] .relation.decisive h3::after {
  content: ' · muy importante';
  color: #8a4a06;
  font-size: .72rem;
  font-weight: 800;
  letter-spacing: .03em;
}

.scene[class*="result-"] .m4-causal-steps {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;
  margin-top: 6px;
  border: 1px solid #d1d8d4;
  border-radius: 9px;
  overflow: hidden;
}
.scene[class*="result-"] .m4-causal-step {
  position: relative;
  display: block;
  min-height: 55px;
  padding: 6px 19px 6px 7px;
  border-radius: 0;
  background: #f7f9f7;
}
.scene[class*="result-"] .m4-causal-step:not(:last-child) { border-right: 1px solid #d5dcda; }
.scene[class*="result-"] .m4-causal-step:nth-child(2) { border-right: 0; }
.scene[class*="result-"] .m4-causal-step:nth-child(-n+2) { border-bottom: 1px solid #d5dcda; }
.scene[class*="result-"] .m4-causal-step:not(:last-child)::after {
  content: '→';
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  color: #6d7d76;
  font-size: 1rem;
  font-weight: 900;
}
.scene[class*="result-"] .m4-causal-step strong { display: block; margin-bottom: 2px; font-size: .61rem; line-height: 1.15; }
.scene[class*="result-"] .m4-causal-step span { font-size: .68rem; line-height: 1.2; }
.scene[class*="result-"] .relation.decisive .m4-causal-step { background: #fff9ef; }

.scene[class*="result-"] .feedback {
  margin-top: 0;
  border-left-width: 5px;
  font-size: .92rem;
}
#m4-result-actions {
  display: grid;
  gap: 7px;
  margin-top: 0;
  padding: 9px;
  border: 1px solid #c8d1cd;
  border-radius: 10px;
  background: #f4f7f5;
}
#m4-result-actions .primary { order: 3; }
#m4-result-actions .m4-replay-copy { order: 2; }
#m4-result-actions #compare-reference-button { order: 1; }

.m4-comparison {
  position: fixed;
  inset: 86px max(18px, calc((100vw - 1420px) / 2)) 18px;
  z-index: 90;
  overflow: auto;
  margin: 0;
  padding: clamp(18px, 3vw, 28px);
  border: 2px solid #bcc8c2;
  border-radius: 13px;
  box-shadow: 0 12px 30px rgba(7,23,38,.08);
  background: linear-gradient(180deg, #f8faf8, #f0f4f1);
}
.scene[class*="result-"] .m4-causal-step:nth-child(2)::after {
  content: '↓';
  right: 50%;
  top: auto;
  bottom: -10px;
  transform: translateX(50%);
  z-index: 1;
  padding: 0 3px;
  background: #f7f9f7;
}
.scene[class*="result-"] .relation.decisive .m4-causal-step:nth-child(2)::after { background: #fff9ef; }
.m4-comparison:focus { outline: 3px solid #7ca491; outline-offset: -3px; }
.m4-comparison-close { position: sticky; top: 0; z-index: 2; float: right; min-height: 38px; padding: 7px 12px; }
.m4-comparison > h3 { margin-bottom: 4px; font-size: clamp(1.45rem, 2.5vw, 1.9rem); }
.m4-comparison > p { margin-bottom: 8px; font-size: .82rem; }
.m4-comparison-grid { gap: 12px; margin-top: 10px; }
.m4-comparison-side {
  padding: 11px;
  border-radius: 11px;
  border-top: 5px solid #5c7f69;
  box-shadow: 0 7px 18px rgba(7,23,38,.055);
}
.m4-comparison-side:nth-child(2) { border-top-color: #a95000; background: #fffaf2; }
.m4-comparison-side h4:first-child { font-size: 1.05rem; }
.m4-comparison-side:nth-child(2) h4:first-child { color: #824407; }
.m4-comparison-meta { margin-bottom: 7px; }
.m4-comparison-dimensions { gap: 4px; margin-bottom: 9px; }
.m4-comparison-dimension { min-height: 35px; align-items: center; padding: 5px 7px; }
.m4-manifestations { gap: 4px; }
.m4-manifestation { padding: 5px 7px; border-left-width: 4px; border-radius: 0 7px 7px 0; }
.m4-manifestation span, .m4-manifestation small { font-size: .7rem; }
#m4-reference-comparison .m4-comparison-replay {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  margin-top: 10px;
  padding-top: 9px;
  border-top: 2px solid #cbd4d0;
}
#m4-reference-comparison .m4-comparison-replay p { flex-basis: auto; margin: 0; }

@media (max-width: 1050px) {
  .scene[class*="result-"] .result-layout { grid-template-columns: 1fr; }
  .scene[class*="result-"] .visual-dimension-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .scene[class*="result-"] .relations { grid-template-columns: 1fr; }
  .scene[class*="result-"] .relation.decisive { grid-column: auto; }
  .scene[class*="result-"] .m4-causal-steps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .scene[class*="result-"] .m4-causal-step:nth-child(2) { border-right: 0; }
}

@media (max-width: 700px) {
  .scene[class*="result-"] .scene-heading { padding: 17px; }
  .scene[class*="result-"] .visual-dimension-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .scene[class*="result-"] .m4-causal-steps { grid-template-columns: 1fr; }
  .scene[class*="result-"] .m4-causal-step:not(:last-child) {
    border-right: 0;
    border-bottom: 1px solid #d5dcda;
  }
  .scene[class*="result-"] .m4-causal-step:not(:last-child)::after {
    content: '↓';
    right: 12px;
    top: auto;
    bottom: -10px;
    transform: none;
    z-index: 1;
    padding: 0 3px;
    background: #f7f9f7;
  }
  #m4-result-actions { display: grid; grid-template-columns: 1fr; }
  #m4-result-actions .primary, #m4-result-actions .secondary { width: 100%; }
  .m4-comparison { inset: 8px; padding: 14px; }
  #m4-reference-comparison .m4-comparison-replay { grid-template-columns: 1fr; }
}
`;
