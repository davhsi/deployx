import express from 'express';
import cors from 'cors';
import simpleClone from 'simple-git';
import { generate } from './utils';
import path from 'path' 
import { getAllFiles } from './file';
import { uploadFile } from './aws';
import { createClient } from 'redis';
import { port, redisUrl } from './config';
const app = express()
const publisher = createClient({
    url: redisUrl
});
publisher.connect(); 
const subscriber = createClient({
    url: redisUrl
});
subscriber.connect();
app.use(cors());
app.use(express.json());
app.post("/deploy", async (req, res) => {
    const repoUrl = req.body.repoUrl;
    const id = generate();
    console.log(id);
    await simpleClone().clone(repoUrl,path.join(__dirname,`output/${id}`));
    console.log("cloned");
    const files = getAllFiles(path.join(__dirname, `output/${id}`));
    console.log(files);

    files.forEach(async file => {
        await uploadFile(file.slice(__dirname.length+1), file);
    })

    await new Promise(resolve => {
        setTimeout(resolve, 5000);
    })

    publisher.lPush("build-queue",id);
    publisher.hSet("status",id,"uploaded");

    res.json({
        id:id
    });
});

app.get('/status', async(req, res) => {
    const id = req.query.id;
    const response = await subscriber.hGet("status", id as string);
    res.json({
        status:response
    }); 
});  

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});