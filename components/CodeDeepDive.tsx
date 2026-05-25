import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const hsvToRgb = (h: number, s: number, v: number) => {
  const sat = s / 100;
  const val = v / 100;
  const c = val * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = val - c;
  let rPrime = 0, gPrime = 0, bPrime = 0;
  if (h >= 0 && h < 60) { rPrime = c; gPrime = x; }
  else if (h >= 60 && h < 120) { rPrime = x; gPrime = c; }
  else if (h >= 120 && h < 180) { gPrime = c; bPrime = x; }
  else if (h >= 180 && h < 240) { gPrime = x; bPrime = c; }
  else if (h >= 240 && h < 300) { rPrime = x; bPrime = c; }
  else { rPrime = c; bPrime = x; }
  return { r: Math.round((rPrime + m) * 255), g: Math.round((gPrime + m) * 255), b: Math.round((bPrime + m) * 255) };
};

const toHex = (value: number) => value.toString(16).padStart(2, '0');
const rgbToHex = ({ r, g, b }: { r: number; g: number; b: number }) => `#${toHex(r)}${toHex(g)}${toHex(b)}`;

const t = {
  hu: {
    title: 'Kód a Gép Mögött.',
    subtitle: 'Nem csak "megy". Gondolkodik, érzékel és korrigál. A szoftverünk struktúrája és logikája.',
    hsvBadge: 'HSV Alapú Módszer',
    hsvTitle: 'Színszenzor alapú HSV érzékelés',
    hsvDesc: 'A roboton lévő színszenzor a kiegészítőn lévő színkódot olvassa be, miközben a nyomásérzékelő indítja a folyamatot. A beolvasott HSV érték alapján a rendszer kiválasztja a megfelelő run-t, majd automatikusan futtatja a küldetést.',
    hsvKey: 'Működési kulcs',
    hsvKeyDesc: 'Nyomásérzékelő indítás → HSV olvasás → trigger illesztés → run akció.',
    calLabel: 'Kalibráció',
    calDesc: 'A `color_calibration.py` létrehozza a színtartományokat, így a felismerés stabil marad eltérő fényben is.',
    hsvFlow: [
      { id: '01', label: 'Nyomásérzékelés', detail: 'A kiegészítő lenyomja a Force Sensort.' },
      { id: '02', label: 'HSV Beolvasás', detail: 'A színszenzor rögzíti a H, S, V értékeket.' },
      { id: '03', label: 'Trigger Illesztés', detail: 'A minta összevetése a COLOR_RANGES tartományokkal.' },
      { id: '04', label: 'Run Indítás', detail: 'A kapcsolt run függvény automatikusan lefut.' },
    ],
    whatIsHsvBadge: 'Laikus Magyarázat',
    whatIsHsvTitle: 'Mi az a HSV?',
    whatIsHsvDesc: 'A HSV egy színleíró rendszer. A robot nem azt nézi, hogy egy szín "pirosnak látszik-e", hanem pontos számokkal dolgozik: árnyalat, telítettség és fényesség. Ettől lesz stabilabb a felismerés.',
    hComp: { label: 'H - Hue', desc: 'Melyik szín? (0-360 fok)' },
    sComp: { label: 'S - Saturation', desc: 'Mennyire élénk vagy fakó?' },
    vComp: { label: 'V - Value', desc: 'Mennyire világos vagy sötét?' },
    calRangeLabel: 'Kalibrációs tartomány példa',
    interactiveTitle: 'Interaktív HSV keverő',
    hexLabel: 'Hex',
    rgbLabel: 'RGB',
    interpretLabel: 'Értelmezés',
    hueSlider: 'Hue (árnyalat)',
    satSlider: 'Saturation (telítettség)',
    valSlider: 'Value (fényesség)',
    openCodeBtn: 'Kód megnyitása',
    closeBtn: 'Bezárás',
    codeCards: [
      {
        file: 'menu.py',
        title: 'Menü és Programválasztó',
        tags: ['Programválasztás', 'Színtrigger', 'Futásvezérlés'],
        description: 'A központi vezérlőmodul: itt történik a szín alapján kiválasztott futások indítása, az időmérés és a visszajelzés kezelése. A kód figyeli az érintést, azonosítja a színkódot, majd a megfelelő küldetésrutint futtatja.',
        previewAnchor: 'def get_detected_color():',
      },
      {
        file: 'color_trigger.py',
        title: 'Color Trigger Logika',
        tags: ['HSV', 'Trigger Rule', 'Action Dispatch'],
        description: 'Ez az osztály egyetlen helyre szervezi a színillesztés szabályait és a futáshoz tartozó akciót. Ha a mért HSV tartomány egyezik, a kapcsolt küldetésfüggvény közvetlenül meghívható.',
        previewAnchor: 'def run_action(self, *args, **kwargs):',
      },
      {
        file: 'Battery.py',
        title: 'Akkumulátor Ellenőrző',
        tags: ['Feszültség', 'Töltöttség', 'Start Check'],
        description: 'A futás előtt lekéri a Hub akkufeszültségét, majd százalékos becslést számol. Így gyorsan látható, hogy a robot alkalmas-e stabil versenyfutásra.',
        previewAnchor: '# Átalakítás százalékra',
      },
      {
        file: 'color_calibration.py',
        title: 'Színszenzor Kalibráló',
        tags: ['Színminta', 'Kalibráció', 'Pontosság'],
        description: 'A kalibráló lépés futásonként eltárolja a színek HSV-értékeit, majd automatikusan generálja a végső tartomány-konfigurációt. Ezzel csökkenthető a hibás színfelismerés változó fényviszonyoknál.',
        previewAnchor: 'for color_name in COLOR_NAMES:',
      },
    ],
    colorHint: (h: number, s: number, v: number): string => {
      if (v < 15) return 'Nagyon sötét (közel fekete)';
      if (s < 15 && v > 85) return 'Világos, alacsony telítettség (közel fehér)';
      if (s < 20) return 'Alacsony telítettség (szürkés árnyalat)';
      if (h < 20 || h >= 340) return 'Vörös tartomány';
      if (h < 45) return 'Narancs tartomány';
      if (h < 70) return 'Sárga tartomány';
      if (h < 160) return 'Zöld tartomány';
      if (h < 210) return 'Cián tartomány';
      if (h < 270) return 'Kék tartomány';
      if (h < 320) return 'Lila tartomány';
      return 'Magenta tartomány';
    },
  },
  en: {
    title: 'The Code Behind the Machine.',
    subtitle: 'It doesn\'t just "go". It thinks, senses, and corrects. The structure and logic of our software.',
    hsvBadge: 'HSV-Based Method',
    hsvTitle: 'HSV Color Sensor Detection',
    hsvDesc: 'The color sensor on the robot reads the color code on the attachment, while the force sensor triggers the process. Based on the measured HSV value, the system selects the correct run and automatically executes the mission.',
    hsvKey: 'How it works',
    hsvKeyDesc: 'Force sensor trigger → HSV reading → trigger match → run action.',
    calLabel: 'Calibration',
    calDesc: 'The `color_calibration.py` file creates the color ranges, keeping detection stable under different lighting conditions.',
    hsvFlow: [
      { id: '01', label: 'Force Detection', detail: 'The attachment presses the Force Sensor.' },
      { id: '02', label: 'HSV Reading', detail: 'The color sensor records H, S, V values.' },
      { id: '03', label: 'Trigger Match', detail: 'Pattern matched against COLOR_RANGES.' },
      { id: '04', label: 'Run Launch', detail: 'The linked run function executes automatically.' },
    ],
    whatIsHsvBadge: 'Plain English Explanation',
    whatIsHsvTitle: 'What is HSV?',
    whatIsHsvDesc: 'HSV is a color description system. The robot doesn\'t check whether a color "looks red" — it works with precise numbers: hue, saturation, and brightness. This makes detection more stable.',
    hComp: { label: 'H - Hue', desc: 'Which color? (0-360 degrees)' },
    sComp: { label: 'S - Saturation', desc: 'How vivid or faded?' },
    vComp: { label: 'V - Value', desc: 'How light or dark?' },
    calRangeLabel: 'Calibration range example',
    interactiveTitle: 'Interactive HSV mixer',
    hexLabel: 'Hex',
    rgbLabel: 'RGB',
    interpretLabel: 'Interpretation',
    hueSlider: 'Hue',
    satSlider: 'Saturation',
    valSlider: 'Value (brightness)',
    openCodeBtn: 'View Code',
    closeBtn: 'Close',
    codeCards: [
      {
        file: 'menu.py',
        title: 'Menu and Program Selector',
        tags: ['Program Selection', 'Color Trigger', 'Run Control'],
        description: 'The central control module: this handles launching runs selected by color, timing, and feedback management. The code monitors touch, identifies the color code, and then runs the appropriate mission routine.',
        previewAnchor: 'def get_detected_color():',
      },
      {
        file: 'color_trigger.py',
        title: 'Color Trigger Logic',
        tags: ['HSV', 'Trigger Rule', 'Action Dispatch'],
        description: 'This class organizes the color matching rules and the run action in one place. If the measured HSV range matches, the linked mission function can be called directly.',
        previewAnchor: 'def run_action(self, *args, **kwargs):',
      },
      {
        file: 'Battery.py',
        title: 'Battery Checker',
        tags: ['Voltage', 'Charge Level', 'Start Check'],
        description: 'Before a run it reads the Hub battery voltage and calculates a percentage estimate. This quickly shows whether the robot is fit for a stable competition run.',
        previewAnchor: '# Átalakítás százalékra',
      },
      {
        file: 'color_calibration.py',
        title: 'Color Sensor Calibrator',
        tags: ['Color Sample', 'Calibration', 'Accuracy'],
        description: 'The calibration step stores HSV values for each color per run, then automatically generates the final range configuration. This reduces false color detection under varying lighting.',
        previewAnchor: 'for color_name in COLOR_NAMES:',
      },
    ],
    colorHint: (h: number, s: number, v: number): string => {
      if (v < 15) return 'Very dark (near black)';
      if (s < 15 && v > 85) return 'Light, low saturation (near white)';
      if (s < 20) return 'Low saturation (grayish tone)';
      if (h < 20 || h >= 340) return 'Red range';
      if (h < 45) return 'Orange range';
      if (h < 70) return 'Yellow range';
      if (h < 160) return 'Green range';
      if (h < 210) return 'Cyan range';
      if (h < 270) return 'Blue range';
      if (h < 320) return 'Purple range';
      return 'Magenta range';
    },
  },
};

