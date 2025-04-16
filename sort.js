import fs from 'fs';
import { fileURLToPath } from "url";
import { dirname } from "path";
import { SUPERCHAT_API_KEY } from "../config/index.js";


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


async function getAllImages (){
    let results = [];
    let after = null;
    let url = 'https://api.superchat.com/v1.0/files?limit=100';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'X-API-KEY': SUPERCHAT_API_KEY
    }
    };

    try {
        const response = await fetch(url, options)
        .then(res => res.json());
        results = results.concat(response.results);
        after = response.pagination.next_cursor;
        while (after) {
            let url2 = url + "&after=" + after;
            let response2 = await fetch(url2, options)
            .then(res => res.json());
            const contacts1 = response2.results;
            results = results.concat(contacts1);
            after = response2.pagination.next_cursor;
        }
    } catch (error) {
        console.log(error);
    }
    const images = [];
    for (let index = 0; index < results.length; index++) {
        const result = results[index];
        if (result.mime_type === 'image/png')
        {
            images.push(result);
            console.log(index);
        }
    }
    fs.writeFileSync(__dirname + '/images.json', JSON.stringify(images, null, 2));
    console.log(results.length);
}


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
        const data = {
            id: videos[index].id,
            name: videos[index].name,
            mime_type: videos[index].mime_type,
            template_id: videos[index].template_id,
        }
        templatesData[month][dayIndex].training = data;
        index++;
        dayIndex++;
        if (index === videosLength) {
            index = 0;
        }
    }
    fs.writeFileSync(__dirname + '/src/data/templates.json', JSON.stringify(templatesData, null, 2));
}


function addImagesTOTemplates() {
    const images = JSON.parse(fs.readFileSync(__dirname + '/images.json', 'utf-8'));
    const templatesData = JSON.parse(fs.readFileSync(__dirname + '/src/data/templates.json', 'utf-8'));
    const imagesLength = images.length;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let index = 0;
    let dayIndex = 1;
    const templatesReciept = [
        "tn_STCi3PRlHKudD4kgSPTwT",
        "tn_E1BxmKFI5mZHQxiaTPbTR",
        "tn_bI5CWRwPKEl9usYYPbUJR",
        "tn_Out3Bu0siwcuXNonfOuit",
        "tn_Lr0yz9aLIIruVhzMCcd1O",
        "tn_SXdbilaN9qSZFtudArd5B",
    ];
    let templateIndex = 0;
    for(let i = 0; i < 30; i++) {
        const videotoset = images[index];
        const data = {
            id: videotoset.id,
            name: videotoset.name,
            mime_type: videotoset.mime_type,
            template_id: templatesReciept[templateIndex],
        }
        templatesData[month][dayIndex].recipe = data;
        index++;
        dayIndex++;
        if (index === imagesLength) {
            index = 0;
        }
        if (templateIndex === 6)
        {
            templateIndex = 0;
        }
    }
    fs.writeFileSync(__dirname + '/src/data/templates.json', JSON.stringify(templatesData, null, 2));
}

addImagesTOTemplates();