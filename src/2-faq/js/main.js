var reportsWidget = {
    options: {
        containerSelector: '.module-faq',
        template: (
            '{{#.}}' +
                '{{#items}}' +
                '<div class="module-faq_item">' +
                    '<div class="module-faq_category">' +
                        '<img class="module-faq_category-icon" src="{{iconPath}}"/>' +
                        '<span class="module-faq_category-category">{{type}}</span>'+
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
        var modifiedContent = content;
        console.log(modifiedContent)
        modifiedContent.items.forEach(function(itm, ix){
            switch(itm.type){
                case 'stock':
                    itm.iconPath = 'images/icon-stock.png';
                    break;
                case 'company':
                    itm.iconPath = 'images/icon-company.png';
                    break;
                case 'financial':
                    itm.iconPath = 'images/icon-financials.png';
                    break;
            }
        })
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
            '.module-faq_item', // Item Selector
            '.module-faq_question', // Toggle Selector
            '.module-faq_answer', // Panel Selector
            false, // Accordion functionality?
            true, // Show all / Hide all button?
            true); // Open first item?
    }
};

reportsWidget.init();