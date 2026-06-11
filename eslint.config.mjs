// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
    rules: {
        'vue/require-default-prop': 'off',
        'vue/no-required-prop-with-default': 'off',
        'vue/first-attribute-linebreak': 'off',
        'vue/html-self-closing': 'off',
        'vue/attributes-order': 'off',
        'vue/multi-word-component-names': 'off',
    },
})