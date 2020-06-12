(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _lib_device_fn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createQueryDevice", function() { return _lib_device_fn__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony import */ var _lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__, "HomeAssistantDeviceInfoType")) __webpack_require__.d(__webpack_exports__, "HomeAssistantDeviceInfoType", function() { return _lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__["HomeAssistantDeviceInfoType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__, "HomeAssistantDeviceUpdatedType")) __webpack_require__.d(__webpack_exports__, "HomeAssistantDeviceUpdatedType", function() { return _lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__["HomeAssistantDeviceUpdatedType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__, "HomeAssistantDevicesType")) __webpack_require__.d(__webpack_exports__, "HomeAssistantDevicesType", function() { return _lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__["HomeAssistantDevicesType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__, "ManageDevicesDeleteType")) __webpack_require__.d(__webpack_exports__, "ManageDevicesDeleteType", function() { return _lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__["ManageDevicesDeleteType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__, "ManageDevicesType")) __webpack_require__.d(__webpack_exports__, "ManageDevicesType", function() { return _lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__["ManageDevicesType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__, "ManageDevicesUpdateType")) __webpack_require__.d(__webpack_exports__, "ManageDevicesUpdateType", function() { return _lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__["ManageDevicesUpdateType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__, "execute")) __webpack_require__.d(__webpack_exports__, "execute", function() { return _lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__["execute"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__, "get")) __webpack_require__.d(__webpack_exports__, "get", function() { return _lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__["get"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__, "namedLog")) __webpack_require__.d(__webpack_exports__, "namedLog", function() { return _lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__["namedLog"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__, "post")) __webpack_require__.d(__webpack_exports__, "post", function() { return _lib_models_home_assistant_entity__WEBPACK_IMPORTED_MODULE_1__["post"]; });

/* harmony import */ var _lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__, "HomeAssistantDeviceInfoType")) __webpack_require__.d(__webpack_exports__, "HomeAssistantDeviceInfoType", function() { return _lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__["HomeAssistantDeviceInfoType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__, "HomeAssistantDeviceUpdatedType")) __webpack_require__.d(__webpack_exports__, "HomeAssistantDeviceUpdatedType", function() { return _lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__["HomeAssistantDeviceUpdatedType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__, "HomeAssistantDevicesType")) __webpack_require__.d(__webpack_exports__, "HomeAssistantDevicesType", function() { return _lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__["HomeAssistantDevicesType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__, "ManageDevicesDeleteType")) __webpack_require__.d(__webpack_exports__, "ManageDevicesDeleteType", function() { return _lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__["ManageDevicesDeleteType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__, "ManageDevicesType")) __webpack_require__.d(__webpack_exports__, "ManageDevicesType", function() { return _lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__["ManageDevicesType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__, "ManageDevicesUpdateType")) __webpack_require__.d(__webpack_exports__, "ManageDevicesUpdateType", function() { return _lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__["ManageDevicesUpdateType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__, "execute")) __webpack_require__.d(__webpack_exports__, "execute", function() { return _lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__["execute"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__, "get")) __webpack_require__.d(__webpack_exports__, "get", function() { return _lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__["get"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__, "namedLog")) __webpack_require__.d(__webpack_exports__, "namedLog", function() { return _lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__["namedLog"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__, "post")) __webpack_require__.d(__webpack_exports__, "post", function() { return _lib_models_managed_device__WEBPACK_IMPORTED_MODULE_2__["post"]; });

/* harmony import */ var _lib_models_google__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
/* harmony import */ var _lib_models_google__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_models_google__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_google__WEBPACK_IMPORTED_MODULE_3__, "HomeAssistantDeviceInfoType")) __webpack_require__.d(__webpack_exports__, "HomeAssistantDeviceInfoType", function() { return _lib_models_google__WEBPACK_IMPORTED_MODULE_3__["HomeAssistantDeviceInfoType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_google__WEBPACK_IMPORTED_MODULE_3__, "HomeAssistantDeviceUpdatedType")) __webpack_require__.d(__webpack_exports__, "HomeAssistantDeviceUpdatedType", function() { return _lib_models_google__WEBPACK_IMPORTED_MODULE_3__["HomeAssistantDeviceUpdatedType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_google__WEBPACK_IMPORTED_MODULE_3__, "HomeAssistantDevicesType")) __webpack_require__.d(__webpack_exports__, "HomeAssistantDevicesType", function() { return _lib_models_google__WEBPACK_IMPORTED_MODULE_3__["HomeAssistantDevicesType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_google__WEBPACK_IMPORTED_MODULE_3__, "ManageDevicesDeleteType")) __webpack_require__.d(__webpack_exports__, "ManageDevicesDeleteType", function() { return _lib_models_google__WEBPACK_IMPORTED_MODULE_3__["ManageDevicesDeleteType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_google__WEBPACK_IMPORTED_MODULE_3__, "ManageDevicesType")) __webpack_require__.d(__webpack_exports__, "ManageDevicesType", function() { return _lib_models_google__WEBPACK_IMPORTED_MODULE_3__["ManageDevicesType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_google__WEBPACK_IMPORTED_MODULE_3__, "ManageDevicesUpdateType")) __webpack_require__.d(__webpack_exports__, "ManageDevicesUpdateType", function() { return _lib_models_google__WEBPACK_IMPORTED_MODULE_3__["ManageDevicesUpdateType"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_google__WEBPACK_IMPORTED_MODULE_3__, "execute")) __webpack_require__.d(__webpack_exports__, "execute", function() { return _lib_models_google__WEBPACK_IMPORTED_MODULE_3__["execute"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_google__WEBPACK_IMPORTED_MODULE_3__, "get")) __webpack_require__.d(__webpack_exports__, "get", function() { return _lib_models_google__WEBPACK_IMPORTED_MODULE_3__["get"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_google__WEBPACK_IMPORTED_MODULE_3__, "namedLog")) __webpack_require__.d(__webpack_exports__, "namedLog", function() { return _lib_models_google__WEBPACK_IMPORTED_MODULE_3__["namedLog"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_models_google__WEBPACK_IMPORTED_MODULE_3__, "post")) __webpack_require__.d(__webpack_exports__, "post", function() { return _lib_models_google__WEBPACK_IMPORTED_MODULE_3__["post"]; });

/* harmony import */ var _lib_device_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var _lib_device_execute__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "execute", function() { return _lib_device_execute__WEBPACK_IMPORTED_MODULE_5__["a"]; });

/* harmony import */ var _lib_call_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "get", function() { return _lib_call_service__WEBPACK_IMPORTED_MODULE_6__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "post", function() { return _lib_call_service__WEBPACK_IMPORTED_MODULE_6__["b"]; });

/* harmony import */ var _lib_models_server_messages__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(21);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HomeAssistantDeviceInfoType", function() { return _lib_models_server_messages__WEBPACK_IMPORTED_MODULE_7__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HomeAssistantDeviceUpdatedType", function() { return _lib_models_server_messages__WEBPACK_IMPORTED_MODULE_7__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HomeAssistantDevicesType", function() { return _lib_models_server_messages__WEBPACK_IMPORTED_MODULE_7__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ManageDevicesDeleteType", function() { return _lib_models_server_messages__WEBPACK_IMPORTED_MODULE_7__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ManageDevicesType", function() { return _lib_models_server_messages__WEBPACK_IMPORTED_MODULE_7__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ManageDevicesUpdateType", function() { return _lib_models_server_messages__WEBPACK_IMPORTED_MODULE_7__["f"]; });

/* harmony import */ var _utils_logging__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(22);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "namedLog", function() { return _utils_logging__WEBPACK_IMPORTED_MODULE_8__["a"]; });












/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
const environment = {
    production: true,
    homeAssistaneRestUri: 'http://hassio/homeassistant/api',
    homeAssistaneSocketUri: 'ws://hassio/homeassistant/api'
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("firebase-admin");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return readFileAsJson; });
/* unused harmony export getRootPath */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getWebRootPath; });
/* harmony import */ var _nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);



const log = Object(_nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_0__["namedLog"])('File Util');
const readFileAsJson = (filePath) => {
    log.info('Reading File:', filePath);
    const rawdata = fs__WEBPACK_IMPORTED_MODULE_1__["readFileSync"](filePath);
    return JSON.parse(rawdata.toString());
};
const getRootPath = () => {
    return path__WEBPACK_IMPORTED_MODULE_2__["join"](__dirname);
};
const getWebRootPath = (fileName) => {
    return fileName
        ? path__WEBPACK_IMPORTED_MODULE_2__["join"](getRootPath(), '../web-admin', fileName)
        : path__WEBPACK_IMPORTED_MODULE_2__["join"](getRootPath(), '../web-admin');
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _lib_firebase_queries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _lib_firebase_queries__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony import */ var _lib_firebase_commands__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _lib_firebase_commands__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _lib_firebase_commands__WEBPACK_IMPORTED_MODULE_1__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _lib_firebase_commands__WEBPACK_IMPORTED_MODULE_1__["c"]; });





/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("ws");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getTransforms */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createQueryDevice; });
/* unused harmony export createSyncDevice */
const getOn = (device, entity) => {
    if (device.deviceType === 'action.devices.types.THERMOSTAT') {
        return {
            on: entity.state !== 'off'
        };
    }
    return {
        on: entity.state !== 'off'
    };
};
const syncOn = (_device, _entity) => {
    return {
        commandOnlyOnOff: false
    };
};
const getTemperatureSetting = (_device, entity) => {
    let thermostatMode = entity.state;
    if (thermostatMode === 'heat_cool') {
        thermostatMode = 'heatcool';
    }
    else if (thermostatMode === 'fan_only') {
        thermostatMode = 'fan-only';
    }
    return {
        thermostatMode,
        thermostatTemperatureSetpoint: entity.attributes.temperature,
        thermostatTemperatureAmbient: entity.attributes.current_temperature,
        thermostatTemperatureSetpointHigh: entity.attributes.temperature,
        thermostatTemperatureSetpointLow: entity.attributes.min_temp,
        thermostatHumidityAmbient: entity.attributes.humidity
    };
};
const getFanSpeed = (_device, entity) => {
    return {
        currentFanSpeedSetting: entity.attributes.fan_mode
    };
};
const getCameraStream = (_device, _entity) => {
    return {};
};
const syncFanSpeed = (_device, entity) => {
    const defaultResult = {
        availableFanSpeeds: {
            speeds: [],
            ordered: false
        },
        reversible: false,
        commandOnlyFanSpeed: true
    };
    if (entity.entity_id.startsWith('climate')) {
        if (entity.attributes.fan_modes &&
            Array.isArray(entity.attributes.fan_modes)) {
            const fan_modes = entity.attributes.fan_modes;
            defaultResult.availableFanSpeeds.speeds = fan_modes.map(x => {
                return {
                    speed_name: x,
                    speed_values: {
                        speed_synonym: [x],
                        lang: 'en'
                    }
                };
            });
        }
    }
    return defaultResult;
};
const syncTemperatureSetting = (_device, entity) => {
    const defaultResult = {
        availableThermostatModes: 'heat,cool,off',
        thermostatTemperatureUnit: 'C',
        commandOnlyTemperatureSetting: false,
        queryOnlyTemperatureSetting: false
    };
    if (entity.entity_id.startsWith('climate')) {
        if (entity.attributes.hvac_modes &&
            Array.isArray(entity.attributes.hvac_modes)) {
            const hvac_modes = entity.attributes.hvac_modes;
            // defaultResult.availableThermostatModes = (hvac_modes.some(
            //   x => x === 'off'
            // )
            //   ? ['on', ...hvac_modes]
            //   : hvac_modes
            // )
            hvac_modes
                .filter(x => x !== 'off')
                .map(x => {
                switch (x) {
                    case 'heat_cool': {
                        return 'heatcool';
                    }
                    case 'fan_only': {
                        return 'fan-only';
                    }
                    default: {
                        return x;
                    }
                }
            })
                .join(',');
        }
    }
    return defaultResult;
};
const syncCameraStream = (_device, _entity) => {
    return {
        cameraStreamSupportedProtocols: ['hls'],
        cameraStreamNeedAuthToken: false,
        cameraStreamNeedDrmEncryption: false
    };
};
const transforms = {
    'action.devices.traits.TemperatureSetting': {
        query: getTemperatureSetting,
        sync: syncTemperatureSetting
    },
    'action.devices.traits.OnOff': {
        query: getOn,
        sync: syncOn
    },
    'action.devices.traits.FanSpeed': {
        query: getFanSpeed,
        sync: syncFanSpeed
    },
    'action.devices.traits.CameraStream': {
        query: getCameraStream,
        sync: syncCameraStream
    }
};
const getTransforms = (traits) => {
    return (traits || []).map(x => {
        return transforms[x];
    });
};
const createQueryDevice = (device, entity) => {
    const trans = getTransforms(device.traits);
    const d = {
        online: true
    };
    return trans.reduce((acc, t) => {
        const result = t.query(device, entity);
        Object.keys(result).map(x => {
            if (result[x] !== undefined) {
                acc[x] = result[x];
            }
        });
        return acc;
    }, d);
};
const createSyncDevice = (id, device, entity) => {
    const deviceInfo = device.device
        ? {
            manufacturer: device.device.manufacturer,
            model: device.device.model,
            hwVersion: undefined,
            swVersion: device.device.sw_version
        }
        : {
            manufacturer: 'Acme Co',
            model: 'acme-washer',
            hwVersion: '1.0',
            swVersion: '1.0.1'
        };
    const syncDevices = {
        id,
        type: device.deviceType,
        traits: device.traits || [],
        name: {
            defaultNames: [device.name],
            name: device.name,
            nicknames: []
        },
        willReportState: true,
        deviceInfo,
        attributes: {},
        customData: {},
        otherDeviceIds: []
    };
    if (entity.attributes.friendly_name) {
        syncDevices.name.defaultNames.push(entity.attributes.friendly_name);
        syncDevices.name.nicknames.push(entity.attributes.friendly_name);
    }
    const trans = getTransforms(device.traits);
    syncDevices.attributes = (trans || []).reduce((acc, t) => {
        if (t) {
            const result = t.sync(device, entity);
            Object.keys(result).map(x => {
                if (result[x] !== undefined) {
                    acc[x] = result[x];
                }
            });
        }
        return acc;
    }, syncDevices.attributes || {});
    if (syncDevices.otherDeviceIds) {
        if (device.localId) {
            syncDevices.otherDeviceIds.push({
                deviceId: device.localId
            });
        }
        if (device.entityId) {
            syncDevices.otherDeviceIds.push({
                deviceId: device.entityId
            });
            if (syncDevices.customData) {
                syncDevices.customData.localEntityId = device.entityId;
            }
        }
    }
    return syncDevices;
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {



/***/ }),
/* 16 */
/***/ (function(module, exports) {



/***/ }),
/* 17 */
/***/ (function(module, exports) {



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export deviceTypes */
/* unused harmony export deviceTraits */
const deviceTypes = [
    {
        code: 'action.devices.types.CAMERA',
        name: 'Camera',
        attributes: {
            cameraStreamSupportedProtocols: 'array',
            cameraStreamNeedAuthToken: 'boolean',
            cameraStreamNeedDrmEncryption: 'boolean'
        },
        traits: ['action.devices.traits.CameraStream']
        // cameraStreamSupportedProtocols: ['hls', 'dash'],
        // cameraStreamNeedAuthToken: true,
        // cameraStreamNeedDrmEncryption: false
    },
    {
        code: 'action.devices.types.THERMOSTAT',
        name: 'Thermostat',
        traits: ['action.devices.traits.TemperatureSetting']
        // availableThermostatModes: 'off,heat,cool,on',
        // thermostatTemperatureUnit: 'F'
    },
    {
        code: 'action.devices.types.SWITCH',
        name: 'Switch',
        traits: ['action.devices.traits.OnOff']
    },
    {
        code: 'action.devices.types.SPEAKER',
        name: 'Speaker',
        traits: ['action.devices.traits.Volume']
    },
    {
        code: 'action.devices.types.LIGHT',
        name: 'Light',
        traits: ['action.devices.traits.OnOff']
    },
    {
        code: 'action.devices.types.FAN',
        name: 'Fan',
        traits: ['action.devices.traits.OnOff']
    },
    {
        code: 'action.devices.types.MICROWAVE',
        name: 'Microwave',
        traits: ['action.devices.traits.OnOff']
    },
    {
        code: 'action.devices.types.COFFEE_MAKER',
        name: 'Coffee Maker',
        traits: ['action.devices.traits.OnOff']
    },
    {
        code: 'action.devices.types.AC_UNIT',
        name: 'AC Unit',
        traits: []
    }
];
// COFFEE_MAKER
const deviceTraits = [
    'action.devices.traits.CameraStream',
    'action.devices.traits.TemperatureSetting',
    'action.devices.traits.OnOff',
    'action.devices.traits.Volume',
    'action.devices.traits.FanSpeed'
];


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return execute; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);

const commandMap = {};
const createCommand = (id, status) => ({
    ids: [id],
    status: 'SUCCESS',
    states: status
});
commandMap['action.devices.commands.OnOff'] = (callService, entityId, parms) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    // const state = await getDeviceStatus(deviceId);
    const on = parms.on;
    if (entityId.startsWith('climate')) {
        yield callService('climate', on ? 'turn_on' : 'turn_off', {
            entity_id: entityId
        });
        if (on) {
            yield callService('climate', 'set_hvac_mode', {
                entity_id: entityId,
                hvac_mode: 'heat' // needs last mode
            });
        }
    }
    else {
        const [domain] = entityId.split('.');
        yield callService(domain || 'switch', on ? 'turn_on' : 'turn_off', {
            entity_id: entityId
        });
    }
    return createCommand(entityId, {
        on
    });
});
commandMap['action.devices.commands.ThermostatSetMode'] = (callService, entityId, parms) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const thermostatMode = parms.thermostatMode;
    yield callService('climate', 'set_hvac_mode', {
        entity_id: entityId,
        hvac_mode: thermostatMode
    });
    return createCommand(entityId, {
        thermostatMode
    });
});
commandMap['action.devices.commands.ThermostatTemperatureSetpoint'] = (callService, entityId, parms) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const thermostatTemperatureSetpoint = parms.thermostatTemperatureSetpoint;
    // const state = await getDeviceStatus(deviceId);
    yield callService('climate', 'set_temperature', {
        entity_id: entityId,
        temperature: thermostatTemperatureSetpoint
        // hvac_mode: state.thermostatMode
    });
    return createCommand(entityId, {
        thermostatTemperatureSetpoint
    });
});
const execute = (cmd, callService, entityId, parms) => {
    if (cmd in commandMap) {
        return commandMap[cmd](callService, entityId, parms);
    }
    console.error(`can't find ${cmd}`);
};


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export asyncForEach */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return post; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);


