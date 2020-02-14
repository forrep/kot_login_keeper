(function() {
    'use strict';

    // Your code here...
    let findKeepPath = function() {
        let result = document.evaluate('//a[starts-with(@href, "/admin/")]/@href', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
        for (let i = 0; i < result.snapshotLength; ++i) {
            if (result.snapshotItem(i).value.match(/^\/admin\/[a-zA-Z0-9]{32}\?page_id=\/top/)) {
                return result.snapshotItem(i).value;
            }
        }
        return "";
    }

    let keepLoginInterval = 10 * 60 * 1000;
    let keepLogin = function() {
        let path = findKeepPath();
        if (path.length > 0) {
            let request = new Request(path);

            fetch(request).then(function(response) {
                if (response.status != 200) {
                    return Promise.reject(response);
                }
                console.log(response);
                setTimeout(keepLogin, keepLoginInterval);
            }).catch(function(response) {
                console.error(response);
            });
        }
    }

    setTimeout(keepLogin, keepLoginInterval);
})();
