from sit_automation.sut_communication.ssh_connect import SSH_Connect
import subprocess
import re

class IPMI():
    def __init__(self, sut_ssh_info:dict, sut_bmc_info:dict):
        #management_interface: in_band or out_of_band
        self.sut_ssh_info = sut_ssh_info
        self.sut_bmc_info = sut_bmc_info
        
    def common_command(self, test_log:str, command:str, management_interface:str):
        result = {'output':'', 'error':''}
        if str(management_interface).lower() == 'in band':
            try:
                ssh = SSH_Connect(self.sut_ssh_info['host_ip'], self.sut_ssh_info['user_name'], self.sut_ssh_info['password'])
                ssh_status = ssh.connect()

                if ssh_status:
                    status, result = ssh.write_command(f'ipmitool {command}')
                    ssh.close()
                else:
                    return False,result
            except Exception as e:
                ssh.close()
                return False, e
        elif str(management_interface).lower() == 'out of band':
            result = subprocess.run(f'ipmitool -I lanplus -H {self.sut_bmc_info["bmc_ip"]} -U {self.sut_bmc_info["user_name"]} -P {self.sut_bmc_info["password"]} {command}', shell=True, capture_output=True, text=True)
            result = {'output':result.stdout, 'error':result.stderr}
        
        if test_log.split('/')[-1] != '':
            self.write_to_log(test_log, 'w', f"{result['output']}\n")
 
        return True,result

    def specific_command(self, sut_ssh_info:dict, test_log:str, test_module:dict):
        if test_module['function'] == 'Get Network device':
            status, result = self.network_device(sut_ssh_info, test_log)
            return status, result


    def network_device(self, sut_ssh_info:dict, test_log:str):
        try:
            ssh = SSH_Connect(sut_ssh_info['host_ip'], sut_ssh_info['user_name'], sut_ssh_info['password'])
            ssh_status = ssh.connect()
            print('test')
            if ssh_status:
                status, result = ssh.write_command('ip a')
                ethernet_devices = re.findall(r':\s*([ew][^:\s]*):', result['output'])
                network_result = {'output':'', 'error':''}
                for ethernet_device in ethernet_devices:
                    status, result = ssh.write_command(f'sudo ethtool {ethernet_device}')  
                    network_result['output'] += result['output'] + "\n" 
                    network_result['error'] += result['error'] + "\n" 
                    if test_log.split('/')[-1] != '':
                        self.write_to_log(test_log, 'a', f"{result['output']}\n")    
                    status, result = ssh.write_command(f'sudo ifconfig {ethernet_device}')
                    network_result['output'] += result['output'] + "\n" 
                    network_result['error'] += result['error'] + "\n"     
                    if test_log.split('/')[-1] != '':
                        self.write_to_log(test_log, 'a', f"{result['output']}\n")
                
                # show the full message on detail.html 
                ssh.close()
                print(network_result)
                return True,network_result
            else:
                return False,network_result
        except Exception as e:
            ssh.close()
            return False, e
    
    def write_to_log(self, log_path, mode, data):
        with open(log_path, mode) as f:
            f.write(f'{data}')

