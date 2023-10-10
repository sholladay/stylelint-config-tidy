'use strict';

// TODO: Investigate and implement *-pattern rules

module.exports = {
    plugins : [
        'stylelint-order'
    ],
    extends : [
        'stylelint-config-recommended',
        'stylelint-config-xo'
    ],
    rules : {
        'at-rule-empty-line-before' : ['always', {
            except : ['blockless-after-same-name-blockless', 'first-nested'],
            ignore : ['after-comment']
        }],
        'at-rule-name-space-after'                  : 'always',
        'block-closing-brace-space-after'           : 'always-single-line',
        'block-closing-brace-space-before'          : 'always-single-line',
        'block-no-empty'                            : true,
        'block-opening-brace-space-after'           : 'always-single-line',
        'color-function-notation'                   : 'legacy',
        'color-hex-case'                            : 'upper',
        'comment-word-disallowed-list'              : ['/^TODO:/i'],
        'custom-property-empty-line-before'         : 'never',
        'declaration-block-no-duplicate-properties' : [true, {
            ignore : ['consecutive-duplicates-with-different-values']
        }],
        'declaration-block-single-line-max-declarations' : 1,
        'declaration-colon-space-after'                  : 'always',
        // Disabled because 'always' does not support aligning colons (enforces a single space).
        'declaration-colon-space-before'                 : null,
        'font-family-name-quotes'                        : 'always-unless-keyword',
        'font-weight-notation'                           : ['numeric', {
            ignore : ['relative']
        }],
        'function-comma-newline-after'         : 'always-multi-line',
        'function-comma-space-after'           : 'always-single-line',
        'function-parentheses-newline-inside'  : 'always-multi-line',
        'function-parentheses-space-inside'    : 'never-single-line',
        'function-url-scheme-allowed-list'     : ['https', 'data'],
        indentation                            : 4,
        'max-empty-lines'                      : 1,
        'max-line-length'                      : 100,
        'max-nesting-depth'                    : 5,
        'media-query-list-comma-newline-after' : 'always-multi-line',
        'media-query-list-comma-space-after'   : 'always-single-line',
        'no-descending-specificity'            : true,
        'no-unknown-animations'                : true,
        'order/properties-alphabetical-order'  : true,
        // Disabled because we use alphabetical order instead.
        'order/properties-order'               : null,
        'rule-empty-line-before'               : ['never', {
            ignore : ['after-comment']
        }],
        'selector-list-comma-newline-after' : 'always-multi-line',
        'selector-max-compound-selectors'   : 4,
        // TODO: This rule seems like a great idea, but not sure what a good value for it is.
        'selector-max-specificity'          : '1,1,0',
        'selector-no-vendor-prefix'         : true,
        'time-min-milliseconds'             : 200,
        'value-list-comma-newline-after'    : 'always-multi-line',
        'value-list-comma-space-after'      : 'always',
        'value-no-vendor-prefix'            : true
    }
};
