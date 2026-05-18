def stripe_index(x, y):
    if y % 2 == 0:                       # ligne paire: droite à gauche
        return (y + 1) * WIDTH - x - 1
    else:                                # ligne impaire: gauche à droite
        return y * WIDTH + x

def set_led(np, x, y, color):
    if 0 <= x < WIDTH and 0 <= y < WIDTH:
        np[stripe_index(x, y)] = color
