const video = document.querySelector("video");

async function setUp() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.addEventListener("playing", async () => {
        const worker = Tesseract.createWorker();
        await worker.load();
        await worker.loadLanguage("por");
        await worker.initialize("por");

        const canvas = document.createElement("canvas");
        canvas.width = video.width;
        canvas.height = video.height;

        document.addEventListener("keypress", async e => {
            if (e.code !== "Space") return
            
            canvas.getContext("2d").drawImage(video, 0, 0, video.width, video.height);
            const { data } = await worker.recognize(canvas);
            console.log(data);
        })
    })
}

setUp();
