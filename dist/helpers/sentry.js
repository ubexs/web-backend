"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sentry = require("@sentry/node");
exports.Sentry = Sentry;
const config_1 = require("./config");
let _isEnabled = false;
exports.isEnabled = () => {
    return _isEnabled;
};
exports.init = () => {
    if (config_1.default.sentry && config_1.default.sentry.backend) {
        Sentry.init({ dsn: config_1.default.sentry.backend });
    }
    _isEnabled = true;
};

