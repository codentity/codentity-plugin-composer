'use strict';

const minimatch = require('minimatch');
const path = require('path');

class ComposerFileFilter {
  constructor (composerJson) {
    this._composerJson = composerJson;
    this._vendorDirQuery = this._getVendorDirQuery();
  }
  static make (composerJson) {
    return new ComposerFileFilter(composerJson);
  }
  filter (filePaths) {
    // only filter if composer.json is present
    if (!this._composerJson) return filePaths;
    let filter = this.createFilter();
    return (filePaths || []).filter(filter);
  }
  createFilter () {
    return this._isNotVendorFile.bind(this);
  }
  _getVendorDirQuery () {
    let vendorDir = this._getVendorDir();
    return path.join(path.relative('.', vendorDir), '**');
  }
  _getVendorDir () {
    // NOTE: https://getcomposer.org/doc/06-config.md#vendor-dir
    if (!this._composerJson ||
        !this._composerJson.config ||
        !this._composerJson.config['vendor-dir']) return 'vendor';
    return this._composerJson.config['vendor-dir'];
  }
  _isVendorFile (filePath) {
    return minimatch(filePath, this._vendorDirQuery);
  }
  _isNotVendorFile (filePath) {
    return !this._isVendorFile(filePath);
  }
}

module.exports = ComposerFileFilter;
