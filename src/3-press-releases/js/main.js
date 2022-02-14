var prWidget = {
    options: {
        containerSelector: '.module-press-release',
        template: (
            '{{#.}}' +
                '{{#filteredItems}}' +
                '<div class="module-press-release_item">' +
                    '<h2 class="module-press-release_headline">{{headline}}</h2>' +
                    '<p class="module-press-release_date">{{date}}</p>' +
                    '<p class="module-press-release_short-body">{{shortBody}}</p>' +
                    '<a class="button" href="{{relatedDoc}}">Download PDF</a>' +
                    '<a class="button" href="{{url}}">Read more</a>' +
                '</div>' +
                '{{/filteredItems}}' +
            '{{/.}}'                    
        )
    },

    init: function() {
        var templateItems = this.beforeRenderItems(prContent)
        this.renderPRs(templateItems || []);
        this.complete();
    },

    beforeRenderItems(content){
        content.filteredItems = [];

        content.items.forEach(function (el, ind, arr) {
            content.filteredItems.push(el)
        });

        return content;
    },

    renderPRs: function(prItems) {
        var inst = this,
            options = inst.options;

        $(options.containerSelector).html(Mustache.render(options.template, prItems));
    },

    complete: function() {
        // Add Slick Slider here (https://kenwheeler.github.io/slick/)
    }
};

pressReleaseWidget.init();