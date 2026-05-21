# STEM days — Réseaux et écrans LED avec micro:bit (2026)

Vous souhaitez développer un t-shirt lumineux pour cyclistes ou coureuses. Votre dispositif permettra d'envoyer des images d'un micro:bit à un autre afin de les afficher sur des écrans LED distants afin de toutes porter le même t-shirt. Pour ce faire, l'un des micro:bit sera le maître, il envoie les images aux autres qui sont appelés esclaves. Il s'agit de déterminer comment allumer chaque LED afin de constituer une image, le format des messages échangés entre les micro:bits et le protocole d'élection du maître.

## 1. Qu'est-ce que l'informatique?

L'informatique peut être définie sur base de 4 concepts:

- **Représentation des données**: comment stocker et encoder l'information
- **Algorithmique**: comment résoudre un problème étape par étape
- **Programmation**: comment écrire des instructions pour un ordinateur
- **Matériel**: les composants physiques qui exécutent les programmes

Aujourd'hui, nous allons aborder ces 4 aspects: représenter des couleurs, concevoir un algorithme pour dessiner des images, programmer un micro:bit, et utiliser un panneau de LEDs.

## 2. Qu'est-ce qu'un ordinateur?

Composants de base d'un ordinateur:

- processeur,
- mémoire de travail,
- mémoire à long terme,
- périphériques d'entrée-sorties.

