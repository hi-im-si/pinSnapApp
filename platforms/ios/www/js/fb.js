

    // openFB.init('1378144972468866'); // Defaults to sessionStorage for storing the Facebook token

//  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
 openFB.init('1378144972468866', 'http://localhost:8080/oauthcallback.html', window.localStorage);

    function login() {
        openFB.login('email',
                function() {
                    alert('Facebook login succeeded');
                },
                function(error) {
                    alert('Facebook login failed: ' + error.error_description);
                });
    }

    function getInfo() {
        openFB.api({
            path: '/me',
            success: function(data) {
                console.log(JSON.stringify(data));
                document.getElementById("userName").innerHTML = data.name;
            },
            error: errorHandler});
    }

    function share() {
        openFB.api({
            method: 'POST',
            path: '/me/feed',
            params: {
                message: 'Testing Facebook APIs'
            },
            success: function() {
                alert('the item was posted on Facebook');
            },
            error: errorHandler});
    }

    function revoke() {
        openFB.revokePermissions(
                function() {
                    alert('Permissions revoked');
                },
                errorHandler);
    }

    function errorHandler(error) {
        alert(error.message);
    }

