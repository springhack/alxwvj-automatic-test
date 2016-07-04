
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	chrome.pageAction.show(tabId);
	chrome.tabs.executeScript(tabId, {
		file : 'script.js',
		runAt : 'document_end'
	});
});

