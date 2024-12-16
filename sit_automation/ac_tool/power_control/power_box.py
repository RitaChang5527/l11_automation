import serial.tools.list_ports
import serial
import time
import traceback
import abc
import socket
import subprocess as sp
from abc import ABC, abstractclassmethod
from pysnmp.hlapi import *
import os

class PowerCCII:
    def __init__(self, com_port='', baud_rate=9600):
        self.com_port = com_port
        self.baud_rate = baud_rate
        self.ser = None

    @staticmethod
    def search():
        com_ports = serial.tools.list_ports.comports()
        if len(com_ports) == 0:
            return '', ''
        for port, desc, hwid in sorted(com_ports):
            print(desc)
            if "Prolific USB-to-Serial" in desc:
                try:
                    ser = serial.Serial(port, 9600, timeout=0.5)
                    if ser.isOpen():
                        ser.close()
                    ser.open()
                    ser.write(b'\x63')
                    time.sleep(0.5)
                    data = ord(ser.read(1))
                    print(data)
                    if data <= 57:
                        box_num = str(data)
                    elif 71 <= data <= 80:
                        box_num = 'L' + str(data - 30) + '(1P)'
                    elif 81 <= data <= 90:
                        box_num = 'L0' + str(data - 80)
                    elif 101 <= data <= 130:
                        box_num = 'L' + str(data - 90)
                    elif 59 <= data <= 60:
                        box_num = 'L' + str(data - 20)
                    else:
                        #self.ser = None
                        #self.com_port = ''
                        return '', ''
                    #print(box_num)
                    #self.ser = ser
                    #self.com_port = port
                    return port, box_num

                except Exception as e:                    
                    traceback.print_exc()
                    return '', ''
                    

    def connect(self):
        self.ser = serial.Serial(self.com_port, self.baud_rate, timeout=0.5)
        if self.ser.isOpen():
            self.ser.close()
        self.ser.open()

    def disconnect(self):
        self.ser.close()

    def clear_status(self):
        self.ser.write(b'\x00')

    def set_ac(self, port:int, state:str):
        if state.lower() == 'on':
            self.ser.write(b'\x02')
        elif state.lower() == 'off':
            self.ser.write(b'\x07')
        if port == 1:
            self.ser.write(b'\x01')
            self.ser.write(b'\x00')
        elif port == 2:
            self.ser.write(b'\x00')
            self.ser.write(b'\x01')

    def set_power_button(self, port:int):
        self.ser.write(b'\x06')
        if port == 1:
            self.ser.write(b'\x01')
            self.ser.write(b'\x00')
        elif port == 2:
            self.ser.write(b'\x00')
            self.ser.write(b'\x01')
        time.sleep(0.5)
        self.ser.write(b'\x62')


