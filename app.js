let apiKey = "MTU2NDcz";
let list = []
let $img = $('#catImg');
let $nope = $('#nope');
let $counter = $('#counter');
let imgIndex = 0;
let likedCount = 0;

function getImages(){
    let url = "//thecatapi.com/api/images/get?format=xml&type=jpg&size=small&results_per_page=100";
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'xml',
        success: function(xml) {
            $(xml).find('url').each(function(){
                url = $(this).text()
                list.push(url);
            });
            imgIndex = 0;
            $img.attr('src', list[imgIndex]);
        }
    })
};

function checkImageCount(){
    if (imgIndex > list.length){
        imgIndex = 0;
        getImages();
    }
}

$img.click(function(e){
    e.preventDefault();
    imgIndex++;
    likedCount++;
    $counter.text(likedCount);
    $img.attr('src', list[imgIndex])
    checkImageCount();
})

$nope.click(function(e){
    e.preventDefault();
    imgIndex++;
    $img.attr('src', list[imgIndex])
    checkImageCount();
})

getImages();