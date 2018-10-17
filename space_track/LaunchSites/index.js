const LaunchSites = () => {
    const _getObjects = (callback) => {
        const json = require('./backup.json');
        callback(json);
    }
    return {
        getObjects: _getObjects,
    }
}

module.exports = LaunchSites;