class PowerCCIII:
    def __init__(self, address):
        self.address = address
        self.port = 5901
        self.box = None

    def connect(self):
        try:
            ping_status,result = sp.getstatusoutput(f'ping -n 2 -w 1000 {self.address}')
            #status = ping(self.address)
            #status = os.system(f'ping -n 2 -w 1000 {self.address}')
            if result.count('TTL') == 2:
                status = 0
            else:
                status = 1
            if status == 0:
                self.box = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
                return "success"
            else:
                self.box = None
                return "warning"
        except Exception as e:
            traceback.print_exc()
        
    def set_ac(self, port:int, state:str)->str:
        if self.box == None:
            return_data = self.connect()
            if return_data == 'warning':
                return 'warning', 'Cannot connect to box'
        state_byte = b'\x00'
        if state.lower() == 'on':
            state_byte = b'\x02'
        elif state.lower() == 'off':
            state_byte = b'\x01'
        self.box.sendto(b'\x01' + bytes([port]) + state_byte, (self.address, self.port)) 
        time.sleep(0.1)        
        receive, addr = self.box.recvfrom(1)
        if receive[0] == 0:
            return 'success'
        elif receive[0] == 112:
            return 'busy'
        elif receive[0] == 128:
            return 'command error'
    
    def set_keyboard_mouse(self, port:int, mouse_location:list, mouse_button:str, \
                           click_count:int, delay_time:int, keyboard_string:list)->str:
        
        # mouse_lication:[X-Coordinate,Y-Coordinate]
        # mouse_button: 'left' or 'right'
        if self.box == None:
            return_data = self.connect()
            if return_data == 'warning':
                return 'warning', 'Cannot connect to box'
        mouse_btn_byte = b'\x00'
        if mouse_button.lower() == 'left':
            mouse_btn_byte = b'\x01'
        elif mouse_button.lower() == 'right':
            mouse_btn_byte = b'\x03'
        else:
            mouse_btn_byte = b'\x00'
        print(mouse_location[0].to_bytes(2, byteorder='big'))
        send_bytes = b'\x0e' + bytes([port]) + mouse_location[0].to_bytes(2, byteorder='big') + \
                     mouse_location[1].to_bytes(2, byteorder='big') + mouse_btn_byte + \
                     bytes([click_count]) + bytes([delay_time]) + b''.join(keyboard_string)
        print(send_bytes)
        self.box.sendto(send_bytes, (self.address, self.port)) 
        time.sleep(0.1)        
        receive, addr = self.box.recvfrom(1)
        if receive[0] == 0:
            return 'success'
        elif receive[0] == 112:
            return 'busy'
        elif receive[0] == 128:
            return 'command error'

    def get_ac(self, port:int)->str:
        if self.box == None:
            return_data = self.connect()
            if return_data == 'warning':
                return 'warning', 'Cannot connect to box'
        for _ in range(50):
            self.box.sendto(b'\x01' + bytes([port]) + b'\x00', (self.address, self.port))
            time.sleep(0.1)
            receive, addr = self.box.recvfrom(2)
            time.sleep(0.1)
            if receive[0] == 112:
                continue
            else:
                if receive[1] == 1:
                    return 'off'
                elif receive[1] == 2:
                    return 'on'
                elif receive[1] == 3:
                    return 'no power cord'
                break

    def set_relay(self, layer:int, port:int, state:str):
        if self.box == None:
            return_data = self.connect()
            if return_data == 'warning':
                return 'warning', 'Cannot connect to box'
        state_byte = b'\x00'
        if state.lower() == 'on':
            state_byte = b'\x02'
        elif state.lower() == 'off':
            state_byte = b'\x01'
        self.box.sendto(b'\x03' + bytes([((layer-1)*8)+port]) + state_byte, (self.address, self.port)) 
        time.sleep(0.1)
        receive, addr = self.box.recvfrom(1)
        time.sleep(0.1)
        print(receive[0])  
        if receive[0] == 0:
            return 'success', ''
        elif receive[0] == 112:
            return 'failure', 'busy'
        elif receive[0] == 128:
            return 'failure', 'command error'

    def get_digital_in(self, port:int)->str:
        if self.box == None:
            return_data = self.connect()
            if return_data == 'warning':
                return 'warning', 'Cannot connect to box'
        self.box.sendto(b'\x0a' + bytes([port]), (self.address, self.port)) 
        time.sleep(0.1)
        receive, addr = self.box.recvfrom(2)
        time.sleep(0.1)
        print(receive[0])  
        if receive[0] == 0:
            if receive[1] == 0:
                return 'low'
            elif receive[1] == 1:
                return 'high'
        else:
            return 'command error'

    def get_analog_in(self, port:int)->str:
        if self.box == None:
            return_data = self.connect()
            if return_data == 'warning':
                return 'warning', 'Cannot connect to box'
        self.box.sendto(b'\x0b' + bytes([port]), (self.address, self.port)) 
        time.sleep(0.1)
        receive, addr = self.box.recvfrom(2)
        time.sleep(0.1)
        print(receive)  
        if receive[0] == 0:
            return receive[1]
        else:
            return 'command error'


    
    def get_usb_status(self, port:int)->str:
        if self.box == None:
            return_data = self.connect()
            if return_data == 'warning':
                return 'warning', 'Cannot connect to box'
        self.box.sendto(b'\x0e' + bytes([port]), (self.address, self.port)) 
        time.sleep(0.1)
        receive, addr = self.box.recvfrom(5)
        time.sleep(0.1)
        print(receive)
        #receive[1]:Num Lock
        #receive[2]:Scroll Lock
        #receive[3]:Caps Lock
        #receive[4]:USB Power
        if receive[0] == 0:
            return 'success', (receive[1], receive[2], receive[3], receive[4])
        else:
            return 'failure', 'command error'

    def set_box_ip(self, ip_type:str, ip_address:str)->str:
        if self.box == None:
            return_data = self.connect()
            if return_data == 'warning':
                return 'warning', 'Cannot connect to box'
        #type = static or dynamic
        transfer_bytes = b'\x00'
        if ip_type.lower() == 'static':
            transfer_bytes = b'\x02'
        elif ip_type.lower() == 'dynamic':
            transfer_bytes = b'\x01'
        ip_list = ip_address.split('.')
        for ip_section in ip_list:
            transfer_bytes = transfer_bytes + bytes([int(ip_section)])
        print(transfer_bytes)
        self.box.sendto(b'\x50' + transfer_bytes, (self.address, self.port)) 