const asyncForEach = (array, callback) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    for (let index = 0; index < array.length; index++) {
        yield callback(array[index], index, array);
    }
});
const get = (url, token) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const res = yield axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
});
const post = (url, token, body) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const var1 = JSON.stringify(body);
    console.log('post url:', url);
    console.log('post body:', var1);
    const res = yield axios__WEBPACK_IMPORTED_MODULE_1___default()(url, {
        method: 'post',
        data: body,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
});


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ManageDevicesType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return HomeAssistantDevicesType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HomeAssistantDeviceUpdatedType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeAssistantDeviceInfoType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ManageDevicesUpdateType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ManageDevicesDeleteType; });
const ManageDevicesType = 'firebase';
const HomeAssistantDevicesType = 'device_list';
const HomeAssistantDeviceUpdatedType = 'device_updated';
const HomeAssistantDeviceInfoType = 'device_info';
const ManageDevicesUpdateType = 'firebase_update';
const ManageDevicesDeleteType = 'firebase_delete';


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export log */
/* unused harmony export logError */
/* unused harmony export logWarn */
/* unused harmony export logInfo */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return namedLog; });
// tslint:disable: no-console
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
})(LogLevel || (LogLevel = {}));
const baseLog = (level, message, agrs) => {
    const now = new Date().toLocaleString();
    const msg = `${now} ${LogLevel[level]} ${message}`;
    switch (level) {
        case LogLevel.DEBUG:
            console.info(msg, ...agrs);
            break;
        case LogLevel.INFO:
            console.log(msg, ...agrs);
            break;
        case LogLevel.WARN:
            console.warn(msg, ...agrs);
            break;
        case LogLevel.ERROR:
            console.error(msg, ...agrs);
            break;
    }
};
const log = (message, ...agrs) => {
    baseLog(LogLevel.INFO, message, agrs);
};
const logError = (message, ...agrs) => {
    baseLog(LogLevel.ERROR, message, agrs);
};
const logWarn = (message, ...agrs) => {
    baseLog(LogLevel.WARN, message, agrs);
};
const logInfo = (message, ...agrs) => {
    baseLog(LogLevel.DEBUG, message, agrs);
};
const namedLog = (name) => {
    const formattedName = `[${name}]`;
    return {
        info: (message, ...agrs) => {
            log(`${formattedName} ${message}`, ...agrs);
        },
        debug: (message, ...agrs) => {
            logInfo(`${formattedName} ${message}`, ...agrs);
        },
        warn: (message, ...agrs) => {
            logWarn(`${formattedName} ${message}`, ...agrs);
        },
        error: (message, ...agrs) => {
            logError(`${formattedName} ${message}`, ...agrs);
        }
    };
};


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getDevicesAsync */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getDevicesCallBack; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_admin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var firebase_admin__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_admin__WEBPACK_IMPORTED_MODULE_1__);


