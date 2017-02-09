let ViewModel = function(imageSrcs){

    this.model = ko.observable(new model(imageSrcs));

    this.incrementLike = function(){
        this.model().likeCount(this.model().likeCount() + 1);
        this.changePic();
    };

    this.changePic = function(){
        i = this.model().picIndex();
        this.model().picIndex(i + 1);
        this.model().currentSrc(this.model().picSrcs()[this.model().picIndex()]);
    }

}

let model = function(imageSrcs){

    this.likeCount = ko.observable(0);
    this.picIndex = ko.observable(0);
    this.picSrcs = ko.observableArray(imageSrcs);
    this.currentSrc = ko.observable(this.picSrcs()[this.picIndex()])

    this.rank = ko.computed(function(){
        let l = this.likeCount();
        if(l <= 4){
            return "obviously a cat hater!"
        }
        else if(l > 4 && l <= 10){
            return "able to appreciate cats."
        }
        else if(l > 10 && l <= 25){
            return "a possible cat lover."
        }
        else if(l > 25 && l <= 45){
            return "definitely obsessed."
        }
        else{
            return "a cat lady!"
        }
    }, this)
}



    function getSrcs(){
        let url = "//thecatapi.com/api/images/" +
                    "get?format=xml&type=jpg&size=small&results_per_page=100";
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'xml',
            success: function(xml) {
                let srcs = []
                $(xml).find('url').each(function(){
                    let src = $(this).text()
                    srcs.push(src);
                });
                ko.applyBindings(new ViewModel(srcs));
            }
        });
    }

    getSrcs();