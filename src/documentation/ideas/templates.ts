export interface Template {
  slug: string;
  name: string;
  description: string;
  code: string;
}

const templates: Template[] = [
  {
    slug: "neopixel-setup",
    name: "NeoPixel setup",
    description: "Basic setup to initialise the LED panel on pin 0.",
    code: `from microbit import *
import neopixel

np = neopixel.NeoPixel(pin0, 256)

np[0] = (255, 0, 0)
np.show()
`,
  },
  {
    slug: "panel-show-text",
    name: "Show text on panel",
    description: "Display a word on the NeoPixel panel using panel_show.",
    code: `from microbit import *
import neopixel
from panel import panel_show

np = neopixel.NeoPixel(pin0, 256)

panel_show(np, "HI", (0, 200, 0), x=0, y=5)
`,
  },
  {
    slug: "button-led",
    name: "Button controls LED",
    description: "Light a pixel when button A is pressed.",
    code: `from microbit import *
import neopixel

np = neopixel.NeoPixel(pin0, 256)

while True:
    if button_a.is_pressed():
        np[0] = (255, 0, 0)
    else:
        np[0] = (0, 0, 0)
    np.show()
    sleep(50)
`,
  },
  {
    slug: "set-led-xy",
    name: "Light a pixel by (x, y)",
    description: "Use set_led to address pixels by grid coordinates.",
    code: `from microbit import *
import neopixel
from panel import set_led

np = neopixel.NeoPixel(pin0, 256)

set_led(np, 3, 5, (0, 0, 255))
np.show()
`,
  },
];

export default templates;
