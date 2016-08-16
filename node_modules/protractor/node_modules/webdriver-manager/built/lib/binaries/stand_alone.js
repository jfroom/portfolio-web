"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var config_1 = require('../config');
var binary_1 = require('./binary');
/**
 * The selenium server jar.
 */
var StandAlone = (function (_super) {
    __extends(StandAlone, _super);
    function StandAlone() {
        _super.call(this);
        this.name = 'selenium standalone';
        this.versionCustom = StandAlone.versionDefault;
        this.prefixDefault = 'selenium-server-standalone-';
        this.suffixDefault = '.jar';
        this.cdn = config_1.Config.cdnUrls().selenium;
    }
    StandAlone.prototype.id = function () { return StandAlone.id; };
    StandAlone.prototype.versionDefault = function () { return StandAlone.versionDefault; };
    StandAlone.prototype.url = function () {
        var urlBase = this.cdn + this.shortVersion(this.version()) + '/';
        var filename = this.prefix() + this.version() + this.suffix();
        return urlBase + filename;
    };
    StandAlone.prototype.executableSuffix = function (ostype) { return '.jar'; };
    StandAlone.os = [binary_1.OS.Windows_NT, binary_1.OS.Linux, binary_1.OS.Darwin];
    StandAlone.id = 'standalone';
    StandAlone.versionDefault = config_1.Config.binaryVersions().selenium;
    StandAlone.isDefault = true;
    StandAlone.shortName = ['standalone'];
    return StandAlone;
}(binary_1.Binary));
exports.StandAlone = StandAlone;