const getDevicesAsync = () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const db = firebase_admin__WEBPACK_IMPORTED_MODULE_1__["firestore"]();
    const devicesCollection = yield db
        .collection('devices')
        .where('uid', '==', 'v7QW5h3ehIUV9Kze9sHY1yLudoI2')
        .get();
    const deviceModels = [];
    devicesCollection.forEach(device => {
        const deviceModel = device.data();
        deviceModel.id = device.id;
        deviceModels.push(deviceModel);
    });
    return deviceModels;
});
const getDevicesCallBack = (callback) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const db = firebase_admin__WEBPACK_IMPORTED_MODULE_1__["firestore"]();
    db.collection('devices')
        .where('uid', '==', 'v7QW5h3ehIUV9Kze9sHY1yLudoI2')
        .onSnapshot(devicesCollection => {
        const deviceModels = [];
        devicesCollection.forEach(device => {
            const deviceModel = device.data();
            deviceModel.id = device.id;
            deviceModels.push(deviceModel);
        });
        callback(deviceModels);
    }, err => {
        console.error(err);
    });
});


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return setDeviceStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return upsertManagedDevice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return deleteManagedDevice; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_admin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var firebase_admin__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_admin__WEBPACK_IMPORTED_MODULE_1__);


const setDeviceStatus = (managedDeviceId, deviceStatus) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const db = firebase_admin__WEBPACK_IMPORTED_MODULE_1__["firestore"]();
    yield db
        .collection('devices')
        .doc(managedDeviceId)
        .update({
        states: deviceStatus
    });
    return true;
});
const upsertManagedDevice = (managedDevice) => {
    const db = firebase_admin__WEBPACK_IMPORTED_MODULE_1__["firestore"]();
    managedDevice.uid = 'v7QW5h3ehIUV9Kze9sHY1yLudoI2';
    const { id } = managedDevice, update = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(managedDevice, ["id"]);
    if (managedDevice.id) {
        db.collection('devices')
            .doc(id)
            .set(update);
    }
    else {
        db.collection('devices').add(update);
    }
};
const deleteManagedDevice = (id) => {
    const db = firebase_admin__WEBPACK_IMPORTED_MODULE_1__["firestore"]();
    return db
        .collection('devices')
        .doc(id)
        .delete();
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("actions-on-google");

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export globalAgentUserId */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataAccess; });
/* harmony import */ var _nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _nx_home_assistant_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
/* harmony import */ var _home_assistant_server__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28);






