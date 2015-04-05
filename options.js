// Saves options to chrome.storage
function save_options() {
  var favoriteUrls = document.getElementById('favoriteUrls').value;
  chrome.storage.sync.set({
    favoriteUrls: favoriteUrls
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.style.display = 'block';
    setTimeout(function() {
      status.style.display = 'none';
    }, 2000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    favoriteUrls: 'http://www.ft.com/*'
  }, function(items) {
    document.getElementById('favoriteUrls').value = items.favoriteUrls;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);