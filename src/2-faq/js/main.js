var reportsWidget = {
    options: {
        containerSelector: '.module-frequently-asked-questions',
        template: (
            '{{#.}}' +
                '{{#items}}' +
                '<div class="module-faq_item">' +
                    '<div class="module-faq_category">' +
                        '<img class="module-faq_category-icon" src="{{iconPath}}"/>' +
                        '<span class="module-faq_category-category"></span>'+
                    '</div>'+
                    '<div class="module-faq_text">' +
                        '<div class="module-faq_question">'+
                            '<h2 class="module-faq_text-question">{{question}}</h2>' +
                        '</div>' +    
                        '<div class="module-faq_answer">'+
                            '<p class="module-faq_text-answer">{{answer}}</p>' +
                        '</div>'+
                    '</div>' +
                '</div>' +
                '{{/items}}' +
            '{{/.}}'                    
        )
    },

    init: function() {
        var templateItems = this.beforeRenderItems(faqContent)
        this.renderFaq(templateItems || []);
        this.complete();
    },

    beforeRenderItems(content){
        console.log("CONTENT", content)

        var modifiedContent = content;

        console.log("MODIFIED CONTENT", modifiedContent)

        return modifiedContent;
    },

    renderFaq: function(faqItems) {
        var inst = this,
            options = inst.options;

        $(options.containerSelector).html(Mustache.render(options.template, faqItems));
    },

    complete: function() {
        q4App.toggle(
            $('.module-faq'), // Containing Element
            '.module-faq_itemm', // Individual Item Selector
            '', // Item Toggler Selector
            '', // Item to Toggle Selector
            false, // Accordion functionality?
            false, // Show all / Hide all button?
            true); // Open first item?
    }
};

reportsWidget.init();