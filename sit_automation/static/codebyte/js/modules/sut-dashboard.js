import { WebSocketHandler } from './websocket-handler.js';
import { UIHandler } from './ui-handler.js';
import { TreeViewHandler } from './tree-view-handler.js';

export class SUTDashboard {
    constructor() {
        this.config = {
            dbName: 'sit_automation',
            collectionName: 'servers',
            wsUrl: `ws://${location.hostname}:8000/sit_automation/ws`,
            apiBaseUrl: `http://${location.hostname}:8000`
        };
        
        this.state = {
            globalSutId: '',
            globalSutName: '',
            modal: new bootstrap.Modal(document.getElementById('testModal'), {
                keyboard: false
            })
        };

        this.uiHandler = new UIHandler();
        this.wsHandler = new WebSocketHandler(this.config, this.uiHandler);
        window.TreeViewHandler = TreeViewHandler; // 为WebSocket处理提供全局访问
    }

    init() {
        this.initializeComponents();
        this.loadSUTData();
        this.setupEventListeners();
    }

    initializeComponents() {
        $('[data-bs-toggle="tooltip"]').tooltip();
    }

    setupEventListeners() {
        $(document).on('click', '.detail-btn', this.handleDetailClick.bind(this));
        $(document).on('click', '.start-btn', this.handleStartClick.bind(this));
        $(document).on('click', '.delete-btn', this.handleDeleteClick.bind(this));

        window.onbeforeunload = () => this.wsHandler.closeAll();
    }

    // ... 其他方法保持不变，但使用this.uiHandler和this.wsHandler来访问相应功能
} 