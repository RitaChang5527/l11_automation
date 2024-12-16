import subprocess
import time

class IPMITool:
    def __init__(self, BMC_address, BMC_user_name, BMC_password):
        self.BMC_address = BMC_address
        self.BMC_user_name = BMC_user_name
        self.BMC_password = BMC_password

    def get_bmc_connect(self):
        try:
            ping_status, result = subprocess.getstatusoutput(f'ping -n 2 -w 1000 {self.BMC_address}')
            print(result)
            if result.count('TTL') == 2:
                return 'success', result
            else:
                return 'warning', 'Cannot connect to SUT BMC'
        except Exception as e:
            return 'failure', e
        
        return_data = subprocess.Popen(f'ping '+ BMC_command,
                            stdout=subprocess.PIPE, shell=True)

    def set_power_state(self, command):
        #command:on, off, soft, cycle, reset
        try:
            BMC_command = f'-I lanplus -H {self.BMC_address} \
                            -U {self.BMC_user_name} \
                            -P {self.BMC_password} -R 1 -N 1 \
                            power {command}'
            return_data = subprocess.Popen(f'ipmi_tool\ipmitool.exe '+ BMC_command,
                            stdout=subprocess.PIPE, shell=True)

            return 'success', return_data.stdout.readline().decode("utf-8")
        except Exception as e:
            return 'failure', e

    def get_power_state(self):
        try:
            BMC_command = f'-I lanplus -H {self.BMC_address} \
                            -U {self.BMC_user_name} \
                            -P {self.BMC_password} -R 1 -N 1 \
                            power status'
            return_data = subprocess.Popen(f'ipmi_tool\ipmitool.exe '+ BMC_command,
                            stdout=subprocess.PIPE, shell=True)
            return 'success', return_data.stdout.readline().decode("utf-8")
        except Exception as e:
            return 'failure', e

    def get_chassis_state(self):
        try:
            BMC_command = f'-I lanplus -H {self.BMC_address} \
                            -U {self.BMC_user_name} \
                            -P {self.BMC_password} -R 1 -N 1 \
                            chassis status'
            return_data = subprocess.Popen(f'ipmi_tool\ipmitool.exe '+ BMC_command,
                            stdout=subprocess.PIPE, shell=True)
            return 'success', return_data.stdout.readline().decode("utf-8")
        except Exception as e:
            return 'failure', e
            
    def get_event_log(self, command):
        try:
            BMC_command = f'-I lanplus -H {self.BMC_address} \
                            -U {self.BMC_user_name} \
                            -P {self.BMC_password} -R 1 -N 1 \
                            sel {command}'
            return_data = ''
            with subprocess.Popen(f'ipmi_tool\ipmitool.exe '+ BMC_command, stdout=subprocess.PIPE, \
                bufsize=100, universal_newlines=True) as p:
                for b in p.stdout:
                    return_data = return_data + b
                    #print(b, end='') # b is the byte from stdout
            if 'Unable to establish' in return_data:
                return 'warning', return_data
            else:
                return 'success', return_data
        except Exception as e:
            return 'failure', e

    def clear_event_log(self):
        #command:on, off, soft, cycle, reset
        try:
            BMC_command = f'-I lanplus -H {self.BMC_address} \
                            -U {self.BMC_user_name} \
                            -P {self.BMC_password} -R 1 -N 1 \
                            sel clear'
            return_data = subprocess.Popen(f'ipmi_tool\ipmitool.exe '+ BMC_command,
                            stdout=subprocess.PIPE, shell=True)
            if 'Unable to establish' in return_data.stdout.readline().decode("utf-8"):
                return 'warning', return_data.stdout.readline().decode("utf-8")
            else:
                return 'success', return_data.stdout.readline().decode("utf-8")
        except Exception as e:
            return 'failure', e

    def set_sol_enabled(self, command):
        BMC_command = f'-I lanplus -H {self.BMC_address} \
                          -U {self.BMC_user_name} \
                          -P {self.BMC_password} -R 1 -N 1 \
                          sol set enabled {command}'
        return_data = subprocess.Popen(f'ipmi_tool\ipmitool.exe '+ BMC_command,
                           stdout=subprocess.PIPE, shell=True)
        return return_data.stdout.readline().decode("utf-8")

    def get_sensor(self, command):
        #command:on, off, soft, cycle, reset
        try:
            BMC_command = f'-I lanplus -H {self.BMC_address} \
                            -U {self.BMC_user_name} \
                            -P {self.BMC_password} -R 1 -N 1 \
                            sdr {command}'
            return_data = ''
            with subprocess.Popen(f'ipmi_tool\ipmitool.exe '+ BMC_command, stdout=subprocess.PIPE, \
                bufsize=100, universal_newlines=True) as p:
                for b in p.stdout:
                    return_data = return_data + b
                    #print(b, end='') # b is the byte from stdout
            if 'Unable to establish' in return_data:
                return 'warning', return_data
            else:
                return 'success', return_data
        except Exception as e:
            return 'failure', e

if __name__ == "__main__":
    ipmi_control = IPMITool('192.168.1.8', 'root', 'Admin88888888')
    time.sleep(1)
    print(ipmi_control.get_event_log('list'))
    time.sleep(5)
