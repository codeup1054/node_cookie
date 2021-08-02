// http://gpxlab.ru/strava.php?z=15&x=19790&y=10255&heat_activities_type=all&heat_color=hot&hist=2021-07
// $strava_url = "https://heatmap-external-a.strava.com/tiles-auth/$heat_activities_type/$heat_color";
const path = require('path')
const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const adds = require('./adds/adds');

// const fs = require('graceful-fs');


const strava_base_url = "https://heatmap-external-a.strava.com/tiles-auth/all/hot/";
const querystring = require('querystring');



// const tile_param = {
//     "hm_activity":"all",
//     "hm_color":"hot"
// }

global.st = process.hrtime();
global.fin = false;

const htr = process.hrtime()
const startTime = htr[0] * 1000000 + htr[1]



const hm_param = {
    "z":15,
    "x":19650,
    "y":10100
}

let cnt = 1

adds.range(hm_param.x,hm_param.x+300).forEach(x=>
    {
        var endTime = process.hrtime()

        adds.range(hm_param.y,hm_param.y+300).forEach(y=>
        {
        hm_param.x = x
        hm_param.y = y
        getTiles(hm_param)
        cnt ++
        })

    const htr = process.hrtime()
    const currTime = htr[0] * 1000000 + htr[1]
     // console.log(cnt,". x=",x,":",(currTime - startTime))
    })

// "$strava_url/$z/$x/$y.png?px=256&Signature=$Signature&Key-Pair-Id=$Key_Pair_Id&Policy=$Policy";
// const strava_url = "https://heatmap-external-a.strava.com/tiles-auth/all/hot/15/19804/10235.png?v=19"


 function getTiles(hm_param)  {

    const hm_images_path =  "public/hm_images/";
    const hm_file_name = hm_images_path + Object.values(hm_param).join('/') + '.png';

     if (!fs.existsSync(hm_file_name)) {
        stravaRequest(hm_param,hm_file_name);
     }

}

let delt = 0
let c = 0

while (delt < 1000)
{
    const htr = process.hrtime()
    const currTime = htr[0] * 1000000 + htr[1]

    delt = currTime-startTime

    if ((c++ % 3000) == 1) {
        console.log("delt=", delt);
        adds.walk("hm_images", function (err, results) {
            if (err) throw err;
            console.log("files", results.length);
        });
    }
}

function stravaRequest(hm_param,hm_file_name) {

    const cookie = {
        "Key-Pair-Id": "APKAIDPUN4QMG7VUQPSA",
        "Policy": "eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vaGVhdG1hcC1leHRlcm5hbC0qLnN0cmF2YS5jb20vKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYyODU5MTQ4N30sIkRhdGVHcmVhdGVyVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjI3MzY3NDg3fX19XX0_",
        "Signature": "Hzl5SEP7GWb6wHNC5gyynadyi6dE8aDhijyqiiq6f~7kL8SZGJ7ItJ4aJrLki5TYpzr3gx~y4IyoesWU5SN-90joHcUmMZAclgUqfwf31MV12rXXPOb7UGr~xrSmbK2sn~OfNl2qQ0wMpObmD3ZH9U8V87pFEG5CnRuF1e4KOrVMwEB8~3QTWAIslfGyiYQk-ut~20ECQDCzllY7-fGkYAprjHSlSfIh2wHP~xBY-ArpETbUopdxv6omRavMmd-iZHUxylnUnCWEm0ql25n7x0YhxV5-hmNkcW4TYxC7Db47AD3rOQfxJQJoqkGpL~HRDz-lHuvCqs-NlY~KYD5zfg__"
    }

    const url_cookie = querystring.stringify(cookie);
    const url_hm_param = Object.values(hm_param).join('/');
    const strava_url = strava_base_url+url_hm_param+'?'+url_cookie


    const hm_dir_name = path.dirname(hm_file_name);

    global.fin = false

    const request = http.get(strava_url, function (response) {
        if (response.statusCode != 200) {
            console.log('STATUS: ' + response.statusCode, hm_file_name);
            global.fin = true
        }
        else {
            fs.promises.mkdir(hm_dir_name, {recursive: true}).catch(console.error);
            console.log(hm_dir_name)
            const file_pipe = fs.createWriteStream(hm_file_name);
            response.pipe(file_pipe);
            global.fin = true
             }
    });
}


adds.tm()

