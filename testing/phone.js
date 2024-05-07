    document.addEventListener('DOMContentLoaded', function () {
    var statusElement = document.getElementById('status');
    var callStatusElement = document.getElementById('callStatus');
    var audioInputSelect = document.getElementById('audioInputSelect');
    var audioOutputSelect = document.getElementById('audioOutputSelect');
    var remoteAudio = document.getElementById('remoteAudio');
    var SipUsername = '2001';
    var SipPassword = 'ab0000';
    var SipDomain = 'webrtc.kozow.com';
    var userAgent;
    var registerer;
    var inviter;
    var registered = false;

    function getPermissionAndUpdateDevices() {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(function(stream) {
                updateDeviceSelection();
                stream.getTracks().forEach(function(track) {
                    track.stop();
                });
            })
            .catch(function(error) {
                console.error('Error accessing media devices.', error);
            });
    }

    function updateDeviceSelection() {
        navigator.mediaDevices.enumerateDevices()
            .then(function(devices) {
                audioInputSelect.innerHTML = '';
                audioOutputSelect.innerHTML = '';
                devices.forEach(function(device) {
                    var option = document.createElement('option');
                    option.value = device.deviceId;
                    option.text = device.label || 'Device ' + (device.deviceId.substr(0, 6)) + '...';
                    if (device.kind === 'audioinput') {
                        audioInputSelect.appendChild(option);
                    } else if (device.kind === 'audiooutput') {
                        audioOutputSelect.appendChild(option);
                    }
                });
            });
    }

    document.getElementById('permissionButton').addEventListener('click', getPermissionAndUpdateDevices);

    document.getElementById('registerButton').addEventListener('click', function () {
        // ... registration code ...
    });

    document.getElementById('unregisterButton').addEventListener('click', function () {
        // ... unregistration code ...
    });

    document.getElementById('callButton').addEventListener('click', function () {
        if (userAgent && registered) {
            const target = SIP.UserAgent.makeURI("sip:*43@webrtc.kozow.com");
            if (!target) {
                throw new Error("Failed to create target URI.");
            }
            const inviterOptions = {
                sessionDescriptionHandlerOptions: {
                    constraints: {
                        audio: {
                            deviceId: audioInputSelect.value ? { exact: audioInputSelect.value } : undefined
                        },
                        video: false
                    }
                },
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' }
                ]
            };
            inviter = new SIP.Inviter(userAgent, target, inviterOptions);
            inviter.invite().then(() => {
                callStatusElement.textContent = 'Call Status: Calling';
                document.getElementById('hangupButton').style.display = 'inline';
            }).catch(error => {
                console.error('Error inviting:', error);
                callStatusElement.textContent = 'Call Status: Error';
            });
        } else {
            console.error('User agent is not registered.');
            callStatusElement.textContent = 'Call Status: Not Registered';
        }
    });

    document.getElementById('hangupButton').addEventListener('click', function () {
        if (inviter) {
            inviter.cancel();
            callStatusElement.textContent = 'Call Status: Hanging Up';
            this.style.display = 'none';
        }
    });

    // ... rest of your existing code ...
});
