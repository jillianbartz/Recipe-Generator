export const getPdfStyles = () => `
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&family=Sofia&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    :root {
      --warm-peach: 25 69% 63%;
      --coral: 15 69% 63%;
      --pink-coral: 345 69% 63%;
      --golden: 40 69% 63%;
      --soft-brown: 25 36% 78%;
      --primary: 25 69% 63%;
      --foreground: 25 45% 20%;
      --background: 0 0% 100%;
      --secondary: 25 36% 78%;
      --muted: 25 20% 95%;
    }
    
    body { font-family: 'Nunito', sans-serif; background: white; color: hsl(var(--foreground)); margin: 0; padding: 0; }
    
    /* Page break controls */
    @page {
      margin: 0;
      size: A4;
    }
    
    .page-break {
      page-break-before: always;
    }
    
    .avoid-break {
      page-break-inside: avoid;
    }
    
    .keep-together {
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .header { background: linear-gradient(135deg, hsl(var(--pink-coral)), hsl(var(--warm-peach))); padding: 48px 32px; }
    .header-content { max-width: 1152px; margin: 0 auto; }
    .header h1 { font-family: 'Sofia', cursive; font-size: 36px; color: white; margin-bottom: 16px; font-weight: normal; }
    .meta-info { display: flex; gap: 24px; flex-wrap: wrap; color: rgba(255, 255, 255, 0.9); font-weight: 500; }
    .meta-item { display: flex; align-items: center; gap: 8px; }
    .icon { width: 16px; height: 16px; color: rgba(255, 255, 255, 0.9); }
    .content { max-width: 1152px; margin: 0 auto; padding: 48px 32px; min-height: auto; }
    .recipe-section { margin-bottom: 48px; page-break-inside: avoid; }
    .recipe-section:last-child { margin-bottom: 0; }
    .card { padding: 32px; border-radius: 12px; box-shadow: 0 4px 20px -2px hsla(var(--warm-peach), 0.15); width: 100%; page-break-inside: avoid; }
    .card-ingredients { background: hsl(var(--warm-peach) / 0.05); border: 2px solid hsl(var(--warm-peach) / 0.3); }
    .card-directions { background: hsl(var(--coral) / 0.05); border: 2px solid hsl(var(--coral) / 0.3); }
    .card-header { margin-bottom: 24px; }
    .card-header h2 { font-family: 'Sofia', cursive; font-size: 32px; color: hsl(var(--primary)); margin-bottom: 12px; display: flex; align-items: center; gap: 12px; font-weight: normal; }
    .header-icon { width: 28px; height: 28px; color: hsl(var(--primary)); }
    .underline { height: 4px; width: 64px; background: linear-gradient(135deg, hsl(var(--warm-peach)), hsl(var(--coral))); border-radius: 9999px; }
    .ingredients-list { list-style: none; padding: 0; }
    .ingredients-list li { display: flex; align-items: flex-start; gap: 16px; padding: 16px; margin-bottom: 16px; background: hsla(var(--warm-peach), 0.15); border-left: 4px solid hsla(var(--warm-peach), 0.5); border-radius: 8px; line-height: 1.6; font-size: 16px; page-break-inside: avoid; }
    .bullet { color: hsl(var(--primary)); font-weight: bold; font-size: 18px; line-height: 1; margin-top: 2px; }
    .directions-list { list-style: none; counter-reset: step; padding: 0; }
    .directions-list li { counter-increment: step; display: flex; gap: 20px; padding: 20px; margin-bottom: 20px; background: hsla(var(--coral), 0.15); border-left: 4px solid hsla(var(--coral), 0.5); border-radius: 8px; line-height: 1.6; font-size: 16px; page-break-inside: avoid; }
    .step-number { background: linear-gradient(135deg, hsl(var(--warm-peach)), hsl(var(--coral))); color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px; flex-shrink: 0; }
    .step-number::before { content: counter(step); }
    .footer { text-align: center; padding: 24px; color: hsl(var(--muted) / 0.7); margin-top: 24px; }
    
    /* Ensure content ends cleanly without extra pages */
    .content-end {
      page-break-after: avoid;
    }
    
    /* Remove any potential page breaks that could cause blank pages */
    * {
      page-break-after: avoid;
    }
    
    /* Only allow page breaks between major sections if needed */
    .recipe-section {
      page-break-after: auto;
    }
  </style>
`;
