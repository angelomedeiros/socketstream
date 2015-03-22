'use strict';

var path    = require('path'),
  should  = require('should'),
//sinon   = require('sinon'),
  ss      = require( '../../../../lib/socketstream'),
  bundlerMod = require('../../../../lib/client/bundler'),
  //engineMod = require('../../../../lib/client/template_engine'),
  options = ss.client.options;

describe('angular.js template engine', function () {

  ss.root = ss.api.root = path.join(__dirname, '../../../fixtures/project');

  options.liveReload = false;

  ss.api.bundler = bundlerMod(ss.api, options);

  //var templateEngine = engineMod(ss.api,options);

  beforeEach(function() {

    // back to initial client state
    ss.client.assets.unload();
    ss.client.assets.load();
  });

  afterEach(function() {
    ss.client.forget();
  });


  it('should output an inline template for use with Angular JS', function() {

    var client = ss.client.define('abc', {
      css: './abc/style.css',
      code: './abc/index.a',
      view: './abc/abc.html'
    });

    ss.client.templateEngine.use('angular');

    ss.api.bundler.load();

    var engines = ss.api.client.templateEngines = ss.client.templateEngine.load();
    var formatters = ss.api.client.formatters = ss.client.formatters.load();

    var bundler = ss.api.bundler.get('abc');

    var files = [
      { file: './templates/1.html', importedBy:'./templates/1.html', includeType:'html' }
    ];

    ss.client.templateEngine.generate(bundler, files, function(tag) {
      tag.should.be.equal('<script type="text/ng-template" id="templates-1.html"><body><div>1</div></body>\n</script>');
    });

  });

});
