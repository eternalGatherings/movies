// Function to fetch and display videos
async function loadVideos() {
    try {
        const response = await fetch('moviesDB/moviesList.json'); // Fetch the JSON file
        const videos = await response.json(); // Parse JSON data

        // Target container for videos
        const videoGrid = document.getElementById('videoGrid');

        // Generate video elements
        videos.forEach(video => {
            // Create video container div
            const videoDiv = document.createElement('div');
            videoDiv.classList.add('video');

            // Create video thumbnail div
            const thumbnailDiv = document.createElement('div');
            thumbnailDiv.classList.add('video-thumbnail');
            
            if (video['video-link'])
                thumbnailDiv.onclick = function() {
                    playVideo(video['video-link'], video['video-title']);
                };

            // Create img element
            const img = document.createElement('img');
            img.src = `${video["preview-image"]}`;
            img.alt = `${video["preview-image"]}`;

            thumbnailDiv.appendChild(img);

            // Create video details div
            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('video-details');

            // Populate video details
            detailsDiv.innerHTML = `
                <div class="details">
                    <p>
                        <span class="video-title">${video["video-title"]}</span>
                        ${video["title-tag"] ? `<span class="title-tag">${video["title-tag"]}</span>` : ""}
                    </p>
                    <div class="video-info">
                        ${video["quality"] ? `<p class="video-quality">Quality - <strong>${video["quality"]}</strong></p>` : ""}
                        ${video["release-year"] ? `<p class="video-year">Release Year - <strong>${video["release-year"]}</strong></p>` : ""}
                        ${video["file-size"] ? `<p class="video-size">File size - <strong>${video["file-size"]}</strong></p>` : ""}
                    </div>
                </div>
            `;

            // Append thumbnail and details to video div
            videoDiv.appendChild(thumbnailDiv);
            videoDiv.appendChild(detailsDiv);

            // Append video div to grid
            videoGrid.appendChild(videoDiv);
        });
    } catch (error) {
        console.error('Error loading videos:', error);
    }
}

// Load videos on page load
loadVideos();

// function playVideo(videoKey) {
//     const url = `https://drive.google.com/file/d/${videoKey}/preview`;
//     const iframeHtml = `<iframe src="${url}" width="100%" height="100%" frameborder="0" style="margin:0; padding: 0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

//     // Open a new tab and load the iframe
//     const newTab = window.open();
//     newTab.document.write(iframeHtml);
// }

function playVideo(videoKey, videoTitle) {
    const url = `https://drive.google.com/file/d/${videoKey}/preview`;
    const iframeHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${videoTitle}</title>
            <link rel="icon" href="https://github.com/eternalGatherings/movies/blob/master/images/logo.svg" type="image/png">
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #000;
                    height: 100vh;
                    overflow: hidden;
                }
                .video-container {
                    position: relative;
                    width: 80vw; /* 80% of viewport width */
                    height: 0;
                    padding-bottom: 45%; /* 16:9 aspect ratio (9 / 16 = 0.5625 => 56.25% padding) */
                    background-color: black;
                }
                iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: none;
                }
                .close-btn {
                    position: absolute;
                    top: 9px;
                    right: 9px;
                    background-color: #fff;
                    border: none;
                    padding: 14px 18px;
                    cursor: pointer;
                    font-size: 16px;
                    border-radius: 5px;
                }
                .close-btn:hover {
                    background-color: #ccc;
                }
            </style>
        </head>
        <body>
            <div class="video-container">
                <iframe src="${url}" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                <button class="close-btn" onclick="window.close()">X</button>
            </div>
        </body>
        </html>
    `;

    // Open a new tab and load the iframe
    const newTab = window.open();
    newTab.document.write(iframeHtml);
}

