export class UIHandler {
    updateStatus(cell, colorClass, status) {
        cell.html(`<div class="d-flex align-items-center"><i class="fa fa-circle text-${colorClass} me-1"></i> ${status}</div>`);
    }

    updateButton(button, icon) {
        button.find("i").removeClass("fa-stop fa-play").addClass(`fa-${icon}`);
    }

    createSUTRow(item) {
        const {
            _id: sut_id,
            os: { sut_name, type: sut_os_type },
            bmc: { network: { mac_addr = "N/A", ip_addr = "N/A" } },
            test_parameters: { cycle_count, workflow_file },
            sut_status: { test_status }
        } = item;

        const disable_test_btn = cycle_count === 0 || workflow_file === '';
        const statusIconClass = this.getStatusIconClass(test_status);
        const testButtonIconClass = test_status === "Running" ? "fa-stop" : "fa-play";

        return this.generateRowHTML(
            sut_id, sut_name, sut_os_type, mac_addr, ip_addr,
            test_status, statusIconClass, testButtonIconClass, disable_test_btn
        );
    }

    getStatusIconClass(status) {
        const statusMap = {
            'stop': 'warning',
            'not run': 'warning',
            'Running': 'primary',
            'pass': 'success',
            'fail': 'danger'
        };
        return `fa-circle text-${statusMap[status] || 'warning'}`;
    }

    generateRowHTML(sutId, sutName, osType, macAddr, ipAddr, status, statusIcon, buttonIcon, disabled) {
        return `
            <tr>
                <td>${sutName}</td>
                <td>${osType}</td>
                <td>${macAddr}, ${ipAddr}</td>
                <td><label id="id_${sutId}_label"></td>
                <td><div class="d-flex align-items-center"><i class="fa ${statusIcon} me-1"></i> ${status}</div></td>
                <td>
                    ${this.generateActionButtons(sutId, sutName, buttonIcon, disabled)}
                </td>
            </tr>
        `;
    }

    generateActionButtons(sutId, sutName, buttonIcon, disabled) {
        return `
            <div class="d-inline-block" ${this.getTooltipAttributes(disabled)}>
                <button id="${sutId}" data-id="${sutId}" 
                    class="btn btn-primary shadow btn-xs sharp start-btn ${disabled ? 'disabled' : ''}" >
                    <i class="fa ${buttonIcon}"></i>
                </button>
            </div>
            ${this.getAdditionalButtons(sutId, sutName)}
        `;
    }

    getTooltipAttributes(disabled) {
        return disabled ? 'data-bs-toggle="tooltip" title="Please enter edit page to fill in cycle count or select workflow file" data-placement="bottom"' : '';
    }

    getAdditionalButtons(sutId, sutName) {
        return `
            <div class="d-inline-block" data-placement="bottom">
                <button id="${sutName}" data-id="${sutId}" class="btn btn-primary shadow btn-xs sharp detail-btn">
                    <i class="fa fa-info"></i>
                </button>
            </div>
            <a href="#" data-id="${sutId}" class="btn btn-primary shadow btn-xs sharp disabled">
                <i class="fa fa-cloud-download"></i>
            </a>
            <a href="/sit_automation/edit_sut/${sutId}" data-id="${sutId}" id="edit_sut" 
                class="btn btn-primary shadow btn-xs sharp">
                <i class="fa fa-pencil"></i>
            </a>
            <a href="#" data-id="${sutId}" class="btn btn-primary shadow btn-xs sharp disabled">
                <i class="fa fa-thermometer-half"></i>
            </a>
            <a href="#" data-id="${sutId}" class="btn btn-danger shadow btn-xs sharp delete-btn">
                <i class="fa fa-trash"></i>
            </a>
        `;
    }
} 