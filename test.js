import path from 'node:path';
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

const getRules = (results) => {
    const ruleIds = results[0].warnings.map((x) => {
        return x.rule;
    });
    return [...new Set(ruleIds)];
};

test('smoke test', async (t) => {
    const { errored, results } = await lintText('p {\n    color: inherit;\n}\n');
    t.false(errored);
    t.deepEqual(getRules(results), []);
});

test('good stylesheet', async (t) => {
    const { errored, results } = await lintFile(goodSheet);
    t.false(errored);
    t.deepEqual(getRules(results), []);
});

test('bad stylesheet', async (t) => {
    const { errored, results } = await lintFile(badSheet);
    t.true(errored);
    t.deepEqual(getRules(results), [
        'color-named',
        'font-weight-notation',
        'selector-type-no-unknown'
    ]);
});

test('word blacklist is case insensitive', async (t) => {
    const lowerCase = await lintText('/* todo: */\n');
    const upperCase = await lintText('/* TODO: */\n');
    t.true(lowerCase.errored);
    t.true(upperCase.errored);
    t.deepEqual(getRules(lowerCase.results), ['comment-word-blacklist']);
    t.deepEqual(getRules(upperCase.results), ['comment-word-blacklist']);
});

test('allows multi-line comma separated selector list', async (t) => {
    const { errored, results } = await lintText('div,\np {\n    font-size: inherit;\n}\n');
    t.false(errored);
    t.deepEqual(getRules(results), []);
});

test('disallows one-line comma separated selector list', async (t) => {
    const { errored, results } = await lintText('div,p {\n    font-size: inherit;\n}\n');
    t.true(errored);
    t.deepEqual(getRules(results), ['selector-list-comma-space-after']);
});

test('requires single quotes even if it needs escaping', async (t) => {
    const unescapedDouble = await lintText('a {\n    content: "x\'y\'z";\n}\n');
    const escapedSingle = await lintText('a {\n    content: \'x\\\'y\\\'z\';\n}\n');
    t.true(unescapedDouble.errored);
    t.false(escapedSingle.errored);
    t.deepEqual(getRules(unescapedDouble.results), ['string-quotes']);
    t.deepEqual(getRules(escapedSingle.results), []);
});
