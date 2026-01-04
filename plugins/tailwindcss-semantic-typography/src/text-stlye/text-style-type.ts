export interface TextStyleType {
  className: string;

  fontSize:
    | string
    | 'text-xs'
    | 'text-sm'
    | 'text-base'
    | 'text-lg'
    | 'text-xl'
    | 'text-2xl'
    | 'text-3xl'
    | 'text-4xl'
    | 'text-5xl'
    | 'text-6xl'
    | 'text-7xl'
    | 'text-8xl';

  lineHeight: string;

  letterSpacing:
    | string
    | 'tracking-tighter'
    | 'tracking-tight'
    | 'tracking-normal'
    | 'tracking-wide'
    | 'tracking-wider'
    | 'tracking-widest';

  fontWeight:
    | string
    | 'font-thin'
    | 'font-extralight'
    | 'font-light'
    | 'font-normal'
    | 'font-medium'
    | 'font-semibold'
    | 'font-bold'
    | 'font-extrabold'
    | 'font-black';

  color: string | 'text-content-text-muted' | 'text-content-text' | 'text-content-text-emphasis';
}
