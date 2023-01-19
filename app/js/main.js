$(document).ready(function(){
//header navigation
  $(".header__btn").click(function (e) {
    e.preventDefault();
    $("body").toggleClass("lock");
    $(".modal-overlay").fadeIn(297, function () {
      $(".nav__list").addClass("active");
    });
  });

  $(".close, .modal-overlay, .nav__item").click(function () {
    $("body").removeClass("lock")
    $(".nav__list").removeClass("active");
    $(".modal-overlay").fadeOut(297);
  });
//
// Main modal
  $("a.modal-btn").click(function (e) {
    e.preventDefault();
    $("body").addClass("lock")
    $(".modal-overlay").fadeIn(297, function () {
      $(".modal")
        .css("display", "block")
        .animate({ opacity: 1 }, 1);
    });
  });

  $(".modal__close, .modal-overlay").click(function () {
    $("body").removeClass("lock")
    $(".modal").animate({ opacity: 0 }, 1, function () {
      $(this).css("display", "none");
      $(".modal-overlay").fadeOut(297);
    });
  });
  $(".modal").click(function(e) {
    e.stopPropagation();
  });
//
  $(".filters-btn").click(function(e) {
    e.preventDefault();
    $('.filters').toggleClass("active");
  })
// Mask
  $(".modal__input--phone").mask("+380 (99) 999-99-99"); 
//
// Main slider
  const owl = $('.owl-carousel');

  owl.owlCarousel({
    items: 1,
    loop: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 500,
    center:true,
    margin:50,
  });

  $('.slider__nav--prev').click(function() {
    owl.trigger('prev.owl.carousel', [300]);
  })
  $('.slider__nav--next').click(function() {
    owl.trigger('next.owl.carousel');
  })
//
// Background img on studies
  function ibg(){
    $.each($('.desc__ibg'), function(index, val) {
      if($(this).find('img').length>0){
        $(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
      }
    });
  }

  ibg();
//
// Accordeon price
  $('.list-group__title').on('click', f_acc);
 
  function f_acc(){
    $('.list-group__item');
      $(this).next().slideToggle(500);
      $(this).toggleClass("act");
  }
//
// Services filter
  let filter = $('[data-filter]');

  filter.on("click", function(e) {

    let cat = $(this).data('filter');

    if (cat == 'all') {
      $("[data-cat]").removeClass('hidden');
    } else {
        $('[data-cat]').each(function() {

        let workCat = $(this).data('cat');

       if (workCat != cat) {
         $(this).addClass('hidden');
       } else {
          $(this).removeClass('hidden');
        };

     });
    }
    
  });
//
// Search filter
  jQuery.fn.jcOnPageFilter = function(settings) {
    settings = jQuery.extend({
        focusOnLoad: true,
        highlightColor: '#BFE2FF',
        textColorForHighlights: '#000000',
        caseSensitive: false,
        hideNegatives: true,
        parentSectionClass: 'list-services',
        parentLookupClass: 'list-services__item',
        childBlockClass: 'filter-title',
        noFoundClass: 'no-found'
    }, settings);
    jQuery.expr[':'].icontains = function(obj, index, meta) {                    
        return jQuery(obj).text().toUpperCase().indexOf(meta[3].toUpperCase()) >= 0;                
    }; 
    if(settings.focusOnLoad) {
        jQuery(this).focus();
    }
    jQuery('.'+settings.noFoundClass).css("display", "none");
    var rex = /(<span.+?>)(.+?)(<\/span>)/g;
    var rexAtt = "g";
    if(!settings.caseSensitive) {
        rex = /(<span.+?>)(.+?)(<\/span>)/gi;
        rexAtt = "gi";
    }
    return this.each(function() {
        jQuery(this).keyup(function(e) {
            jQuery('.'+settings.parentSectionClass).show();
            jQuery('.'+settings.noFoundClass).hide();                    
            if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                return false;
                } else {
                var textToFilter = jQuery(this).val();
                if (textToFilter.length > 0) {
                    if(settings.hideNegatives) {
                        jQuery('.'+settings.parentLookupClass).stop(true, true).hide();
                    }
                    var _cs = "icontains";
                    if(settings.caseSensitive) {
                        _cs = "contains";
                    }
                    jQuery.each(jQuery('.'+settings.childBlockClass),function(i,obj) {
                        jQuery(obj).html(jQuery(obj).html().replace(new RegExp(rex), "$2"));  
                    });
                    jQuery.each(jQuery('.'+settings.childBlockClass+":"+_cs+"(" + textToFilter + ")"),function(i,obj) {
                        if(settings.hideNegatives) {
                            jQuery(obj).closest('.'+settings.parentLookupClass).stop(true, true).show();
                        }
                        var newhtml = jQuery(obj).text();
                        jQuery(obj).html(newhtml.replace(
                            new RegExp(textToFilter, rexAtt), 
                            function(match) {
                                return ["<span style='background:"+settings.highlightColor+";color:"+settings.textColorForHighlights+"'>", match, "</span>"].join("");
                            }
                        ));
                    });
                    
                    } else {
                    jQuery.each(jQuery('.'+settings.childBlockClass),function(i,obj) {
                        var html = jQuery(obj).html().replace(new RegExp(rex), "$2");
                        jQuery(obj).html(html);  
                    });
                    if(settings.hideNegatives) {
                        jQuery('.'+settings.parentLookupClass).stop(true, true).show();
                    }
                }
            }            
            if (!jQuery('.'+settings.parentLookupClass+':visible').length) {
                jQuery('.'+settings.parentSectionClass).hide();
                jQuery('.'+settings.noFoundClass).show();     
            }    
        });
    });
  }; 

  $('.search-form__input').jcOnPageFilter();
//
});