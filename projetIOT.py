#!/usr/bin/python
import sys
import Adafruit_DHT #Bibliothèque python pour obtenir les valeurs mesuré par le DHT11
import time
import RPi.GPIO as GPIO
import picamera #Bibliothèque python permet d'utiliser "Camera" 
camera = picamera.PiCamera() #Init camera
import paho.mqtt.publish as publish

BuzzPin = 24 # utiliser le pin 24 pour le buzzer
MicPin = 17 # utiliser le pin 17 pour le mic
#Utiliser Mode BCM
GPIO.setmode(GPIO.BCM)
#Configurer le sound detector
GPIO.setup(MicPin, GPIO.IN)
#Configurer le Buzzer
GPIO.setup(BuzzPin, GPIO.OUT)
GPIO.output(BuzzPin, GPIO.LOW)


mode = 0
def set_globvar_to_one():
    global mode   # Needed to modify global copy of mode
    mode = 1

def set_globvar_to_zero():
    global mode    # Needed to modify global copy of mode
    mode = 0

def callback(MicPin): #Detecter un son
    GPIO.output(BuzzPin, GPIO.LOW)
    camera.stop_recording()
    camera.stop_preview()   
    set_globvar_to_zero()
    

while(True and mode==0):
    humidity, temperature = Adafruit_DHT.read_retry(11, 4) #Detection température
    
    if humidity is not None and temperature is not None:
       print ('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))
       if temperature>18:
           GPIO.output(BuzzPin, GPIO.HIGH) #emit sound when detect sound
           camera.start_preview()
           camera.start_recording('video.h264')
           publish.single("hello", "A problem, Harry up!", hostname="192.168.1.13")
           set_globvar_to_one()
           
           GPIO.add_event_detect(MicPin, GPIO.BOTH, bouncetime=300)  # let us know when the pin goes HIGH or LOW
           GPIO.add_event_callback(MicPin, callback)  # assign function to GPIO PIN, Run function on change
           
    else:
       print ('Failed to get reading. Try again!')

    time.sleep(0.5)


# infinite loop
while True:
    time.sleep(1)


