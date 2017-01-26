$(document).ready(function(){
  $(".new-tweet textarea").on('input', function(){
    if (this.value.length <= 140) {
      $(".new-tweet textarea").siblings().last().css("color", "#244751");
      $(".new-tweet textarea").siblings().last().text(140 - this.value.length);
    } else {
      $(".new-tweet textarea").siblings().last().css("color", "red");
      $(".new-tweet textarea").siblings().last().text(this.value.length * -1 + 140);
    }
  });
});