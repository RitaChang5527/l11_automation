from pysnmp.hlapi import *
import time
import subprocess as sp
import socket
import traceback


            


apc = APC('192.168.0.10')
print(apc.set_ac(2, 'off'))
time.sleep(2)
print(apc.get_ac(2))