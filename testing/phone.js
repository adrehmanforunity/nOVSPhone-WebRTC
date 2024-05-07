document.addEventListener('DOMContentLoaded', function () {
    var statusElement = document.getElementById('status');
    var SipUsername = '2001';
    var SipPassword = 'ab0000';
    var SipDomain = 'webrtc.kozow.com';
    var audioInputSelect = document.getElementById('audioInputSelect');
    var audioOutputSelect = document.getElementById('audioOutputSelect');
    var userAgent;
    var registerer;
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
        if (!userAgent) {
            var userAgentOptions = {
                uri: SIP.UserAgent.makeURI("sip:" + SipUsername + "@" + SipDomain),
                transportOptions: {
                    server: 'wss://' + SipDomain + ':4443/ws',
                    traceSip: true
                },
                authorizationUsername: SipUsername,
                authorizationPassword: SipPassword,
                sessionDescriptionHandlerFactoryOptions: {
                    constraints: {
                        audio: true,
                        video: false
                    }
                },
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' }
                ]
            };

            userAgent = new SIP.UserAgent(userAgentOptions);
            registerer = new SIP.Registerer(userAgent);

            userAgent.start().then(() => {
                console.log('User agent started');
                registerer.register();
                statusElement.textContent = 'Status: Registering...';
            }).catch(error => {
                console.error('Error starting user agent:', error);
                statusElement.textContent = 'Status: Error starting user agent';
            });

            // Update the status based on registration events
            registerer.stateChange.addListener((newState) => {
                if (newState === SIP.RegistererState.Registered) {
                    registered = true;
                    statusElement.textContent = 'Status: Registered';
                } else if (newState === SIP.RegistererState.Unregistered) {
                    registered = false;
                    statusElement.textContent = 'Status: Unregistered';
                }
            });
        } else if (!registered) {
            registerer.register();
            statusElement.textContent = 'Status: Registering...';
        }
    });

    document.getElementById('unregisterButton').addEventListener('click', function () {
        if (registerer && registered) {
            registerer.unregister();
            statusElement.textContent = 'Status: Unregistering...';
        }
    });

    document.getElementById('callButton').addEventListener('click', function () {
        if (userAgent && registered) {
            var options = {
                sessionDescriptionHandlerOptions: {
                    constraints: {
                        audio: {
                            deviceId: audioInputSelect.value ? { exact: audioInputSelect.value } : undefined
                        },
                        video: false
                    }
                }
            };

            // Assuming userAgent is already defined and started elsewhere in your code
            userAgent.start().then(() => {
                const target = SIP.UserAgent.makeURI("sip:*43@example.com"); // Replace example.com with your domain
                if (!target) {
                    throw new Error("Failed to create target URI.");
                }
                const inviterOptions = {
                    sessionDescriptionHandlerOptions: {
                        constraints: {
                            audio: {
                                deviceId: audioInputSelect.value ? { exact: audioInputSelect.value } : undefined // Make sure to obtain the selected audio input device ID
                            },
                            video: false // Assuming video is not needed
                        }
                    },
                    inviteWithoutSdp: true,
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' }
                    ]
                };
                const inviter = new SIP.Inviter(userAgent, target, inviterOptions);
                inviter.invite();
            }).catch(error => {
                console.error('Error starting user agent:', error);
            });

        } else {
            console.error('User agent is not registered.');
        }
    });
});
