from sit_automation.test_module.common_function import Common_Function

common_command = Common_Function({'host_ip': '192.168.10.112', 'user_name': 'root', 'password': '123456'}, {'bmc_ip': '192.168.10.113', 'user_name': 'accton', 'password': 'cmb9.admin'})
print(common_command.ping_sut())

'''
from sit_automation.test_module.os_test import OS_Version

os_version = OS_Version.select_os('Linux')
os_version.get_drive_device({'host_ip': '192.168.10.112', 'user_name': 'root', 'password': '123456'}, 'test.log')

# Verify the function of list network devices
from sit_automation.test_module.os_test import OS_Version

os_version = OS_Version.select_os('Linux')
os_version.network_device({'host_ip': '172.20.10.4', 'user_name': 'pi', 'password': 'raspberry'}, 'test.log')


# Verify the function of send BMC command
from sit_automation.test_module.bmc_test import IPMI

ipmi = IPMI({'host_ip': '192.168.10.112', 'user_name': 'root', 'password': '123456'}, {'bmc_ip': '192.168.10.113', 'user_name': 'accton', 'password': 'cmb9.admin'})
#print(ipmi.common_command('test.log', 'sdr elist', 'in_band'))
print(ipmi.common_command('test.log', 'sdr elist', 'out_of_band'))
'''