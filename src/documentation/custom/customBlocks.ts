import { CustomSection } from "./model";

const customBlocks: CustomSection[] = [
  {
    slug: "led-panel",
    name: "LED Panel",
    blocks: [
      {
        slug: "stripe-index",
        title: "XY to LED index (serpentine)",
        description: "Convert (x, y) coordinates to a NeoPixel index for a 16-wide serpentine strip.",
        code: `WIDTH = 16

def stripe_index(x, y):
    if y % 2 == 0:
        return (y + 1) * WIDTH - x - 1
    else:
        return y * WIDTH + x

def set_led(np, x, y, color):
    if 0 <= x < WIDTH and 0 <= y < WIDTH:
        np[stripe_index(x, y)] = color`,
      },
      {
        slug: "panel-show-call",
        title: "panel_show() — display text on panel",
        description: "Show letters or numbers on the NeoPixel panel. panel.py is already in your project.",
        code: `from panel import panel_show

panel_show(np, "HI", (0, 200, 0), x=0, y=5)`,
      },
    ],
  },
];

export default customBlocks;
