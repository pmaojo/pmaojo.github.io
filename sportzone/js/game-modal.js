(function (win, doc) {
    'use strict';

    var OPEN_BUTTON_ID = 'openGameButton';
    var MODAL_ID = 'game-modal';
    var INSTRUCTIONS_ID = 'game-instructions';
    var CONTAINER_ID = 'juegonavidad';
    var ACTION_CLOSE = 'close-modal';
    var ACTION_TOGGLE_INSTRUCTIONS = 'toggle-instructions';

    var FOCUSABLE_SELECTOR = [
        'a[href]',
        'area[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    function getFocusableElements(container) {
        return Array.prototype.slice.call(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(function (element) {
            return element.offsetParent !== null || element === container;
        });
    }

    function SportzoneModalController() {
        this.openButton = doc.getElementById(OPEN_BUTTON_ID);
        this.modal = doc.getElementById(MODAL_ID);
        this.instructions = doc.getElementById(INSTRUCTIONS_ID);
        this.container = doc.getElementById(CONTAINER_ID);
        this.closeButton = this.modal ? this.modal.querySelector('[data-action="' + ACTION_CLOSE + '"]') : null;
        this.instructionsButton = this.modal ? this.modal.querySelector('[data-action="' + ACTION_TOGGLE_INSTRUCTIONS + '"]') : null;
        this.lastFocusedElement = null;
        this.boundKeydownHandler = this.handleKeydown.bind(this);
        this.boundBackgroundHandler = this.handleBackgroundClick.bind(this);
        this.init();
    }

    SportzoneModalController.prototype.init = function () {
        if (!this.openButton || !this.modal) {
            return;
        }

        this.openButton.addEventListener('click', this.open.bind(this));

        if (this.closeButton) {
            this.closeButton.addEventListener('click', this.close.bind(this));
        }

        if (this.instructionsButton) {
            this.instructionsButton.addEventListener('click', this.toggleInstructions.bind(this));
        }

        this.modal.addEventListener('click', this.boundBackgroundHandler);
    };

    SportzoneModalController.prototype.open = function () {
        if (!this.modal.hidden) {
            return;
        }

        this.lastFocusedElement = doc.activeElement;
        this.modal.hidden = false;
        this.modal.classList.add('is-open');

        if (this.container) {
            this.container.setAttribute('aria-hidden', 'true');
        }

        if (this.instructions) {
            this.instructions.hidden = true;
        }

        if (this.instructionsButton) {
            this.instructionsButton.setAttribute('aria-expanded', 'false');
        }

        doc.addEventListener('keydown', this.boundKeydownHandler);

        var controller = this;
        win.setTimeout(function () {
            if (win.SportzoneGame && typeof win.SportzoneGame.focus === 'function') {
                win.SportzoneGame.focus();
            } else {
                controller.focusFirstElement();
            }
        }, 0);
    };

    SportzoneModalController.prototype.close = function () {
        if (this.modal.hidden) {
            return;
        }

        this.modal.hidden = true;
        this.modal.classList.remove('is-open');
        doc.removeEventListener('keydown', this.boundKeydownHandler);

        if (this.container) {
            this.container.removeAttribute('aria-hidden');
        }

        if (win.SportzoneGame && typeof win.SportzoneGame.restart === 'function') {
            win.SportzoneGame.restart();
        }

        if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
            this.lastFocusedElement.focus();
        }
    };

    SportzoneModalController.prototype.toggleInstructions = function () {
        if (!this.instructions || !this.instructionsButton) {
            return;
        }

        var isExpanded = this.instructionsButton.getAttribute('aria-expanded') === 'true';
        var nextState = !isExpanded;
        this.instructionsButton.setAttribute('aria-expanded', String(nextState));
        this.instructions.hidden = !nextState;

        if (nextState) {
            var focusable = this.instructions.querySelector(FOCUSABLE_SELECTOR);
            if (focusable && typeof focusable.focus === 'function') {
                focusable.focus();
            }
        }
    };

    SportzoneModalController.prototype.handleKeydown = function (event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.close();
            return;
        }

        if (event.key !== 'Tab') {
            return;
        }

        var focusableElements = getFocusableElements(this.modal);
        if (focusableElements.length === 0) {
            event.preventDefault();
            return;
        }

        var firstElement = focusableElements[0];
        var lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            if (doc.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else if (doc.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    };

    SportzoneModalController.prototype.handleBackgroundClick = function (event) {
        if (event.target === this.modal) {
            this.close();
        }
    };

    SportzoneModalController.prototype.focusFirstElement = function () {
        var focusableElements = getFocusableElements(this.modal);
        if (focusableElements.length > 0 && typeof focusableElements[0].focus === 'function') {
            focusableElements[0].focus();
        }
    };

    new SportzoneModalController();
}(window, document));
