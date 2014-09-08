(function($){
  var Item = Backbone.Model.extend({
    defaults: {
      task: '',
      
    }
  });

  var List1 = Backbone.Collection.extend({
    model: Item
  });


  var List2 = Backbone.Collection.extend({
    model: Item
  });


  var List3 = Backbone.Collection.extend({
    model: Item
  });


  var ItemView1 = Backbone.View.extend({
    tagName: 'li', 
    initialize: function(){
      _.bindAll(this, 'render');
    },
    render: function(){
      $(this.el).addClass('card');
      $(this.el).html(this.model.get('task'));
      return this; 
    }
  });

  var ListView1 = Backbone.View.extend({
    el: $('#box1'),
    events: {
      'click button#add': 'addItem'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'addItem', 'appendItem'); 

      this.collection = new List1();
      this.collection.bind('add', this.appendItem);


      this.render();
    },
    render: function(){
      var self = this;
      $(this.el).append(" <input type=text class=textbox id=text1 title='Add your todo here'>");
      $(this.el).append("<button id='add'>Add</button>");
      $(this.el).append("<ul id='sortable1'></ul>");
      _(this.collection.models).each(function(item){ 
        self.appendItem(item);
      }, this);
    },
    addItem: function(){

      var item = new Item();
      item.set({
        task: $('#text1').val() 
      });
      this.collection.add(item);
    },

    appendItem: function(item){
      var itemView = new ItemView1({
        model: item
      });
      $('ul', this.el).append(itemView.render().el);
      $('#text1').attr('value','');
      $('#text1').blur();

    }
  });



//  SECOND VIEW




var ItemView2 = Backbone.View.extend({
  tagName: 'li', 
  initialize: function(){
    _.bindAll(this, 'render'); 
  },
  render: function(){
    $(this.el).addClass('card');
    $(this.el).html(this.model.get('task'));
    return this;
  }
});

var ListView2 = Backbone.View.extend({
  el: $('#box2'), 
  events: {
    'click button#add': 'addItem'
  },
  initialize: function(){
    _.bindAll(this, 'render', 'addItem', 'appendItem'); 

    this.collection = new List2();
    this.collection.bind('add', this.appendItem);

    
    this.render();
  },
  render: function(){
    var self = this;
    $(this.el).append(" <input type=text class=textbox id=text2 title='Add your active tasks here'>");
    $(this.el).append("<button id='add'>Add</button>");
    $(this.el).append("<ul id='sortable2'></ul>");
    _(this.collection.models).each(function(item){ 
      self.appendItem(item);
    }, this);
  },
  addItem: function(){

    var item = new Item();
    item.set({
      task: $('#text2').val() 
    });
    this.collection.add(item);
  },

  appendItem: function(item){
    var itemView = new ItemView2({
      model: item
    });
    $('ul', this.el).append(itemView.render().el);
    $('#text2').attr('value','');
    $('#text2').blur();

  }
});



//THIRD VIEW

var ItemView3 = Backbone.View.extend({
  tagName: 'li',
  initialize: function(){
    _.bindAll(this, 'render'); 
  },
  render: function(){
    $(this.el).addClass('card');
    $(this.el).html(this.model.get('task'));
    return this; 
  }
});

var ListView3 = Backbone.View.extend({
  el: $('#box3'),
  events: {
    'click button#add': 'addItem'
  },
  initialize: function(){
    _.bindAll(this, 'render', 'addItem', 'appendItem'); 

    this.collection = new List2();
    this.collection.bind('add', this.appendItem); 
    this.render();
  },
  render: function(){
    var self = this;
    $(this.el).append(" <input type=text class=textbox id=text3 title='Add your completed tasks here'>");
    $(this.el).append("<button id='add'>Add</button>");
    $(this.el).append("<ul id='sortable3'></ul>");
    _(this.collection.models).each(function(item){
      self.appendItem(item);
    }, this);
  },
  addItem: function(){

    var item = new Item();
    item.set({
      task: $('#text3').val()
    });
    this.collection.add(item);
  },

  appendItem: function(item){
    var itemView = new ItemView3({
      model: item
    });
    $('ul', this.el).append(itemView.render().el);
    $('#text3').attr('value','');
    $('#text3').blur();

  }
});


var listView = new ListView1();
var listView2 = new ListView2();
var listView3 = new ListView3();

$( "#sortable1" ).sortable({ 
	connectWith: "ul"
});

$( "#sortable2" ).sortable({ 
	connectWith: "ul"
});


$( "#sortable3" ).sortable({ 
	connectWith: "ul"
});


$.fn.hint = function (blurClass) {
  if (!blurClass) { 
    blurClass = 'blur';
  }
  
  return this.each(function () {

    var $input = $(this),
    

    title = $input.attr('title'),
    $form = $(this.form),
    $win = $(window);

    function remove() {
      if ($input.val() === title && $input.hasClass(blurClass)) {
        $input.val('').removeClass(blurClass);
      }
    }


    if (title) { 

      $input.blur(function () {
        if (this.value === '') {
          $input.val(title).addClass(blurClass);
        }
      }).focus(remove).blur();
      

      $form.submit(remove);
      $win.unload(remove); 
    }
  });
};


$('input[title!=""]').hint();
$( "button", "body" ).button();

})(jQuery);
