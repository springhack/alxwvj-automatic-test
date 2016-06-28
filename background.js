
function entry(tabId, changeInfo, tab) {
	chrome.pageAction.show(tabId);
	chrome.tabs.executeScript(tabId, {
		file : './insert.js',
		runAt : 'document_end'
	});
};

chrome.tabs.onUpdated.addListener(entry);
