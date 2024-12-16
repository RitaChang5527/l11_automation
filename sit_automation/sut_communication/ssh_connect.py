import paramiko

class SSH_Connect():
    def __init__(self, host_ip:str, user_name:str, password:str):
        self.host_ip = host_ip
        self.user_name = user_name
        self.password = password
        self.command = ''
        self.ssh = None

    def connect(self):
        self.ssh = paramiko.SSHClient()
        self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        try:
            self.ssh.connect(hostname=self.host_ip, username=self.user_name, password=self.password)
            return True
        except Exception as e:
            self.ssh.close()
            return False


    def write_command(self, command:str):
        try:
            stdin, stdout, stderr = self.ssh.exec_command(command)

            # get SSH output
            output = stdout.read().decode()
            error = stderr.read().decode()
            return True, {'output': output, 'error': error}
        except Exception as e:
            self.ssh.close()
            return False,{'output': '', 'error': e}

    def download_file(self, remote_path:str, local_path:str):
        pass

    def close(self):
        self.ssh.close()

if __name__ == '__main__':
    ssh = SSH_Connect('192.168.10.112', 'root', '123456')
    print(ssh.connect())
    print(ssh.write_command('ipmitool mc info\n'))
    ssh.close() 