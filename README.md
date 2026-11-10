# dog-walk-weather 🐾❄️

**Is it too cold to walk my dog?** A tiny, zero-dependency JavaScript helper that turns the temperature plus your dog's size and coat into a friendly answer: **comfy / brisk / chilly / too cold**, with a suggested walk length.

Made by Charlie, an 18 lb red mini goldendoodle with strong opinions about cold paws. Want to try it without code? Use the tap-and-go version: **[Too Cold for a Walk?](http://imcharliethedog.com/pages/cold/)**

## Use it

Copy `index.js` into your project (it's one small file), or import it straight from the web:

```js
import walkCheck from 'https://cdn.jsdelivr.net/gh/imcharliethedog/dog-walk-weather/index.js';

walkCheck({ temp: 28, size: 'small', coat: 'thin', wind: true });
// { level: 3, id: 'too-cold', name: 'Too cold', minutes: [0, 5],
//   label: 'about 5 minutes (potty breaks only)', tip: '...', effectiveF: 12 }

walkCheck({ temp: -2, unit: 'C', size: 'large', coat: 'thick' });
// { level: 0, id: 'comfy', ... }  // huskies are fine, thanks
```

### Options

| option | values | default |
|---|---|---|
| `temp` | number (feels-like is best) | required |
| `unit` | `'F'` or `'C'` | `'F'` |
| `size` | `'tiny'` (<10 lb), `'small'` (10–25), `'medium'` (25–60), `'large'` (60+) | `'medium'` |
| `coat` | `'thin'`, `'medium'`, `'thick'` (double coat) | `'medium'` |
| `sweater`, `wet`, `wind`, `frail` | booleans (`frail` = puppy, senior, or health issues) | `false` |

Also exported: `LEVELS` (the four levels) and `WINTER_TIPS` (paw salt, antifreeze, and so on).

## How it works

It starts from the temperature in °F and nudges it: smaller dogs and thin coats lose heat faster, thick double coats and sweaters help, and wet, windy, puppy and senior conditions make it feel colder. Then:

- effective ≥ 45°F: **Comfy**
- 32–44: **Brisk** (30–45 min)
- 20–31: **Chilly** (15–20 min)
- below 20: **Too cold** (potty breaks only)

Anything 50°F (10°C) or warmer is always comfy. Run `node test.js` to check it.

## Please note

This is a rough, friendly rule of thumb, **not veterinary advice**. Every dog is different. If your dog is shivering, lifting paws, or seems lethargic or confused, go inside, warm them up, and call your vet.

Ideas, fixes and breed-specific tweaks are very welcome. Open an issue! Related: [can-dogs-eat](https://github.com/imcharliethedog/can-dogs-eat), an open JSON list of foods dogs can and can't eat.

MIT licensed. Visit my dot world at [imcharliethedog.com](http://imcharliethedog.com/).
