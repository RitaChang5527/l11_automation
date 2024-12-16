export class WebSocketHandler {
    constructor(config, uiHandler) {
        this.config = config;
        this.uiHandler = uiHandler;
        this.connections = {};
    }

    connect(sutId, sutName) {
        const ws = new WebSocket(this.config.wsUrl);
        
        ws.onopen = () => {
            ws.send(JSON.stringify({sut_id: sutId}));
            console.log(`WebSocket connected for ${sutId}`);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleMessage(data, sutId, sutName);
        };

        ws.onclose = () => console.log("WebSocket is closed");
        
        this.connections[sutId] = ws;
        return ws;
    }

    handleMessage(data, sutId, sutName) {
        const statusLabel = `id_${sutId}_label`;
        const statusCell = $(`#sut_table tbody tr:has(td:contains("${sutName}")) td:nth-child(5)`);
        const buttonCell = $(`#sut_table tbody tr:has(td:contains("${sutName}")) td:nth-child(6) .start-btn`);

        switch(data.status) {
            case 'Completed':
            case 'Stop':
            case 'Not run':
                this.uiHandler.updateStatus(statusCell, 'warning', data.status);
                this.uiHandler.updateButton(buttonCell, 'play');
                break;
            case 'Running':
                window.TreeViewHandler.updateTreeView(data, false);
                $(`#${statusLabel}`).text(`Executing CMD: ${data.command}`);
                this.uiHandler.updateStatus(statusCell, 'primary', data.status);
                break;
            case 'Pass':
                this.uiHandler.updateStatus(statusCell, 'success', data.status);
                this.uiHandler.updateButton(buttonCell, 'play');
                break;
            case 'Fail':
                this.uiHandler.updateStatus(statusCell, 'danger', data.status);
                this.uiHandler.updateButton(buttonCell, 'play');
                break;
        }
    }

    closeAll() {
        Object.values(this.connections).forEach(ws => ws.close());
    }
} 