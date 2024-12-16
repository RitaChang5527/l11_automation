import paramiko

# 設定連線資訊
hostname = '172.20.10.4'
port = 22  # SSH 預設端口
username = 'pi'
password = 'raspberry'

try:
    # 創建 SSH 客戶端
    client = paramiko.SSHClient()
    
    # 自動添加不在已知主機列表的主機 (避免首次連接失敗)
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    # 連接到伺服器
    client.connect(hostname, port, username, password)
    print("成功連接到伺服器！")
    
    # 執行遠端命令
    command = 'sudo ethtool eth0'  # 替換為您需要的命令
    stdin, stdout, stderr = client.exec_command(command)
    
    # 獲取命令輸出
    output = stdout.read().decode()
    error = stderr.read().decode()
    
    # 輸出結果
    if output:
        print("命令輸出:")
        print(output)
    if error:
        print("命令錯誤:")
        print(error)
    
finally:
    # 關閉連接
    client.close()
    print("連接已關閉。")
