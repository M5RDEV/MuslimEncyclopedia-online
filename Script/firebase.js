window.MUSLIM_ENCYCLOPEDIA_FIREBASE = {
    config: {
        apiKey: "AIzaSyAiMfMsgtMKaqTeJkKzpnca0wUmoSEpglA",
        authDomain: "muslimencycloedia-website.firebaseapp.com",
        databaseURL: "https://muslimencycloedia-website-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "muslimencycloedia-website",
        storageBucket: "muslimencycloedia-website.firebasestorage.app",
        messagingSenderId: "568815726247",
        appId: "1:568815726247:web:22f8533f9996ed0bb03582"
    },
    entries: {
        fullofflineCount: {
            endpoint: "FullOffline"
        },
        offlineCount: {
            endpoint: "Offline"
        },
        onlineCount: {
            endpoint: "Online"
        },
        websiteCount: {
            endpoint: "Website"
        }
    }
};

// When the page loads, initialize Firebase (if needed) and increment the "Website" counter by 1.
// This uses the Firebase Realtime Database compat SDK loaded from the CDN and runs a transaction
// on the configured endpoint so increments are atomic.
(function () {
    const cfg = window.MUSLIM_ENCYCLOPEDIA_FIREBASE;
    const endpoint = cfg && cfg.entries && cfg.entries.websiteCount && cfg.entries.websiteCount.endpoint;
    if (!endpoint) return; // nothing to do if endpoint not configured

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = src;
            s.async = true;
            s.onload = () => resolve();
            s.onerror = () => reject(new Error('Failed to load script: ' + src));
            document.head.appendChild(s);
        });
    }

    async function ensureFirebaseCompat() {
        // If firebase and firebase.database are already available, reuse them.
        if (window.firebase && window.firebase.database) return;

        // Load the compat builds of the Firebase SDK (app + database). Adjust version if you want.
        const version = '9.22.2';
        await loadScript(`https://www.gstatic.com/firebasejs/${version}/firebase-app-compat.js`);
        await loadScript(`https://www.gstatic.com/firebasejs/${version}/firebase-database-compat.js`);

        if (!window.firebase || !window.firebase.database) {
            throw new Error('Firebase SDK failed to load correctly');
        }
    }

    async function initAndIncrement() {
        try {
            await ensureFirebaseCompat();

            // Initialize app if not already initialized
            if (!firebase.apps || firebase.apps.length === 0) {
                firebase.initializeApp(cfg.config);
            }

            const db = firebase.database();
            const ref = db.ref(endpoint);

            // Use a transaction to increment atomically
            ref.transaction(current => {
                return (current || 0) + 1;
            }, (error, committed, snapshot) => {
                if (error) {
                    console.error('Error incrementing website count:', error);
                } else if (!committed) {
                    console.warn('Website count transaction not committed');
                } else {
                    console.log('Website count incremented, new value:', snapshot.val());
                }
            });
        } catch (err) {
            console.error('Could not initialize Firebase or increment website counter:', err);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAndIncrement);
    } else {
        initAndIncrement();
    }
})();
