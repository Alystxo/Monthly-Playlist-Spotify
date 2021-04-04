console.log("test");
var abctest=69420;
var deftest=911;
console.log(abctest-deftest);
function ghitest (input){
    input=input+"-test"
console.log(input)
}
ghitest("jkl")
ghitest("mno")



function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 || httpRequest.status === 0) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}


fetchJSONFile('Songs.json', handleData);


function handleData (data) {
    console.log (data)
}