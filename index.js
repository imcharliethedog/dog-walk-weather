// dog-walk-weather: a tiny, friendly "is it too cold to walk my dog?" helper.
// Zero dependencies. Rough guidance only, not veterinary advice.

export const LEVELS = [
  { id: 'comfy',  name: 'Comfy',  minutes: null, label: 'as long as you both like', tip: 'Great walking weather. Go sniff everything.' },
  { id: 'brisk',  name: 'Brisk',  minutes: [30, 45], label: 'about 30-45 minutes', tip: 'Fine for most dogs. Small or thin-coated pups may like a sweater.' },
  { id: 'chilly', name: 'Chilly', minutes: [15, 20], label: 'about 15-20 minutes', tip: 'Keep it short. Watch for shivering or paw-lifting. Sweater recommended for small or short-coated dogs.' },
  { id: 'too-cold', name: 'Too cold', minutes: [0, 5], label: 'about 5 minutes (potty breaks only)', tip: 'Quick out-and-back, then indoor games. Frostbite and hypothermia risk rises fast.' }
];

const SIZE = { tiny: -8, small: -4, medium: 0, large: 3 };
const COAT = { thin: -6, medium: 0, thick: 10 };

/**
 * walkCheck({ temp, unit, size, coat, sweater, wet, wind, frail })
 *  temp: number (feels-like is best). unit: 'F' | 'C' (default 'F')
 *  size: 'tiny' (<10 lb) | 'small' (10-25) | 'medium' (25-60) | 'large' (60+)
 *  coat: 'thin' | 'medium' | 'thick'
 *  sweater, wet, wind, frail (puppy/senior/health issues): booleans
 * Returns { level, id, name, minutes, label, tip, effectiveF }
 */
export function walkCheck(opts = {}) {
  const { temp, unit = 'F', size = 'medium', coat = 'medium', sweater = false, wet = false, wind = false, frail = false } = opts;
  if (typeof temp !== 'number' || Number.isNaN(temp)) throw new TypeError('temp must be a number');
  if (!(size in SIZE)) throw new RangeError(`size must be one of ${Object.keys(SIZE).join(', ')}`);
  if (!(coat in COAT)) throw new RangeError(`coat must be one of ${Object.keys(COAT).join(', ')}`);
  const f = String(unit).toUpperCase() === 'C' ? temp * 9 / 5 + 32 : temp;
  let eff = f + SIZE[size] + COAT[coat];
  if (sweater) eff += 6;
  if (wet) eff -= 8;
  if (wind) eff -= 6;
  if (frail) eff -= 8;
  let level = eff >= 45 ? 0 : eff >= 32 ? 1 : eff >= 20 ? 2 : 3;
  if (f >= 50) level = 0;
  return { level, ...LEVELS[level], effectiveF: Math.round(eff) };
}

export const WINTER_TIPS = [
  'Wipe paws after walks: road salt and de-icer sting and are not for licking.',
  'Antifreeze tastes sweet and is very poisonous. Keep dogs away from driveway puddles.',
  'Shorter, more frequent walks beat one long freezing one.',
  'Shivering, lifting paws, slowing down or whining means time to go in.',
  'Trim fur between paw pads to stop snowballs forming.'
];

export default walkCheck;
