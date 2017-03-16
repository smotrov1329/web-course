  $('document').ready(function() {           
      $(".rating-circle").hover(function() {                   
          $(".rating-circle").removeClass("rating-chosen");                   
          $(this).nextAll().removeClass("rating-hover");                   
          $(this).prevAll().addClass("rating-hover");                   
          $(this).addClass("rating-hover");               
      });   
      $(".rating-circle").mouseleave(function() {               
          $(".rating-circle").removeClass("rating-hover");               
          $(".highlight").addClass("rating-chosen");           
      });           
      $(".rating-circle").click(function() {                   
          $(this).nextAll().removeClass("highlight");                   
          $(this).prevAll().addClass("highlight");                   
          $(this).addClass("highlight");                   
          $(".highlight").addClass("rating-chosen");           
      });
  });