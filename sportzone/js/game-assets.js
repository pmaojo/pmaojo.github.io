(function (global) {
    'use strict';

    var BASE_PATH = 'assets/';

    function normalizePath(assetPath) {
        return String(assetPath || '').replace(/^\/+/, '');
    }

    function resolve(assetPath) {
        return BASE_PATH + normalizePath(assetPath);
    }

    function resolveMany(assetPaths) {
        return (assetPaths || []).map(resolve);
    }

    global.SportzoneGameAssets = Object.freeze({
        resolve: resolve,
        resolveMany: resolveMany
    });
}(window));
