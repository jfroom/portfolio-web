"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var config_1 = require('../config');
var binary_1 = require('./binary');
/**
 * The chrome driver binary.
 */
var ChromeDriver = (function (_super) {
    __extends(ChromeDriver, _super);
    function ChromeDriver() {
        _super.call(this);
        this.name = 'chromedriver';
        this.versionCustom = ChromeDriver.versionDefault;
        this.prefixDefault = 'chromedriver_';
        this.suffixDefault = '.zip';
        this.cdn = config_1.Config.cdnUrls().chrome;
    }
    ChromeDriver.prototype.id = function () { return ChromeDriver.id; };
    ChromeDriver.prototype.versionDefault = function () { return ChromeDriver.versionDefault; };
    ChromeDriver.prototype.suffix = function (ostype, arch) {
        if (ostype === 'Darwin') {
            return 'mac32' + this.suffixDefault;
        }
        else if (ostype === 'Linux') {
            if (arch === 'x64') {
                return 'linux64' + this.suffixDefault;
            }
            else {
                return 'linux32' + this.suffixDefault;
            }
        }
        else if (ostype === 'Windows_NT') {
            return 'win32' + this.suffixDefault;
        }
    };
    ChromeDriver.prototype.url = function (ostype, arch) {
        var urlBase = this.cdn + this.version() + '/';
        var filename = this.prefix() + this.suffix(ostype, arch);
        return urlBase + filename;
    };
    ChromeDriver.os = [binary_1.OS.Windows_NT, binary_1.OS.Linux, binary_1.OS.Darwin];
    ChromeDriver.id = 'chrome';
    ChromeDriver.versionDefault = config_1.Config.binaryVersions().chrome;
    ChromeDriver.isDefault = true;
    ChromeDriver.shortName = ['chrome'];
    return ChromeDriver;
}(binary_1.Binary));
exports.ChromeDriver = ChromeDriver;
