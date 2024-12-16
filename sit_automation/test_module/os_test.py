from abc import ABC, abstractmethod
from sit_automation.sut_communication.ssh_connect import SSH_Connect
import re

class OS_Function(ABC):
    @abstractmethod
    def common_command(self, sut_ssh_info:dict, test_log:str, command:str):
        pass

class Windows(OS_Function):
    def __init__(self):
        pass
    def common_command(self, sut_ssh_info:dict, test_log:str, command:str):
        try:
            ssh = SSH_Connect(sut_ssh_info['host_ip'], sut_ssh_info['user_name'], sut_ssh_info['password'])
            ssh_status = ssh.connect()
            if ssh_status:
                status, result = ssh.write_command(command)
                # write the output and command to test.log
                with open(test_log, 'a') as f:
                    f.write(f"Executed command: {command}\n")
                    f.write(f"Output:\n{result['output']}\n")
                    if result['error']:
                        f.write(f"Error:\n{result['error']}\n")

                # show the full message on detail.html 
                ssh.close()
                return True,result['output']
            else:
                return False,result['error']
        except Exception as e:
            ssh.close()
            return False, e

class Linux(OS_Function):
    def __init__(self):
        pass
    def common_command(self, sut_ssh_info:dict, test_log:str, command:str):
        try:
            ssh = SSH_Connect(sut_ssh_info['host_ip'], sut_ssh_info['user_name'], sut_ssh_info['password'])
            ssh_status = ssh.connect()
            print(command)
            if ssh_status:
                status, result = ssh.write_command(command)
                # write the output and command to test.log
                if test_log.split('/')[-1] != '':
                    with open(test_log, 'a') as f:
                        f.write(f"Executed command: {command}\n")
                        f.write(f"Output:\n{result['output']}\n")
                        if result['error']:
                            f.write(f"Error:\n{result['error']}\n")

                # show the full message on detail.html 
                ssh.close()
                return True,result
            else:
                return False,result
        except Exception as e:
            ssh.close()
            return False, e
    
    def specific_command(self, sut_ssh_info:dict, test_log:str, test_module:dict):
        print(test_module['function'])
        if test_module['function'] == 'Get Network device':
            status, result = self.get_network_device(sut_ssh_info, test_log)
            return status, result
        elif test_module['function'] == 'Get Drive device':
            status, result = self.get_drive_device(sut_ssh_info, test_log)
            return status, result

    def get_network_device(self, sut_ssh_info:dict, test_log:str):
        try:
            ssh = SSH_Connect(sut_ssh_info['host_ip'], sut_ssh_info['user_name'], sut_ssh_info['password'])
            ssh_status = ssh.connect()
            if ssh_status:
                status, result = ssh.write_command('ip a')
                ethernet_devices = re.findall(r':\s*([ew][^:\s]*):', result['output'])
                network_result = {'output':'', 'error':''}
                for ethernet_device in ethernet_devices:
                    status, result = ssh.write_command(f'sudo ethtool {ethernet_device}')  
                    network_result['output'] += result['output'] + "\n" 
                    network_result['error'] += result['error'] + "\n" 
                    if test_log != '':
                        with open(test_log, 'a') as f:
                            f.write(f"{result['output']}\n")
                    status, result = ssh.write_command(f'sudo ifconfig {ethernet_device}')
                    network_result['output'] += result['output'] + "\n" 
                    network_result['error'] += result['error'] + "\n"   
                    if test_log != '':  
                        with open(test_log, 'a') as f:
                            f.write(f"{result['output']}\n")
                
                # show the full message on detail.html 
                ssh.close()
                return True,network_result
            else:
                return False,network_result
        except Exception as e:
            ssh.close()
            return False, e
        
    def get_drive_device(self, sut_ssh_info:dict, test_log:str):
        try:
            ssh = SSH_Connect(sut_ssh_info['host_ip'], sut_ssh_info['user_name'], sut_ssh_info['password'])
            ssh_status = ssh.connect()
            if ssh_status:
                status, result = ssh.write_command("sudo fdisk -l | grep 'Disk /dev/' | grep -v '/dev/loop' | awk -F: '{print $1}' | awk '{print $2}'")
                drive_devices = result['output'].split('\n')
                drive_result = {'output':'', 'error':''}
                for drive_device in drive_devices:
                    if drive_device != '':
                        status, result = ssh.write_command(f'sudo smartctl -x {drive_device}') 
                        if test_log != '':
                            with open(f'{test_log}_full', 'a') as f:
                                f.write(f"{result['output']}\n")
                        status, result = ssh.write_command(f'sudo smartctl -x {drive_device} | grep -i -e "Model" -e "Serial Number" -e "Firmware Version" -e "Capacity" -e "SATA Version" -e "SMART overall-health" -e err -e correct -e timeout -e fail -e critical -e warn | grep -v "Error Information Log Entries" | grep -v "Spin_Up_Time" | grep -v "Raw_Read_Error_Rate" | grep -v "Seek_Error_Rate"') 
                        drive_result['output'] += result['output'] + "\n" 
                        drive_result['error'] += result['error'] + "\n" 
                        if test_log != '':
                            with open(test_log, 'a') as f:
                                f.write(f"{result['output']}\n")

                # show the full message on detail.html 
                ssh.close()
                return True,drive_result
            else:
                return False,drive_result
        except Exception as e:
            ssh.close()
            return False, e

class OS_Version:
    @staticmethod
    def select_os(os_type: str) -> OS_Function:
        if os_type.lower() == "windows":
            return Windows()
        elif os_type.lower() == "linux":
            return Linux()
        else:
            raise ValueError("Unknown OS type")
            

if __name__ == '__main__':
    cmd = OS_Version('Linux')
    print(cmd.common_command({'host_ip': '89.0.142.86', 'user_name': 'pi', 'password': 'raspberry'}, 'test.log', 'lscpu'))