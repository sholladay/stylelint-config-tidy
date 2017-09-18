import path from 'path';
import test from 'ava';
import stylelint from 'stylelint';
import tidy from '.';

const sheetPath = {
    good : path.resolve(__dirname, 'fixture', 'good.css'),
    bad  : path.resolve(__dirname, 'fixture', 'bad.css')
};

const ruleErrors = (violations, ruleId) => {
    return violations.filter((x) => {
        return x.rule === ruleId && x.severity === 'error';
    });
};

test('minimum necessary to pass', async (t) => {
    const result = await stylelint.lint({
        config : tidy,
        code   : 'p {\n    color: inherit;\n}\n'
    });
    t.false(result.errored);
});

test('good stylesheet', async (t) => {
    const result = await stylelint.lint({
        config : tidy,
        files  : sheetPath.good
    });
    t.false(result.errored);
});

test('bad stylesheet', async (t) => {
    const result = await stylelint.lint({
        config : tidy,
        files  : sheetPath.bad
    });
    t.true(result.errored);
});

test('word blacklist is case insensitive', async (t) => {
    const { errored, results } = await stylelint.lint({
        config : tidy,
        code   : '/* TODO: */\n/* todo: */\n'
    });

    t.true(errored);

    const errors = ruleErrors(results[0].warnings, 'comment-word-blacklist');

    t.is(errors.length, 2);
    t.true(errors.some((x) => {
        return x.text.includes('TODO');
    }));
    t.true(errors.some((x) => {
        return x.text.includes('todo');
    }));
});