![Composants d'un ordinateur](ordinateur-pieces.png)

Un ordinateur est précis et déterministe.
Il fait ce qu'on lui demande sur base d'instructions séquentielles.
Il effectue les instructions les unes après les autres.

Exemple de programmation: déplacement d'un chercheur de trésor dans un labyrinthe.

## 3. Qu'est-ce qu'un micro:bit?

Un micro:bit est un mini-ordinateur (microcontrôleur) de la taille d'une carte de crédit, conçu pour l'apprentissage de la programmation. Il possède les mêmes composants qu'un ordinateur classique (processeur, mémoire, entrées-sorties) intégrés sur une seule carte.

Le micro:bit dispose de:

- **25 LEDs** intégrées (grille 5x5) pour afficher des images et du texte
- **2 boutons** (A et B) pour interagir avec le programme
- **Des capteurs**: accéléromètre, boussole, température, luminosité
- **Une antenne radio** pour communiquer avec d'autres micro:bits
- **Des broches GPIO** (P0, P1, P2, ...) pour connecter des composants externes
- **Un port micro-USB** pour le brancher à un ordinateur

## 4. Premiers pas: programmation par blocs

Découvrons d'abord la programmation à l'aide de blocs.

Rendez-vous sur l'éditeur MakeCode: https://makecode.microbit.org/#editor

**Exercices:**

1. Affichez une séquence d'images sur les LEDs embarquées du micro:bit
2. Affichez une image uniquement si une condition est vérifiée (ex: le bouton A est appuyé)
3. Introduisez une boucle: tant qu'une condition est vraie, répétez une action
4. Ajoutez un compteur (variable) et affichez le nombre courant d'exécution de la boucle

## 5. Programmation en Python

Nous passons maintenant à la programmation textuelle. Nous utiliserons l'éditeur en ligne suivant: https://python.microbit.org/v/3

Le langage de programmation est Python (MicroPython).

La documentation pour MicroPython sur micro:bit est disponible ici:
https://microbit-micropython.readthedocs.io/fr/latest/

## 6. Le panneau de LEDs Neopixel

### 6.1 Présentation du matériel

L'écran de LED peut être contrôlé par le module Neopixel:
https://microbit-micropython.readthedocs.io/fr/latest/neopixel.html

Vous avez à votre disposition un écran de 16x16 LEDs, soit 256 LEDs au total.

Pour connecter l'écran de LED au micro:bit, nous utilisons la carte d'expansion DFRobot micro:Driver (DFR0548). La documentation de cette carte est disponible ici: https://wiki.dfrobot.com/Micro_bit_Driver_Expansion_Board_SKU_DFR0548

La carte d'expansion expose 9 broches GPIO du micro:bit (P0, P1, P2, P8, P12, P13, P14, P15, P16), chacune avec une connexion signal (S), alimentation (V) et masse (GND).

![Pinout carte d'expansion DFRobot](materiel/microbit-expansion-board/dfrobot-expansion-board-pinout.webp)

### 6.2 Branchement du matériel

Suivez ces étapes pour connecter le panneau de LEDs:

1. Glissez le micro:bit dans la carte d'expansion DFRobot, la grille de LEDs du micro:bit face au texte "Micro: bit Driver Expansion Board(V1.0)" de la carte
2. Alimentez la carte d'expansion via USB ou une batterie externe (3.5~5.5V DC)
3. Connectez l'écran de LED à la carte d'expansion à l'aide de 3 câbles dupont sur la rangée du pin P0:
   - câble V (alimentation) vers le 5V de l'écran LED
   - câble GND (masse) vers le GND de l'écran LED
   - câble S (signal) vers le pin DIN (data in) de l'écran LED
4. Vérifiez que vos branchements correspondent aux photos ci-dessous

![Branchement avec la carte DFRobot](branchement-dfrobot.jpg)

![Branchement LED](branchement-LED.jpg)

### 6.3 Éclairer une LED

Afin d'utiliser l'écran de LED, nous importons le module neopixel. Nous importons aussi tout le contenu du module microbit. Copiez le code suivant dans l'éditeur en ligne:

```python
from microbit import *
import neopixel
```

Le panneau est composé de 256 LEDs en tout, disposées sur 16 lignes et 16 colonnes. Nous créons l'objet `np` de type Neopixel qui va nous permettre d'accéder à ces lumières:

```python
np = neopixel.NeoPixel(pin0, 256)
```

Le premier paramètre indique que l'écran est branché sur le pin 0. Le second donne le nombre total de LEDs sur l'écran.

`np` est un tableau. La première LED se trouve à l'indice 0 (`np[0]`) et la dernière à l'indice 255 (`np[255]`).

Pour éclairer une LED, il faut indiquer la couleur souhaitée. La couleur est représentée par un triplet de 3 valeurs comprises entre 0 et 255: `(R, G, B)`. R représente l'intensité de rouge, G pour le vert (green) et B correspond au bleu. Voir la table des couleurs: https://www.rapidtables.com/web/color/RGB_Color.html

Ensuite, il faut appeler `np.show()` pour afficher les couleurs sur le panneau.

**Exemple:**

```python
from microbit import *
import neopixel

np = neopixel.NeoPixel(pin0, 256)

np[0] = (60, 0, 0)    # première LED en rouge
np[1] = (0, 60, 0)    # deuxième LED en vert
np[2] = (0, 0, 60)    # troisième LED en bleu
np.show()
```

**À vous de jouer:** Allumez quelques LEDs de couleurs différentes. Essayez d'allumer la LED numéro 16 — où apparaît-elle sur le panneau? Est-ce là où vous l'attendiez?

### 6.4 Comprendre le câblage en zigzag

Vous avez remarqué que la LED 16 n'apparaît pas là où on l'attendrait. C'est parce que la bande de LEDs est câblée en zigzag (serpentin) sur le panneau:

```
Vue de face du panneau (4 premières lignes):

Ligne 0 (paire):   LED 15 <- 14 <- 13 <- ... <- 2 <- 1 <- 0
                                                             |
Ligne 1 (impaire):  LED 16 -> 17 -> 18 -> ... -> 29 -> 30 -> 31
                                                              |
Ligne 2 (paire):   LED 47 <- 46 <- 45 <- ... <- 34 <- 33 <- 32
                                                             |
Ligne 3 (impaire):  LED 48 -> 49 -> 50 -> ... -> 61 -> 62 -> 63
                    ...

<- = de droite à gauche (lignes paires)
-> = de gauche à droite (lignes impaires)
```

Pour travailler plus facilement avec des coordonnées `(x, y)` au lieu d'un seul indice, nous avons besoin d'une fonction de conversion.

**Dérivons la formule ensemble:**

- Sur une ligne **impaire** (ex: y=1), les LEDs vont de gauche à droite. C'est simple: `index = y * 16 + x`
  - Exemple: le pixel (3, 1) est à l'indice 1\*16 + 3 = 19
- Sur une ligne **paire** (ex: y=0), les LEDs vont de droite à gauche. Il faut inverser: `index = (y+1) * 16 - x - 1`
  - Exemple: le pixel (0, 0) est à l'indice 1\*16 - 0 - 1 = 15

Voici la fonction complète:

```python
WIDTH = 16

def stripe_index(x, y):
    if y % 2 == 0:                       # ligne paire: droite à gauche
        return (y + 1) * WIDTH - x - 1
    else:                                # ligne impaire: gauche à droite
        return y * WIDTH + x

def set_led(np, x, y, color):
    if 0 <= x < WIDTH and 0 <= y < WIDTH:
        np[stripe_index(x, y)] = color
```

**Vérification:**

```python
# Allumer le pixel en haut à gauche (0,0) en rouge
# et le pixel juste à côté (1,0) en vert
set_led(np, 0, 0, (60, 0, 0))   # rouge en haut à gauche
set_led(np, 1, 0, (0, 60, 0))   # vert juste à droite
np.show()
```

### 6.5 Dessiner des formes

Maintenant que nous pouvons placer un pixel à une position (x, y), dessinons des formes.

**Exemple: une ligne horizontale de 5 pixels en bleu à la ligne 3:**

```python
for x in range(0, 5):
    set_led(np, x, 3, (0, 0, 60))
np.show()
```

**À vous de jouer:**

1. Dessinez une ligne verticale
2. Dessinez un carré
3. Dessinez une image de votre choix (utilisez la grille imprimée pour planifier votre dessin sur papier)

Des fonctions utilitaires existent déjà dans le fichier `drawing_functions.py`. Pour les utiliser:

```python
from drawing_functions import *
```

Fonctions disponibles: `set_led`, `draw_horizontal_line`, `draw_vertical_line`, `draw_rectangle`, `draw_square`, `clear`.

## 7. Communication radio entre micro:bits

### 7.1 Configurer la radio

Pour activer la communication sur le micro:bit, il faut tout d'abord importer le module `radio`:

```python
import radio
```

Ensuite, indiquez le groupe auquel appartient le micro:bit. Tous les micro:bit du même groupe peuvent communiquer entre eux. Le groupe est un entier compris entre 0 et 255.

```python
radio.config(group=23)
radio.on()
```

### 7.2 Envoyer et recevoir un message

Pour envoyer un message (une chaîne de caractères):

```python
radio.send("Salut!")
```

Pour recevoir un message:

```python
message = radio.receive()
```

Si aucun message n'a été reçu, `message` vaut `None`. Il faut donc vérifier:

```python
if message:
    # actions à effectuer lors de la réception d'un message
else:
    # actions si aucun message n'est reçu
```

`display.scroll(message)` permet d'afficher une chaîne de caractères à l'aide des LEDs intégrées du micro:bit.

**Exemple complet:**

```python
from microbit import *
import radio

radio.config(group=23)
radio.on()

while True:
    if button_a.was_pressed():
        radio.send("Salut!")

    message = radio.receive()
    if message:
        display.scroll(message)
```

**À vous de jouer:** Programmez deux micro:bits pour s'envoyer des messages et les afficher.

### 7.3 Format des messages — envoyer une image

Vous voulez maintenant envoyer une image d'un micro:bit à un autre pour l'afficher sur son panneau LED. Quelle information faut-il envoyer?

Réfléchissez aux différentes possibilités:

- Envoyer le nom d'une forme (ex: "carre")? Avantage: message court. Inconvénient: le récepteur doit connaître cette forme à l'avance.
- Envoyer un pixel à la fois avec sa position et sa couleur?
- Envoyer une liste de pixels?

Pour encoder des nombres dans un message texte, utilisez `str()` pour convertir en texte et `int()` pour reconvertir en nombre. Les fonctions `join()` et `split()` permettent d'assembler et de découper des chaînes de caractères:

```python
# Encoder un pixel (x=3, y=5, rouge=60, vert=0, bleu=0)
pixel = [str(3), str(5), str(60), str(0), str(0)]
message = ",".join(pixel)       # résultat: "3,5,60,0,0"

# Décoder le message reçu
parts = message.split(",")      # résultat: ["3", "5", "60", "0", "0"]
x = int(parts[0])               # 3
y = int(parts[1])               # 5
r = int(parts[2])               # 60
g = int(parts[3])               # 0
b = int(parts[4])               # 0
```

**À vous de jouer:** Programmez un micro:bit émetteur qui envoie les pixels d'une image et un micro:bit récepteur qui les affiche sur son panneau LED.

## 8. Bonus: Élection du leader

Si plusieurs micro:bits veulent afficher leur image, qui décide lequel envoie? Il faut un mécanisme pour élire un leader sans autorité centrale.

**Le principe:**

1. Chaque micro:bit choisit un nombre aléatoire entre 0 et 255
2. Ils échangent leurs nombres par radio
3. Celui avec le plus petit nombre devient le leader
4. En cas d'égalité, les micro:bits en conflit choisissent un nouveau nombre et recommencent

Pour choisir un nombre aléatoire:

```python
from random import randint
my_id = randint(0, 255)
```

**À vous de jouer:** Essayez d'implémenter ce mécanisme. Pensez aux questions suivantes:

- Comment lancer l'élection? (un bouton?)
- Quel format de message utiliser pour communiquer les nombres?
- Combien de temps attendre les réponses des autres micro:bits?

## Liens utiles

- Éditeur MakeCode: https://makecode.microbit.org/#editor
- Éditeur Python micro:bit: https://python.microbit.org/v/3
- Documentation MicroPython: https://microbit-micropython.readthedocs.io/fr/latest/
- Documentation Neopixel: https://microbit-micropython.readthedocs.io/fr/latest/neopixel.html
- Table des couleurs RGB: https://www.rapidtables.com/web/color/RGB_Color.html
- Piskel (éditeur de pixel art): https://www.piskelapp.com/p/create/sprite
- Documentation carte DFRobot DFR0548: https://wiki.dfrobot.com/Micro_bit_Driver_Expansion_Board_SKU_DFR0548