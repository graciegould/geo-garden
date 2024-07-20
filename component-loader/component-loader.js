const fs = require('fs');
const path = require('path');
const {base64Html} = require('./base64');

const COMPONENT_CLASS_NAME_PLACEHOLDER = "COMPONENT_CLASS_NAME_PLACEHOLDER";
const COMPONENT_BASE64_HTML_PLACEHOLDER = "COMPONENT_BASE64_HTML_PLACEHOLDER";

function loadTemplate() {
  const templatePath = path.resolve(__dirname, 'component-template.js');
  return fs.readFileSync(templatePath, 'utf8');
}

function ComponentLoader(input) {
  let component = {};
  component.path = this.resourcePath;
  component.name = this.resourcePath.split('/').pop().split('.').shift();
  component.base64Html = base64Html(input);
  const template = loadTemplate();
  let _module = template;
  _module = _module.replace(new RegExp(COMPONENT_CLASS_NAME_PLACEHOLDER, 'g'), component.name);
  _module = _module.replace(new RegExp(COMPONENT_BASE64_HTML_PLACEHOLDER, 'g'), component.base64Html);
  return _module;
}

module.exports = ComponentLoader;
module.exports.default = ComponentLoader;