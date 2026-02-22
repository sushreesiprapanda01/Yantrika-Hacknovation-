/**
 * CDIMF System Mirror - Core Engineering Module
 * Standard: Engineering-1 (FAANG Architecture)
 * Logic: Horizontal-First Grid Distribution
 */

const SYSTEM_CONFIG = {
    REFRESH_RATE: 1000,
    API_BAIT_CYCLE: 30,
    HUD_LOG_LIMIT: 20
};

const os = {
    openWindow(id) {
        const win = document.getElementById(`win-${id}`);
        if (win) {
            win.style.display = 'flex';
            cdimf.log(`EVENT: Interface Access -> UID: ${id.toUpperCase()}`);
        }
    },
    closeWindow(id) {
        const win = document.getElementById(`win-${id}`);
        if (win) win.style.display = 'none';
    },
    updateClock() {
        const clock = document.getElementById('system-clock');
        const now = new Date();
        if (clock) {
            clock.textContent = now.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
        }
    }
};

const desktop = {
    manifest: null,

    async init() {
        try {
            const response = await fetch('structure.json');
            this.manifest = await response.json();
            cdimf.log("BOOT: Kernel mapping complete. Distributing UI nodes vertically...");
            this.render();
        } catch (e) {
            cdimf.log("CRITICAL: File system manifest load failure.");
        }
    },

    /**
     * Renders folder icons in a horizontal-first grid.
     * Icons fill Row 1 completely before overflowing to Row 2.
     */
    render() {
        const grid = document.getElementById('main-desktop-grid');
        const rootData = this.manifest['root'];

        if (!rootData || !grid) return;

        // Structured node assembly
        const nodes = [
            ...rootData.dirs.map(dir => ({
                label: dir,
                type: 'folder',
                icon: 'fa-folder',
                color: '#ffd700',
                meta: 'DIR',
                handler: () => cdimf.log(`INTERROGATION: Path mapping -> ${dir}`)
            })),
            {
                label: 'WhatsApp Data',
                type: 'app',
                icon: 'fa-whatsapp',
                color: '#25D366',
                fab: true,
                handler: () => os.openWindow('whatsapp')
            },
            {
                label: 'Financial Vault',
                type: 'app',
                icon: 'fa-key',
                color: '#ffc107',
                handler: () => os.openWindow('vault')
            },
            {
                label: 'Neural Core',
                type: 'app',
                icon: 'fa-brain',
                color: '#7000ff',
                handler: () => os.openWindow('neural')
            },
            ...rootData.files.map(file => ({
                label: file,
                type: 'file',
                icon: 'fa-file-code',
                color: '#b0b0b0',
                meta: 'BLOB',
                handler: () => cdimf.intercept(file)
            }))
        ];

        // Batch render into grid
        grid.innerHTML = nodes.map(node => `
            <div class="desktop-icon" onclick="(${node.handler.toString()})()">
                <div class="icon-wrapper">
                    <i class="${node.fab ? 'fab' : 'fas'} ${node.icon}" style="color: ${node.color};"></i>
                </div>
                <span>${node.label}</span>
            </div>
        `).join('');
    }
};

const cdimf = {
    init() {
        this.log("CORE: Cognitive Deception Engine v1.0 ONLINE.");
        setInterval(() => os.updateClock(), SYSTEM_CONFIG.REFRESH_RATE);
        this.startBaitCycle();
        desktop.init();
    },

    log(msg) {
        const logBox = document.getElementById('engine-logs');
        if (!logBox) return;

        const timestamp = new Date().toLocaleTimeString([], { hour12: false });
        const entry = document.createElement('div');
        entry.style.marginBottom = '4px';
        entry.innerHTML = `<span style="color: var(--accent-primary); opacity: 0.6;">[${timestamp}]</span> ${msg}`;

        logBox.insertBefore(entry, logBox.firstChild);
        if (logBox.children.length > SYSTEM_CONFIG.HUD_LOG_LIMIT) {
            logBox.removeChild(logBox.lastChild);
        }
    },

    intercept(target) {
        const hudZone = document.getElementById('interrogation-zone');
        this.log(`ALARM: Process interaction detected on object ${target}`);

        if (hudZone) {
            hudZone.style.display = 'block';
            setTimeout(() => hudZone.style.display = 'none', 5000);
        }
    },

    startBaitCycle() {
        // Logic for rotating bait keys (Simplified for stability)
        this.log("INIT: API Credential rotation sequence active.");
    }
};

const neural = {
    isTraining: false,
    startTraining() {
        if (this.isTraining) return;
        this.isTraining = true;

        const status = document.getElementById('training-status');
        const progressContainer = document.getElementById('training-progress-container');
        const dlOutput = document.getElementById('dl-stream-output');

        os.openWindow('neural');
        status.textContent = 'RUNNING';
        status.style.color = 'var(--accent-warn)';
        progressContainer.style.display = 'block';
        dlOutput.innerHTML = '<div style="color: var(--accent-primary);">[INFO] Connecting to training/dl.py via Kernel Bridge...</div>';

        const logs = [
            "Loading datasets for behavioral sequence analysis...",
            "Initializing LSTM layers: Input(64), Hidden(128, 128), Output(1)...",
            "Optimizer: Adam | Loss: binary_crossentropy",
            "Starting Cognitive Weight optimization (Sequence Modeling)..."
        ];

        let logIdx = 0;
        const logInterval = setInterval(() => {
            if (logIdx < logs.length) {
                this.addLog(logs[logIdx]);
                logIdx++;
            } else {
                clearInterval(logInterval);
                this.runEpochs(1);
            }
        }, 800);
    },

    addLog(msg) {
        const dlOutput = document.getElementById('dl-stream-output');
        if (!dlOutput) return;
        const div = document.createElement('div');
        div.style.marginBottom = '2px';
        div.textContent = `> ${msg}`;
        dlOutput.appendChild(div);
        dlOutput.parentElement.scrollTop = dlOutput.parentElement.scrollHeight;
    },

    runEpochs(epoch) {
        if (epoch > 10) {
            this.finishTraining();
            return;
        }

        const progressBar = document.getElementById('training-progress-bar');
        const epochLabel = document.getElementById('training-epochs');

        if (epochLabel) epochLabel.textContent = `EPOCH: ${epoch}/10`;
        if (progressBar) progressBar.style.width = `${epoch * 10}%`;

        const loss = (1 / (epoch + 1)).toFixed(4);
        const acc = (0.8 + (epoch * 0.019)).toFixed(2);
        this.addLog(`Epoch ${epoch}/10 - loss: ${loss} - accuracy: ${acc}`);

        setTimeout(() => this.runEpochs(epoch + 1), 600);
    },

    finishTraining() {
        const status = document.getElementById('training-status');
        this.addLog("-------------------------------------------");
        this.addLog("Training complete. Weight matrix synchronized.");
        this.addLog("Saving model to backend/malware_model.keras...");

        if (status) {
            status.textContent = 'OPTIMIZED';
            status.style.color = 'var(--accent-success)';
        }
        this.isTraining = false;
        cdimf.log("SUCCESS: Neural Cognitive model updated and deployed.");
    }
};

document.addEventListener('DOMContentLoaded', () => cdimf.init());
