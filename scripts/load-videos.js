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

            // Create iframe element
            const iframe = document.createElement('iframe');
            // iframe.src = "https://drive.google.com/file/d/1K-4YiqnhBMFqG8zOmixFJV0ZGUM10n7h/preview";
            iframe.src = `${video["video-link"]}`;
            iframe.allow = "autoplay";
            thumbnailDiv.appendChild(iframe);

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
                        <p class="channel-name">Quality - <strong>${video.quality}</strong></p>
                        <p class="video-views">Release Year - <strong>${video["release-year"]}</strong></p>
                        <p class="video-size">File size - <strong>${video["file-size"]}</strong></p>
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