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
    
    body { font-family: 'Nunito', sans-serif; background: linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--background)), hsl(var(--muted))); min-height: 100vh; color: hsl(var(--foreground)); }
    .header { background: linear-gradient(135deg, hsl(var(--pink-coral)), hsl(var(--warm-peach))); padding: 48px 32px; }
    .header-content { max-width: 1152px; margin: 0 auto; }
    .header h1 { font-family: 'Sofia', cursive; font-size: 36px; color: white; margin-bottom: 16px; font-weight: normal; }
    .meta-info { display: flex; gap: 24px; flex-wrap: wrap; color: rgba(255, 255, 255, 0.9); font-weight: 500; }
    .meta-item { display: flex; align-items: center; gap: 8px; }
    .content { max-width: 1152px; margin: 0 auto; padding: 48px 32px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    .card { background: rgba(255, 255, 255, 0.8); padding: 24px; border-radius: 12px; box-shadow: 0 4px 20px -2px hsla(var(--warm-peach), 0.15); }
    .card-ingredients { border: 1px solid hsla(var(--warm-peach), 0.2); }
    .card-directions { border: 1px solid hsla(var(--coral), 0.2); }
    .card-header { margin-bottom: 24px; }
    .card-header h2 { font-family: 'Sofia', cursive; font-size: 28px; color: hsl(var(--primary)); margin-bottom: 8px; display: flex; align-items: center; gap: 12px; font-weight: normal; }
    .underline { height: 4px; width: 64px; background: linear-gradient(135deg, hsl(var(--warm-peach)), hsl(var(--coral))); border-radius: 9999px; }
    .ingredients-list { list-style: none; padding: 0; }
    .ingredients-list li { display: flex; align-items: flex-start; gap: 12px; padding: 12px; margin-bottom: 12px; background: hsla(var(--warm-peach), 0.1); border-left: 2px solid hsla(var(--warm-peach), 0.3); border-radius: 8px; line-height: 1.6; }
    .bullet { color: hsl(var(--primary)); font-weight: bold; font-size: 18px; line-height: 1; margin-top: 2px; }
    .directions-list { list-style: none; counter-reset: step; padding: 0; }
    .directions-list li { counter-increment: step; display: flex; gap: 16px; padding: 16px; margin-bottom: 16px; background: hsla(var(--coral), 0.1); border-left: 2px solid hsla(var(--coral), 0.3); border-radius: 8px; line-height: 1.6; }
    .step-number { background: linear-gradient(135deg, hsl(var(--warm-peach)), hsl(var(--coral))); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; flex-shrink: 0; }
    .step-number::before { content: counter(step); }
    .footer { text-align: center; padding: 48px 24px; color: hsl(var(--muted) / 0.7); }
  </style>
`;
