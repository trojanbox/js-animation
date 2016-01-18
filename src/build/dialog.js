define([
    'exports',
    '../core',
    '../dialog/error',
    '../dialog/general',
    '../dialog/prompt',
    '../dialog/success'
], function (exports, core, error, general, prompt, success) {
    core.di.register({
        error: error,
        general: general,
        prompt: prompt,
        success: success
    });
});