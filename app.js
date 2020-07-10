const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.7,      // ioU threshold for non-max suppression
    scoreThreshold: 0.39,    // confidence threshold for predictions.
  }

  //getting users webcam
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMEdia;

  //Selecting elements from HTML
 

  const video = document.querySelector('#video');
  const audio = document.querySelector('#audio');
  
  let model;

  handTrack.startVideo(video).then(status => {
        if(status) {
            navigator.getUserMedia({video:{} }, stream => {
                video.srcObject = stream;
                //Run hand detection
                setInterval(runDetection, 500);
            },
            err => console.log(err)
            );
        }
    });

    function runDetection () {
        model.detect(video).then(predictions => {
            
            if (predictions.length !== 0) {
                let hand1 = predictions[0].bbox;
                let x = hand1[0];
                let y = hand1[1];
                console.log(x);
                if(y > 300) {
                    if (x < 200) {
                        audio.src = 'A_cord.mp3';
                    }else if(x > 400) {
                        audio.src = 'E_cord.mp3';
                    }else if(x > 300) {
                        audio.src = 'C_cord.mp3';
                    }else if(x > 200) {
                        audio.src = 'B_cord.mp3';
                    }
                }

                //Play sounds
                audio.play()

            }
        });
    }

    handTrack.load(modelParams).then(lmodel => {
        model = lmodel;
    })