const codeContent: Record<string, string> = {
  'menu.py': `#portok
#A-gomb
#B-bal fenti motor
#C-bal kerek motor
#D-jobb kerek motor
#E-szinerzekelo
#f-jobb fenti motor

from pybricks.pupdevices import ColorSensor, ForceSensor
from pybricks.parameters import Port, Button, Color, Direction, Icon
from pybricks.tools import wait, StopWatch
from COLOR_RANGES import COLOR_RANGES

from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor

from color_trigger import ColorTrigger

from _1_futas import run__1_futas
from _2_futas  import run__2_futas
from _3_futas import run__3_futas
from _4_futas import run__4_futas
from _5_futas import run__5_futas
from _6_futas  import run__6_futas
from _7_futas import run__7_futas
from _8_futas import run__8_futas
from _9_futas import run__9_futas
from _10_futas import run__10_futas

# Motor konfiguráció
from motor_config import motor_config,MotorConfig
# importáljuk a segítő függvényeket
from util import play_bad,play_finish,play_good, in_range

# Initialize the force sensor
force_sensor = ForceSensor(Port.A)

# Initialize the color sensor.
sensor = ColorSensor(Port.E)
hub = PrimeHub()
hub.speaker.volume(100)
# inicalizáljuk az órát
stopwatch = StopWatch()

def init_motor_conf():
    motor_config= MotorConfig(
        left_motor = Motor(Port.C, Direction.COUNTERCLOCKWISE),
        right_motor = Motor(Port.D),
        a_motor = Motor(Port.B),
        b_motor = Motor(Port.F),
        )

def get_detected_color():
    while True:
        color = sensor.hsv()

        for name, trigger in COLOR_RANGES.items():
            if in_range(color=color, range=trigger):
                play_good(hub=hub)
                hub.display.char(name)
                print(f"GOT IT - running {name}")
                hub.system.set_stop_button(Button.CENTER)

                return name, trigger

        print("NOT FOUND")
        return None, None

def stop_motor():
    motor_config.a_motor.stop()
    motor_config.b_motor.stop()
    motor_config.left_motor.stop()
    motor_config.right_motor.stop()

def close_motors():
    motor_config.a_motor.close()
    motor_config.b_motor.close()
    motor_config.left_motor.close()
    motor_config.right_motor.close()

change_time = stopwatch.time()
total_run = 0
total_change = 0
while True:
    press = force_sensor.pressed(force=2)
    if press:
        run_number, color_trigger = get_detected_color()
        run_time = stopwatch.time()

        if run_number:
            if run_number == "1":
                change_time = stopwatch.time()
            else:
                print(f"\\nChange time before {run_number}: {(run_time-change_time)/1000}s\\n")
                total_change += (run_time - change_time)
            color_trigger.run_action(motor_config)

            stop_motor()
            close_motors()
            play_finish(hub=hub)
            change_time = stopwatch.time()
            total_run += (change_time-run_time)
            print(f"\\nrun time for {run_number}: {(change_time-run_time)/1000}s\\n")
            if run_number == "0":
                print(f"\\n\\nTOTAL RUN: {total_run/1000}s")
                print(f"AVERAGE CHANGE: {total_change/9000}s")
                print(f"TOTAL CHANGE: {total_change/1000}s")
                print(f"TOTAL: {(total_run+total_change)/1000}s\\n\\n")
            init_motor_conf()
        else:
            play_bad(hub=hub)
            continue

    wait(200)`,
  'color_trigger.py': `class ColorTrigger:
    """
    Represents a color-matching rule based on HSV ranges.

    A ColorTrigger defines:
    - A hue range
    - A saturation range
    - A value (brightness) range
    - An optional action that is executed when the color matches

    @param h: Tuple (min, max) hue range
    @param s: Tuple (min, max) saturation range
    @param v: Tuple (min, max) value range
    @param action: Optional callable to execute when the rule matches (it will be name of the run)
    """
    def __init__(self, h, s, v, action=None):
        self.h = h
        self.s = s
        self.v = v
        self.action = action

    def run_action(self, *args, **kwargs):
        if self.action:
            self.action(*args, **kwargs)`,
  'Battery.py': `from pybricks.hubs import PrimeHub

# Hub inicializálása
hub = PrimeHub()

# Akku feszültség lekérése millivoltban
battery_mv = hub.battery.voltage()

print(battery_mv)

# Feltételezett teljes akku feszültség (Spike Prime esetén kb. 9500 mV)
full_battery_mv = 8400

# Átalakítás százalékra
battery_percent = (battery_mv / full_battery_mv) * 100
battery_percent = int(battery_percent)  # egész számra kerekítés

# Kiírás a terminálra
print("Hub töltöttségi szintje:", battery_percent, "%")`,
  'color_calibration.py': `from pybricks.pupdevices import ColorSensor, ForceSensor
from pybricks.parameters import Port, Button, Color
from pybricks.hubs import PrimeHub
from pybricks.tools import wait
# Initialize the force sensor
force_sensor = ForceSensor(Port.A)

# Initialize the color sensor.
sensor = ColorSensor(Port.E)

hub = PrimeHub()

COLOR_NAMES = ["1","2","3","4","5","6","7","8","9","0"]

FINAL_COLOR_CONFIG = "\\nCOLOR_RANGES = {\\n"
HUE_CORRECTION_RANGE = 2
SATURATION_CORRECTION_RANGE = 15
VALUE_CORRECTION_RANGE = 30

def generate_range_tuple_from_reading(value: int, correction_range: int):
    return (value - correction_range, value + correction_range)


for color_name in COLOR_NAMES:
    print(f"Waiting for press for {color_name}...")

    while not force_sensor.pressed(force=2):
        wait(10)

    hsv_value = sensor.hsv()
    print(f'"{color_name}" pressed, HSV reading: {hsv_value}')

    run_number = color_name if color_name != "0" else "10"

    FINAL_COLOR_CONFIG += (f'\\t"{color_name}" : ' +
        f'ColorTrigger(' +
        f'{generate_range_tuple_from_reading(hsv_value.h, HUE_CORRECTION_RANGE)}, ' +
        f'{generate_range_tuple_from_reading(hsv_value.s, SATURATION_CORRECTION_RANGE)}, ' +
        f'{generate_range_tuple_from_reading(hsv_value.v, VALUE_CORRECTION_RANGE)}, ' +
        f'action = run__{run_number}_futas), \\n')

    while force_sensor.pressed(force=2):
        wait(10)

FINAL_COLOR_CONFIG += "}"
print(FINAL_COLOR_CONFIG)`,
};

