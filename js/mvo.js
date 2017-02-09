$(function(){

    let model = {
        init: function(){
            this.pictureUrls = [];
            this.currentIndex = 0;
            this.likes = 0;
            this.getNewPictureUrls();
        },

        clearPictureUrls: function(){
            model.pictureUrls = [];
        },

        getNewPictureUrls: function(){
            let url = "//thecatapi.com/api/images/" +
                "get?format=xml&type=jpg&size=small&results_per_page=100";
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'xml',
                success: function(xml) {
                    $(xml).find('url').each(function(){
                        let src = $(this).text()
                        model.pictureUrls.push(src);
                    });
                }
            });
        },
    }

    let view = {
        init: function(){
            this.currentCat = $("#current-cat");
            this.nextCats = $("#next-cats");
            this.nextCatsCollection = 
            this.nextCatsAmmount = 4;
            view.render();
        },

        render: function(){
            let currentCatHtml = "<img id='catImg' src='" + 
                                 model.pictureUrls[model.currentIndex] + "'>";

            //creates html string for next-cats view
            function nextCatsHtml(){
                let html = "";
                for(i = 1 ; i <= view.nextCatsAmmount; i++){
                    html += "<div class='next-cat-col col-md-3'>" +
                                "<img class='next-cat img-responsive' src='" +
                                model.pictureUrls[model.currentIndex + i] + 
                                "' data-next-value='" + i + "'></div>";
                }
                return html;
            }

            //sets the #counter <span> to the users like value
            $("#counter").html(model.likes)

            //actually renders the created templates
            view.currentCat.html(currentCatHtml);
            view.nextCats.html(nextCatsHtml());
            
            //update inputs for new images
            view.inputSetup();
        },

        inputSetup: function(){
            //collection of next-cat images
            $(".next-cat").click(function(e){
                e.preventDefault();
                let catValue = parseInt($(this).attr('data-next-value'))
                controller.changeCat(catValue);
            });

            $('#reject-button').click(function(e){
                e.preventDefault();
                controller.skipCat();
            })

            $('#catImg').click(function(e){
                e.preventDefault();
                controller.likeCat();
            })
        }
                
    }

    let controller = {
        init: function(){
            model.init();

            //After all the image 'src's have populated the model.pictureUrls[]
            //the view will then render
            function checkPicturesUrl(arrayLength, neededLength){
                setTimeout(function(){
                    if(neededLength > arrayLength){
                        checkPicturesUrl(model.pictureUrls.length, neededLength);
                    }
                    else{
                        view.init();
                    }
                }, 600)
            }

            //initialized the check for model.pictureUrls[] population
            checkPicturesUrl(model.pictureUrls.length, 100);
        },

        addLike: function(){
            model.likes++;
        },

        changeCat: function(value){
            model.currentIndex += (value || 1);
            view.render()
        },

        skipCat: function(){
            this.changeCat();
        },

        selectCat: function(value){
            this.changeCat(value);
        },

        likeCat: function(){
            this.addLike();
            this.changeCat();
        }
    }

    controller.init();

});