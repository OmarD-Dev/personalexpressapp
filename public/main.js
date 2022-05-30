let edit = document.getElementsByClassName("fa-pencil");
let trash = document.getElementsByClassName("fa-trash");
let thumbDown = document.getElementsByClassName("fa-thumbs-down")
Array.from(edit).forEach(function(element) {
      element.addEventListener('click', function(){
        const content = this.parentNode.parentNode.childNodes[3].innerText
        const comment = this.parentNode.parentNode.childNodes[7].value
        console.log(comment)
        fetch('text', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'content': content,
            'comment': comment,
            
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const content = this.parentNode.parentNode.childNodes[3].innerText
        fetch('delete', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'content': content
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
