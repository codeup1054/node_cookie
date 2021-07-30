const querystring = require('querystring');

const strava_base_url = "https://heatmap-external-a.strava.com/tiles-auth/$heat_activities_type/$heat_color";

const z=15
const x=19790
const y=10255

const coo = {
    "CloudFront-Key-Pair-Id": "APKAIDPUN4QMG7VUQPSA",
    "CloudFront-Policy": "eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vaGVhdG1hcC1leHRlcm5hbC0qLnN0cmF2YS5jb20vKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYyODE2ODg1Mn0sIkRhdGVHcmVhdGVyVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjI2OTQ0ODUyfX19XX0_",
    "CloudFront-Signature": "PKplNw49ZTcQt0Ra35uEOJKH82Z~O1ZSWS8jkDDaXExnRxTtax6YVqy09C-8Mv0kGbh7yI9RciHbrHmyJYu2MJFVrY3sOA6OsZesLbYkEY4Q9s5v5HWFLxtBWQJPWIVv7JeSB5f8KSy3XLSiABJCIiGoSK7NJgcWzEkQtRi74CmWk3u5518Cq6yMccAt7aAjd8fA-vN-jJ6sMEhZBlAQxrSrOg5ri5t8PDQzpnw2d9VRVS0ndugm6iaWtqxuNYIsbZf90nqO5--Ywip~Gghi41CRMu5v6t8WvNy-fHKikWKYasUtPAfFQgXvyDr5E7qIhNqlLXaVBmkdR5VyH-3Cxg__"
}

const hm_param = {
    z:15
    x:19790
    y:10255
}



const strava_image_url_param = querystring.stringify(coo);

const img_url  = "$strava_url/$z/$x/$y.png?px=256";
// http://gpxlab.ru/strava.php?z=15&x=19790&y=10255&heat_activities_type=all&heat_color=hot&hist=2021-07


const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');

const file = fs.createWriteStream("file.jpg");

strava_url = strava_base_url+

const request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
    response.pipe(file);
});