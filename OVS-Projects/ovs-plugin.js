// Define variables to store last position
var lastPosition = {
    bottom: '20px',
    right: '20px'
};

// Function to initialize the plugin
function initializePlugin() {
    // Ensure SIP object is available
    if (typeof SIP === 'undefined') {
        console.error('SIP.js library failed to load.');
        return;
    }

    // Define SIP.js configuration
    const configuration = {
        uri: 'sip:3001@webrtc.kozow.com',
        transportOptions: {
            wsServers: ['wss://webrtc.kozow.com:4443/ws'],
            traceSip: true
        },
        authorizationUser: '3001',
        password: 'ab0000',
        displayName: '3001',
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }, // Google's STUN server
            { urls: 'turn:webrtc.kozow.com:3478?transport=udp', credential: 'yourTurnPassword', username: 'yourTurnUsername' } // Your TURN server with UDP transport
        ]
    };

    // Initialize SIP.js User Agent
    const userAgent = new SIP.UA(configuration);

    // Define a function to draw the plugin elements
    function drawPluginElements() {
        // Create a container for the plugin elements
        var pluginContainer = document.createElement('div');
        pluginContainer.id = 'pluginContainer';
        pluginContainer.style.position = 'fixed';
        pluginContainer.style.bottom = '20px'; // Adjust the bottom position as needed
        pluginContainer.style.right = '20px'; // Adjust the right position as needed
        pluginContainer.style.zIndex = '9999'; // Ensure the plugin is on top
        pluginContainer.style.backgroundColor = '#f0f0f0';
        pluginContainer.style.width = '250px'; // Adjust the width as needed
        pluginContainer.style.border = '1px solid #ccc';
        pluginContainer.style.borderRadius = '5px';

        // Add darker blue stripe at the top with reduced height
        pluginContainer.innerHTML = `
            <div style="background-color: #0056b3; color: #fff; padding: 5px 8px; border-radius: 5px 5px 0 0;">
                <span style="font-weight: bold;">OVS nProPhony Web</span>
                <span style="float: right;">
                    <button style="background-color: #0056b3; border: none; color: #fff; padding: 3px; cursor: pointer;" onclick="togglePlugin()">-</button>
                    <button style="background-color: #0056b3; border: none; color: #fff; padding: 3px; cursor: pointer;" onclick="closePlugin()">x</button>
                </span>
            </div>
            <div style="padding: 10px;">
                <!-- Initialize Button -->
                <button class="initialize-button" style="width: 100%; margin-bottom: 10px;" onclick="initializeSip()">Initialize SIP</button>
                
                <!-- Call Status Box -->
                <input type="text" id="callStatus" placeholder="Call Status" style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #ccc; box-sizing: border-box; margin-bottom: 10px;">
                
                <!-- Call Operations -->
                <div id="callControls" style="display: none;">
                    <button class="action-button" onclick="makeCall('destination')">Outbound Call</button>
                    <button class="action-button" onclick="answerCall()">Answer</button>
                    <button class="action-button" onclick="hangupCall()">Hangup</button>
                    <button class="action-button" onclick="muteCall()">Mute</button>
                    <button class="action-button" onclick="unmuteCall()">Unmute</button>
                    <button class="action-button" onclick="holdCall()">Hold</button>
                    <button class="action-button" onclick="unholdCall()">Unhold</button>
                    <button class="action-button" onclick="transferCall('destination')">Transfer</button>
                </div>
                
                <!-- Number Buttons -->
                <div>
                    <button class="phone-button" style="margin-right: 5px;">1</button>
                    <button class="phone-button">2</button>
                    <button class="phone-button" style="margin-right: 5px;">3</button><br>
                    <button class="phone-button" style="margin-right: 5px;">4</button>
                    <button class="phone-button">5</button>
                    <button class="phone-button" style="margin-right: 5px;">6</button><br>
                    <button class="phone-button" style="margin-right: 5px;">7</button>
                    <button class="phone-button">8</button>
                    <button class="phone-button" style="margin-right: 5px;">9</button><br>
                    <button class="phone-button" style="margin-right: 5px;">*</button>
                    <button class="phone-button">#</button>
                    <button class="phone-button" style="margin-right: 5px;">0</button>
                </div>
            </div>
        `;

        // Append the plugin container to the document body
        document.body.appendChild(pluginContainer);
    }

    // Call the function to draw the plugin elements
    drawPluginElements();

    // Function to toggle minimize/maximize the plugin
    function togglePlugin() {
        var pluginContainer = document.getElementById('pluginContainer');
        var minimizeButton = pluginContainer.querySelector('button[onclick="togglePlugin()"]');
        if (pluginContainer.style.bottom === '-100px') {
            // Restore last position
            pluginContainer.style.bottom = lastPosition.bottom;
            pluginContainer.style.right = lastPosition.right;
            minimizeButton.textContent = '-';
        } else {
            // Store current position
            lastPosition.bottom = pluginContainer.style.bottom;
            lastPosition.right = pluginContainer.style.right;
            // Minimize to bottom
            pluginContainer.style.bottom = '-100px';
            minimizeButton.textContent = '+';
        }
    }

    // Function to close the plugin
    function closePlugin() {
        var pluginContainer = document.getElementById('pluginContainer');
        pluginContainer.parentNode.removeChild(pluginContainer); // Remove the plugin container from the DOM
    }

    // Function to initialize SIP.js
    function initializeSip() {
        userAgent.start();
        updateCallStatus('Initializing SIP...');
    }

    // Function to make an outbound call
    function makeCall(destination) {
        // Implement SIP.js logic to make a call
    }

    // Function to answer an incoming call
    function answerCall() {
        // Implement SIP.js logic to answer a call
    }

    // Function to hang up a call
    function hangupCall() {
        // Implement SIP.js logic to hang up a call
    }

    // Function to mute a call
    function muteCall() {
        // Implement SIP.js logic to mute a call
    }

    // Function to unmute a call
    function unmuteCall() {
        // Implement SIP.js logic to unmute a call
    }

    // Function to hold a call
    function holdCall() {
        // Implement SIP.js logic to hold a call
    }

    // Function to unhold a call
    function unholdCall() {
        // Implement SIP.js logic to unhold a call
    }

    // Function to transfer a call
    function transferCall(destination) {
        // Implement SIP.js logic to transfer a call
    }

    // Function to update call status
    function updateCallStatus(status) {
        document.getElementById('callStatus').value = status;
    }
}
