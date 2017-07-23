var employees = new Vue({
  el: '#employees',
  data: {
    employees: []
  },
  mounted() {
    var self = this;
    $.ajax({
      url: '/employees.json',
      success: function(res) {
        self.employees = res;
      }
    });
  }
});