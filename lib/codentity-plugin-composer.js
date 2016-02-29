'use strict';

const CodentityPlugin = require('codentity-plugin');
const ComposerFileFilter = require('./file-filter');
const ComposerPackageFinder = require('./package-finder');

class ComposerPlugin extends CodentityPlugin {
  constructor (config) {
    super('composer');
    this._composerJson = config._composerJson;
  }
  static make (config) {
    return new ComposerPlugin(config);
  }
  filter (filePaths) {
    return ComposerFileFilter.make(this._composerJson).filter(filePaths);
  }
  find (query) {
    return ComposerPackageFinder.make(this._composerJson).find(query);
  }
}

ComposerPlugin.requirements = {
  'composerJson': 'composer.json'
};

module.exports = ComposerPlugin;
