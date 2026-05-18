from colors import *

def cadre():
    
    for i in range (16):
        set_led(np,i,0,bleu)

    for i in range (16):
        set_led(np,0,i,bleu) 
    
    for i in range (16):
        set_led(np,i,15,bleu)
    
    for i in range(8):
        np[32* i] = (100,100,100)
        np[ 32*i+31] = (100,100,100)