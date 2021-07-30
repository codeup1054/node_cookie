// http://gpxlab.ru/strava.php?z=15&x=19790&y=10255&heat_activities_type=all&heat_color=hot&hist=2021-07
// $strava_url = "https://heatmap-external-a.strava.com/tiles-auth/$heat_activities_type/$heat_color";
const path = require('path')
const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const strava_base_url = "https://heatmap-external-a.strava.com/tiles-auth/all/hot/";
const querystring = require('querystring');

const adds = require('./adds/adds');


// const tile_param = {
//     "hm_activity":"all",
//     "hm_color":"hot"
// }

const hm_param = {
    "z":15,
    "x":19792,
    "y":10255
}

for(const  x in adds.range(19792,19800))
{
console.log(x)
}

// "$strava_url/$z/$x/$y.png?px=256&Signature=$Signature&Key-Pair-Id=$Key_Pair_Id&Policy=$Policy";
const cookie = {
    "Key-Pair-Id": "APKAIDPUN4QMG7VUQPSA",
    "Policy": "eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vaGVhdG1hcC1leHRlcm5hbC0qLnN0cmF2YS5jb20vKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYyODE2ODg1Mn0sIkRhdGVHcmVhdGVyVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjI2OTQ0ODUyfX19XX0_",
    "Signature": "PKplNw49ZTcQt0Ra35uEOJKH82Z~O1ZSWS8jkDDaXExnRxTtax6YVqy09C-8Mv0kGbh7yI9RciHbrHmyJYu2MJFVrY3sOA6OsZesLbYkEY4Q9s5v5HWFLxtBWQJPWIVv7JeSB5f8KSy3XLSiABJCIiGoSK7NJgcWzEkQtRi74CmWk3u5518Cq6yMccAt7aAjd8fA-vN-jJ6sMEhZBlAQxrSrOg5ri5t8PDQzpnw2d9VRVS0ndugm6iaWtqxuNYIsbZf90nqO5--Ywip~Gghi41CRMu5v6t8WvNy-fHKikWKYasUtPAfFQgXvyDr5E7qIhNqlLXaVBmkdR5VyH-3Cxg__"
}

const url_cookie = querystring.stringify(cookie);
const url_hm_param = Object.values(hm_param).join('/');

const strava_url = strava_base_url+url_hm_param+'?'+url_cookie

// const strava_url = "https://heatmap-external-a.strava.com/tiles-auth/all/hot/15/19804/10235.png?v=19"
// console.log("@@", strava_url, hm_param.values().join('_') )

const hm_images_path =  "hm_images/";

function getTiles(hm_param)  {

    const hm_file_name = hm_images_path + Object.values(hm_param).join('/') + '.png';

    const hm_dir_name = path.dirname(hm_file_name);

    console.log("@@", strava_url, '\n\n', hm_dir_name, '\n\n', hm_file_name);

    fs.promises.mkdir(hm_dir_name, {recursive: true}).catch(console.error);

    const file_pipe = fs.createWriteStream(hm_file_name);

    const request = http.get(strava_url, function (response) {
        response.pipe(file_pipe);
    });

}