import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { defineComponent } from 'vue'
import { Fragment, jsx, jsx as jsxs } from 'vue/jsx-runtime'
import { createAST } from './ast'
import { type Options } from './types'

/**
 * Component to render markdown.
 */
export const Markdown = defineComponent<Options>({
  name: 'Markdown',
  props: [
    'class',
    'content',
    'allowedElements',
    'allowElement',
    'components',
    'disallowedElements',
    'rehypePlugins',
    'remarkPlugins',
    'remarkRehypeOptions',
    'skipHtml',
    'unwrapDisallowed',
    'urlTransform',
  ],
  setup(props) {
    return () => {
      const hastTree = createAST(props)
      const components = props.components
      return toJsxRuntime(hastTree, {
        Fragment,
        // React components are allowed to return numbers,
        // but not according to the types in hast-util-to-jsx-runtime
        components,
        ignoreInvalidStyle: true,
        elementAttributeNameCase: 'html',
        jsx,
        jsxs,
        passKeys: true,
        passNode: true,
      })
    }
  },
})