const log = Object(_nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_0__["namedLog"])('Data Access');
const globalAgentUserId = 'fedf0bfd-5e8b-422c-8886-04bf293dde9f';
class DataAccess {
    constructor(token, googleHome) {
        this.token = token;
        this.googleHome = googleHome;
        this.counter = 1;
        this.homeAssistantWebSocket = new _home_assistant_server__WEBPACK_IMPORTED_MODULE_5__[/* HomeAssistantWebSocket */ "a"](`${_environments_environment__WEBPACK_IMPORTED_MODULE_4__[/* environment */ "a"].homeAssistaneSocketUri}/websocket`, token);
    }
    upsertManagedDevice(update) {
        Object(_nx_home_assistant_data_access__WEBPACK_IMPORTED_MODULE_1__[/* upsertManagedDevice */ "d"])(update);
        this.requestSync();
    }
    deleteManagedDevice(id) {
        Object(_nx_home_assistant_data_access__WEBPACK_IMPORTED_MODULE_1__[/* deleteManagedDevice */ "a"])(id).then(() => { });
        this.requestSync();
    }
    getManagedDevices() {
        if (!this.fireBase) {
            this.initFireBase();
        }
        return this.fireBase.asObservable();
    }
    getEntityStatus() {
        if (!this.entityStatus) {
            this.entityStatus = this.createSubScription({
                id: this.counter,
                type: 'get_states'
            }, this.counter++).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(msg => {
                return msg.result;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1));
        }
        return this.entityStatus;
    }
    getEntityStatusUpdated() {
        if (!this.entityStatusUpdated) {
            this.entityStatusUpdated = this.createSubScription({
                id: this.counter,
                type: 'subscribe_events',
                event_type: 'state_changed'
            }, this.counter++).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(x => { var _a; return ((_a = x.event) === null || _a === void 0 ? void 0 : _a.event_type) === 'state_changed'; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(msg => {
                return msg.event.data
                    .new_state;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1));
        }
        return this.entityStatusUpdated;
    }
    getAreas() {
        if (!this.areas) {
            this.areas = this.createSubScription({
                id: this.counter,
                type: 'config/area_registry/list'
            }, this.counter++).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(msg => {
                return msg.result;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1));
        }
        return this.areas;
    }
    getEntities() {
        if (!this.entities) {
            this.entities = this.createSubScription({
                id: this.counter,
                type: 'config/entity_registry/list'
            }, this.counter++).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(msg => {
                return msg.result;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1));
        }
        return this.entities;
    }
    getDevices() {
        if (!this.devices) {
            this.devices = this.createSubScription({
                id: this.counter,
                type: 'config/device_registry/list'
            }, this.counter++).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(msg => {
                return msg.result;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1));
        }
        return this.devices;
    }
    initFireBase() {
        this.fireBase = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        Object(_nx_home_assistant_data_access__WEBPACK_IMPORTED_MODULE_1__[/* getDevicesCallBack */ "b"])(d => {
            this.fireBase.next(d);
        });
    }
    createSubScription(iniMessage, resultId) {
        this.homeAssistantWebSocket.next(iniMessage);
        return this.homeAssistantWebSocket
            .messages()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(x => x.id === resultId));
    }
    requestSync() {
        if (this.googleHome) {
            this.googleHome
                .requestSync(globalAgentUserId)
                .then(resp => {
                log.info('[DataAccess] Google Home requestSync', resp);
            })
                .catch(err => {
                log.error('[DataAccess] Google Home requestSync', err);
            });
        }
    }
}


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeAssistantWebSocket; });
/* harmony import */ var _nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs_webSocket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var rxjs_webSocket__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs_webSocket__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);




