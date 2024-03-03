const NOTIFICATION_CONFIG = {
    containerZIndex: 9999,
    duration: 3000,
    color: {
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        info: 'var(--primary)',
    }
};

let lastID = 1;

function notify(content, type = 'success', autoclose = true) {

    if (!Object.keys(NOTIFICATION_CONFIG.color).includes(type)) {
        console.error(`Invalid notification type: ${type}`);
        return;
    }

    // Container
    const notification = document.createElement('div');
    notification.setAttribute('id', 'notification-' + lastID++);
    notification.style.cssText = `
    opacity: 1;
    display: flex;
    position: fixed;
    top: 20px;
    right: 20px;
    max-width: 200px;
    z-index: ${NOTIFICATION_CONFIG.containerZIndex};
    padding: 10px 15px;
    flex: 1;
    border-radius: 25px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    transition: opacity 0.5s;
    color: #fff;
    background-color: ${NOTIFICATION_CONFIG.color[type]};
    `;

    // Text
    const notificationText = document.createElement('span');
    notificationText.textContent = content;

    // Close button
    const notificationCloseButton = document.createElement('div');
    notificationCloseButton.innerHTML = '&#215;'; // cross logo
    notificationCloseButton.style.cssText = `
    cursor: pointer;
    margin-left: 10px;
    border-radius: 25px;
    `;
    notificationCloseButton.addEventListener('click', function () {
        clearNotification(notification);
    });

    // Append
    notification.appendChild(notificationText);
    notification.appendChild(notificationCloseButton);

    // Append to document
    document.body.appendChild(notification);

    // Auto close
    if (autoclose) {
        setTimeout(() => {
            clearNotification(notification);
        }, NOTIFICATION_CONFIG.duration);
    }
}

function clearNotification(notification) {
    notification.style.opacity = 0;
    setTimeout(() => {
        notification.style.display = 'none';
        notification.remove();
    }, 500);
}

function clearNotifications() {
    const notifications = document.querySelectorAll('[id^="notification-"]');
    notifications.forEach((notification) => {
        clearNotification(notification);
    });
}