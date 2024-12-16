import fs from 'fs';
import { fileURLToPath } from "url";
import { dirname } from "path";




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


function splitFiles () {

    const data = fs.readFileSync(__dirname + '/files.json', 'utf-8');
    const parsedData = JSON.parse(data);
    const files = parsedData.results;
    const videos = [];
    files.forEach(file => {
        if (file.mime_type === 'video/mp4') {
            switch (file.name) {
                case '1.mp4':
                    videos.push(file);
                    break;
                case '2.mp4':
                    videos.push(file);
                    break;
                case '3.mp4':
                    videos.push(file);
                    break;
                case '4.mp4':
                    videos.push(file);
                    break;
                case '5.mp4':
                    videos.push(file);
                    break;
                case '6.mp4':
                    videos.push(file);
                    break;
                case '7.mp4':
                    videos.push(file);
                    break;
                case '8.mp4':
                    videos.push(file);
                    break;
                case '9.mp4':
                    videos.push(file);
                    break;
                case '10.mp4':
                    videos.push(file);
                    break;
                case '11.mp4':
                    videos.push(file);
                    break;
                case '12.mp4':
                    videos.push(file);
                    break;
                case '13.mp4':
                    videos.push(file);
                    break;
                case '14.mp4':
                    videos.push(file);
                    break;
                case '15.mp4':
                    videos.push(file);
                    break;
                case '16.mp4':
                    videos.push(file);
                    break;
                case '17.mp4':
                    videos.push(file);
                    break;
                case '18.mp4':
                    videos.push(file);
                    break;
                case '19.mp4':
                    videos.push(file);
                    break;
                case '20.mp4':
                    videos.push(file);
                    break;
                case '21.mp4':
                    videos.push(file);
                    break;
                case '22.mp4':
                    videos.push(file);
                    break;
                case '23.mp4':
                    videos.push(file);
                    break;
                case '24.mp4':
                    videos.push(file);
                    break;
                case '25.mp4':
                    videos.push(file);
                    break;
                case '26.mp4':
                    videos.push(file);
                    break;
                case '27.mp4':
                    videos.push(file);
                    break;
                case '28.mp4':
                    videos.push(file);
                    break;
                case '29.mp4':
                    videos.push(file);
                    break;
                case '30.mp4':
                    videos.push(file);
                    break;
                case '31.mp4':
                    videos.push(file);
                    break;
                default:
                    break;
            }
        }
    });
    fs.writeFileSync(__dirname + '/videos.json', JSON.stringify(videos, null, 2));
    console.log(videos.length);
}

//splitFiles();

function addTemplates () {
    const data = fs.readFileSync(__dirname + '/videos.json', 'utf-8');
    const videos = JSON.parse(data);
    const templates = [
        "tn_7KbKbtjPe0jaQ03EBy3r8", 
        "tn_tHWEPgTla2Rb6iVB1ljpS",
        "tn_EaeyR4vcVoSe6B7m7SXqV",
        "tn_8437mvxDmWNyFwWGXxPMr",
        "tn_AV8OZKAqMoEx7QKQCj37b",
        "tn_RyEL7Bh9BRO5OKYLoLP4w",
    ];
    let templateIndex = 0;
    const updatedVideos = videos.map(video => {
        video.template_id = templates[templateIndex];
        templateIndex++;
        if (templateIndex === templates.length) {
            templateIndex = 0;
        }
        return video;
    });
    fs.writeFileSync(__dirname + '/videos.json', JSON.stringify(updatedVideos, null, 2));
    console.log(updatedVideos.length);
}

//addTemplates();


function addVideosTOTemplates() {
    const videos = JSON.parse(fs.readFileSync(__dirname + '/videos.json', 'utf-8'));
    const templatesData = JSON.parse(fs.readFileSync(__dirname + '/src/data/templates.json', 'utf-8'));
    const videosLength = videos.length;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let index = 0;
    let dayIndex = 1;
    for(let i = 0; i < 30; i++) {
        if (dayIndex < 10)
            dayIndex = '0' + dayIndex;
        templatesData[month][dayIndex].video = videos[index];
        index++;
        dayIndex++;
        if (index === videosLength) {
            index = 0;
        }
    }
    fs.writeFileSync(__dirname + '/src/data/templates.json', JSON.stringify(templatesData, null, 2));
}

addVideosTOTemplates();