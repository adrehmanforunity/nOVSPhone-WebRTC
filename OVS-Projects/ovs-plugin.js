// Define variables to store last position
var lastPosition = {
    bottom: '20px',
    right: '20px'
};

// Function to initialize the plugin
function initializePlugin() {
    // Draw plugin elements
    drawPluginElements();
}

// Function to draw the plugin elements
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
            <button class="initialize-button" style="width: 100%; margin-bottom: 10px;">Initialize</button>
            
            <!-- Call Status Box -->
            <input type="text" id="callStatus" placeholder="Call Status" style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #ccc; box-sizing: border-box; margin-bottom: 10px;">
            
            <!-- Call Operations -->
            <div style="margin-bottom: 10px;">
                <button class="action-button">Accept</button>
                <button class="action-button">Outbound Call</button>
                <button class="action-button">Hold</button>
                <button class="action-button">Unhold</button>
                <button class="action-button">Mute</button>
                <button class="action-button">Transfer</button>
                <button class="action-button">Hangup</button>
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

// Call initializePlugin() when the window finishes loading
window.addEventListener('load', initializePlugin);
