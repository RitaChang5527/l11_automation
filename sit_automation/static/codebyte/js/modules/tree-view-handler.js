export class TreeViewHandler {
    static updateTreeView(data, prependData = false) {
        const container = document.getElementById('treeview-container');
        const cycleId = `cycle-${data.cycle}`;
        const commandId = `command-${data.cycle}-${this.sanitizeId(data.command)}`;

        let cycleNode = this.getOrCreateCycleNode(cycleId, data.cycle, container, prependData);
        this.addCommandToNode(cycleNode, commandId, data);
    }

    static getOrCreateCycleNode(cycleId, cycleNum, container, prependData) {
        let cycleNode = document.getElementById(cycleId);
        if (!cycleNode) {
            const cycleContainer = this.createCycleContainer(cycleId, cycleNum);
            if (prependData) {
                container.prepend(cycleContainer);
            } else {
                container.appendChild(cycleContainer);
            }
            cycleNode = document.getElementById(cycleId);
        }
        return cycleNode;
    }

    static createCycleContainer(cycleId, cycleNum) {
        const cycleContainer = document.createElement('li');
        cycleContainer.innerHTML = `
            <span class="node-toggle" data-bs-target="#${cycleId}">+</span>
            <span>Cycle ${cycleNum}</span>
        `;
        const commandList = document.createElement('ul');
        commandList.classList.add('collapse');
        commandList.id = cycleId;

        cycleContainer.appendChild(commandList);
        this.addToggleBehavior(cycleContainer.querySelector('.node-toggle'));
        return cycleContainer;
    }

    static addCommandToNode(cycleNode, commandId, data) {
        let commandNode = document.getElementById(commandId);
        if (!commandNode) {
            const commandContainer = this.createCommandContainer(commandId, data);
            cycleNode.appendChild(commandContainer);
        } else {
            const outputNode = document.createElement('li');
            outputNode.textContent = data.output;
            commandNode.appendChild(outputNode);
        }
    }

    static createCommandContainer(commandId, data) {
        const commandContainer = document.createElement('li');
        commandContainer.innerHTML = `
            <span class="node-toggle" data-bs-target="#${commandId}">+</span>
            <span>${data.command}</span>
        `;
        const outputList = document.createElement('ul');
        outputList.classList.add('collapse');
        outputList.id = commandId;

        const outputNode = document.createElement('li');
        outputNode.textContent = data.output;

        outputList.appendChild(outputNode);
        commandContainer.appendChild(outputList);
        this.addToggleBehavior(commandContainer.querySelector('.node-toggle'));
        return commandContainer;
    }

    static addToggleBehavior(toggle) {
        toggle.addEventListener('click', function() {
            const target = document.querySelector(this.getAttribute('data-bs-target'));
            if (target?.classList.contains('show')) {
                target.classList.remove('show');
                this.textContent = '+';
            } else if (target) {
                target.classList.add('show');
                this.textContent = '-';
            }
        });
    }

    static sanitizeId(text) {
        return encodeURIComponent(text).replace(/%/g, '_');
    }
} 