const log = Object(_nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_0__["namedLog"])('Home assistant Socket Client');
// tslint:disable-next-line
global.WebSocket = __webpack_require__(12);
class HomeAssistantWebSocket {
    constructor(url, token) {
        this.url = url;
        this.token = token;
        this.homeAssistantResult = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
        this.subscribedMessages = [];
    }
    initWebSocket() {
        this.webSocketSubject = Object(rxjs_webSocket__WEBPACK_IMPORTED_MODULE_2__["webSocket"])({
            url: this.url,
            closeObserver: {
                next: (err) => {
                    log.error('Home Assistant Web Socket Closed', err);
                    setTimeout(() => {
                        log.debug('Re connecting');
                        this.initWebSocket();
                    }, 5000);
                }
            }
        });
        this.webSocketSubject
            .subscribe(msg => {
            this.processMessage(msg);
        }, err => {
            log.error('ws error', err.message);
            this.webSocketSubject.complete();
        }, () => {
            log.warn('webSocket completed');
        });
    }
    messages() {
        return this.homeAssistantResult.asObservable();
    }
    next(massageBase) {
        this.subscribedMessages.push(massageBase);
        if (!this.webSocketSubject) {
            this.initWebSocket();
        }
        else {
            log.debug('Adding Messages - WS Open', massageBase);
            this.webSocketSubject.next(massageBase);
        }
    }
    processMessage(msg) {
        if (msg.type === 'auth_required') {
            this.webSocketSubject.next({
                type: 'auth',
                access_token: this.token
            });
        }
        else if (msg.type === 'auth_ok') {
            this.subscribedMessages.forEach(m => {
                log.debug('Adding Messages', m);
                this.webSocketSubject.next(m);
            });
        }
        else if (msg.type === 'result') {
            this.homeAssistantResult.next(msg);
        }
        else if (msg.type === 'event') {
            this.homeAssistantResult.next(msg);
        }
        else if (msg.type === 'auth_invalid') {
            log.error('Auth Error', msg.message);
            log.info('Token', {
                token: this.token,
                url: `${_environments_environment__WEBPACK_IMPORTED_MODULE_3__[/* environment */ "a"].homeAssistaneSocketUri}/websocket`
            });
        }
        else {
            log.warn('processMessage unknown', msg);
        }
    }
}


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("rxjs/webSocket");

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return startUDPServer; });
/* harmony import */ var _nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var cbor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
/* harmony import */ var cbor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cbor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dgram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);
/* harmony import */ var dgram__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dgram__WEBPACK_IMPORTED_MODULE_2__);



