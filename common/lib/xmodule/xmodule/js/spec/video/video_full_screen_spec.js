(function (WAIT_TIMEOUT) {
    'use strict';

    describe('VideoFullScreen', function () {
        var state, oldOTBD;

        beforeEach(function () {
            oldOTBD = window.onTouchBasedDevice;
            window.onTouchBasedDevice = jasmine
                .createSpy('onTouchBasedDevice').andReturn(null);
        });

        afterEach(function () {
            $('source').remove();
            state.storage.clear();
            state.videoPlayer.destroy();
            window.onTouchBasedDevice = oldOTBD;
        });

        describe('constructor', function () {
            beforeEach(function () {
                state = jasmine.initializePlayer();
            });

            it('render the fullscreen control', function () {
                expect($('.add-fullscreen')).toExist();
            });

            it('add ARIA attributes to fullscreen control', function () {
                var fullScreenControl = $('.add-fullscreen');

                expect(fullScreenControl).toHaveAttrs({
                    'role': 'button',
                    'title': 'Fill browser',
                    'aria-disabled': 'false'
                });
            });

            it('updates ARIA on state change', function () {
                var fullScreenControl = $('.add-fullscreen');
                fullScreenControl.click();
                expect(fullScreenControl).toHaveAttrs({
                    'role': 'button',
                    'title': 'Exit full browser',
                    'aria-disabled': 'false'
                });
            });

            it('can destroy itself', function () {
                state.videoFullScreen.destroy();
                expect(state.videoFullScreen).toBeUndefined();
            });
        });

        it('Controls height is actual on switch to fullscreen', function () {
            spyOn($.fn, 'height').andCallFake(function (val) {
                return _.isUndefined(val) ? 100: this;
            });

            state = jasmine.initializePlayer();
            $(state.el).trigger('fullscreen');

            expect(state.videoFullScreen.height).toBe(150);
        });
    });
}).call(this, window.WAIT_TIMEOUT);
