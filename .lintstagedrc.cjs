module.exports = {
    "*.{md, css, cjs, js, jsx}": ["prettier -w"],
    "*.{js, ts, cjs}": ["eslint --fix"],
}