const log = Object(_nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_0__["namedLog"])('UDP Service');
const startUDPServer = (argv) => {
    const socket = Object(dgram__WEBPACK_IMPORTED_MODULE_2__["createSocket"])('udp4');
    // Handle discovery request.
    socket.on('message', (msg, rinfo) => {
        const discoveryPacket = Buffer.from(argv.udp_discovery_packet, 'hex');
        if (msg.compare(discoveryPacket) !== 0) {
            log.warn(`received unknown payload from ${rinfo}:`, msg);
            return;
        }
        const discoveryData = {
            id: argv.device_id,
            model: argv.device_model,
            hw_rev: argv.hardware_revision,
            fw_rev: argv.firmware_revision,
            isLocalOnly: true,
            isProxy: true
        };
        const responsePacket = Object(cbor__WEBPACK_IMPORTED_MODULE_1__["encode"])(discoveryData);
        socket.send(responsePacket, rinfo.port, rinfo.address, error => {
            if (error !== null) {
                log.error('failed to send ack:', error);
                return;
            }
        });
    });
    socket
        .on('listening', () => {
        log.info('discovery listening', socket.address());
    })
        .bind(argv.udp_discovery_port);
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("cbor");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("dgram");

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createRestServer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(34);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(0);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3);
/* harmony import */ var _utils_file__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6);