class APC:
    def __init__(self, address):
        self.address = address

    def connect(self):
        try:
            status,result = sp.getstatusoutput(f'ping -n 2 -w 1000 {self.address}')
            if status == 0:
                self.box = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
                return "success"
            else:
                self.box = None
                return "failure"
        except Exception as e:
            traceback.print_exc()

    def get_ac(self, port:int):
        errorIndication, errorStatus, errorIndex, varBinds = next(getCmd(SnmpEngine(),
                                CommunityData('public', mpModel=0),
                                UdpTransportTarget((self.address, 161)),
                                ContextData(),
                                ObjectType(ObjectIdentity(f'1.3.6.1.4.1.318.1.1.12.3.5.1.1.4.{str(port)}')),
                                lookupMib=False,
                                lexicographicMode=False))

        if errorIndication:
            print(errorIndication)
            return errorIndication
        elif errorStatus:
            return '%s at %s' % (errorStatus.prettyPrint(),
                                errorIndex and varBinds[int(errorIndex) - 1][0] or '?')
        else: 
            #print(varBinds[-1][-1])
            #for varBind in varBinds:
            #    print(' = '.join([x.prettyPrint() for x in varBind]))
            #return varBinds[-1][-1]
            if varBinds[-1][-1] == 2:
                return 'off'
            elif varBinds[-1][-1] == 1:
                return 'on'

    def set_ac(self, port:int, state:str):
        if state.lower() == 'on':
            state = 1
        elif state.lower() == 'off':
            state = 2
        errorIndication, errorStatus, errorIndex, varBinds = next(
        setCmd(SnmpEngine(),
            CommunityData('private', mpModel=0),
            UdpTransportTarget((self.address, 161)),
            ContextData(),
            ObjectType(ObjectIdentity(f'1.3.6.1.4.1.318.1.1.4.4.2.1.3.{str(port)}'), Integer(state)))
        )
        if errorIndication:
            print(errorIndication)
            return errorIndication
        elif errorStatus:
            return '%s at %s' % (errorStatus.prettyPrint(),
                                errorIndex and varBinds[int(errorIndex) - 1][0] or '?')
        else: 
            #print(varBinds[-1][-1])
            #return varBinds[-1][-1]
            if varBinds[-1][-1] == 2:
                return 'off'
            elif varBinds[-1][-1] == 1:
                return 'on'

if __name__ == "__main__":
    '''
    # PowerCCII example
    com_port, powercc2_num = PowerCCII.search()
    power_box = PowerCCII(com_port)
    power_box.connect()
    power_box.set_power_button(1)
    power_box.set_power_button(2)
    
    power_box.set_ac(1, 'on')
    time.sleep(1)
    power_box.set_ac(2, 'on')
    time.sleep(1)
    power_box.set_ac(1, 'off')
    time.sleep(1)
    power_box.set_ac(2, 'off')
    '''

    
    # PowerCCIII example
    box = PowerCCIII('192.168.1.13')
    return_data = box.connect()
    print(return_data)
    print(box.get_digital_in(4))
    #return_data = box.set_keyboard_mouse(1, [0, 0], '', 0, 0, [b'0xca',])
    #print(return_data)
    #if return_data != 'failure':
    #    box.set_ac(1, 'on')
    #    time.sleep(1)
    #    box.set_ac(2, 'on')
    '''
        for i in range(8):
            return_data = box.set_relay(1, i+1, 'on')
            print(return_data)
            time.sleep(1)
            return_data = box.set_relay(1, i+1, 'off')
    
        box.get_usb_status(1)
        return_data = box.set_ac(1, 'on')
        print(return_data)
        return_data = box.get_ac(1)
        print(return_data)
        time.sleep(2)
        #return_data = box.set_ac(1, 'off')
        #print(return_data)
        #return_data = box.get_ac(1)
        #print(return_data)
        
    '''
        
    

    '''
    # APC PDU example
    apc = APC('192.168.0.10')
    status = apc.connect()
    print(status)
    set_ac_status = apc.set_ac(1, 'on')
    print(set_ac_status)
    get_ac_status = apc.get_ac(1)
    print(get_ac_status)
    '''
    
    

    