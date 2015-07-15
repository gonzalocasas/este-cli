import Component from '{{{folderPath}}}/component.react';
import React from 'react';

{{#isPlainComponent}}
export default class {{className}} extends Component {

  render() {
    return <div>{{camelName}} component</div>;
  }

}
{{/isPlainComponent}}
{{^isPlainComponent}}
{{^isDecorator}}
export default function {{camelName}}Component(BaseComponent) {

  class {{className}} extends Component {
    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  {{className}}.displayName = `${BaseComponent.name}{{className}}`;

  return {{className}};

}
{{/isDecorator}}
{{#isDecorator}}
export default function {{camelName}}() {
    return function decorator(BaseComponent) {
        return class {{className}} extends Component {

            render() {
                return <BaseComponent {...this.props} />;
            }
        };
    }

    {{className}}.displayName = `${BaseComponent.name}{{className}}`;

    return {{className}};
}
{{/isDecorator}}
{{/isPlainComponent}}
