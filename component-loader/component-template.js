class COMPONENT_CLASS_NAME_PLACEHOLDER {
  constructor() {
        this.base64Html = "COMPONENT_BASE64_HTML_PLACEHOLDER";
        this.decodedHtml = atob(this.base64Html);
        this.elementsList = [];
        this.html = new TextDecoder().decode(new Uint8Array([...this.decodedHtml].map(c => c.charCodeAt(0))));
        this.nodes = Object.assign(document.createElement('div'), { innerHTML: this.html }).firstChild;
        this.parent = document.body;
        this.ui = {};
        this.initUi();
    }

    render (parent) {
        if(parent) this.parent = parent;
        this.parent.appendChild(this.nodes);
    }

    initUi() {
        this.elementsList = ((element) => {
            const allElements = [];
            const traverse = node => {
                if (node.nodeType === 1) { // Check if node is an element
                    allElements.push(node);
                    node.childNodes.forEach(traverse);
                }
            };
            traverse(element);
            return allElements;
        })(this.nodes);

        this.elementsList.forEach((node, index) => {
            let camelCaseId;
            if (node.id) {
                camelCaseId = node.id.replace(/-([a-z])/g, function (match, letter) {
                    return letter.toUpperCase();
                });
            } else if (node.getAttribute('name')) {
                camelCaseId = node.getAttribute('name').replace(/-([a-z])/g, function (match, letter) {
                    return letter.toUpperCase();
                });
            } else {
                const elementName = node.nodeName.toLowerCase();
                camelCaseId = `${elementName}${index}`;
            }
            this.ui[camelCaseId] = node;
        });

        Object.keys(this.ui).forEach(key => {
            this.ui[key].stylize = function(cssAttributes) {
                const cssString = Object.entries(cssAttributes).map(([property, value]) => `${property}: ${value}`).join('; ');
                this.style.cssText = cssString;
            };
        });
    }
}

export default COMPONENT_CLASS_NAME_PLACEHOLDER;