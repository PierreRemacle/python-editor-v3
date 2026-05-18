/**
 * (c) 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */

import { fromByteArray } from "base64-js";
import { MAIN_FILE } from "./fs";

/**
 * We can now initialize a project with multiple files.
 * Handling is in place for backwards compatibility for V2 projects
 * where only the main file content is initialized as a string.
 */
export interface PythonProject {
  // File content as base64.
  files: Record<string, string>;
  projectName?: string;
}

/**
 *
 * @param project PythonProject.
 * @returns PythonProject where all file content has been converted to base64.
 */
export const projectFilesToBase64 = (
  files: Record<string, string>
): Record<string, string> => {
  for (const file in files) {
    files[file] = fromByteArray(new TextEncoder().encode(files[file]));
  }
  return files;
};

export const defaultMainFileContent = `# Imports go at the top
from microbit import *


# Code in a 'while True:' loop repeats forever
while True:
    display.show(Image.HEART)
    sleep(1000)
    display.scroll('Hello')
`;

export const panelModuleContent = `WIDTH = 16

def stripe_index(x, y):
    if y % 2 == 0:
        return (y + 1) * WIDTH - x - 1
    else:
        return y * WIDTH + x

def set_led(np, x, y, color):
    if 0 <= x < WIDTH and 0 <= y < WIDTH:
        np[stripe_index(x, y)] = color

FONT = {
    '0':[0b01110,0b10001,0b10001,0b10001,0b01110],
    '1':[0b00100,0b01100,0b00100,0b00100,0b01110],
    '2':[0b01110,0b10001,0b00110,0b01000,0b11111],
    '3':[0b01110,0b00001,0b01110,0b00001,0b01110],
    '4':[0b10001,0b10001,0b11111,0b00001,0b00001],
    '5':[0b11111,0b10000,0b11110,0b00001,0b11110],
    '6':[0b01110,0b10000,0b11110,0b10001,0b01110],
    '7':[0b11111,0b00001,0b00010,0b00100,0b01000],
    '8':[0b01110,0b10001,0b01110,0b10001,0b01110],
    '9':[0b01110,0b10001,0b01111,0b00001,0b01110],
    'A':[0b01110,0b10001,0b11111,0b10001,0b10001],
    'B':[0b11110,0b10001,0b11110,0b10001,0b11110],
    'C':[0b01110,0b10001,0b10000,0b10001,0b01110],
    'D':[0b11110,0b10001,0b10001,0b10001,0b11110],
    'E':[0b11111,0b10000,0b11110,0b10000,0b11111],
    'F':[0b11111,0b10000,0b11110,0b10000,0b10000],
    'G':[0b01110,0b10000,0b10110,0b10001,0b01110],
    'H':[0b10001,0b10001,0b11111,0b10001,0b10001],
    'I':[0b01110,0b00100,0b00100,0b00100,0b01110],
    'J':[0b00111,0b00001,0b00001,0b10001,0b01110],
    'K':[0b10001,0b10010,0b11100,0b10010,0b10001],
    'L':[0b10000,0b10000,0b10000,0b10000,0b11111],
    'M':[0b10001,0b11011,0b10101,0b10001,0b10001],
    'N':[0b10001,0b11001,0b10101,0b10011,0b10001],
    'O':[0b01110,0b10001,0b10001,0b10001,0b01110],
    'P':[0b11110,0b10001,0b11110,0b10000,0b10000],
    'Q':[0b01110,0b10001,0b10001,0b10011,0b01111],
    'R':[0b11110,0b10001,0b11110,0b10010,0b10001],
    'S':[0b01111,0b10000,0b01110,0b00001,0b11110],
    'T':[0b11111,0b00100,0b00100,0b00100,0b00100],
    'U':[0b10001,0b10001,0b10001,0b10001,0b01110],
    'V':[0b10001,0b10001,0b10001,0b01010,0b00100],
    'W':[0b10001,0b10001,0b10101,0b11011,0b10001],
    'X':[0b10001,0b01010,0b00100,0b01010,0b10001],
    'Y':[0b10001,0b01010,0b00100,0b00100,0b00100],
    'Z':[0b11111,0b00010,0b00100,0b01000,0b11111],
    ' ':[0b00000,0b00000,0b00000,0b00000,0b00000],
}

def panel_show(np, text, color, x=0, y=0):
    cx = x
    for char in text.upper():
        rows = FONT.get(char, FONT[' '])
        for row_idx, row_bits in enumerate(rows):
            for col in range(5):
                if row_bits & (1 << (4 - col)):
                    set_led(np, cx + col, y + row_idx, color)
        cx += 6
    np.show()
`;

export const defaultInitialProject: PythonProject = {
  files: projectFilesToBase64({
    [MAIN_FILE]: defaultMainFileContent,
    "panel.py": panelModuleContent,
  }),
};
