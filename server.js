const ffmpeg = require("fluent-ffmpeg");
const ytdl = require("ytdl-core");
const fs = require("fs");

// Replace with the URL of the YouTube video you want to process
const videoUrl = "https://www.youtube.com/watch?v=FFnp_YQrDGE";
const startTime = "00:00:00"; // Replace with the desired start time
const duration = "00:10:10"; // Replace with the desired end time
const volumeLevel = 1.0; // Adjust the volume level (1.0 is normal volume)

// Configure FFmpeg
const command = ffmpeg();

// Download the YouTube video
const stream = ytdl(videoUrl, { quality: "highestaudio" });

// Set the input stream for FFmpeg
command.input(stream);

// Trim the video to the specified start and end times
command
  .setStartTime(startTime)
  .setDuration(duration) // Duration will be calculated based on the start and end times
  .outputFormat("mp3") // Convert to MP3
  .output("thankfull.mp3"); // Output file name

// Event listeners for logging output
command
  .on("start", () => {
    console.log("Conversion started...");
  })
  .on("progress", (progress) => {
    console.log(`Processing: ${progress.percent}% done`);
  })
  .on("end", () => {
    console.log("Conversion finished.");
  })
  .on("error", (err) => {
    console.error("Errors:", err);
  })
  .run();