const log = Object(_nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_1__["namedLog"])('Rest Service');
const express = express__WEBPACK_IMPORTED_MODULE_4__;
const callLocalService = (token) => {
    return (domain, service, data) => {
        return Object(_nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_1__["post"])(`${_environments_environment__WEBPACK_IMPORTED_MODULE_7__[/* environment */ "a"].homeAssistaneRestUri}/services/${domain}/${service}`, token, data);
    };
};
const createRestServer = (app, dataAccess, token, supervisorToken) => {
    dataAccess
        .getManagedDevices()
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(x => {
        return x.map(y => y.entityId);
    }))
        .toPromise()
        .then(x => {
        log.info('managedDevices', x);
    });
    app.use(body_parser__WEBPACK_IMPORTED_MODULE_2__["urlencoded"]({ extended: true }));
    app.use(body_parser__WEBPACK_IMPORTED_MODULE_2__["json"]());
    app.use(body_parser__WEBPACK_IMPORTED_MODULE_2__["raw"]());
    if (!_environments_environment__WEBPACK_IMPORTED_MODULE_7__[/* environment */ "a"].production) {
        app.use(cors__WEBPACK_IMPORTED_MODULE_3__());
    }
    app.get('/', (_req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        log.info('request 404', {
            url: _req.url,
            originalUrl: _req.originalUrl,
            path: _req.path
        });
        const addonsInfo = yield Object(_nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_1__["get"])(`http://supervisor/addons/self/info`, supervisorToken || token);
        const file = fs__WEBPACK_IMPORTED_MODULE_5__["readFileSync"](Object(_utils_file__WEBPACK_IMPORTED_MODULE_8__[/* getWebRootPath */ "a"])('index.html'), 'utf8');
        const data = file.replace(`<base href="/" />`, `<base href="${addonsInfo.ingress_url}" />`);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
    }));
    app.get('/api/devices', (_req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        const devices = yield dataAccess
            .getManagedDevices()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(x => {
            return x.map(y => y.entityId);
        }))
            .toPromise();
        res.json({
            devices: devices || []
        });
    }));
    app.post('/api/execute/:id', (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const body = req.body;
        log.info('Local Execution', {
            command: body.execution[0].command,
            params: body.execution[0].params
        });
        const result = yield Object(_nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_1__["execute"])(body.execution[0].command, callLocalService(token), id, body.execution[0].params);
        res.status(200).json(result);
    }));
    app.use('/assets', express.static(Object(_utils_file__WEBPACK_IMPORTED_MODULE_8__[/* getWebRootPath */ "a"])('assets')));
    app.use((_req, res, _next) => {
        const segments = _req.url.split('/');
        const fileName = segments[segments.length - 1];
        if (fs__WEBPACK_IMPORTED_MODULE_5__["existsSync"](Object(_utils_file__WEBPACK_IMPORTED_MODULE_8__[/* getWebRootPath */ "a"])(fileName))) {
            let contentType = 'text/html';
            if (fileName.endsWith('js')) {
                contentType = 'text/javascript';
            }
            else if (fileName.endsWith('css')) {
                contentType = 'text/css';
            }
            res.writeHead(200, {
                'Content-Type': contentType
            });
            const file = fs__WEBPACK_IMPORTED_MODULE_5__["readFileSync"](Object(_utils_file__WEBPACK_IMPORTED_MODULE_8__[/* getWebRootPath */ "a"])(fileName), null);
            res.write(file);
            res.end();
        }
        else {
            res.status(404).send("Sorry can't find that!");
        }
    });
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createWebSocket; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nx_home_assistant_data_access__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ws__WEBPACK_IMPORTED_MODULE_5__);






