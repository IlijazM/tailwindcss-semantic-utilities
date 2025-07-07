export default (from: string, to: string) =>
  `/* #region ${from} */\n${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => `  --color-${from}-${step}: var(--color-${to}-${step});`).join('\n')}` +
  `\n  /* #endregion /* \n`;
