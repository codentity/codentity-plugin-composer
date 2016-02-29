'use strict';

const JsonPackageFinder = require('json-package-finder');

class ComposerPackageFinder extends JsonPackageFinder {
  constructor (composerJson) {
    super({
      json: composerJson,
      dependencyPaths: ['require', 'require-dev']
    });
  }
  find (query) {
    return super.find(query).map(result => this._transform(result));
  }
  _transform (result) {
    return {
      plugin: 'composer',
      src: 'composerJson',
      packageName: result.key,
      version: result.value,
      dependencyGroup: result.path.join('.')
    };
  }
}

module.exports = ComposerPackageFinder;
