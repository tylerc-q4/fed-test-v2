/**
 * Reuseable functions used on Q4 Websites
 * @class q4.app
 */


/** @lends q4.app */
var q4App = {
    /**
     * Gives element accessibility properties suitable for accordions, slide toggles, and tab navigation.
     * @param {$tab} [element]  the element used to toggle the appropriate $tabpanel
     * @param {$tabpanel} [element]  the element intended to display in respect to the currently selected $tab
     * @example app.accessibilize($tab, $tabpanel)
     */
    accessibilize: function($tab, $tabpanel, idx) {
        $tab.each(function(index){
            $(this).attr('tabindex','0').attr({
                'id': 'tab' + idx + (index+1),
                'role': 'button',
                'aria-expanded': 'false',
                'aria-controls': 'panel' + idx + (index+1),
            });
        });
        $('#tab' + idx + "1").addClass('tab-firsttab');       
        $('#tab' + idx + ($tab.length)).addClass('tab-lasttab');       

        $tabpanel.each(function(index){
            $(this).addClass('js--hidden').attr({
                'id': 'panel' + idx + (index+1),
                'role': 'region',
                'aria-hidden': 'true',
                'aria-describedby': 'tab' + idx + (index+1)
            });
        });
    },
    /**
     * Creates a fully accessible expanding and collapsing accordion with the ability to switch between toggle and accordion functionality. Accessiblity example cand be seen here https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html
     * @param {$container} [element]  the wrapping element for the toggle list
     * @param {item} [selector]  the class assigned to each designated toggling element
     * @param {toggle} [selector]  the class assigned to the element that will toggle the containing item
     * @param {panel} [selector]  the class assigned to the section that will be revealed if its containing item is toggled
     * @param {accordion} [boolean]  (optional) if true, the toggling section will take on accordion functionality
     * @param {allButton} [boolean]  (optional) if true, the toggling section will be accompanied by a "Hide All / Show All" button
     * @param {openFirst} [boolean]  (optional) if true, the first item will be set to active with its panel revealed
     * @param {includeClasses} [boolean]  (optional) if true, classes will be added to the container (accordion), items (accordion_item), toggle (accordion_toggle) and panel (accordion_panel).
     * @example app.toggle($('.accordion'), '.accordion_item', '.accordion_toggle', '.accordion_panel', false, true);
     */
    toggle: function($container, item, toggle, panel, accordion, allButton, openFirst, includeClasses) {
        var $this = this,
            $item = $container.find(item),
            keyCode = {
                'ENTER': 13,
                'SPACE': 32,
                'DOWN': 40,
                'UP': 38,
                'HOME': 36,
                'END': 35
            };

        $container.each(function(idx){
            $this.accessibilize($(this).find(toggle), $(this).find(panel), (idx+1));
            if (accordion) {
                $(this).find(toggle).attr('aria-disabled','false');
            }
        });
        
        $item.on('click keypress keydown', toggle, function(e) {
            if (e.which == keyCode.ENTER || e.type == 'click' || (e.type == 'keydown' && e.which == keyCode.SPACE)) {
                e.preventDefault();
                if (accordion) {
                    $this._accordionTrigger($(this), $(this).closest($container), item, toggle, panel);
                } else {
                    $this._toggleTrigger($(this), $(this).closest($container), item, panel);
                }

                if (allButton) {
                    if (!$(this).closest($container).find(item + '.js--active').length) {
                        $(this).closest($container).find('.toggle-all').removeClass('js--active');
                    }
                    if ($(this).closest($container).find(item + '.js--active').length === $(this).closest($container).find(item).length) {
                        $(this).closest($container).find('.toggle-all').addClass('js--active');
                    }
                }
            } else if (e.which == keyCode.UP) { 
                e.preventDefault();
                if ($(e.target).hasClass('tab-firsttab')){
                    $(this).closest($item).siblings(item).children('.tab-lasttab').focus();
                } else {
                    $(this).closest($item).prev(item).children(toggle).focus();
                }
            } else if (e.which == keyCode.DOWN) { 
                e.preventDefault();
                if ($(e.target).hasClass('tab-lasttab')){
                    $(this).closest($item).siblings(item).children('.tab-firsttab').focus();
                } else {
                    $(this).closest($item).next(item).children(toggle).focus();
                }
            } else if (e.which == keyCode.HOME) { 
                e.preventDefault();
                $(this).closest($item).siblings(item).children('.tab-firsttab').focus();
            } else if (e.which == keyCode.END) { 
                e.preventDefault();
                $(this).closest($item).siblings(item).children('.tab-lasttab').focus();
            }
        });

        if (allButton) {
            $this._toggleAll($container, item, toggle, panel);
        }

        if (openFirst) {
            $container.each(function () {
                $(this).find($item).first().find(toggle).attr('aria-expanded', 'true');
                $(this).find($item).first().addClass('js--active').find(panel).removeClass('js--hidden').attr('aria-hidden','false');
                $(this).find($item).not(':first').find(panel).hide().attr('aria-hidden','true');
                if (accordion) {
                    $(this).find($item).first().find(toggle).attr('aria-disabled', 'true');
                }
            });
        }
         
        $container
            .attr('data-accordion','container')
            .find(item).attr('data-accordion','item').end()
            .find(toggle).attr('data-accordion','toggle').end()
            .find(panel).attr('data-accordion','panel');
            
        if (includeClasses) {
            $container
                .addClass('accordion')
                .find(item).addClass('accordion_item').end()
                .find(toggle).addClass('accordion_toggle').end()
                .find(panel).addClass('accordion_panel');
        }
            
    },
    _toggleAll: function($container, item, toggle, panel) {
        $container.prepend(
            '<div class="toggle-all"><button aria-label="Expand or collapse all items" type="button" class="button"></button><span class="sr-only" role="status" aria-live="polite"></span></div>'
        ).on('click', '.toggle-all button', function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('js--active');
            if ( $(this).parent().is('.js--active') ) {
                $(this).attr('aria-pressed', 'true');
                $(this).siblings('[role="status"]').text('Button pressed. All items expanded');
                $(this).closest($container).find(toggle).attr('aria-expanded', 'true');
                $(this).closest($container).find(item).addClass('js--active');
                $(this).closest($container).find(panel).slideDown(400, function() {
                    $(this).removeClass('js--hidden').attr('aria-hidden','false');
                });
            } else {
                $(this).attr('aria-pressed', 'false');
                $(this).siblings('[role="status"]').text('Button not pressed. All items collapsed');
                $(this).closest($container).find(toggle).attr('aria-expanded', 'false');
                $(this).closest($container).find(item).removeClass('js--active');
                $(this).closest($container).find(panel).slideUp(400, function() {
                    $(this).addClass('js--hidden').attr('aria-hidden','true');
                });
            }
        });
        $container.on('click keypress keydown', item, function(e) {
            if (e.which == 13 || e.which == 1) {
                if ( $(this).siblings('.toggle-all').hasClass('js--active') ) {
                    $(this).siblings('.toggle-all').children('button').attr('aria-pressed', 'true');
                } else {
                    $(this).siblings('.toggle-all').children('button').attr('aria-pressed', 'false');
                }
            }
        });
    },
    _accordionTrigger: function($this, $container, item, toggle, panel) {
        if ( !$this.closest(item).hasClass('js--active') ) {
            $this.closest($container).find(item).removeClass('js--active');
            $container.find(toggle).attr({
                'aria-expanded': 'false',
                'aria-disabled': 'false'
            }).end().find(panel).slideUp(400, function() {
                $(this).addClass('js--hidden').attr({
                    'aria-hidden': 'true'
                });
            });

            $this.attr({
                'aria-expanded': 'true',
                'aria-disabled': 'true'
            }).closest(item).addClass('js--active').find(panel).slideDown(400, function() {
                $(this).removeClass('js--hidden').attr({
                    'aria-hidden': 'false'
                });
            });
        }
    },
    _toggleTrigger: function($this, $container, item, panel) {
        var $allToggle = $this.closest($container).find('.toggle-all');

        $this.attr('aria-expanded', function(i, attr) {
            return attr == 'true' ? 'false' : 'true';
        }).closest(item).toggleClass('js--active').find(panel).slideToggle(400, function() {
            $(this).toggleClass('js--hidden').attr('aria-hidden', function(i, attr) {
                return attr == 'true' ? 'false' : 'true';
            });
        });

        if ( $this.closest($container).find(item).not('.js--active').length ) {
            $allToggle.removeClass('js--active');
        } else {
            $allToggle.addClass('js--active');
        }
    }
};