const log = Object(_nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_1__["namedLog"])('Socket Service');
const isEq = (obj1 = {}, obj2 = {}) => {
    const obj1Keys = Object.keys(obj1 || {});
    const obj2Keys = Object.keys(obj2 || {});
    const allKeys = new Set();
    obj1Keys.forEach(x => allKeys.add(x));
    obj2Keys.forEach(x => allKeys.add(x));
    const diff = Array.from(allKeys).reduce((acc, key) => {
        if (obj1[key] !== obj2[key]) {
            acc[key] = {
                oldValue: obj1[key],
                newValue: obj2[key]
            };
        }
        return acc;
    }, {});
    if (Object.keys(diff).length === 0) {
        return true;
    }
    log.info('props changed', diff);
    return false;
};
const createWebSocket = (server, dataAccess) => {
    const wss = new ws__WEBPACK_IMPORTED_MODULE_5__["Server"]({ server, path: '/ws' });
    Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])([
        dataAccess.getManagedDevices(),
        dataAccess.getEntityStatusUpdated()
    ])
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(([ids, update]) => ids.map(x => x.entityId).includes(update.entity_id)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])((err, caught) => {
        log.error('Device Filter Error', err);
        // throw new Error(`Error in filter: ${err}`);
        return caught;
    }))
        .subscribe(([managedDevices, device]) => {
        const managedDevice = managedDevices.find(x => x.entityId === device.entity_id);
        const update = Object(_nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_1__["createQueryDevice"])(managedDevice, device);
        if (!isEq(managedDevice.states, update)) {
            Object(_nx_home_assistant_data_access__WEBPACK_IMPORTED_MODULE_2__[/* setDeviceStatus */ "c"])(managedDevice.id, update);
            log.info('Updating Entity ', device.entity_id, managedDevice.id, update);
        }
    }, err => {
        log.error('Device Update Error', err);
    });
    wss.on('connection', (ws) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        const subject$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        // connection is up, let's add a simple simple event
        ws.on('message', (message) => {
            const serverMessage = JSON.parse(message);
            switch (serverMessage.type) {
                case _nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_1__["ManageDevicesUpdateType"]: {
                    dataAccess.upsertManagedDevice(serverMessage.update);
                    break;
                }
                case _nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_1__["ManageDevicesDeleteType"]: {
                    dataAccess.deleteManagedDevice(serverMessage.id);
                    break;
                }
                default:
                    // log the received message and send it back to the client
                    log.warn('received: %s', message);
            }
        });
        dataAccess
            .getManagedDevices()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(subject$))
            .subscribe(manageDevices => {
            ws.send(JSON.stringify({
                type: _nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_1__["ManageDevicesType"],
                devices: manageDevices || []
            }));
        });
        dataAccess
            .getEntityStatus()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(subject$))
            .subscribe(homeAssistantDevices => {
            ws.send(JSON.stringify({
                type: _nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_1__["HomeAssistantDevicesType"],
                devices: homeAssistantDevices || []
            }));
        });
        dataAccess
            .getEntityStatusUpdated()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(subject$))
            .subscribe(homeAssistantDevices => {
            ws.send(JSON.stringify({
                type: _nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_1__["HomeAssistantDeviceUpdatedType"],
                device: homeAssistantDevices
            }));
        });
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])([
            dataAccess.getAreas(),
            dataAccess.getEntities(),
            dataAccess.getDevices()
        ])
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(subject$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(([areas, entities, devices]) => {
            const areasMap = (areas || []).reduce((acc, a) => {
                acc[a.area_id] = a.name;
                return acc;
            }, {});
            const devicesMap = (devices || []).reduce((acc, a) => {
                acc[a.id] = a;
                return acc;
            }, {});
            return (entities || [])
                .map(e => {
                const device = devicesMap[e.device_id];
                if (device) {
                    return {
                        entity_id: e.entity_id,
                        area: areasMap[device.area_id],
                        manufacturer: device.manufacturer,
                        model: device.model,
                        name: device.name,
                        sw_version: device.sw_version
                    };
                }
            })
                .filter(x => x);
        }))
            .subscribe(devicesInfo => {
            ws.send(JSON.stringify({
                type: _nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_1__["HomeAssistantDeviceInfoType"],
                devices: devicesInfo
            }));
        });
        ws.onclose = () => {
            subject$.next();
            subject$.complete();
        };
        ws.onerror = err => {
            log.error('createWebSocket onerror', err);
        };
    }));
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(37);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var firebase_admin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var firebase_admin__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(firebase_admin__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var actions_on_google__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26);
/* harmony import */ var actions_on_google__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(actions_on_google__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _app_data_access__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(27);
/* harmony import */ var _app_discover_server__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);
/* harmony import */ var _app_rest_server__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(33);
/* harmony import */ var _app_socket_server__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(35);
/* harmony import */ var _utils_file__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6);




const log = Object(_nx_home_assistant_common__WEBPACK_IMPORTED_MODULE_0__["namedLog"])('Main');
log.debug('Environment', _environments_environment__WEBPACK_IMPORTED_MODULE_3__[/* environment */ "a"]);
const options = _environments_environment__WEBPACK_IMPORTED_MODULE_3__[/* environment */ "a"].production
    ? Object(_utils_file__WEBPACK_IMPORTED_MODULE_10__[/* readFileAsJson */ "b"])('/data/options.json')
    : _environments_environment__WEBPACK_IMPORTED_MODULE_3__[/* environment */ "a"].options;
log.debug('App options', options);
const jwt = Object(_utils_file__WEBPACK_IMPORTED_MODULE_10__[/* readFileAsJson */ "b"])(options.googleJwtPath);

firebase_admin__WEBPACK_IMPORTED_MODULE_4__["initializeApp"]({
    credential: firebase_admin__WEBPACK_IMPORTED_MODULE_4__["credential"].cert(jwt),
    databaseURL: options.firebase.databaseURL
});






const express = express__WEBPACK_IMPORTED_MODULE_1__;
const smarthomeApp = Object(actions_on_google__WEBPACK_IMPORTED_MODULE_5__["smarthome"])({
    debug: !_environments_environment__WEBPACK_IMPORTED_MODULE_3__[/* environment */ "a"].production,
    key: options.firebase.apikey,
    jwt: jwt
});
const app = express();
const port = 8088;
const env = process.env;
const token = env.HASSIO_TOKEN || _environments_environment__WEBPACK_IMPORTED_MODULE_3__[/* environment */ "a"].homeAssistaneApiKey;
log.debug('Token', token);
const supervisorToken = env.SUPERVISOR_TOKEN;
log.debug('SupervisorToken', supervisorToken);
const argv = {
    udp_discovery_port: 3311,
    udp_discovery_packet: 'A5A5A5A5',
    device_id: 'strand1',
    device_model: '',
    hardware_revision: '',
    firmware_revision: ''
};
const dataAccess = new _app_data_access__WEBPACK_IMPORTED_MODULE_6__[/* DataAccess */ "a"](token, smarthomeApp);
Object(_app_rest_server__WEBPACK_IMPORTED_MODULE_8__[/* createRestServer */ "a"])(app, dataAccess, token, supervisorToken);
const server = http__WEBPACK_IMPORTED_MODULE_2__["createServer"](app);
Object(_app_socket_server__WEBPACK_IMPORTED_MODULE_9__[/* createWebSocket */ "a"])(server, dataAccess);
server.listen(port);
if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__[/* environment */ "a"].production) {
    Object(_app_discover_server__WEBPACK_IMPORTED_MODULE_7__[/* startUDPServer */ "a"])(argv);
}


/***/ })
/******/ ])));