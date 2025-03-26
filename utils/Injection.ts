const injectedJavaScript = `
// ! KINDLY DO NOT CHANGE "VAR" TO "LET" OR "CONST" - INTENTIONAL DECLARATION FOR "HOISTING"
(function() {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  document.body.style.margin = '0';
  document.documentElement.style.margin = '0';
  document.body.style.position = 'relative';
  
  var headerInterval = setInterval(function() {
    var header = document.querySelector('header');
    if (header) {
      header.style.display = 'none';
      clearInterval(headerInterval);
      }else {
        // alert('Header element not hidden');
    }
    }, 1000);
    
    var canvaParent = document.createElement('div');
    canvaParent.id = 'canva-parent';
    canvaParent.style.backgroundColor = 'black';
    canvaParent.style.position = 'absolute';
    canvaParent.style.top = '0';
    canvaParent.style.left = '0';
    canvaParent.style.width = '100%';
    canvaParent.style.height = '90%';
    canvaParent.style.zIndex = '40';
    canvaParent.style.display = 'flex';
    canvaParent.style.alignItems = 'flex-start';
    canvaParent.style.justifyContent = 'center';
    
    document.body.appendChild(canvaParent);
    
function searchForLoadingGame() {
  var interval = setInterval(() => {
  var pTag = Array.from(document.querySelectorAll('p')).find(p => p.textContent.includes('Loading Game'));
  if (pTag) {
    var loadingText = document.getElementById('loading-text');
    if (!loadingText) {
      loadingText = document.createElement('h3');
      loadingText.id = 'loading-text';
      loadingText.style.display = 'flex';
      loadingText.style.alignItems = 'center';
      loadingText.style.justifyContent = 'center';
      loadingText.style.textAlign = 'center';
      loadingText.style.color = '#ffffff';
      loadingText.style.width = '100%';
      loadingText.style.height = '100vh';
      loadingText.style.position = 'absolute';
      loadingText.style.top = '0px';
      loadingText.style.left = '0px';
      loadingText.style.zIndex = '50';
      document.body.appendChild(loadingText);
    }
      
  loadingText.textContent = pTag.textContent;
  // ! Keeping that under 90, because the loading state of the website max out at 90%
  if (loadingText.textContent.match(/8[8-9]%|9[0-9]%|100%/)) {
    setTimeout(() => {
      loadingText.style.display = 'none';
      var existingCanvas = document.querySelector('canvas');
      if (existingCanvas) {
        existingCanvas.style.width = '100%';
        existingCanvas.style.height = '100vh';
        existingCanvas.style.zIndex = '50';
        canvaParent.appendChild(existingCanvas);
      } else {
        alert('Canvas / Game not found. Please try again.');
      }
    }, 3000);
  }
}}, 500);
}
          
searchForLoadingGame();
          
// ? Scroll to the top
window.scrollTo(0, 0);
})();
`;
export default injectedJavaScript;
