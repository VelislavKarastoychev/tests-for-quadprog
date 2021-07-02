'use strict';
const message = require('@euriklis/message');
const example_label = (text) => {
    return new message().bold().italic().underscore().set_color_yellow()
    .append(text).reset().log();
}
module.exports = example_label;