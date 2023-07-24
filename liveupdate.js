window.onload = function () {
    var t = 'asdsggadadadada';

    new UpdaterConfig().setup({
        refreshTime: 1000,
        autoReload: true,
        autoReloadTime: 10000,
        placeholders: {
            teszt: t
        }
    });
}


//  <div onUpdate=true>{date}</div>
//  <div onUpdate="">{date}</div>
//  <div onUpdate="new Date()"></div>

class UpdaterConfig {
    constructor() {

    }

    setup(obj) {
        this.jquery = false;
        this.refreshTime = obj.refreshTime ? obj.refreshTime : 1000;
        this.autoReload = obj.autoReload ? obj.autoReload : true;
        this.autoReloadTime = obj.autoReloadTime ? obj.autoReloadTime : 10000;
        this.placeholders += obj.placeholders ? obj.placeholders : {
            date_US: new Date(),
            date_EU: new Date()
        };

        if (window.jQuery) {
            console.log('jQuery already loaded');
            this.jquery = !this.jquery;
        } else {
            console.info('jQuery not found');
            console.info('jQuery loading..')
            var script = document.createElement("SCRIPT");
            script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
            script.type = 'text/javascript';
            document.getElementsByTagName("head")[0].appendChild(script);
            console.info('jQuery successfully imported');
        }

        if (!window.jQuery) {
            console.error('Failed to install jQuery ');
            console.error('Failed to load the LiveUpdate module!');
            return;
        } else {
            this.start()
        }

    }

    start() {
        $(document).ready(function () {
            $('*').each(function (index, item) {
                if ($(item).attr('onUpdate') != undefined) {
                    if ($(item).attr('onUpdate') == true) {
                        $(item).attr('onUpdateParam', $(item).html())
                    }
                    if ($(item).attr('onUpdate') != true && $(item).attr('onUpdateInterval') != undefined) {
                        setInterval(() => {
                            var a = 'return ' + $(item).attr('onUpdate');
                            $(item).html(eval(a))
                        }, $(item).attr('onUpdateInterval'))
                    }
                }
            });
            setInterval(() => {
                $('*').each(function (index, item) {
                    if ($(item).attr('onUpdate') != undefined) {
                        if ($(item).attr('onUpdateInterval') != undefined) {
                            return;
                        }
                        if ($(item).attr('onUpdate') == true) {
                            this.placeholders.array.forEach(element => {
                                $(item).html($(item).attr('onUpdateParam').replace(element))
                            });
                        } else {
                            var a = $(item).attr('onUpdate');
                            $(item).html(eval(a))
                        }
                    }
                });
            }, this.refreshTime);
        });
    }
}

