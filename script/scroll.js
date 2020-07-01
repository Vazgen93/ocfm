(() => {
    let links = document.querySelectorAll('[href*="#"]');


  
    for (let link of links) {
      link.addEventListener("click", scroll_document);
      function scroll_document(e) {
        e.preventDefault();
        const blockID = link.getAttribute("href");
        
        document.querySelector("" + blockID).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  })();