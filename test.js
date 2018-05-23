import path from 'path';
import test from 'ava';
import stylelint from 'stylelint';
import tidy from '.';

const goodSheet = path.resolve(__dirname, 'fixture', 'good.css');
const badSheet = path.resolve(__dirname, 'fixture', 'bad.css');

const lintFile = (filePath) => {
    return stylelint.lint({
        config : tidy,
        files  : filePath
    });
};

const lintText = (text) => {
    return stylelint.lint({
        config : tidy,
        code   : text
    });
};

const getErrors = (results, ruleId) => {
    return results[0].warnings.filter((x) => {
        return x.rule === ruleId && x.severity === 'error';
    });
};

test('minimum necessary to pass', async (t) => {
    const { errored } = await lintText('p {\n    color: inherit;\n}\n');
    t.false(errored);
});

test('good stylesheet', async (t) => {
    const { errored } = await lintFile(goodSheet);
    t.false(errored);
});

test('bad stylesheet', async (t) => {
    const { errored } = await lintFile(badSheet);
    t.true(errored);
});

test('word blacklist is case insensitive', async (t) => {
    const { errored, results } = await lintText('/* TODO: */\n/* todo: */\n');

    t.true(errored);

    const errors = getErrors(results, 'comment-word-blacklist');

    t.is(errors.length, 2);
});

test('multiline comma separated selector list', async (t) => {
    const { errored } = await lintText('div,\np {\n    font-size: inherit;\n}\n');
    t.false(errored);
});

test('single line comma separated selector list', async (t) => {
    const { errored, results } = await lintText('div,p {\n    font-size: inherit;\n}\n');
    t.true(errored);
    const errors = getErrors(results, 'selector-list-comma-space-after');
    t.is(errors.length, 1);
});