const getCodePreview = (code: string, previewAnchor?: string) => {
  const lines = code.split('\n');
  const previewLength = 14;
  if (previewAnchor) {
    const anchorIndex = lines.findIndex((line) => line.includes(previewAnchor));
    if (anchorIndex >= 0) {
      const anchorStart = Math.max(0, anchorIndex - 4);
      return lines.slice(anchorStart, anchorStart + previewLength).join('\n');
    }
  }
  const middleStart = Math.max(0, Math.floor((lines.length - previewLength) / 2));
  return lines.slice(middleStart, middleStart + previewLength).join('\n');
};

const CodeDeepDive: React.FC = () => {
  const { lang } = useLanguage();
  const c = t[lang];
  const [activeCardFile, setActiveCardFile] = useState<string | null>(null);
  const [demoH, setDemoH] = useState(32);
  const [demoS, setDemoS] = useState(88);
  const [demoV, setDemoV] = useState(92);

  const mixedRgb = hsvToRgb(demoH, demoS, demoV);
  const mixedHex = rgbToHex(mixedRgb);
  const fullSatHex = rgbToHex(hsvToRgb(demoH, 100, demoV));
  const fullValueHex = rgbToHex(hsvToRgb(demoH, demoS, 100));
  const colorHint = c.colorHint(demoH, demoS, demoV);

  const hueMin = Math.max(0, demoH - 2);
  const hueMax = Math.min(360, demoH + 2);
  const satMin = Math.max(0, demoS - 15);
  const satMax = Math.min(100, demoS + 15);
  const valMin = Math.max(0, demoV - 30);
  const valMax = Math.min(100, demoV + 30);

  const activeCard = activeCardFile ? c.codeCards.find(card => card.file === activeCardFile) : null;

  useEffect(() => {
    if (!activeCard) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveCardFile(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [activeCard]);

  return (
    <>
      <section id="code" className="py-32 bg-[#000000] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">{c.title}</h2>
            <p className="text-xl text-gray-400 max-w-2xl">{c.subtitle}</p>
          </div>

          {/* HSV Method article */}
          <article className="mb-12 rounded-3xl border border-[#2997FF]/35 bg-gradient-to-br from-[#11151d] via-[#111111] to-[#151515] overflow-hidden shadow-[0_20px_70px_rgba(41,151,255,0.12)]">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-3 p-7 md:p-9">
                <span className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-semibold text-[#7cc0ff] mb-4">
                  {c.hsvBadge}
                </span>
                <h3 className="text-3xl md:text-4xl font-semibold text-white mb-4">{c.hsvTitle}</h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl mb-6">{c.hsvDesc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-gray-700/70 bg-black/35 p-4">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400 mb-2">{c.hsvKey}</p>
                    <p className="text-sm text-gray-200 leading-relaxed">{c.hsvKeyDesc}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-700/70 bg-black/35 p-4">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400 mb-2">{c.calLabel}</p>
                    <p className="text-sm text-gray-200 leading-relaxed">{c.calDesc}</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-gray-800 bg-[#0b0b0d] p-7 md:p-9 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#2997FF]/20 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="relative space-y-3">
                  {c.hsvFlow.map((step) => (
                    <div key={step.id} className="rounded-xl border border-gray-700/80 bg-black/55 p-3.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono text-[#7cc0ff]">STEP {step.id}</span>
                        <span className="h-2 w-2 rounded-full bg-[#2997FF]" />
                      </div>
                      <p className="text-sm text-white font-medium">{step.label}</p>
                      <p className="text-xs text-gray-400 mt-1">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* HSV Explainer article */}
          <article className="mb-12 rounded-3xl border border-gray-800 bg-[#121214] overflow-hidden">
            <div className="grid grid-cols-1 xl:grid-cols-2">
              <div className="p-7 md:p-9 border-b xl:border-b-0 xl:border-r border-gray-800">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#2997FF]/15 text-[#7cc0ff] text-xs font-semibold tracking-[0.12em] uppercase mb-4">
                  {c.whatIsHsvBadge}
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">{c.whatIsHsvTitle}</h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">{c.whatIsHsvDesc}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  <div className="rounded-xl border border-gray-700/80 bg-black/40 p-4">
                    <p className="text-xs font-semibold text-[#ff9a9a] mb-1">{c.hComp.label}</p>
                    <p className="text-sm text-gray-300">{c.hComp.desc}</p>
                  </div>
                  <div className="rounded-xl border border-gray-700/80 bg-black/40 p-4">
                    <p className="text-xs font-semibold text-[#9ac7ff] mb-1">{c.sComp.label}</p>
                    <p className="text-sm text-gray-300">{c.sComp.desc}</p>
                  </div>
                  <div className="rounded-xl border border-gray-700/80 bg-black/40 p-4">
                    <p className="text-xs font-semibold text-[#ffe39a] mb-1">{c.vComp.label}</p>
                    <p className="text-sm text-gray-300">{c.vComp.desc}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-700/80 bg-black/35 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-gray-400 mb-3">{c.calRangeLabel}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="rounded-lg bg-[#1a1a1d] p-3 border border-gray-800">
                      <p className="text-[11px] text-gray-400 mb-1">Hue ±2</p>
                      <p className="font-mono text-sm text-white">{hueMin} - {hueMax}</p>
                    </div>
                    <div className="rounded-lg bg-[#1a1a1d] p-3 border border-gray-800">
                      <p className="text-[11px] text-gray-400 mb-1">Saturation ±15</p>
                      <p className="font-mono text-sm text-white">{satMin} - {satMax}</p>
                    </div>
                    <div className="rounded-lg bg-[#1a1a1d] p-3 border border-gray-800">
                      <p className="text-[11px] text-gray-400 mb-1">Value ±30</p>
                      <p className="font-mono text-sm text-white">{valMin} - {valMax}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-7 md:p-9 bg-gradient-to-b from-[#0f0f11] to-[#11141b]">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold">{c.interactiveTitle}</h4>
                  <span className="text-xs text-gray-400 font-mono">HSV({demoH}, {demoS}, {demoV})</span>
                </div>
                <div className="rounded-2xl border border-gray-700/80 bg-black/40 p-4 mb-6">
                  <div className="h-28 rounded-xl border border-gray-700" style={{ backgroundColor: mixedHex }} />
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg bg-[#1a1a1d] border border-gray-800 px-3 py-2">
                      <p className="text-[11px] text-gray-400 mb-1">{c.hexLabel}</p>
                      <p className="font-mono text-white">{mixedHex}</p>
                    </div>
                    <div className="rounded-lg bg-[#1a1a1d] border border-gray-800 px-3 py-2">
                      <p className="text-[11px] text-gray-400 mb-1">{c.rgbLabel}</p>
                      <p className="font-mono text-white">{mixedRgb.r}, {mixedRgb.g}, {mixedRgb.b}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">{c.interpretLabel}: {colorHint}</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-gray-300">{c.hueSlider}</span>
                      <span className="font-mono text-[#7cc0ff]">{demoH}</span>
                    </div>
                    <input type="range" min={0} max={360} value={demoH} onChange={(e) => setDemoH(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{ background: 'linear-gradient(90deg, #ff3b30 0%, #ff9500 16%, #ffcc00 32%, #34c759 48%, #32ade6 64%, #5856d6 80%, #ff2d55 100%)' }} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-gray-300">{c.satSlider}</span>
                      <span className="font-mono text-[#7cc0ff]">{demoS}</span>
                    </div>
                    <input type="range" min={0} max={100} value={demoS} onChange={(e) => setDemoS(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{ background: `linear-gradient(90deg, #9ca3af 0%, ${fullSatHex} 100%)` }} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-gray-300">{c.valSlider}</span>
                      <span className="font-mono text-[#7cc0ff]">{demoV}</span>
                    </div>
                    <input type="range" min={0} max={100} value={demoV} onChange={(e) => setDemoV(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{ background: `linear-gradient(90deg, #000000 0%, ${fullValueHex} 100%)` }} />
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Code cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {c.codeCards.map((card) => (
              <article key={card.file} className="bg-[#1D1D1F] rounded-3xl p-1 border border-gray-800 transition-colors duration-300 hover:border-[#2997FF]/70 h-full">
                <div className="bg-[#111111] px-6 py-4 rounded-t-[1.3rem] flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs font-mono text-gray-400">{card.file}</span>
                </div>
                <div className="p-6 md:p-8 h-full flex flex-col">
                  <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-[#2997FF]/20 text-[#2997FF] text-xs font-bold rounded-md">{tag}</span>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">{card.description}</p>
                  <button type="button" onClick={() => setActiveCardFile(card.file)} className="w-full text-left group mt-auto" aria-label={`${card.file} open`}>
                    <div className="relative bg-black rounded-xl border border-gray-800 overflow-hidden transition-colors group-hover:border-[#2997FF]/70">
                      <pre className="p-5 text-[12px] md:text-[13px] leading-relaxed text-[#f5f5f7] font-mono overflow-hidden max-h-[260px] opacity-45 select-none pointer-events-none">
                        <code>{getCodePreview(codeContent[card.file] ?? '', card.previewAnchor)}</code>
                      </pre>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/35 to-black" />
                      <div className="absolute inset-x-0 bottom-4 flex justify-center">
                        <span className="px-4 py-2 rounded-full bg-white text-black text-xs font-semibold shadow-md group-hover:bg-[#2997FF] group-hover:text-white transition-colors">
                          {c.openCodeBtn}
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeCard && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
          onClick={() => setActiveCardFile(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCard.file} code view`}
        >
          <div
            className="w-full max-w-6xl max-h-[90vh] bg-[#161618] border border-gray-700 rounded-3xl overflow-hidden shadow-2xl shadow-black/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0f0f11] px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs font-mono text-gray-400">{activeCard.file}</span>
              </div>
              <button type="button" className="px-3 py-1.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors" onClick={() => setActiveCardFile(null)}>
                {c.closeBtn}
              </button>
            </div>
            <div className="p-6 md:p-8 overflow-auto max-h-[calc(90vh-74px)]">
              <h3 className="text-2xl md:text-3xl font-semibold mb-3">{activeCard.title}</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-5 max-w-3xl">{activeCard.description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {activeCard.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-[#2997FF]/20 text-[#2997FF] text-xs font-bold rounded-md">{tag}</span>
                ))}
              </div>
              <div className="bg-black rounded-xl border border-gray-800 overflow-hidden">
                <pre className="p-5 text-[12px] md:text-[13px] leading-relaxed text-[#f5f5f7] font-mono overflow-x-auto">
                  <code>{codeContent[activeCard.file] ?? ''}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CodeDeepDive;
