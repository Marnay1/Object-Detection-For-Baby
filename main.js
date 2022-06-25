song= "";
objects= [];
function preload(){
    song= loadSound("mixkit-facility-alarm-908.wav");
}
function setup(){
    canvas= createCanvas(640, 400);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status= true;
}
function draw(){
    image(video, 0, 0, 640, 400);
    objectDetector.detect(video, gotResult);
    for(i=0; i< objects.length; i++){
        if(objects[i].label == "person"){
            document.getElementById("detected").innerHTML= "Baby Detected";
            song.play();
        } else{
            document.getElementById("detected").innerHTML= "Baby Not Detected";
            song.play();
        }
        if(objects.length< 0){
            document.getElementById("detected").innerHTML= "Baby Not Detected";
            song.play();
        }
        fill("purple");
        text(objects[i].label, objects[i].x, objects[i].y);
        noFill();
        stroke("purple");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects= results;
}