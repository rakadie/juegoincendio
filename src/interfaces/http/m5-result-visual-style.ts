export const M5_RESULT_VISUAL_STYLE = String.raw`
/* M5.5: visual hierarchy only. The M4 result/comparison DOM and data remain authoritative. */
.scene[class*="result-"] .scene-heading {
  position: relative;
  overflow: hidden;
  align-items: center;
  padding: clamp(18px, 3vw, 30px);
  border: 1px solid #c5cfca;
  border-radius: 12px;
  background: linear-gradient(115deg, #eef3ef 0%, #f9faf8 62%, #edf1ee 100%);
  box-shadow: 0 12px 30px rgba(7,23,38,.08);
}
.scene.result-contained .scene-heading { border-left: 6px solid #4f9139; }
.scene.result-overwhelmed .scene-heading { border-left: 6px solid #b73228; }
.scene[class*="result-"] .scene-heading h2 { font-size: clamp(2rem, 4vw, 3.4rem); }
.scene[class*="result-"] .scene-state-badge { min-width: 160px; background: rgba(255,255,255,.82); }

.scene[class*="result-"] .result-layout {
  grid-template-columns: 1fr;
  gap: 22px;
  margin-top: 20px;
}
.scene[class*="result-"] .result-layout > div:first-child {
  padding: 17px;
  border: 1px solid #c8d1cd;
  border-radius: 11px;
  background: linear-gradient(180deg, #f4f7f4, #eef3ef);
}
.scene[class*="result-"] .result-layout > div:first-child > .eyebrow { margin-bottom: 12px; }
.scene[class*="result-"] .visual-scene[data-visual-template="result"] { margin: 0; }
.scene[class*="result-"] .visual-dimension-summary {
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}
.scene[class*="result-"] .visual-dimension {
  min-height: 126px;
  border-top: 4px solid currentColor;
  box-shadow: 0 7px 18px rgba(7,23,38,.06);
}
.scene[class*="result-"] .visual-dimension.state-favorable { color: #2f6d39; }
.scene[class*="result-"] .visual-dimension.state-conditioned { color: #8b5709; }
.scene[class*="result-"] .visual-dimension.state-critical { color: #9c342d; }
.scene[class*="result-"] .visual-dimension > div { color: #17242d; }

.scene[class*="result-"] .relations {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.scene[class*="result-"] .relation {
  padding: 15px;
  border-radius: 11px;
  box-shadow: 0 7px 18px rgba(7,23,38,.055);
}
.scene[class*="result-"] .relation::before { content: none; }
.scene[class*="result-"] .relation.decisive {
  grid-column: 1 / -1;
  border: 2px solid #a95000;
  border-left-width: 7px;
  background: linear-gradient(105deg, #fff6e9, #fffdfa 72%);
}
.scene[class*="result-"] .relation.decisive h3::after {
  content: ' · relación decisiva';
  color: #8a4a06;
  font-size: .72rem;
  font-weight: 800;
  letter-spacing: .03em;
}

.scene[class*="result-"] .m4-causal-steps {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin-top: 14px;
  border: 1px solid #d1d8d4;
  border-radius: 9px;
  overflow: hidden;
}
.scene[class*="result-"] .m4-causal-step {
  position: relative;
  display: block;
  min-height: 94px;
  padding: 12px 26px 12px 12px;
  border-radius: 0;
  background: #f7f9f7;
}
.scene[class*="result-"] .m4-causal-step:not(:last-child) { border-right: 1px solid #d5dcda; }
.scene[class*="result-"] .m4-causal-step:not(:last-child)::after {
  content: '→';
  position: absolute;
  right: 7px;
  top: 50%;
  transform: translateY(-50%);
  color: #6d7d76;
  font-size: 1rem;
  font-weight: 900;
}
.scene[class*="result-"] .m4-causal-step strong { display: block; margin-bottom: 6px; }
.scene[class*="result-"] .relation.decisive .m4-causal-step { background: #fff9ef; }

.scene[class*="result-"] .feedback {
  margin-top: 20px;
  border-left-width: 5px;
  font-size: .92rem;
}
#m4-result-actions {
  margin-top: 22px;
  padding: 17px;
  border: 1px solid #c8d1cd;
  border-radius: 10px;
  background: #f4f7f5;
}
#m4-result-actions .primary { order: 3; }
#m4-result-actions .m4-replay-copy { order: 2; }
#m4-result-actions #compare-reference-button { order: 1; }

.m4-comparison {
  padding: clamp(18px, 3vw, 28px);
  border: 2px solid #bcc8c2;
  border-radius: 13px;
  box-shadow: 0 12px 30px rgba(7,23,38,.08);
  background: linear-gradient(180deg, #f8faf8, #f0f4f1);
}
.m4-comparison > h3 { margin-bottom: 6px; font-size: clamp(1.5rem, 3vw, 2.2rem); }
.m4-comparison-grid { gap: 16px; margin-top: 18px; }
.m4-comparison-side {
  padding: 17px;
  border-radius: 11px;
  border-top: 5px solid #5c7f69;
  box-shadow: 0 7px 18px rgba(7,23,38,.055);
}
.m4-comparison-side:nth-child(2) { border-top-color: #a95000; background: #fffaf2; }
.m4-comparison-side h4:first-child { font-size: 1.18rem; }
.m4-comparison-side:nth-child(2) h4:first-child { color: #824407; }
.m4-comparison-dimension { min-height: 48px; align-items: center; }
.m4-manifestation { border-left-width: 5px; border-radius: 0 7px 7px 0; }
.m4-comparison-replay {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 2px solid #cbd4d0;
}

@media (max-width: 1050px) {
  .scene[class*="result-"] .visual-dimension-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .scene[class*="result-"] .relations { grid-template-columns: 1fr; }
  .scene[class*="result-"] .relation.decisive { grid-column: auto; }
  .scene[class*="result-"] .m4-causal-steps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .scene[class*="result-"] .m4-causal-step:nth-child(2) { border-right: 0; }
}

@media (max-width: 700px) {
  .scene[class*="result-"] .scene-heading { padding: 17px; }
  .scene[class*="result-"] .visual-dimension-summary { grid-template-columns: 1fr; }
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
  .m4-comparison { padding: 14px; }
}
`;
