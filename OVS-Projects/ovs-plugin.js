// Function to initialize the plugin
function initializePlugin() {
    // Check if SIP.js is loaded
    if (typeof SIP !== 'undefined' && SIP.UA) {
        // SIP.js is loaded, call drawPluginElements()
        drawPluginElements();
    } else {
        // SIP.js is not loaded, log an error
        console.error('SIP.js is not loaded. Please make sure SIP.js is included before ovs-plugin.js.');
    }
}

// Call initializePlugin() when the window finishes loading
window.addEventListener('load', initializePlugin);

// Function to draw the plugin elements
function drawPluginElements() {
    // Placeholder function for drawing plugin elements
    console.log('Drawing plugin elements...');
}
