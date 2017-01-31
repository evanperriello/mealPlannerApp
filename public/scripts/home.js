function expandDiv(){
    $(this).parent().children(".divToExpand").toggleClass("hiddenContent");
    $(this).children(".glyphicon").toggleClass("glyphicon-menu-down glyphicon-menu-up");
}
$(".expander").click(expandDiv);
