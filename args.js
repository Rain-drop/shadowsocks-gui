// Generated by CoffeeScript 1.8.0
(function() {
  var allConfigs, defaultConfig, deleteConfig, fs, guiconfigFilename, loadConfig, loadConfigs, loadFromJSON, loadIndex, localStorage, publicConfig, saveConfig, saveConfigs, saveIndex, saveToJSON, util;

  localStorage = window.localStorage;

  util = require('util');

  fs = require('fs');

  guiconfigFilename = fs.realpathSync(process.execPath + '/..') + '/gui-config.json';

  loadFromJSON = function() {
    var data, e, temp;
    if (process.platform === 'win32') {
      try {
        data = fs.readFileSync(guiconfigFilename);
        temp = JSON.parse(data.toString('utf-8'));
        if (temp.configs) {
          temp.configs = JSON.stringify(temp.configs);
        }
        localStorage = temp;
        return util.log('reading config file');
      } catch (_error) {
        e = _error;
        return console.log(e);
      }
    }
  };

  loadFromJSON();

  saveToJSON = function() {
    var data, e, temp;
    if (process.platform === 'win32') {
      util.log('saving config file');
      temp = JSON.parse(JSON.stringify(localStorage));
      if (temp.configs) {
        temp.configs = JSON.parse(temp.configs);
      }
      data = JSON.stringify(temp, null, 2);
      try {
        return fs.writeFileSync(guiconfigFilename, data, {
          'encoding': 'utf-8'
        });
      } catch (_error) {
        e = _error;
        return util.log(e);
      }
    }
  };

  publicConfig = {
    server: '209.141.36.62',
    server_port: 8348,
    local_port: 1080,
    password: '$#HAL9000!',
    method: 'aes-256-cfb',
    timeout: 600
  };

  defaultConfig = {
    server_port: 8388,
    local_port: 1080,
    method: 'aes-256-cfb',
    timeout: 600
  };

  loadConfigs = function() {
    var e;
    try {
      return JSON.parse(localStorage['configs'] || '[]');
    } catch (_error) {
      e = _error;
      util.log(e);
      return [];
    }
  };

  allConfigs = function() {
    var c, configs, e, i, result;
    if (localStorage['configs']) {
      result = [];
      try {
        configs = loadConfigs();
        for (i in configs) {
          c = configs[i];
          result.push("" + c.server + ":" + c.server_port);
        }
        return result;
      } catch (_error) {
        e = _error;
      }
    }
    return [];
  };

  saveIndex = function(index) {
    localStorage['index'] = index;
    return saveToJSON();
  };

  loadIndex = function() {
    return +localStorage['index'];
  };

  saveConfigs = function(configs) {
    localStorage['configs'] = JSON.stringify(configs);
    return saveToJSON();
  };

  saveConfig = function(index, config) {
    var configs;
    if (index === -1) {
      index = NaN;
    }
    configs = loadConfigs();
    if (isNaN(index)) {
      configs.push(config);
      index = configs.length - 1;
    } else {
      configs[index] = config;
    }
    saveConfigs(configs);
    return index;
  };

  loadConfig = function(index) {
    var configs;
    if (isNaN(index)) {
      return defaultConfig;
    }
    if (index === -1) {
      return publicConfig;
    }
    configs = loadConfigs();
    return configs[index] || defaultConfig;
  };

  deleteConfig = function(index) {
    var configs;
    if ((!isNaN(index)) && !(index === -1)) {
      configs = loadConfigs();
      configs.splice(index, 1);
      return saveConfigs(configs);
    }
  };

  exports.allConfigs = allConfigs;

  exports.saveConfig = saveConfig;

  exports.loadConfig = loadConfig;

  exports.deleteConfig = deleteConfig;

  exports.loadIndex = loadIndex;

  exports.saveIndex = saveIndex;

  exports.publicConfig = publicConfig;

}).call(this);
