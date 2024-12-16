class Log_Compare():
    def __init__(self):
        pass

    def compare_without_sort(self, golden_sample_path: str, cycle_log_path: str, ignore_keywords: list = []) -> tuple[bool, list]:
        """
        Compare two log files directly without sorting
        
        Args:
            golden_sample_path: Path for golden sample log file
            cycle_log_path: Path for test result of each cycle log file
            
        Returns:
            tuple: (comparison result, list of differences)
        """
        try:
            with open(golden_sample_path, 'r', encoding='utf-8') as f1, open(cycle_log_path, 'r', encoding='utf-8') as f2:
                lines1 = f1.readlines()
                lines2 = f2.readlines()
                
                differences = []
                if len(lines1) != len(lines2):
                    differences.append(f"Different number of lines: {golden_sample_path}:{len(lines1)} lines, {cycle_log_path}:{len(lines2)} lines")
                    return False, differences
                
                for i, (line1, line2) in enumerate(zip(lines1, lines2)):
                    if any(keyword in line1 for keyword in ignore_keywords) or any(keyword in line2 for keyword in ignore_keywords):
                        continue  # Skip lines which containing ignore keywords without compare
                    if line1 != line2:
                        differences.append(f"Difference at line {i+1}:")
                        differences.append(f"{golden_sample_path}: {line1.strip()}")
                        differences.append(f"{cycle_log_path}: {line2.strip()}")
                
                return len(differences) == 0, differences
                
        except Exception as e:
            return False, [f"Error during comparison: {str(e)}"]

    def compare_with_sort(self, golden_sample_path: str, cycle_log_path: str, ignore_keywords: list = []) -> tuple[bool, list]:
        """
        Compare two log files after sorting their contents
        
        Args:
            golden_sample_path: Path for golden sample log file
            cycle_log_path: Path for test result of each cycle log file
            
        Returns:
            tuple: (comparison result, list of differences)
        """
        try:
            with open(golden_sample_path, 'r', encoding='utf-8') as f1, open(cycle_log_path, 'r', encoding='utf-8') as f2:
                lines1 = sorted(f1.readlines())
                lines2 = sorted(f2.readlines())
                
                differences = []
                if len(lines1) != len(lines2):
                    differences.append(f"Different number of lines: {golden_sample_path}:{len(lines1)} lines, {cycle_log_path}:{len(lines2)} lines")
                    return False, differences
                
                for i, (line1, line2) in enumerate(zip(lines1, lines2)):
                    if any(keyword in line1 for keyword in ignore_keywords) or any(keyword in line2 for keyword in ignore_keywords):
                        continue  # Skip lines which containing ignore keywords without compare
                    if line1 != line2:
                        differences.append(f"Difference at sorted line {i+1}:")
                        differences.append(f"{golden_sample_path}: {line1.strip()}")
                        differences.append(f"{cycle_log_path}: {line2.strip()}")
                
                return len(differences) == 0, differences
                
        except Exception as e:
            return False, [f"Error during comparison: {str(e)}"]

    def check_log_keyword(self, log_path: str, keywords: list, return_if_exist: str) -> tuple[bool, list]:
        """
        Check if log file contains any specified keywords
        
        Args:
            log_path: Path to the log file
            keywords: List of keywords to check
            return_if_exist: If "Pass", returns True when keywords are found
                             If "Fail", returns False when keywords are found
            
        Returns:
            tuple: (check result, list of lines containing keywords)
            - If keywords found and return_if_exist is "Pass": returns (True, matches)
            - If keywords found and return_if_exist is "Fail": returns (False, matches)
            - If no keywords found and return_if_exist is "Pass": returns (False, [])
            - If no keywords found and return_if_exist is "Fail": returns (True, [])
        """
        try:
            if isinstance(keywords,str):
                keywords = [keywords]
            with open(log_path, 'r', encoding='utf-8') as f:
                matches = []
                for i, line in enumerate(f, 1):
                    for keyword in keywords:
                        if keyword in line:
                            matches.append(f"Line {i} contains keyword '{keyword}': {line.strip()}")
                keywords_found = len(matches) > 0
                if keywords_found:
                    return (return_if_exist == "Pass", matches)
                else:
                    return (return_if_exist == "Fail", [])
        except Exception as e:
            return False, [f"Error during keyword check: {str(e)}"]

    def check_return_keyword(self, input_data: str, keywords: list, return_if_exist: str) -> tuple[bool, list]:
        """
        Check if input_data contains any specified keywords
        
        Args:
            input_data: The input data to check
            keywords: List of keywords to check
            return_if_exist: If "Pass", returns True when keywords are found
                             If "Fail", returns False when keywords are found
            
        Returns:
            tuple: (check result, list of occurrences containing keywords)
            - If keywords found and return_if_exist is "Pass": returns (True, matches)
            - If keywords found and return_if_exist is "Fail": returns (False, matches)
            - If no keywords found and return_if_exist is "Pass": returns (False, [])
            - If no keywords found and return_if_exist is "Fail": returns (True, [])
        """
        try:
            matches = []
            if isinstance(keywords,str):
                keywords = [keywords]
            lines = input_data.splitlines()
            for i, line in enumerate(lines, 1):
                for keyword in keywords:        
                    if keyword in line:
                        matches.append(f"Line {i} contains keyword '{keyword}': {line.strip()}")
            keywords_found = len(matches) > 0
            if keywords_found:
                return (return_if_exist == "Pass", matches)
            else:
                return (return_if_exist == "Fail", [])       
        except Exception as e:
            return False, [f"Error during keyword check: {str(e)}"]

    def compare_meminfo(self, golden_sample_path: str, cycle_log_path: str, compare_range: int) -> tuple[bool, list]:
        """
        Compare MemTotal values from two log files within a specified range
        
        Args:
            golden_sample_path: Path for the first log file
            cycle_log_path: Path for the second log file
            compare_range: Allowed range of difference between the two MemTotal values
            
        Returns:
            tuple: (comparison result, list of details)
            - If the difference is within the range: returns (True, [])
            - If the difference is outside the range: returns (False, [details])
        """
        try:
            def extract_memtotal(log_path: str) -> int:
                with open(log_path, 'r', encoding='utf-8') as f:
                    for line in f:
                        if 'MemTotal:' in line:
                            # Extract the value after 'MemTotal:'
                            return int(line.split()[1])  # Assuming the format is consistent
                return None  # Return None if 'MemTotal:' is not found
            
            memtotal1 = extract_memtotal(golden_sample_path)
            memtotal2 = extract_memtotal(cycle_log_path)
            
            if memtotal1 is None or memtotal2 is None:
                return False, [f"MemTotal not found in one of the logs: {golden_sample_path}, {cycle_log_path}"]
            
            difference = abs(memtotal1 - memtotal2)
            if difference <= compare_range:
                return True, []
            else:
                return False, [f"MemTotal difference exceeds range: {golden_sample_path}: {memtotal1} kB, {cycle_log_path}: {memtotal2} kB"]
        
        except Exception as e:
            return False, [f"Error during MemTotal comparison: {str(e)}"]

    def compare_sdr(self, golden_sample_path: str, cycle_log_path: str, temperature_range: int, test_function: str) -> tuple[bool, list]:
        """
        Compare SDR values from two log files based on specified criteria
        
        Args:
            golden_sample_path: Path for the golden sample log file
            cycle_log_path: Path for the cycle log file
            temperature_range: Allowed temperature difference for comparison
            test_function: Type of test, either "SIT" or "SDA"
            
        Returns:
            tuple: (comparison result, list of details)
            - If all checks pass: returns (True, [])
            - If any check fails: returns (False, [details])
        """
        try:
            def read_log_data(log_path: str) -> list:
                with open(log_path, 'r', encoding='utf-8') as f:
                    return [line.strip() for line in f if line.strip()]  # Read non-empty lines
            
            golden_data = read_log_data(golden_sample_path)
            cycle_data = read_log_data(cycle_log_path)
            
            # First comparison: Check if the first three columns match
            for golden_line, cycle_line in zip(golden_data, cycle_data):
                golden_parts = golden_line.split('|')
                cycle_parts = cycle_line.split('|')
                
                if len(golden_parts) < 4 or len(cycle_parts) < 4:
                    return False, ["One of the logs does not have enough columns."]
                
                if golden_parts[0:3] != cycle_parts[0:3]:
                    return False, [f"Mismatch in first three columns: {golden_line} vs {cycle_line}"]
            
            # Second comparison: Only if test_function is "SIT"
            if test_function == "SIT":
                for i, cycle_line in enumerate(cycle_data):
                    cycle_parts = cycle_line.split('|')
                    
                    if len(cycle_parts) < 4:
                        continue  # Skip lines that do not have enough columns
                    
                    cycle_value = cycle_parts[3].strip()
                    
                    if "No Reading" in cycle_value or "ns" in cycle_value or "na" in cycle_value:
                        return False, [f"Fail due to invalid reading: {cycle_line}"]
                    
                    if "degrees C" in cycle_value:
                        # Extract the temperature value
                        temp_value = float(cycle_value.split()[0])
                        golden_temp_value = float(golden_data[i].split('|')[3].strip())  # Compare with the same line in golden data
                        
                        if abs(temp_value - golden_temp_value) > temperature_range:
                            return False, [f"Temperature difference exceeds range: {cycle_line}"]
                    else:
                        # Only compare if cycle_value does not contain a numeric value
                        if not any(char.isdigit() for char in cycle_value):
                            if cycle_value != golden_data[i].split('|')[3].strip():
                                return False, [f"Value mismatch: {cycle_line} vs {golden_data[i].split('|')[3].strip()}"]
            
            return True, []  # All checks passed
        
        except Exception as e:
            return False, [f"Error during SDR comparison: {str(e)}"]
    
if __name__ == '__main__':
    log_compare = Log_Compare()

    #print(log_compare.check_return_keyword('Test String', ['st'], 'Fail'))
    print(log_compare.compare_without_sort('meminfo_golden.log', 'meminfo_cycle1.log', []))