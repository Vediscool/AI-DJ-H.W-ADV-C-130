song_status = 0;
Peter_pan_song = "";
Harry_potter_theme_song = "";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
left_wrist_score = 0;

function setup() {
    canvas = createCanvas(600, 530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);
}

function preload() {
    Peter_pan_song = loadSound("music2.mp3");
    Harry_potter_theme_song = loadSound("music.mp3");
}

function draw() {
    image(video, 0, 0, 600, 530);

    fill("#800000");
    stroke("#800000");

    circle(rightWrist_x, rightWrist_y, 20);

    if (rightWrist_x > 0 && rightWrist_y <= 100) {
        document.getElementById("song_speed").innerHTML = "Song_speed = 0.5x";
        song.rate(0.5);

    } else if (rightWrist_x > 100 && rightWrist_y <= 200) {
        document.getElementById("song_speed").innerHTML = "Song_speed = 1x";
        song.rate(1);

    } else if (rightWrist_x > 200 && rightWrist_y <= 300) {
        document.getElementById("song_speed").innerHTML = "Song_speed = 1.5x";
        song.rate(1.5);

    } else if (rightWrist_x > 300 && rightWrist_y <= 400) {
        document.getElementById("song_speed").innerHTML = "Song_speed = 2x";
        song.rate(2);
        
    } else if (rightWrist_x > 400 && rightWrist_y < 500) {
        document.getElementById("song_speed").innerHTML = "Song_speed = 2.5x";
        song.rate(2.5);
    }



    fill("#800000");
    stroke("#800000");

    circle(leftWrist_x, leftWrist_y, 20);
    InNumberleftWrist_y = Number(leftWrist_y);
    remove_decimals = floor(InNumberleftWrist_y);
    volume = remove_decimals / 500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);

    function modelLoaded() {
        console.log("poseNet Is Initialized");
    }

    function gotposes(results) {
        if (results.length > 0) {
            console.log(results);

            leftWrist_x = results[0].pose.leftWrist.x;
            leftWrist_y = results[0].pose.leftWrist.y;
            console.log("leftWrist_x = " + leftWrist_x + " leftWrist_y = " + leftWrist_y);

            rightWrist_x = results[0].pose.rightWrist.x;
            rightWrist_y = results[0].pose.rightWrist.y;
            console.log("rightWrist_x = " + rightWrist_x + " rightWrist_y = " + rightWrist_y);
        }

    }
}